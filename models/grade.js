const mongoose = require('mongoose');
const Student = require('./student')
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    roll : String,
    batch: String,
    semester: Number,
    sub1: String,
    sub2: String,
    sub3: String,
    sub4: String
});

module.exports = mongoose.model("Grade", gradeSchema);