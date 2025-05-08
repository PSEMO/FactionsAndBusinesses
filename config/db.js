// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // These options are generally good defaults for newer Mongoose versions
            // useNewUrlParser: true, // No longer needed
            // useUnifiedTopology: true, // No longer needed
            // useCreateIndex: true, // No longer supported
            // useFindAndModify: false // No longer supported
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
