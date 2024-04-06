const mongoose = require('mongoose');

const mobileNumberSchema = new mongoose.Schema({
    _id: false,
    countryCode: { type: String, required: true, trim: true, index: true },
    number: { type: String, required: true, trim: true, unique: true, sparse: true },
    verified: { type: Boolean, default: false, index: true },
})
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    address: { type: String, required: true, trim: true, unique: true },
    mobile: mobileNumberSchema,//give all details or place null
    photo: { type: String, default: '' },
    gender: { type: String, enum: ['Male', 'Female', 'Others', 'Prefer-not-to-say'], required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },//resident,
    role: { type: String, enum: ['President', 'Resident', 'Tenant', 'Others'], required: true, index: true },
    community: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Community' },
    otherRole: { type: String, default: '' },//if role is others
    status: { type: String, enum: ['APPLIED', 'IN-PROGRESS', 'VERIFIED', 'REJECTED', 'LEFT-THE-COMMUNITY', 'DEPARTED'], required: true },
    displayOrShareSensitiveDetails: { type: Boolean, default: false }, // consent
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    password: { type: String, reuired: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)