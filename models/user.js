const mongoose = require('mongoose');

const mobileNumberSchema = new mongoose.Schema({
    _id: false,
    countryCode: { type: String, required: true, trim: true, index: true },
    number: { type: String, required: true, trim: true, unique: true },
    verified: { type: Boolean, default: false, index: true },
})
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    emailVerified: { type: Boolean, default: false, index: true },
    password: { type: String, reuired: true },
    mobile: mobileNumberSchema,//give all details or place null
    role: { type: String, enum: ['Developer', 'President', 'Resident', 'Non-Resident', 'NA'], required: true, index: true },
    owner: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model('User', userSchema)