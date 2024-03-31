const jwt = require('jsonwebtoken');

exports.createJwtToken = async (user) => {
    const token = await jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name
    }, process.env.JWT_SECRET, {
        expiresIn: 600 //10 minutes
    });
    return token;
}