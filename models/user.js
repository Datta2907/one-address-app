const mongoose = require('mongoose');

const Role = {
    PRESIDENT: "PRESIDENT",
    RESIDENT: "RESIDENT",
    TENANT: "TENANT",
    DEVELOPER: "DEVELOPER",
    OTHERS: "OTHERS",
}

const Status = {
    APPLIED: "APPLIED",
    IN_PROGRESS: "IN_PROGRESS",
    VERIFIED: "VERIFIED",
    REJECTED: "REJECTED",
    LEFT_THE_COMMUNITY: "LEFT_THE_COMMUNITY",
    DEPARTED: "DEPARTED"
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    address: { type: String, required: true, trim: true },
    mobile: {
        country: { type: String, required: true },
        countryCode: { type: String, required: true, trim: true, index: true },
        number: { type: String, required: true, trim: true, unique: true },
    },
    photo: { type: String, default: '' },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHERS', 'PREFER_NOT_TO_SAY'], required: true },
    isOwner: { type: Boolean, default: false },
    isRepresentative: { type: Boolean, default: false },
    role: { type: String, enum: Object.keys(Role), required: true, index: true },
    community: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Community' },
    otherRole: { type: String, default: '' },//if role is others
    status: { type: String, enum: Object.keys(Status), required: true },
    displayOrShareSensitiveDetails: { type: Boolean, default: false }, // consent
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    password: { type: String, required: true },
}, { timestamps: true })
    .index({ "email": 1, "address": 1 }, { unique: true })
    .index({ "email": 1, "mobile.number": 1 }, { unique: true })

module.exports = mongoose.model('User', userSchema)