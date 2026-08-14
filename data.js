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
        { q: "Choose the Synonym of: EPHEMERAL", options: ["Transient", "Perpetual", "Disencumber", "Demote"], ans: 0 },
        { q: "Kamal's friends had nothing to offer him other than ______ in his grief.", options: ["Solution", "Consolation", "Friendship", "Kindness"], ans: 1 },
        { q: "There is no doubt that one has to keep ______ with the changing times.", options: ["Pace", "Himself", "Aside", "Oneself"], ans: 0 },
        { q: "Belying his mother's worries, Amir's behaviour throughout the function was ______.", options: ["Imaginable", "Imperial", "Immodest", "Impeccable"], ans: 3 },
        { q: "After reaching New York, Azhar will have to ______ himself to the new surroundings.", options: ["Submit", "Adapt", "Mix", "Develop"], ans: 1 },
        { q: "Dowry is no longer permitted by law even in ______ marriage.", options: ["Natural", "Bigamous", "Love", "Conventional"], ans: 3 },

        // ANALYTICAL REASONING (20)
        { q: "A chemist is preparing a nutriment using 8 ingredients A, B, C, D, E, H, F, Z. \nConditions:\n1) If B is used, both C and Z must be used.\n2) E and H must always be used together.\n3) If C is used, at least two of A, B, F must be used.\n4) C and H cannot be used together.\n5) E, F, Z cannot all be used together.\n6) A, D, Z cannot all be used together.\n\nWhich of the following is a suitable combination of vitamins and minerals for a nutriment?", options: ["A, B, C, F", "D, E, H, Z", "A, D, E, Z", "C, D, E, F"], ans: 1 },
        { q: "Using the same nutriment conditions, which of the following cannot be included in a nutriment that contains E?", options: ["B", "D", "H", "Z"], ans: 0 },
        { q: "Using the same nutriment conditions, by the addition of exactly one more mineral, which of the following could make an acceptable combination?", options: ["A, D, Z", "B, H, E", "C, D, H", "E, H, F"], ans: 3 },
        { q: "A railway track consists of six main stations P, Q, R, X, Y, Z. Trains run only according to the following conditions:\n- From P to Q\n- From Q to P and from Q to R\n- From R to X\n- From X to Q and from X to Y\n- From Z to P, from Z to Y and from Z to R\n- From Y to X\n\nThe complete and accurate listing of the stations from which it is possible to reach R with exactly one transfer is:", options: ["P and Q", "P and X", "X and Y", "X and Z"], ans: 3 },
        { q: "Using the railway track conditions, the greatest number of stations that can be visited without visiting any station more than once, is:", options: ["4", "5", "6", "3"], ans: 1 },
        { q: "Using the railway track conditions, the trip which requires the greatest number of transfers is:", options: ["P to R", "Q to Y", "Z to R", "Z to Y"], ans: 1 },
        { q: "At IOWA University, 12 courses must be completed. At least 6 from environmental economics. At least 5 from comparative and regional, with at least 1, but no more than 3 from comparative.\nThe minimum number of regional economics courses required to fulfill the course distribution is:", options: ["1", "3", "5", "2"], ans: 3 },
        { q: "If an IOWA student has completed 6 environmental and 1 regional course, the possible groups of courses to fulfill the requirements must include at least:", options: ["One Environmental Course", "Three Regional Courses", "One Regional Course", "Two Comparative Courses"], ans: 1 },
        { q: "Six candidates Ali, Amin, Omer, Hamza, Saleem, Osama are interviewed over four days (Thu-Sun). \n- At least one each day, max two per day.\n- No more than three on any two consecutive days.\n- Ali on Saturday.\n- Amin same day with another.\n- Saleem on day before Osama.\n- Omer on day after Hamza.\nIf only one interview takes place on Thursday, which candidate could have that interview?", options: ["Ali", "Amin", "Omer", "Saleem"], ans: 3 },
        { q: "Using the interview conditions, if the director decides to take two interviews on Thursday and two on Sunday, how many candidates would be eligible to interview on Friday?", options: ["1", "2", "3", "4"], ans: 0 },
        { q: "Using the interview conditions, if Hamza and Osama have their interviews on the same day, which of the following must be true?", options: ["Hamza's interview will take place on Thursday", "Saleem's interview will take place on Friday", "Amin's interview will take place on Saturday", "Osama's interview will take place on Saturday"], ans: 0 },
        { q: "If Fatima was born in NWFP, then she is a citizen of Pakistan. This statement can be deduced from which of the following statements?", options: ["Fatima was born either in NWFP or in Punjab", "Some people born in NWFP are citizens of Pakistan", "Everyone born in Pakistan is a citizen of Pakistan", "Every citizen of Pakistan is resident either of one of the provinces or tribal areas"], ans: 2 },
        { q: "Asif has refused to work hard for the exam preparation; therefore, no more pocket money from his father should be provided to him. Which of the following is an assumption made in the argument?", options: ["Asif is a dull student", "Pocket money of his brother Rafaqat is more", "Money has no importance in Asif's life", "Asif is a greedy boy, and demands more money from his father"], ans: 3 },
        { q: "Travelling by cars is safer than travelling by planes. About 80% of plane accidents result in death of all passengers, while about 1% of car accidents result in death. Which of the following, if true, would most seriously weaken the argument?"
