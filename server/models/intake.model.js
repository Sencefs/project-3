const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const intakeSchema = new Schema({
    description: { type: String, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true
});

const intake = mongoose.model('Intake', intakeSchema);

module.exports = intake;