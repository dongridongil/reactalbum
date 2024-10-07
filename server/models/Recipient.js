const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    company_name: String,
    name: String,
    phone: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

recipientSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;
