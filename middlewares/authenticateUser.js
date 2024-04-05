const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ success: false, message: 'Access denied' });
    token = (token.split(' '))[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Error Occurred AuthUser', err.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}