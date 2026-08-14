// TEST STRUCTURE & INFORMATION
const testData = {
    "COMSATS": {
        options: [
            { id: "nat-ie", name: "Pre-Engineering: NAT-IE" },
            { id: "nat-im", name: "Pre-Medical: NAT-IM" },
            { id: "nat-ics", name: "Computer Science / ICS: NAT-ICS" },
            { id: "nat-igs", name: "General Science: NAT-IGS" },
            { id: "nat-ia", name: "Arts / Humanities: NAT-IA" },
            { id: "nat-icom", name: "Commerce: NAT-ICOM" }
        ],
        info: { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["English / Verbal: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Subject Portion: 30 MCQs"] }
    },
    "NTS": {
        options: [
            { id: "nat-ie", name: "Pre-Engineering: NAT-IE" },
            { id: "nat-im", name: "Pre-Medical: NAT-IM" },
            { id: "nat-ics", name: "Computer Science / ICS: NAT-ICS" },
            { id: "nat-igs", name: "General Science: NAT-IGS" },
            { id: "nat-ia", name: "Arts / Humanities: NAT-IA" },
            { id: "nat-icom", name: "Commerce: NAT-ICOM" }
        ],
        info: { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["English / Verbal: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Subject Portion: 30 MCQs"] }
    },
    "PIEAS": {
        options: [
            { id: "pieas-eng", name: "Pre-Engineering" },
            { id: "pieas-med", name: "Pre-Medical" },
            { id: "pieas-ics", name: "ICS (Maths, Physics, CS)" },
            { id: "pieas-gen", name: "Science General (with Maths)" }
        ],
        infoMap: {
            "pieas-eng": { time: "180 Minutes", marks: "100 MCQs", breakdown: ["English: 10", "Maths: 30", "Physics: 30", "Chemistry: 30"] },
            "pieas-med": { time: "180 Minutes", marks: "100 MCQs", breakdown: ["English: 10", "Chemistry: 30", "Physics: 30", "Maths (SSC Level): 30"] },
            "pieas-ics": { time: "180 Minutes", marks: "100 MCQs", breakdown: ["English: 10", "Maths: 30", "Physics: 30", "Computer Science: 30"] },
            "pieas-gen": { time: "180 Minutes", marks: "100 MCQs", breakdown: ["English: 10", "Maths: 60", "Physics (SSC Level): 30"] }
        }
    },
    "AIR": {
        options: [
            { id: "air-eng", name: "Pre-Engineering" },
            { id: "air-med", name: "Pre-Medical" },
            { id: "air-ics", name: "Computer Science (ICS)" },
            { id: "air-com", name: "Commerce (I.Com)" },
            { id: "air-gen", name: "General Science" },
            { id: "air-art", name: "Arts / Humanities" }
        ],
        infoMap: {
            "air-eng": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 25%", "Physics: 10%", "Chemistry: 10%", "Maths: 10%"] },
            "air-med": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 15%", "Physics: 10%", "Chemistry: 10%", "Biology: 20%"] },
            "air-ics": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 25%", "Physics: 10%", "CS: 10%", "Maths: 10%"] },
            "air-com": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 15%", "Accounting: 14%", "Commerce: 13%", "Economics: 13%"] },
            "air-gen": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 25%", "Maths: 10%", "Statistics: 10%", "Economics: 10%"] },
            "air-art": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 15%", "Islamiat: 10%", "Pak Studies: 10%", "GK: 20%"] }
        }
    },
    "BAHRIA": {
        options: [{ id: "bah-cbt", name: "Standard CBT (Mock Format)" }],
        info: { time: "120 Minutes", marks: "100 MCQs", breakdown: ["Test details will be updated based on specific group selection."] }
    }
};

// ACTUAL MCQ QUESTION BANK
const questionBank = {
    // ---------------------------------------------------------
    // NAT-IE : PRE-ENGINEERING GROUP (90 MCQs)
    // ---------------------------------------------------------
    "nat-ie": [
        // VERBAL ABILITY (20)
        { q: "The higher you go, the more difficult it ______ to breathe.", options: ["Is becoming", "Became", "Has become", "Becomes"], ans: 3 },
        { q: "She stood ______ Ahsan, but could not utter a single word for quite some time.", options: ["About", "Before", "For", "Towards"], ans: 1 },
        { q: "The telephone ______ several times before I answered it.", options: ["Has rung", "Was ringing", "Would ring", "Had rung"], ans: 3 },
        { q: "I shall not desert him ______ all the world.", options: ["By", "For", "With", "From"], ans: 1 },
        { q: "The judge acquitted the prisoner ______ the charge of murder.", options: ["About", "From", "Of", "With"], ans: 2 },
        { q: "VERITY : CASUISTRY ::", options: ["Egalitarian : Equality", "Sweet : Mellifluous", "Constant : Capricious", "Milk : Cream"], ans: 2 },
        { q: "FOX : CUNNING ::", options: ["Dog : Playful", "Hyena : Amusing", "Beaver : Industrious", "Vixen : Cute"], ans: 2 },
        { q: "HOUSE : BIG ::", options: ["Home : Live", "School : Daily", "Water : Cold", "Clothes : Socks"], ans: 2 },
        { q: "Choose the Synonym of: ABANDON", options: ["Vacate", "Foil", "Lose", "Gain"], ans: 0 },
        { q: "Choose the Synonym of: ABDICATE", options: ["Give up", "Imperious", "Rude", "Dissent"], ans: 0 },
        { q: "Choose the Synonym of: ABHOR", options: ["Crave", "Reconcile", "Detest", "Rude"], ans: 2 },
        { q: "Choose the Synonym of: FRIVOLOUS", options: ["Serious", "Trivial", "Peculiar", "Candid"], ans: 1 },
        { q: "Choose the Synonym of: FRUGAL", options: ["Prolific", "Efficacious", "Clamour", "Thrifty"], ans: 3 },
        { q: "Choose the Synonym of: EXTENUATE", options: ["Palliate", "Quality", "Enhance", "Offhand"], ans: 0 },
        { q: "Choose the Synonym of: EPHEMERAL", o
