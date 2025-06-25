const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    address: { type: String, required: true, trim: true, unique: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    pincode: { type: Number, required: true },
    area: { type: String, required: true, trim: true },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photo: { type: String, default: '' },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    representative: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })
    .index({ "verifiedBy": 1, "address": 1 }, { unique: true })
    .index({ "user": 1, "address": 1 }, { unique: true })
    .index({ "representative": 1, "address": 1 }, { unique: true })
    .index({ "latitude": 1, "longitude": 1, "representative": 1 }, { unique: true })
    .index({ "latitude": 1, "longitude": 1, "user": 1 }, { unique: true })
    .index({ "latitude": 1, "longitude": 1, "verifiedBy": 1 }, { unique: true })
    .index({ "latitude": 1, "longitude": 1 }, { unique: true });
module.exports = mongoose.model('Address', addressSchema)