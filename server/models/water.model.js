const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const waterSchema = new Schema({
    amount: { type: String, required: true },
    hour: { type: Date, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true
});

const water = mongoose.model('water', waterSchema);

module.exports = water;