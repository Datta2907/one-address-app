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
        console.log('Error Occurred', err.message);
        return res.status(500).json({ success: false, message: 'Error Occured' });
    }
}

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            return res.status(200).json({ success: true, message: 'Email Registered, would you like to login?' });
        } else {
            const { firstName, lastName, password, role, email } = req.body;
            if (!firstName || !lastName || !password || !role || !email) {
                return res.status(412).json({ success: false, message: 'Please Provide all the details!' });
            }
            if (!/^[a-z]+$/i.test(firstName) || !/^[a-z]+$/i.test(lastName)) {
                return res.status(412).json({ success: false, message: 'Names can have only letters!' });
            }
            if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                return res.status(412).json({ success: false, message: 'Invalid Email!' });
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
            const token = await createJwtToken(user);
            const data = { token }
            return res.status(200).json({ success: true, message: 'User Created Successfully', data });
        }
    } catch (err) {
        console.log('Error Occurred', err.message);
        return res.status(500).json({ success: false, message: 'Error Occured' });
    }
}