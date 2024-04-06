const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true, unique: true },
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    pincode: { type: Number, required: true },
    area: { type: String, required: true, trim: true },
    verifiedBy: { type: String, required: true, default: '' },
    photo: { type: String, default: '' },
    representative: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema)