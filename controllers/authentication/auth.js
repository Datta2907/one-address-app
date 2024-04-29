const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { createJwtToken } = require('../../utils/jwtServices');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                const token = await createJwtToken(user);
                const data = { token }
                return res.status(200).json({ success: true, message: 'User Valid', data });
            } else {
                return res.status(200).json({ success: false, message: 'Invalid Credentials' });
            }
        } else {
            return res.status(200).json({ success: false, message: 'Invalid Email!' });
        }
    } catch (err) {
        console.log('Error Occurred Login', err.message);
        return res.status(500).json({ success: false, message: 'Error Occured' });
    }
}