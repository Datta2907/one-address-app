const User = require('../../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                return res.status(200).json({ success: true, message: 'User Valid' });
            } else {
                return res.status(200).json({ success: false, message: 'Invalid Credentials' });
            }
        } else {
            return res.status(200).json({ success: false, message: 'Invalid Email!' });
        }
    } catch (err) {
        console.log('Error Occurred', err.message);
        return res.status(500).json({ success: false, message: 'Error Occured' });
    }
}

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            return res.status(200).json({ success: false, message: 'Email Registered, would you like to login?' });
        } else {
            const { firstName, lastName, password, role, email } = req.body;
            if (!firstName || !lastName || !password || !role) {
                return res.status(200).json({ success: false, message: 'Please Provide all the details!' });
            }
            let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            const encryptedPassword = await bcrypt.hash(password, salt);
            const info = {
                name: firstName + lastName,
                email,
                password: encryptedPassword,
                emailVerified: false,
                mobile: null,
                role
            }
            const user = await User.create(info);
            return res.status(200).json({ success: true, message: 'User Created Successfully', data: user });
        }
    } catch (err) {
        console.log('Error Occurred', err.message);
        return res.status(500).json({ success: false, message: 'Error Occured' });
    }
}