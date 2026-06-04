const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Access Denied: Missing authentication token signature." 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: "Access Denied: Session token is corrupt or expired." 
        });
    }
};

const requireRole = (allowedRoles) => {
    return (req, res, next) => {

        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: This resource requires one of these clearance levels: [${allowedRoles.join(', ')}].`
            });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    requireRole
};