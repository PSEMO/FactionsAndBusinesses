// models/Business.js
const mongoose = require('mongoose');

const NewsItemSchema = new mongoose.Schema({
    date: String,
    content: String
});

const BusinessSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: String,
    owner: String,
    employees: Number,
    specialty: String,
    news: [NewsItemSchema] // Array of subdocuments
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Business', BusinessSchema);

