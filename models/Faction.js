// models/Faction.js
const mongoose = require('mongoose');

const NewsItemSchema = new mongoose.Schema({ // Can reuse or define separately if different
    date: String,
    content: String
});

const FactionSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: String,
    leader: String,
    members: Number,
    focus: String,
    perks: [String], // Array of strings
    news: [NewsItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Faction', FactionSchema);
