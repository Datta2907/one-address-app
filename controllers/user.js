const User = require('../models/user');
const { userRole, userStatus } = require('../common/enums/enum');
const bcrypt = require('bcrypt');
const { createJwtToken } = require('../utils/jwtServices');

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).json({ success: true, message: 'Email Registered, would you like to login?' });
        } else {
            const { firstName, lastName, email, address, mobile, photo, gender, isOwner, isRepresentative, role, community, displayOrShareSensitiveDetails, password } = req.body;
            if (!address || !mobile || !gender || !role || !community || !password) {
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
                address,
                mobile,
                photo,
                gender,
                isOwner,
                isRepresentative,
                role,
                community,
                displayOrShareSensitiveDetails,
                status: "APPLIED",
                password: encryptedPassword
            }
            const user = await User.create(info);
            const token = await createJwtToken(user);
            const data = { token }
            return res.status(200).json({ success: true, message: 'User Created Successfully', data });
        }
    } catch (err) {
        console.log('Error Occurred Registration', err.message);
        return res.status(500).json({ success: false, message: 'Error Occured' });
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.body.verifiedUser, {
            verifiedBy: req.user.id
        });
        return res.status(200).json({ success: true, message: 'Verified Succesfully' });
    } catch (err) {
        console.log('Error Occurred Registration', err.message);
        return res.status(500).json({ success: false, message: 'Error Occured' });
    }
}

exports.getStatus = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).lean();
        return res.status(200).json({ success: true, message: '', data: user });
    } catch (err) {
        console.log('Error Occurred GetStatus', err.message);
        return res.status(500).json({ success: false, message: 'Error Encountered' });
    }
}

exports.getRepresentatives = async (req, res) => {
    try {
        const users = await User.find({ role: userRole.RESIDENT }).lean();
        return res.status(200).json({ success: true, message: '', data: users });
    } catch (err) {
        console.log('Error Occurred GetStatus', err.message);
        return res.status(500).json({ success: false, message: 'Error Encountered' });
    }
}
