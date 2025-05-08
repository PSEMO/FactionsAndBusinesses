require('dotenv').config();

const express = require('express');
const fs = require('fs');
const fsp = fs.promises; // Use fs.promises for async operations
const path = require('path');
const connectDB = require('./config/db');

const Business = require('./models/Business');
const Faction = require('./models/Faction');
// EJS is not explicitly required here, Express handles it via app.set('view engine', 'ejs')
// const ejs = require('ejs'); // - No longer needed to require explicitly

connectDB();

const app = express();

// --- Configuration ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // <-- ADDED: Serve static files

const PORT = process.env.PORT || 3169;
const COUNT_FILE_PATH = path.join(__dirname, 'visit_count.txt');

// --- Visit Count Logic ---
let visitCount = 0;

function loadVisitCount() {
    try {
        const data = fs.readFileSync(COUNT_FILE_PATH, 'utf8');
        const count = parseInt(data, 10);
        if (!isNaN(count)) {
            visitCount = count;
            console.log(`Successfully loaded visit count: ${visitCount}`);
        } else {
            console.warn(`Invalid data found in ${COUNT_FILE_PATH}. Starting count from 0.`);
            visitCount = 0;
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(`Count file (${COUNT_FILE_PATH}) not found. Starting count from 0.`);
            visitCount = 0;
        } else {
            console.error(`Error reading count file: ${err}. Starting count from 0.`);
            visitCount = 0;
        }
    }
}

async function saveVisitCount() {
    try {
        await fsp.writeFile(COUNT_FILE_PATH, visitCount.toString(), 'utf8');
    } catch (err) {
        console.error(`Error saving visit count: ${err}`);
    }
}

loadVisitCount(); // Load initial count

// --- Middleware for Logging and Counting ---
app.use(async (request, response, next) => {
    const timestamp = new Date().toISOString();
    const method = request.method;
    const url = request.originalUrl;

    if (method === 'GET' && !url.startsWith('/favicon.ico')) { // Avoid counting favicon requests
        visitCount++;
        console.log(`#${visitCount}, ${timestamp} - ${method} request to ${url}`);
        await saveVisitCount();
    } else {
        console.log(`${timestamp} - ${method} request to ${url}`);
    }

    next();
});



// Redirect root to the main page
app.get('/', (req, res) => {
    res.redirect('/main');
});

// Main directory page
app.get('/main', async (req, res) => { // <-- Make it async
    try {
        const factions = await Faction.find({}).sort({ name: 1 }); // Get all, sort by name
        const businesses = await Business.find({}).sort({ name: 1 }); // Get all, sort by name

        res.render('main', {
            title: 'Factions & Businesses',
            factions: factions,
            businesses: businesses
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error fetching main page data');
    }
});

// Dynamic Business Page Route
app.get('/business/:businessSlug', async (req, res) => {
    try {
        const slug = req.params.businessSlug;
        const businessInfo = await Business.findOne({ slug: slug }); // Query by slug

        if (businessInfo) {
            res.render('business_template', {
                business: businessInfo,
                pageTitle: `${businessInfo.name} - Business`
            });
        } else {
            res.status(404).render('404', {
                message: `Sorry, the business page for "${slug}" was not found.`,
                pageTitle: 'Not Found'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error fetching business page');
    }
});

// Dynamic Faction Page Route
app.get('/faction/:factionSlug', async (req, res) => {
    try {
        const slug = req.params.factionSlug;
        const factionInfo = await Faction.findOne({ slug: slug }); // Query by slug

        if (factionInfo) {
            res.render('faction_template', {
                faction: factionInfo,
                pageTitle: `${factionInfo.name} - Faction`
            });
        } else {
            res.status(404).render('404', {
                message: `Sorry, the faction page for "${slug}" was not found.`,
                pageTitle: 'Not Found'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error fetching faction page');
    }
});

// Optional: Catch-all 404 for other routes
app.use((req, res) => {
    res.status(404).render('404', {
        message: `Sorry, the page "${req.originalUrl}" was not found.`,
        pageTitle: 'Not Found'
    });
});

// --- Server Start (Unchanged) ---
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}... Available!`);
    console.log(`Initial visit count is: ${visitCount}`);
});

// --- Graceful Shutdown Logic (Unchanged) ---
const gracefulShutdown = async () => {
    console.log('\nReceived shutdown signal. Saving final visit count...');
    await saveVisitCount();
    console.log(`Final visit count saved: ${visitCount}. Exiting.`);
    process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
