// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Business = require('./models/Business');
const Faction = require('./models/Faction');

// --- PASTE YOUR businessData and factionData OBJECTS HERE ---
// (Make sure they are defined correctly as constants)
const businessData = {
    'psemo_diner': {
        slug: 'psemo_diner',
        name: 'Psemo Diner',
        description: 'Your classic Torn City diner experience. Serving questionable burgers and lukewarm coffee since... well, a while now. Great place for low-level revives. <strong>Watch out for rats!</strong>',
        owner: 'Psemo',
        employees: 15,
        specialty: 'Questionable Food & Quick Revives',
        news: [
            { date: '2024-07-28', content: 'Special offer: Buy one stale burger, get a lukewarm coffee free!' },
            { date: '2024-07-25', content: 'Health inspector visit narrowly avoided. Business as usual.' },
            { date: '2024-07-20', content: 'Rat problem slightly less problematic this week.' },
            { date: '2024-07-15', content: 'New shipment of "mystery meat" arrived.' },
            { date: '2024-07-10', content: 'Waitress Mildred won the weekly "least grumpy employee" award.' },
            { date: '2024-07-05', content: 'Coffee machine made a weird noise, but seems fine now.' },
            { date: '2024-07-01', content: 'Psemo considering adding a salad to the menu. Maybe.' }
        ]
    },
    'hard_security': {
        slug: 'hard_security',
        name: 'Hard Security',
        description: 'Offering top-tier (or at least, we try) security services. Need protection? Need something... acquired? Maybe we can help. Discretion guaranteed (usually). Employees get free body armor (slightly used).',
        owner: 'Mr. Hard',
        employees: 50,
        specialty: 'Bodyguards & Asset "Retrieval"',
        news: [
            { date: '2024-07-29', content: 'Successfully retrieved a stolen pink scooter. Client satisfied.' },
            { date: '2024-07-26', content: 'Recruiting new guards. Must tolerate low pay and high risk.' },
            { date: '2024-07-22', content: 'Body armor cleaning day. Results mixed.' },
            { date: '2024-07-18', content: 'Employee training session on "looking intimidating" held.' },
            { date: '2024-07-14', content: 'Negotiating bulk discount on tasers.' },
            { date: '2024-07-10', content: 'Lost a client\'s chihuahua during a protection detail. Oops.' },
            { date: '2024-07-06', content: 'Mr. Hard considering adding "Event Security" for children\'s parties.' }
        ]
    },
    'shady_loans': {
        slug: 'shady_loans',
        name: 'Shady Sam\'s Loans',
        description: 'Need cash fast? Don\'t ask questions, and neither will we. Interest rates are... flexible. Late payments have consequences involving kneecaps.',
        owner: 'Shady Sam',
        employees: 5,
        specialty: 'High-Interest Loans & Aggressive Collection',
        news: [
            { date: '2024-07-30', content: 'New client acquired. Payment schedule looks promisingly difficult.' },
            { date: '2024-07-28', content: 'Successful collection made. Client now walks with a slight limp.' },
            { date: '2024-07-25', content: 'Employee "Knuckles" promoted to Senior Collections Agent.' },
            { date: '2024-07-21', content: 'Reminder: Interest rates double after the first missed payment.' },
            { date: '2024-07-17', content: 'Considering expanding into payday loans for preschoolers. Market research ongoing.' },
            { date: '2024-07-13', content: 'Office baseball bat polished and ready for use.' },
            { date: '2024-07-09', content: 'Sam is offering a "refer-a-friend" discount (on interest, not kneecap damage).' }
        ]
    },
    'generic_guns': {
        slug: 'generic_guns',
        name: 'Generic Gun Shop',
        description: 'We sell things that go bang. No frills, no fancy names, just reasonably reliable firepower. Background checks optional (very optional).',
        owner: 'Gary Gunn',
        employees: 8,
        specialty: 'Firearms & Ammunition',
        news: [
            { date: '2024-07-29', content: 'New shipment of slightly-used shotguns arrived.' },
            { date: '2024-07-27', content: 'Running a special: Buy 100 bullets, get 5 slightly dented ones free.' },
            { date: '2024-07-24', content: 'Target practice dummy replaced after "incident".' },
            { date: '2024-07-20', content: 'Customer complaint about a jamming pistol resolved with a bigger hammer.' },
            { date: '2024-07-16', content: 'Stocking up on untraceable handguns for the weekend rush.' },
            { date: '2024-07-12', content: 'Gary considering adding crossbows. Seems exotic.' },
            { date: '2024-07-08', content: 'Reminder: All sales are final. Especially the illegal ones.' },
            { date: '2024-07-04', content: 'Celebrated independence day with excessive discharge of firearms. Police mildly annoyed.' }
        ]
    },
    'sleazy_motel': {
        slug: 'sleazy_motel',
        name: 'The Sleazy Inn Motel',
        description: 'Hourly rates available. Questionable stains included free of charge. Don\'t use the blacklight. Perfect for illicit meetings or a quick nap.',
        owner: 'Mama Mildred',
        employees: 3,
        specialty: 'Discreet Room Rentals (No Questions Asked)',
        news: [
            { date: '2024-07-30', content: 'Room 7 cleaned. Mostly.' },
            { date: '2024-07-28', content: 'Installed new vibrating bed in the honeymoon suite. Used parts.' },
            { date: '2024-07-25', content: 'Police asked questions about a guest. We remembered nothing.' },
            { date: '2024-07-22', content: 'Found a suspicious package under a bed. Added it to lost and found.' },
            { date: '2024-07-19', content: 'Running low on tiny soaps.' },
            { date: '2024-07-15', content: 'Cockroach races held in the lobby. Exciting finish.' },
            { date: '2024-07-11', content: 'Mildred considering adding complimentary bedbugs.' }
        ]
    },
    'chop_shop_charlie': {
        slug: 'chop_shop_charlie',
        name: 'Chop Shop Charlie\'s',
        description: 'Got a car you don\'t want anymore? Or maybe parts from a car someone *else* doesn\'t want anymore? We\'re your guys. Quick turnaround, no paperwork.',
        owner: 'Charlie "The Wrench" Johnson',
        employees: 12,
        specialty: 'Automotive Disassembly & Parts Resale',
        news: [
            { date: '2024-07-29', content: 'Successfully processed three sedans and a minivan overnight.' },
            { date: '2024-07-26', content: 'Looking for a specific rare hubcap. Offering finder\'s fee.' },
            { date: '2024-07-23', content: 'Employee injured by falling engine block. Back to work tomorrow.' },
            { date: '2024-07-19', content: 'Received bulk order for slightly scratched car doors.' },
            { date: '2024-07-15', content: 'Police drove by slowly. We waved.' },
            { date: '2024-07-11', content: 'Testing new plasma cutter on stubborn locks.' },
            { date: '2024-07-07', content: 'Charlie thinking about branching into motorcycle parts.' },
            { date: '2024-07-03', content: 'Monthly inventory check: Still too many license plates.' }
        ]
    },
    'dirty_docs': {
        slug: 'dirty_docs',
        name: 'Dirty Doc\'s Back Alley Clinic',
        description: 'Got shot? Stabbed? Need a discreet medical procedure? Come on down. Anesthesia is extra, sterility not guaranteed. Payment upfront.',
        owner: 'Doc Filthy',
        employees: 4,
        specialty: 'Patch-ups & Unlicensed Surgery',
        news: [
            { date: '2024-07-30', content: 'Successfully removed bullet from client. Client survived. Mostly.' },
            { date: '2024-07-27', content: 'Ran out of clean bandages. Using bar towels.' },
            { date: '2024-07-24', content: 'New shipment of expired painkillers arrived.' },
            { date: '2024-07-21', content: 'Assistant Igor learning stitches. Progress is slow.' },
            { date: '2024-07-18', content: 'Looking for organ donors. No questions asked.' },
            { date: '2024-07-14', content: 'Doc Filthy attended online seminar: "Appendectomy with Rusty Tools".' },
            { date: '2024-07-10', content: 'Special offer: 10% off tattoo removals (scarring likely).' }
        ]
    },
    'pawn_palace': {
        slug: 'pawn_palace',
        name: 'Palace o\' Pawning',
        description: 'Your unwanted junk is our treasure (for a very low price). Need quick cash for that maybe-stolen watch? Come see us. Everything\'s for sale!',
        owner: 'Reginald \'Reg\' Prawn',
        employees: 6,
        specialty: 'Buying Low, Selling Slightly Higher',
        news: [
            { date: '2024-07-29', content: 'Acquired slightly singed toaster oven. Asking top dollar.' },
            { date: '2024-07-26', content: 'Customer tried to pawn a live raccoon. Offer declined.' },
            { date: '2024-07-23', content: 'Authenticating a "genuine" diamond ring with a hammer.' },
            { date: '2024-07-20', content: 'Weekly special: Half-price on all chipped porcelain figurines.' },
            { date: '2024-07-17', content: 'Someone tried to sell us the shop\'s own sign. Bold move.' },
            { date: '2024-07-13', content: 'Polishing silverware of dubious origin.' },
            { date: '2024-07-09', content: 'Reg considering adding a "No questions asked, but seriously, where did you get this?" section.' },
            { date: '2024-07-05', content: 'Security camera footage reviewed. Mostly just Reg napping.' }
        ]
    },
    'fixit_felix': {
        slug: 'fixit_felix',
        name: 'Fix-It Felix\'s Tech & Repair',
        description: 'Broken phone? Fried laptop? Virus-riddled PC? Felix can probably fix it. Or make it worse. 50/50 chance. Warranty void if you look nervous.',
        owner: 'Felix "Fingers" McGee',
        employees: 2,
        specialty: 'Dubious Electronics Repair',
        news: [
            { date: '2024-07-30', content: 'Successfully installed spyware on a client\'s "repaired" laptop. Bonus service!' },
            { date: '2024-07-28', content: 'Replaced cracked screen with one from a different, equally broken phone.' },
            { date: '2024-07-25', content: 'Source code for "minor bug fixes" mostly involves pop-up ads now.' },
            { date: '2024-07-22', content: 'Soldering iron started small fire. Extinguished with coffee.' },
            { date: '2024-07-19', content: 'Felix watched a 5-minute tutorial on quantum computing. Now offering "Quantum Tune-Ups".' },
            { date: '2024-07-16', content: 'Received a shipment of suspiciously cheap RAM sticks.' },
            { date: '2024-07-12', content: 'Customer complained data was wiped. Felix explained it\'s "more secure" now.' }
        ]
    },
    'lucky_leprechaun_casino': {
        slug: 'lucky_leprechaun_casino',
        name: 'Lucky Leprechaun Casino',
        description: 'Come test your luck! Our slots are definitely not rigged (wink). Enjoy watered-down drinks and the crushing despair of gambling addiction. Free stale peanuts!',
        owner: 'Paddy O\'Malley',
        employees: 45,
        specialty: 'Games of Chance & Wallet Emptying',
        news: [
            { date: '2024-07-29', content: 'Whale lost big at the poker table. House always wins.' },
            { date: '2024-07-27', content: 'Slot machine #7 paid out! Technician called immediately.' },
            { date: '2024-07-24', content: 'New cocktail introduced: "The Debt Spiral". Tastes like regret.' },
            { date: '2024-07-21', content: 'Security ejected unruly patron. Standard procedure.' },
            { date: '2024-07-18', content: 'Installed brighter, more disorienting carpet.' },
            { date: '2024-07-15', content: 'Running low on free stale peanuts.' },
            { date: '2024-07-12', content: 'Paddy considering adding a "Cry Room" for losing patrons.' },
            { date: '2024-07-08', content: 'Dealer training: Perfecting the "sympathetic yet smug" look.' },
            { date: '2024-07-04', content: 'Card counting suspected. Security enhancing surveillance (staring harder).' }
        ]
    },
    'toxic_waste_disposal': {
        slug: 'toxic_waste_disposal',
        name: 'Totally Legit Waste Disposal',
        description: 'Got glowing green barrels? Need to make something disappear? We handle it. Environmentally friendly? Not our primary concern. Just don\'t drink the tap water nearby.',
        owner: 'Barry "Biohazard" Jones',
        employees: 25,
        specialty: 'Hazardous Material Handling (No Questions)',
        news: [
            { date: '2024-07-30', content: 'Successful disposal of... something... in the river. Fish seem fine. Ish.' },
            { date: '2024-07-28', content: 'Employee reported minor skin mutations. Issued slightly thicker gloves.' },
            { date: '2024-07-25', content: 'Received contract for disposing of failed lab experiments.' },
            { date: '2024-07-22', content: 'Truck #3 sprang a leak. Covered it with duct tape.' },
            { date: '2024-07-19', content: 'EPA asking questions again. Sent them a fruit basket (contents undisclosed).' },
            { date: '2024-07-16', content: 'Looking for volunteers for "experimental disposal techniques".' },
            { date: '2024-07-13', content: 'Barry developing new slogan: "If it glows, it goes!"' },
            { date: '2024-07-10', content: 'Local wildlife near disposal site exhibiting unusual aggression.' }
        ]
    },
    'sweatshop_central': {
        slug: 'sweatshop_central',
        name: 'Sweatshop Central',
        description: 'Need cheap clothing, fast? We employ... dedicated workers... to produce garments around the clock. Conditions are suboptimal, but the prices can\'t be beat!',
        owner: 'Mr. Stitch',
        employees: 150,
        specialty: 'Low-Cost Garment Manufacturing',
        news: [
            { date: '2024-07-29', content: 'Met urgent order deadline for "Genuine Fake" designer handbags.' },
            { date: '2024-07-27', content: 'Fire safety inspection passed (inspector was bribed).' },
            { date: '2024-07-24', content: 'Installed brighter bulbs to keep workers awake longer.' },
            { date: '2024-07-21', content: 'Employee complaints about 20-hour shifts noted.' },
            { date: '2024-07-18', content: 'Slightly reduced ventilation to save on energy costs.' },
            { date: '2024-07-15', content: 'Received large order for scratchy wool sweaters in July.' },
            { date: '2024-07-12', content: 'Mr. Stitch considering implementing mandatory singing.' },
            { date: '2024-07-09', content: 'Quality control check found only 60% of buttons missing.' },
            { date: '2024-07-06', content: 'Bonus system introduced: Extra gruel for exceeding quota.' }
        ]
    },
    'fight_club_gym': {
        slug: 'fight_club_gym',
        name: 'Basement Bruisers Gym',
        description: 'First rule: You pay your membership fee. Second rule: You PAY your membership fee. Standard gym equipment, plus a dusty, blood-stained ring in the back. Grunting encouraged.',
        owner: 'Bruiser Bill',
        employees: 7,
        specialty: 'Fitness & Unsanctioned Brawling',
        news: [
            { date: '2024-07-30', content: 'Successful "Fight Night" held. Several teeth lost.' },
            { date: '2024-07-28', content: 'Weight bench repaired with hope and rusty bolts.' },
            { date: '2024-07-25', content: 'New member joined. Looks promisingly punchable.' },
            { date: '2024-07-22', content: 'Ran out of disinfectant for the mats again.' },
            { date: '2024-07-19', content: 'Bruiser Bill demonstrated his "one-inch punch" on a cinder block. Block remains intact.' },
            { date: '2024-07-16', content: 'Selling slightly used mouthguards at reception.' },
            { date: '2024-07-13', content: 'Considering adding a "protein shake" made of raw eggs and mystery powder.' }
        ]
    },
    'info_broker_inc': {
        slug: 'info_broker_inc',
        name: 'Whispers Inc.',
        description: 'Knowledge is power. We trade in secrets, rumors, and inconvenient truths. Need dirt on someone? Want to know who\'s planning what? Our price is steep, but our information is... usually accurate.',
        owner: 'The Listener',
        employees: 10,
        specialty: 'Information Brokerage & Espionage',
        news: [
            { date: '2024-07-29', content: 'Acquired sensitive data regarding a rival faction\'s finances.' },
            { date: '2024-07-27', content: 'Sold blackmail material to anonymous client. Transaction smooth.' },
            { date: '2024-07-24', content: 'Analyst team deciphering coded messages intercepted yesterday.' },
            { date: '2024-07-21', content: 'Disinformation campaign successfully launched.' },
            { date: '2024-07-18', content: 'Source "Mockingbird" provided valuable intel on upcoming police raid.' },
            { date: '2024-07-15', content: 'Upgraded server security after minor breach attempt.' },
            { date: '2024-07-12', content: 'The Listener considering offering discounts for bulk secret purchases.' },
            { date: '2024-07-09', content: 'Fact-checking department currently consists of flipping a coin.' },
            { date: '2024-07-05', content: 'Recruiting agents skilled in lip-reading and lock-picking.' }
        ]
    },
    'pirate_radio_shack': {
        slug: 'pirate_radio_shack',
        name: 'Static Shack Radio',
        description: 'Broadcasting truth, conspiracies, and terrible music across Torn\'s airwaves. Signal strength varies. Listen at your own risk. Sponsored by insomnia and paranoia.',
        owner: 'DJ Static',
        employees: 1,
        specialty: 'Illegal Broadcasting & Conspiracy Theories',
        news: [
            { date: '2024-07-30', content: 'Broadcast interrupted by strange clicking noises. Probably government surveillance.' },
            { date: '2024-07-28', content: 'Played the same song on loop for 6 hours. Artistic statement.' },
            { date: '2024-07-25', content: 'Exposed the truth about chemtrails being used to control squirrels.' },
            { date: '2024-07-22', content: 'Transmitter power boosted using car battery and hope.' },
            { date: '2024-07-19', content: 'Received anonymous tip about lizard people in the sewers. Investigating.' },
            { date: '2024-07-16', content: 'DJ Static forgot where he parked the broadcast van. Again.' },
            { date: '2024-07-13', content: 'Technical difficulties blamed on solar flares / rival stations / gremlins.' },
            { date: '2024-07-10', content: 'Launched new segment: "Is Your Neighbor a Synth?"' }
        ]
    },
    'fake_id_forge': {
        slug: 'fake_id_forge',
        name: 'Identity Solutions',
        description: 'Need to be someone else? We provide high-quality (looking) IDs, passports, and other documents. Perfect for underage drinking, skipping town, or infiltrating secure facilities. Plausible deniability included.',
        owner: 'Mr. Nobody',
        employees: 9,
        specialty: 'Forgery & Identity Creation',
        news: [
            { date: '2024-07-29', content: 'Perfected the hologram on the new driver\'s license template.' },
            { date: '2024-07-27', content: 'Rush order completed for a client needing to "urgently leave the country".' },
            { date: '2024-07-24', content: 'Laminating machine jammed. Resolved with percussive maintenance.' },
            { date: '2024-07-21', content: 'Received suspiciously large order for identical-looking passports.' },
            { date: '2024-07-18', content: 'Experimenting with bio-signatures using borrowed hair samples.' },
            { date: '2024-07-15', content: 'Employee training: How to misspell names convincingly.' },
            { date: '2024-07-12', content: 'Mr. Nobody considering witness protection program packages.' },
            { date: '2024-07-09', content: 'Ran out of official-looking paper stock. Using high-quality napkins.' }
        ]
    },
    // --- End of New Businesses ---
};

const factionData = {
    'madhouse': {
        slug: 'madhouse',
        name: 'Madhouse',
        description: 'Chaos and unpredictability are our specialties. We focus on coordinated attacks and having a slightly unhinged good time. Perks include frequent territory wars and questionable sanity checks.',
        leader: 'The Warden',
        members: 100,
        focus: 'Aggression & Territory Warfare',
        perks: ['+10% dexterity', '+5 nerve', 'Free therapy sessions (results may vary)'],
        news: [
            { date: '2024-07-30', content: 'Declared war on logic itself. Going well so far.' },
            { date: '2024-07-27', content: 'Successful chain resulted in mass confusion and moderate respect gain.' },
            { date: '2024-07-22', content: 'Annual "Most Chaotic Member" award ceremony postponed due to chaos.' },
            { date: '2024-07-18', content: 'Attempted to coordinate attack using only interpretive dance. Mixed results.' },
            { date: '2024-07-15', content: 'The Warden issued new directive: "Paint everything purple!"' },
            { date: '2024-07-11', content: 'Therapy session involved group screaming. Cathartic.' },
            { date: '2024-07-07', content: 'Lost territory due to members getting distracted by shiny objects.' }
        ]
    },
    'fearless': {
        slug: 'fearless',
        name: 'Fearless',
        description: 'Steadfast and resolute, Fearless values loyalty and strength. We aim for consistent growth in respect and territory control. Join us if you seek a stable and powerful faction environment.',
        leader: 'Ironheart',
        members: 120,
        focus: 'Respect Gain & Stability',
        perks: ['+15% strength', '+10 travel items', 'Reduced education time'],
        news: [
            { date: '2024-07-28', content: 'Reached new respect milestone. Celebrations were orderly.' },
            { date: '2024-07-24', content: 'New training program implemented for recruits.' },
            { date: '2024-07-19', content: 'Successfully defended territory against minor incursion.' },
            { date: '2024-07-15', content: 'Member orientation focused on discipline and following orders.' },
            { date: '2024-07-10', content: 'Ironheart delivered motivational speech on the importance of spreadsheets.' },
            { date: '2024-07-05', content: 'Faction upgrades researched and implemented ahead of schedule.' }
        ]
    },
    'shadow_syndicate': {
        slug: 'shadow_syndicate',
        name: 'Shadow Syndicate',
        description: 'Operating from the darkness, we specialize in espionage, infiltration, and silent takedowns. If you didn\'t see us coming, we did our job right.',
        leader: 'Nyx',
        members: 85,
        focus: 'Stealth, Crime & Espionage',
        perks: ['+15% speed', '+5% crime success', 'Access to exclusive lockpicks'],
        news: [
            { date: '2024-07-30', content: 'Successfully infiltrated rival faction\'s communication channels.' },
            { date: '2024-07-27', content: 'New recruits undergoing rigorous stealth training.' },
            { date: '2024-07-23', content: 'Acquired sensitive documents through "covert borrowing".' },
            { date: '2024-07-20', content: 'Faction meeting held in complete darkness. Efficient.' },
            { date: '2024-07-16', content: 'Nyx reminds members: "Leave no trace, except for fear."' },
            { date: '2024-07-12', content: 'Organized Crime success rate remains high.' },
            { date: '2024-07-08', content: 'Upgraded faction safehouse security systems.' }
        ]
    },
    'iron_guard': {
        slug: 'iron_guard',
        name: 'The Iron Guard',
        description: 'Defense is our watchword. We hold our ground, protect our members, and make any aggressor pay dearly for their mistake. Unyielding and unbreakable.',
        leader: 'Commander Stone',
        members: 110,
        focus: 'Defense & Territory Holding',
        perks: ['+20% defense', 'Reduced hospital times', 'Increased wall capacity'],
        news: [
            { date: '2024-07-29', content: 'Successfully repelled multiple simultaneous attacks on our territory.' },
            { date: '2024-07-26', content: 'Defensive drills conducted. Results satisfactory.' },
            { date: '2024-07-22', content: 'Reinforced key territory walls.' },
            { date: '2024-07-18', content: 'Commander Stone emphasized importance of tactical retreats (never!).' },
            { date: '2024-07-14', content: 'Medical supplies restocked for expected skirmishes.' },
            { date: '2024-07-10', content: 'Faction-wide armor inspection completed.' },
            { date: '2024-07-06', content: 'New motto adopted: "They Shall Not Pass (Our Walls)!"' }
        ]
    },
    'crimson_carnage': {
        slug: 'crimson_carnage',
        name: 'Crimson Carnage',
        description: 'Blood, respect, and victory. We thrive on conflict and dominate through sheer force. If it bleeds, we can kill it. And take its stuff.',
        leader: 'Warlord Gore',
        members: 95,
        focus: 'Aggression, Chaining & Mugging',
        perks: ['+10% strength', '+10% speed', 'Increased mugging rewards'],
        news: [
            { date: '2024-07-30', content: '1000-chain completed! Blood flowed freely.' },
            { date: '2024-07-27', content: 'Declared war on three factions simultaneously. For fun.' },
            { date: '2024-07-24', content: 'Warlord Gore pleased with recent mugging statistics.' },
            { date: '2024-07-20', content: 'Training focused on maximizing critical hit chance.' },
            { date: '2024-07-16', content: 'Stockpiling blood bags... for reasons.' },
            { date: '2024-07-11', content: 'Enemy faction attempted raid. They are now hospitalized.' },
            { date: '2024-07-07', content: 'Debating official faction color. Leaning towards "blood red".' },
            { date: '2024-07-03', content: 'Carnage Cup initiation ritual scheduled for new recruits.' }
        ]
    },
    'scholars_circle': {
        slug: 'scholars_circle',
        name: 'Scholars Circle',
        description: 'Knowledge is the ultimate weapon. We focus on education, intelligence, and strategic planning. Brains over brawn, always.',
        leader: 'The Professor',
        members: 70,
        focus: 'Education, Intelligence & Strategy',
        perks: ['-15% education time', '+10% intelligence gains', 'Access to faction library (digital)'],
        news: [
            { date: '2024-07-28', content: 'Several members completed advanced degrees simultaneously.' },
            { date: '2024-07-25', content: 'Strategic analysis of rival factions completed.' },
            { date: '2024-07-21', content: 'Debate club meeting ended in surprisingly heated argument over Torn history.' },
            { date: '2024-07-17', content: 'Faction funds allocated to purchasing educational materials.' },
            { date: '2024-07-13', content: 'The Professor gave lecture on game theory applications in warfare.' },
            { date: '2024-07-09', content: 'Implementing new system for optimizing study schedules.' },
            { date: '2024-07-05', content: 'Rumored to be developing new, highly effective battle strategies.' }
        ]
    },
    'merchant_guild': {
        slug: 'merchant_guild',
        name: 'The Merchant Guild',
        description: 'Profit above all else. We control markets, facilitate trade, and always look for the best deal. Join us and watch your net worth soar.',
        leader: 'Goldfinger',
        members: 130,
        focus: 'Trading, Economics & Market Manipulation',
        perks: ['+15 travel capacity', '-10% item market fees', 'Access to private trade forum'],
        news: [
            { date: '2024-07-29', content: 'Successfully cornered the market on plushies.' },
            { date: '2024-07-26', content: 'Bulk shipment of exotic flowers arrived for resale.' },
            { date: '2024-07-23', content: 'Negotiated favorable trade route access.' },
            { date: '2024-07-19', content: 'Goldfinger hosted seminar on "Maximizing ROI through Pointless Travel".' },
            { date: '2024-07-15', content: 'Faction vault overflowing with profits.' },
            { date: '2024-07-11', content: 'Monitoring stock market fluctuations for opportunities.' },
            { date: '2024-07-07', content: 'Offering loans to members (at competitive interest rates, of course).' }
        ]
    },
    'nomads': {
        slug: 'nomads',
        name: 'The Nomads',
        description: 'We owe allegiance to no territory, only to the journey. Masters of travel, exploration, and finding opportunities wherever we roam.',
        leader: 'Pathfinder',
        members: 60,
        focus: 'Travel, Exploration & Scavenging',
        perks: ['-25% travel costs', '+15 travel capacity', 'Increased chance of finding items abroad'],
        news: [
            { date: '2024-07-30', content: 'Majority of faction members currently abroad.' },
            { date: '2024-07-27', content: 'Discovered rare item cache in South Africa.' },
            { date: '2024-07-24', content: 'Pathfinder currently mapping unknown corners of Torn City.' },
            { date: '2024-07-20', content: 'Faction chat primarily consists of sharing travel tips and airport codes.' },
            { date: '2024-07-16', content: 'Organizing group expedition to Switzerland for... reasons.' },
            { date: '2024-07-12', content: 'Successfully avoided customs checks in multiple countries.' },
            { date: '2024-07-08', content: 'Considering establishing temporary base camp... somewhere.' }
        ]
    },
    'vipers_nest': {
        slug: 'vipers_nest',
        name: 'Viper\'s Nest',
        description: 'Swift, silent, and deadly. We specialize in poisons, toxins, and subtle ways to neutralize our enemies. Handle with care.',
        leader: 'Serpentia',
        members: 75,
        focus: 'Stealth, Debuffs & Special Tactics',
        perks: ['Increased poison effectiveness', 'Access to rare toxins', '+5 nerve'],
        news: [
            { date: '2024-07-29', content: 'Successfully deployed experimental neurotoxin during territory skirmish.' },
            { date: '2024-07-26', content: 'New batch of potent venom synthesized.' },
            { date: '2024-07-23', content: 'Training session on applying contact poisons without self-contamination.' },
            { date: '2024-07-19', content: 'Rival faction leader suffering mysterious illness. Coincidence?' },
            { date: '2024-07-15', content: 'Serpentia researching ancient assassination techniques.' },
            { date: '2024-07-11', content: 'Looking for volunteers for antidote testing.' },
            { date: '2024-07-07', content: 'Faction motto: "A single drop is all it takes."' }
        ]
    },
    'phoenix_rising': {
        slug: 'phoenix_rising',
        name: 'Phoenix Rising',
        description: 'Beaten down? Hospitalized? We rise from the ashes stronger than before. Specializing in revives, medical support, and surprising resilience.',
        leader: 'Elara the Healer',
        members: 90,
        focus: 'Reviving, Support & Endurance',
        perks: ['-25% revive costs', '+10% life regeneration', 'Increased medical item effectiveness'],
        news: [
            { date: '2024-07-30', content: 'Performed record number of revives during city-wide conflict.' },
            { date: '2024-07-27', content: 'Medical cooldown reduction research showing promising results.' },
            { date: '2024-07-24', content: 'Stockpiled morphine and first aid kits.' },
            { date: '2024-07-20', content: 'Elara teaching advanced battlefield triage techniques.' },
            { date: '2024-07-16', content: 'Assisted allied faction by keeping their members out of hospital.' },
            { date: '2024-07-12', content: 'Developing new strategies to counter enemy medical capabilities.' },
            { date: '2024-07-08', content: 'Motto revised: "Down but never out!"' }
        ]
    },
    'silent_fury': {
        slug: 'silent_fury',
        name: 'Silent Fury',
        description: 'Calm on the surface, ferocious beneath. We build our strength quietly, striking with unexpected force when provoked. Masters of the long game.',
        leader: 'Wraith',
        members: 105,
        focus: 'Training, Defense & Counter-Attacks',
        perks: ['+10% all battle stats', 'Reduced enemy escape chance', 'Increased gym gains'],
        news: [
            { date: '2024-07-29', content: 'Faction-wide stat gains reached new peak.' },
            { date: '2024-07-26', content: 'Successfully baited and trapped aggressive rival faction.' },
            { date: '2024-07-22', content: 'Wraith emphasized patience and strategic waiting in faction address.' },
            { date: '2024-07-18', content: 'Analyzing attack logs to identify weaknesses.' },
            { date: '2024-07-14', content: 'Long-term training regimens yielding significant results.' },
            { date: '2024-07-10', content: 'Maintaining low profile while building resources.' },
            { date: '2024-07-06', content: 'Practice makes perfect: perfecting ambush techniques.' }
        ]
    },
    'anarchy_crew': {
        slug: 'anarchy_crew',
        name: 'Anarchy Crew',
        description: 'No masters, no rules, just chaos and opportunity. We do what we want, when we want. Ideal for independent spirits who hate authority.',
        leader: 'Jax (allegedly)',
        members: 55,
        focus: 'Crimes, Disruption & Unpredictability',
        perks: ['+10 nerve', '+5% crime success', 'Occasional random faction-wide cash bonus'],
        news: [
            { date: '2024-07-30', content: 'Coordinated series of minor arsons across the city.' },
            { date: '2024-07-27', content: 'Faction leadership changed hands three times this week. Maybe.' },
            { date: '2024-07-24', content: 'Attempted Organized Crime failed due to "creative differences".' },
            { date: '2024-07-20', content: 'Jax (or whoever is leader) declared today "Opposite Day".' },
            { date: '2024-07-16', content: 'Members encouraged to "follow their bliss", resulting in several arrests.' },
            { date: '2024-07-12', content: 'Faction chat descended into incomprehensible memes.' },
            { date: '2024-07-08', content: 'Successfully disrupted rival faction meeting with stink bombs.' }
        ]
    },
    'valhalla_bound': {
        slug: 'valhalla_bound',
        name: 'Valhalla Bound',
        description: 'For glory! We seek honorable combat and a worthy end. Fearless in battle, we charge headfirst into the fray, hoping to earn our place among legends.',
        leader: 'Skald the Berserker',
        members: 88,
        focus: 'Aggression, Chaining & High-Risk Combat',
        perks: ['+10% strength', '+10% speed', 'Increased rewards from group attacks'],
        news: [
            { date: '2024-07-29', content: 'Launched glorious assault against much larger faction. Results: mixed, but honorable!' },
            { date: '2024-07-26', content: 'Skald led rousing pre-battle chant involving axes and questionable lyrics.' },
            { date: '2024-07-23', content: 'Several members achieved personal bests in hospitalization counts.' },
            { date: '2024-07-19', content: 'Training focused on intimidating battle cries.' },
            { date: '2024-07-15', content: 'Debating whether dying in a pointless duel still counts for Valhalla.' },
            { date: '2024-07-11', content: 'Weapon maintenance: polishing axes and sharpening beards.' },
            { date: '2024-07-07', content: 'Feasting hall reserves running low on mead.' }
        ]
    },
    'techno_terror': {
        slug: 'techno_terror',
        name: 'Techno Terror',
        description: 'Harnessing the power of the digital age for nefarious purposes. Hacking, cyber warfare, and digital disruption are our tools. Resistance is futile (and will be DDoS\'d).',
        leader: 'ByteMeister',
        members: 65,
        focus: 'Hacking, Intelligence & Cyber Warfare',
        perks: ['Increased hacking success', 'Access to custom viruses', 'Reduced computer crime jail time'],
        news: [
            { date: '2024-07-29', content: 'Successfully crashed rival faction\'s recruitment website.' },
            { date: '2024-07-27', content: 'Developed new ransomware variant. Testing soon.' },
            { date: '2024-07-23', content: 'Gained unauthorized access to city bank database (briefly).' },
            { date: '2024-07-19', content: 'ByteMeister conducting seminar on SQL injection techniques.' },
            { date: '2024-07-15', content: 'Defended against script kiddie attack with superior code.' },
            { date: '2024-07-11', content: 'Looking for beta testers for new spyware.' },
            { date: '2024-07-07', content: 'Faction communication now exclusively via encrypted channels.' }
        ]
    },
    'holy_rollers': {
        slug: 'holy_rollers',
        name: 'The Holy Rollers',
        description: 'Spreading the good word... with baseball bats. We believe in redemption through force. Confess your sins, or we\'ll beat them out of you. Tithing mandatory.',
        leader: 'Father Pain',
        members: 77,
        focus: 'Aggression, Protection Rackets & "Moral Guidance"',
        perks: ['+10% defense', '+5 nerve', 'Ability to "bless" weapons (adds spikes)'],
        news: [
            { date: '2024-07-30', content: 'Successfully "convinced" local business to contribute to the church fund.' },
            { date: '2024-07-28', content: 'Sunday service involved intense sparring sessions.' },
            { date: '2024-07-25', content: 'Father Pain delivered sermon on the righteousness of breaking kneecaps.' },
            { date: '2024-07-22', content: 'Collection plate yields high returns after aggressive "encouragement".' },
            { date: '2024-07-18', content: 'Excommunicated member for insufficient violence.' },
            { date: '2024-07-14', content: 'Blessed a batch of lead pipes.' },
            { date: '2024-07-10', content: 'Considering adding "indulgences" for sale (get out of hospital free card).' }
        ]
    },
    'laughing_stock': {
        slug: 'laughing_stock',
        name: 'Laughing Stock',
        description: 'Why so serious? We\'re here for the memes, the trolling, and the sheer absurdity of it all. Our main goal is to annoy everyone else.',
        leader: 'Chuckles',
        members: 42,
        focus: 'Trolling, Memes & General Annoyance',
        perks: ['Increased forum posting frequency', 'Ability to rickroll opponents', 'Immunity to taking things seriously'],
        news: [
            { date: '2024-07-29', content: 'Successfully derailed serious faction debate with cat pictures.' },
            { date: '2024-07-27', content: 'Released compilation of Torn\'s dumbest moments.' },
            { date: '2024-07-24', content: 'Chuckles declared war on the color beige.' },
            { date: '2024-07-21', content: 'Faction activity: Synchronized spamming of global chat.' },
            { date: '2024-07-17', content: 'Invented new, incredibly annoying catchphrase.' },
            { date: '2024-07-13', content: 'Lost a territory war because members were too busy laughing.' },
            { date: '2024-07-09', content: 'Photoshoped leader\'s face onto various farm animals. Morale boosted.' }
        ]
    },
    'spartan_academy': {
        slug: 'spartan_academy',
        name: 'Spartan Academy',
        description: 'Discipline, hardship, excellence. We forge the finest warriors through rigorous training and unwavering dedication. Only the strong survive.',
        leader: 'Leonidas II',
        members: 115,
        focus: 'Training, Strength & Dexterity',
        perks: ['+10% strength gains', '+10% dexterity gains', 'Reduced energy usage in gym'],
        news: [
            { date: '2024-07-30', content: 'Cadets completed grueling 24-hour training simulation.' },
            { date: '2024-07-28', content: 'Leonidas II inspected members\' stats. Found some wanting.' },
            { date: '2024-07-25', content: 'Implemented new "Pain Endurance" module.' },
            { date: '2024-07-22', content: 'Faction-wide physical assessment shows marked improvement.' },
            { date: '2024-07-18', content: 'Weakest members assigned extra duties (polishing shields).' },
            { date: '2024-07-14', content: 'Training motto: "Sweat saves blood."' },
            { date: '2024-07-10', content: 'Debating mandatory cold showers.' }
        ]
    },
    'wasteland_wanderers': {
        slug: 'wasteland_wanderers',
        name: 'Wasteland Wanderers',
        description: 'Surviving the concrete jungle. We excel at scavenging, adapting, and making the most of limited resources. Masters of urban survival.',
        leader: 'Scrap',
        members: 58,
        focus: 'Scavenging, Defense & Resourcefulness',
        perks: ['Increased city finds', '+10% defense', 'Ability to craft makeshift items'],
        news: [
            { date: '2024-07-30', content: 'Located hidden cache of medical supplies in abandoned building.' },
            { date: '2024-07-28', content: 'Successfully defended scavenging route from rivals.' },
            { date: '2024-07-25', content: 'Scrap demonstrated how to make armor out of road signs.' },
            { date: '2024-07-22', content: 'Trading salvaged goods for essential supplies.' },
            { date: '2024-07-18', content: 'Mapping out less-patrolled areas of the city.' },
            { date: '2024-07-14', content: 'Faction workshop busy crafting improvised weapons.' },
            { date: '2024-07-10', content: 'Resourcefulness training: Starting a fire with two bottle caps and lint.' }
        ]
    },
    'siren_song': {
        slug: 'siren_song',
        name: 'Siren Song',
        description: 'Beauty, charm, and deadly precision. We lure our enemies in with promises, then strike when they least expect it. Deception is our greatest art.',
        leader: 'Lorelei',
        members: 80,
        focus: 'Manipulation, Stealth & Seduction (Metaphorical... Mostly)',
        perks: ['Increased escape chance', 'Higher success in seduction crimes', 'Ability to charm enemies (reduce stats temporarily)'],
        news: [
            { date: '2024-07-29', content: 'Successfully charmed rival leader into revealing key information.' },
            { date: '2024-07-27', content: 'Infiltrated enemy faction disguised as new recruits.' },
            { date: '2024-07-24', content: 'Lorelei hosted workshop on persuasive communication.' },
            { date: '2024-07-21', content: 'Used faction influence to spread damaging rumors.' },
            { date: '2024-07-17', content: 'Acquired valuable assets through careful manipulation.' },
            { date: '2024-07-13', content: 'Perfecting the art of the "innocent" request.' },
            { date: '2024-07-09', content: 'Faction motto: "Listen closely to our song..."' }
        ]
    }
    // --- End of New Factions ---
};

// --- END OF PASTED DATA ---


const seedDatabase = async () => {
    await connectDB();

    try {
        // Clear existing data
        console.log('Clearing existing Business data...');
        await Business.deleteMany({});
        console.log('Clearing existing Faction data...');
        await Faction.deleteMany({});

        // Prepare data for insertion (Mongoose insertMany expects an array)
        const businessesToInsert = Object.values(businessData);
        const factionsToInsert = Object.values(factionData);

        console.log('Inserting Business data...');
        await Business.insertMany(businessesToInsert);
        console.log('Business data inserted successfully!');

        console.log('Inserting Faction data...');
        await Faction.insertMany(factionsToInsert);
        console.log('Faction data inserted successfully!');

        console.log('Database seeded!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
};

seedDatabase();
