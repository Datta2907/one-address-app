const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ success: false, message: 'Access denied' });
    token = (token.split(' '))[1];
    const decodedToken = jwt.decode(token);
    const tokenExpired = Date.now() >= decodedToken.exp * 1000 ? true : false;
    if (tokenExpired) return res.status(401).json({ success: false, message: 'Token Expired' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Error Occurred AuthUser', err.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}