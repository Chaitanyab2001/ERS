const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    batch: String,
    roll: String,
    public_key: String
});

module.exports = mongoose.model("Student", studentSchema);