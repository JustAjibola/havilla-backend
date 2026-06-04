const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const NotificationService = {
  
    async sendBookingConfirmation(plannerEmail, bookingDetails) {
        try {
            const safeAmount = Number(bookingDetails.amountPaid) || 0;

            const mailOptions = {
                from: `"Havilla Platform Engine" <${process.env.EMAIL_USER}>`,
                to: plannerEmail,
                subject: `🎉 Booking Confirmed: ${bookingDetails.venueName || 'Your Selected Venue'}`,
                html: `
                    <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 30px; border-radius: 8px;">
                        <h2 style="color: #4169E1; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Reservation Secured!</h2>
                        <p>Hello,</p>
                        <p>Your request to book <strong>${bookingDetails.venueName || 'Your Selected Venue'}</strong> has been successfully processed and locked into our calendar.</p>
                        
                        <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #D4AF37; margin: 20px 0;">
                            <strong>Event Date:</strong> ${bookingDetails.date || 'N/A'}<br>
                            <strong>Transaction ID:</strong> ${bookingDetails.bookingId || 'N/A'}<br>
                            <strong>Total Cost:</strong> ₦${safeAmount.toLocaleString()}
                        </div>
                        
                        <p style="font-size: 14px; color: #64748b; margin-top: 30px;">
                            This is an automated operational transmission from the Havilla Backend Staging Engine via Nodemailer.
                        </p>
                    </div>
                `
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`[Notification Service]: Gmail dispatched successfully. MessageID: ${info.messageId}`);
            return true;
            
        } catch (error) {
            console.error(`[Notification Service Error]: Nodemailer engine run failed:`, error.message);

            return false;
        }
    }
};

module.exports = NotificationService;