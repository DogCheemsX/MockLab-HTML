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
            { id: "pieas-eng", name: "Pre-Engineering (Maths, Physics, Chemistry)" },
            { id: "pieas-ics", name: "ICS (Maths, Physics, Computer Science)" },
            { id: "pieas-med", name: "Pre-Medical Stream" },
            { id: "pieas-gen", name: "Science General Stream" }
        ],
        infoMap: {
            "pieas-eng": { time: "180 Minutes", marks: "100 Marks (No negative marking)", breakdown: ["Section (I) English: 20 MCQs (Q1-20)", "Section (II) Mathematics: 30 MCQs (Q21-50)", "Section (III) Physics: 30 MCQs (Q51-80)", "Section (IV) Chemistry: 20 MCQs (Q81-100)"] },
            "pieas-ics": { time: "180 Minutes", marks: "100 Marks (No negative marking)", breakdown: ["Section (I) English: 20 MCQs (Q1-20)", "Section (II) Mathematics: 30 MCQs (Q21-50)", "Section (III) Physics: 30 MCQs (Q51-80)", "Section (IV) Computer Science: 20 MCQs (Q81-100)"] },
            "pieas-med": { time: "180 Minutes", marks: "100 Marks (No negative marking)", breakdown: ["Section (I) English: 20 MCQs (Q1-20)", "Section (II) Biology: 30 MCQs (Q21-50)", "Section (III) Physics: 30 MCQs (Q51-80)", "Section (IV) Chemistry: 20 MCQs (Q81-100)"] },
            "pieas-gen": { time: "180 Minutes", marks: "100 Marks (No negative marking)", breakdown: ["Section (I) English: 20 MCQs (Q1-20)", "Section (II) Mathematics: 30 MCQs (Q21-50)", "Section (III) Physics: 30 MCQs (Q51-80)", "Section (IV) Statistics & Data Analysis: 20 MCQs (Q81-100)"] }
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
        { q: "Travelling by cars is safer than travelling by planes. About 80% of plane accidents result in death of all passengers, while about 1% of car accidents result in death. Which of the following, if true, would most seriously weaken the argument?", options: ["Pilots are more trained than car drivers", "Speed of car is lesser than that of planes", "The number of car accidents is several thousand times higher than the number of plane accidents", "Planes are inspected by experienced engineers before flying"], ans: 2 },
        { q: "The computer needs 50 seconds to solve one problem. Computer never takes more than 60 seconds to solve a problem.\nStatement X: Alone is sufficient but Y is not.\nStatement Y: Alone is sufficient but X is not.\nBoth TOGETHER are sufficient but NEITHER alone is.", options: ["Statement X ALONE is sufficient", "Statement Y ALONE is sufficient", "Both statements TOGETHER are sufficient", "Neither statement is sufficient"], ans: 0 },
        { q: "A horse ran 80 miles without stopping. What was its average speed in miles per hour?\nX. The journey started at 6 PM and ended at 2 AM the following day.\nY. The horse ran 20 miles per hour for the first 40 miles.", options: ["Statement X ALONE is sufficient", "Statement Y ALONE is sufficient", "Both statements TOGETHER are sufficient", "Neither statement is sufficient"], ans: 0 },
        { q: "The cost of producing mobiles in country X is ten percent less than the cost in country Y. Even after transportation fees are added, it is still cheaper for a company to import from X than to produce in Y. This supports which assertion?", options: ["The fee for transporting is more than ten percent", "Importing mobiles will eliminate ten percent of manufacturing jobs", "Labour costs in country X are ten percent below those in country Y", "The tariff on a mobile imported from country X is less than ten percent of the cost in country Y"], ans: 3 },
        { q: "If x > y and y < 0, which of the following must be true?", options: ["x is a positive number", "x is a negative number", "x - y > 0", "x + y < 0"], ans: 2 },
        { q: "All integers are real numbers. Some real numbers are rational. Therefore:", options: ["All integers are rational", "Some integers are rational", "Some rational numbers are integers", "None of the above is necessarily true"], ans: 3 },
        { q: "If A is taller than B, and B is taller than C, then:", options: ["A is taller than C", "C is taller than A", "A and C are of the same height", "Cannot be determined"], ans: 0 },

        // QUANTITATIVE REASONING (20)
        { q: "The circumference of a circle whose diameter is 6 inches is approximately:", options: ["22 inches", "19 inches", "14 inches", "38 inches"], ans: 1 },
        { q: "The ratio from 5 feet to 3 inches is:", options: ["5/3", "20", "60", "3/60"], ans: 1 },
        { q: "15% of 32 equals:", options: ["3.80", "2.50", "4.80", "4.00"], ans: 2 },
        { q: "If 3a - 5 = 3 + 2a, then a =", options: ["8", "9", "10", "12"], ans: 0 },
        { q: "The average (arithmetic mean) of 8a + 5, -3a + 9, 0 and 7a - 2 is?", options: ["3a + 1", "3a + 3", "4a + 1", "4a + 4"], ans: 1 },
        { q: "What is the percent profit made on the sale of 1,000 shares of stock bought at Rs. 10 per share and sold at Rs. 12 per share?", options: ["2%", "0.2%", "25%", "20%"], ans: 3 },
        { q: "2/3 x 12 =", options: ["4", "6", "8", "10"], ans: 2 },
        { q: "If the radius of the circle is halfed, then its area:", options: ["remains same", "become half", "become quarter", "become double"], ans: 2 },
        { q: "If 3(p + 5q) = 24, then what is the value of q, when p = 3?", options: ["1", "5", "9", "3"], ans: 0 },
        { q: "A number which is divisible by both 6 and 8 is also divisible by:", options: ["7", "5", "11", "24"], ans: 3 },
        { q: "If 3p + 2 = 12, then p - 1/3 equals:", options: ["10", "3", "10/3", "4"], ans: 1 },
        { q: "If Adil can finish a job in 5 hours and Moeed can finish the same job in 10 hours, how many minutes will it take both of them together to finish the job?", options: ["210", "220", "160", "200"], ans: 3 },
        { q: "If the area of rectangle is 12, then its perimeter is:", options: ["6", "7", "8", "Cannot be determined"], ans: 3 },
        { q: "The area of the circle is 16π. The length of the diameter of the circle is:", options: ["2", "32", "4", "8"], ans: 3 },
        { q: "What is 1/5 % of 5000?", options: ["10", "12", "16", "1000"], ans: 0 },
        { q: "If p = 2, then 3^p + (p^3)^2 =", options: ["18", "45", "42", "73"], ans: 3 },
        { q: "Successive discounts of 10% and 15% is equivalent to a single discount of:", options: ["24%", "24.5%", "23.5%", "22%"], ans: 2 },
        { q: "If 2^a * 2^b = 3^c, then (a+b)/c =", options: ["1.425", "1.585", "1.330", "0.750"], ans: 1 },
        { q: "Which of the following is closest to the square root of 1/2?", options: ["0.7", "0.6", "0.8", "0.25"], ans: 0 },
        { q: "At a dairy farm it takes 90 seconds to fill 30 one-gallon jugs of milk. How many minutes does it take to fill 90 jugs of milk?", options: ["4", "4.5", "3", "3.5"], ans: 1 },

        // PHYSICS (10)
        { q: "Silicon can be obtained from:", options: ["Lead", "Uranium", "An isotope of oxygen", "Sand"], ans: 3 },
        { q: "Light year is a unit of:", options: ["Time", "Distance", "Velocity", "Intensity of light"], ans: 1 },
        { q: "Which one is the least multiple?", options: ["Pico", "Femto", "Nano", "Atto"], ans: 3 },
        { q: "Significant figures in 0.0010 are:", options: ["Four", "Three", "Two", "One"], ans: 2 },
        { q: "The quantity having dimension of ML²T⁻² will have SI unit of:", options: ["Watt", "Newton", "Joule", "Metre"], ans: 2 },
        { q: "The direction of a vector in space is specified by:", options: ["One angle", "Two angles", "Three angles", "None of above"], ans: 1 },
        { q: "Work done by the force 3i + 2j for a distance 4i + 5j will be:", options: ["12 units", "22 units", "32 units", "42 units"], ans: 1 },
        { q: "The product of mass and velocity gives momentum of certain body. This product is called:", options: ["Dot product", "Cross product", "Simple product", "None of these"], ans: 2 },
        { q: "Torque is also called:", options: ["Momentum", "Linear inertia", "Moment of a force", "Mass"], ans: 2 },
        { q: "When brakes are applied to a fast moving car, the passengers will be thrown:", options: ["Forward", "Backward", "Downward", "None of these"], ans: 0 },

        // CHEMISTRY (10)
        { q: "The branch of science dealing with structure, composition and changes in matter and laws and principles which govern these changes is called as:", options: ["Chemistry", "Geology", "Physics", "Mechanics"], ans: 0 },
        { q: "Smallest particle of an element which may or may not have independent existence is known as:", options: ["A molecule", "An ion", "An atom", "An electron"], ans: 2 },
        { q: "Matter is defined as anything which occupies space and:", options: ["Molecules", "Mass", "Compounds", "Chemicals"], ans: 1 },
        { q: "The number of atoms present in a molecule determines its:", options: ["Molecularity", "Atomicity", "Basicity", "Acidity"], ans: 1 },
        { q: "When an electron is added to a unipositive ion we get:", options: ["Cation", "Molecule", "Neutral atom", "Anion"], ans: 2 },
        { q: "The diameter of atoms is of the order:", options: ["2 x 10^-10 m", "2 x 10^-12 m", "2 x 10^-8 m", "2 x 10^-3 m"], ans: 0 },
        { q: "Atoms and molecules can either gain or lose electrons, forming charged particles called:", options: ["Positrons", "Photons", "Ions", "Electrons"], ans: 2 },
        { q: "Metals tend to lose electrons, becoming:", options: ["Positively charged ions", "Non-metals", "Negatively charged ions", "All of above"], ans: 0 },
        { q: "Non-metals tend to gain electrons, becoming:", options: ["Metals", "Positively charged ions", "Negatively charged ions", "None of these"], ans: 2 },
        { q: "First atomic theory was put forward by an English school teacher:", options: ["Maxwell", "Newton", "Sanger", "John Dalton"], ans: 3 },

        // MATHEMATICS (10)
        { q: "0.003 x 0.02 = ?", options: ["0.06", "0.006", "0.0006", "0.00006"], ans: 3 },
        { q: "What is the average of the numbers: 0, 0, 4, 10, 5, and 5?", options: ["2", "3", "4", "5"], ans: 2 },
        { q: "What is the rate of discount if a bicycle which cost Rs.4,000 is sold for Rs.3,200?", options: ["14%", "16%", "18%", "20%"], ans: 3 },
        { q: "|-4| + |4| - 4 + 4 = ?", options: ["0", "2", "4", "8"], ans: 3 },
        { q: "What is the value of x in 3x - 15 - 6 = 0 ?", options: ["7", "8", "9", "-9"], ans: 0 },
        { q: "What is the area in cm² of the shaded region in a rectangle of 4cm by 3cm, if a non-shaded triangle spans the entire base (4cm) and height (3cm) leaving the rest shaded?", options: ["6", "7", "8", "9"], ans: 0 },
        { q: "If A completes a particular work in 8 days and B the same work in 24 days. How many days will it take if they work together?", options: ["4", "5", "6", "7"], ans: 2 },
        { q: "What comes next in the sequence: 1, 3, 11, 43, ____?", options: ["161", "171", "181", "191"], ans: 1 },
        { q: "What is the distance travelled by a car which travelled at a speed of 80km/hr for 3 hours and 30 minutes?", options: ["275km", "280km", "285km", "290km"], ans: 1 },
        { q: "In a class of 40 students 20% are girls. How many boys are there in the class?", options: ["26", "28", "30", "32"], ans: 3 }
    ],

    // ---------------------------------------------------------
    // NAT-IGS : GENERAL SCIENCE GROUP (90 MCQs)
    // ---------------------------------------------------------
    "nat-igs": [
        // VERBAL ABILITY
        { q: "There are _______ views on the issue of giving bonus to the employees.", options: ["Independent", "Divergent", "Modest", "Adverse"], ans: 1 },
        { q: "Since she had not exercised in five years, Margarita's attempt to jog five miles on her first day of cardio training was a little ______.", options: ["Pessimistic", "Irrelevant", "Quixotic", "Relieved"], ans: 2 },
        { q: "More insurers are limiting the sale of property insurance in coastal areas and other regions _______ natural disasters.", options: ["safe from", "according to", "despite", "prone to"], ans: 3 },
        { q: "Roman Regions _______ the Mountain _______ of Masada for three years before they were able to seize it.", options: ["dissembled, bastion", "assailed, symbol", "besieged, citadel", "honed, stronghold"], ans: 2 },
        { q: "Unlike his calmer, more easygoing colleagues, the senator was ________ , ready to quarrel at the slightest provocation.", options: ["whimsical", "irascible", "gregarious", "ineffectual"], ans: 1 },
        { q: "HEIGHT : MOUNTAIN", options: ["Depth : Trench", "Shade : Tree", "Weight : Age", "Speed : Highway"], ans: 0 },
        { q: "ACT : ACTION", options: ["Therapy : Thermometer", "Oblivion : Obvious", "Liturgy : Literature", "Image : Imagine"], ans: 3 },
        { q: "DISTANCE : MILE", options: ["liquid : liter", "bushel : corn", "weight : scale", "fame : television"], ans: 0 },
        { q: "Opposite of EXODUS:", options: ["Influx", "Home-coming", "Return", "Restoration"], ans: 0 },
        { q: "Opposite of DETER:", options: ["Twist", "Intimidate", "Encourage", "Straighten"], ans: 2 },
        { q: "Opposite of QUIZZICAL:", options: ["Amused", "Unequivocal", "Contorted", "Dissimilar"], ans: 1 },
        { q: "Opposite of EXPAND:", options: ["Convert", "Condense", "Congest", "Conclude"], ans: 1 },
        { q: "Similar to CANNY:", options: ["Obstinate", "Handsome", "Clever", "Stout"], ans: 2 },
        { q: "Similar to WARRIOR:", options: ["Soldier", "Sailor", "Pirate", "Spy"], ans: 0 },
        { q: "Similar to DISTANT:", options: ["Far", "Removed", "Reserved", "Separate"], ans: 0 },
        { q: "According to the passage, our observations of nova are hampered by their extreme brightness.", options: ["Loss of mass", "Speed of rotation", "Distance from Earth", "Tremendous violence"], ans: 2 },
        { q: "The production of supernova", options: ["occurs frequently", "occurs 25 times in 1 year", "occured in 1946", "occured in 1604"], ans: 3 },
        { q: "By the term 'new star' the author mean one that has:", options: ["moved from a distant galaxy", "become bright enough to strike the eye", "not previously risen above the horizon", "become visible by rotating in its orbit"], ans: 1 },
        { q: "Which from the following statement(s) true about novae and dwarf novae: I. 25 novae and super novae occur in our galaxy every year II. occur in result of smaller explosions III. only 100 of smaller explosions are known", options: ["I only", "II only", "III only", "I and II"], ans: 1 },
        { q: "When novae and dwarf novae occur,", options: ["the star survive to explode again", "the star destroys completely", "the star devides in two parts", "the star becomes a dwarf novae"], ans: 0 },
        
        // ANALYTICAL REASONING
        { q: "For the tobacco executives' argument to be logically correct, which of the following must be assumed?", options: ["Substances that are not addictive are not regulated by the Federal Drug Administration.", "The tobacco executives lied when they claimed that cigarette smoking was not addictive.", "Some addictive substances are not regulated by the Federal Drug Administration.", "There is no scientific proof that cigarette smoking is addictive."], ans: 0 },
        { q: "Which of the following is the most logical conclusion of the argument regarding accountability?", options: ["People should not be held accountable for the behavior of other people.", "People have control over their own behavior.", "People cannot control the behavior of other people.", "Behavior that cannot be controlled should not be punished."], ans: 3 },
        { q: "Which one of the following, if true, most substantially strengthens the argument about safety seats?", options: ["The number of serious automobile accidents involving children under age four has remained steady over the past five years.", "Automobile accidents involving children have decreased sharply over the past five years.", "The use of air bags in automobiles has increased by 30 percent over the past five years.", "Most fatal automobile accidents involving children under age four occur in the driveway of their home."], ans: 0 },
        { q: "Three men and three women are staying in a row of nine cottages... How many of them occupy cottages next to a vacant cottage?", options: ["2", "3", "4", "5"], ans: 0 },
        { q: "In the event of what occurrence would a request for a change in office be put forth by one or more employees?", options: ["Mr. Donald quitting smoking.", "The installation of a noisy teletype machine by Miss Hardy in her office.", "Mr. Robert's needing silence in the office (s) next to her own.", "Mr. Tim taking over the duties formerly taken care of by Miss. Robert."], ans: 1 },
        { q: "Three girls and two boys dance program... Rita must perform only in duets if:", options: ["Kim is in number two", "Kim is in number five", "Tim is in number two", "Tim is in number six"], ans: 0 },
        { q: "In case the painter works on Thursday, which among the following alternatives is possible?", options: ["The painter can do his work only after the plumber and the carpenter have completed their jobs.", "Plumber works on Friday", "Electrician works on Tuesday", "None of the above"], ans: 0 },
        { q: "In case Antonio and Jeremy share the dinner duty thrice over a five-day period, which among the following would be true?", options: ["Nicholas is on dinner duty alone on the first of the five days.", "Nicholas is on duty twice.", "Antonio works everyday.", "Jeremy is on duty alone."], ans: 0 },
        { q: "Which among the following is an acceptable order for showing the educational films?", options: ["A, C, B, D, E", "A, C, D, E, B", "B, D, C, A, E", "B, D, E, A, C"], ans: 2 },
        { q: "In case switch B is the only switch on in the initial setting, what must be the second setting?", options: ["A on, B on, C on.", "A on, B on, C off.", "A on, B off, C on.", "A off, B off, C on."], ans: 2 },
        { q: "In case A spoke immediately after L and immediately before O, and O was not the last speaker, L spoke:", options: ["Second", "Third", "Fourth", "Fifth"], ans: 1 },
        { q: "If J and K are chosen for the research group, which is necessarily true?", options: ["I is chosen", "L is chosen", "Either N or O is chosen", "None of the above"], ans: 1 },
        { q: "An increasing number of people prefer to retain their own individuality and their own identity and consequently this has lead to a decline in the marriage rate.", options: ["Very few people prefer to bring up a family.", "Emotionally divorce is not an easy procedure.", "700 couples from 1000 surveyed couples complained that they were losing their identity.", "Married people have to make a considerable effort to make the marriage last."], ans: 3 },
        { q: "Successfully adjusting to one's environment leads to happiness...", options: ["I only", "III only", "II only", "I and III only"], ans: 1 },
        { q: "In a one day cricket match, the total runs made by a team were 200. Out of these 160 runs were made by spinners.", options: ["Only I follows", "Only II follows", "Both follow", "None of the Above"], ans: 3 },
        { q: "The Government run company had asked its employees to declare their income and assets...", options: ["Only I follows", "Only II follows", "Both follow", "None follows"], ans: 3 },
        { q: "The distance of 900 km by road between Bombay and Jafra will be reduced to 280 km by sea...", options: ["Only I follows", "Only II follows", "Both follow", "None follows"], ans: 0 },
        { q: "Modern man influences his destiny by the choice he makes unlike in the past.", options: ["Only I follows", "Only II follows", "Both follow", "None follows"], ans: 0 },
        { q: "Only good singers are invited in the conference. No one without sweet voice is a good singer.", options: ["Only I follows", "Only II follows", "Both follow", "None follows"], ans: 0 },
        { q: "No country is absolutely self-dependent these days.", options: ["Only I follows", "Only II follows", "Both follow", "None follows"], ans: 0 },

        // QUANTITATIVE REASONING
        { q: "Three partners shared the profit in a business in the ratio 5 : 7 : 8. They had partnered for 14 months, 8 months and 7 months respectively. What was the ratio of their investments?", options: ["5 : 7 : 8", "20 : 49 : 64", "38 : 28 : 21", "None"], ans: 1 },
        { q: "The average temperature for Wednesday, Thursday and Friday was 40C. The average for Thursday, Friday and Saturday was 41C. If temperature on Saturday was 42C, what was the temperature on Wednesday?", options: ["39 C", "44 C", "38 C", "41 C"], ans: 0 },
        { q: "Interest obtained on a sum of Rs. 5000 for 3 years is Rs. 1500. Find the rate percent.", options: ["8%", "9%", "10%", "11%"], ans: 2 },
        { q: "Three numbers are in ratio 1:2:3 and HCF is 12. The numbers are:", options: ["12, 24, 36", "11, 22, 33", "12, 24, 32", "5, 10, 15"], ans: 0 },
        { q: "1.14 expressed as a per cent of 1.9 is:", options: ["6%", "10%", "60%", "90%"], ans: 2 },
        { q: "If 2/3 of A = 75% of B = 0.6 of C, then A:B:C is", options: ["2:3:3", "3:4:5", "4:5:6", "9:8:10"], ans: 3 },
        { q: "A sells an article to B at a profit of 10%. B sells the article back to A at a loss of 10%. In this transaction:", options: ["A neither losses nor gains", "A makes a profit of 11%", "A makes a profit of 20%", "B loses 20%"], ans: 1 },
        { q: "The ratio between the perimeter and the breadth of a rectangle is 5 : 1. If the area of the rectangle is 216 sq. cm, what is the length of the rectangle?", options: ["16 cm", "18 cm", "24 cm", "Data inadequate"], ans: 1 },
        { q: "What is the probability of getting a sum 9 from two throws of a dice?", options: ["1/6", "1/8", "1/9", "1/12"], ans: 2 },
        { q: "A hall is 15 m long and 12 m broad. If the sum of the areas of the floor and the ceiling is equal to the sum of the areas of four walls, the volume of the hall is:", options: ["720", "900", "1200", "1800"], ans: 0 },
        { q: "(-10) x (-100) = ?", options: ["-100", "-1000", "-10000", "1000"], ans: 3 },
        { q: "(-5) x (-4) x (-3) = ?", options: ["60", "180", "-60", "120"], ans: 2 },
        { q: "Write the fraction of 5%.", options: ["1/10", "1/20", "1/25", "1/30"], ans: 1 },
        { q: "Simplify 15ax² / 5x", options: ["3ax²", "3ax", "5ax²", "5ax"], ans: 1 },
        { q: "Simplify 5/2 ÷ 1/x", options: ["5x / 2", "5 / 2x", "2 / 5x", "2x / 5"], ans: 0 },
        { q: "Simplify a(c - b) - b(a - c)", options: ["ac - 2ab - bc", "ac - 2ab + bc", "ac + 2ab + bc", "ac + bc"], ans: 1 },
        { q: "Calculate the Average of 1,2,3,4,5.", options: ["1", "2", "3", "4"], ans: 2 },
        { q: "Plane geometry", options: ["has only two dimensions.", "manipulates cubes and spheres.", "cannot be represented on the page.", "is ordinary."], ans: 0 },
        { q: "A single location in space is called a", options: ["Line", "Point", "Plane", "Ray"], ans: 1 },
        { q: "A single point", options: ["has width.", "can be accurately drawn.", "can exist at multiple planes.", "makes a line."], ans: 2 },

        // PHYSICS
        { q: "The dimensional formula ML² T⁻² represents", options: ["The moment of a force", "acceleration", "Force", "Momentum"], ans: 0 },
        { q: "Watt/sec is a unit of", options: ["momentum", "force", "energy", "power"], ans: 2 },
        { q: "A fixed pulley is employed to", options: ["do more work with the same force but without using pulley", "change the direction of force", "same work", "have mechanical advantage greater than one"], ans: 1 },
        { q: "The force of friction that comes into action after the motion has started is known as", options: ["dynamic friction", "static friction", "friction only", "limiting friction"], ans: 0 },
        { q: "Let a disc, a cylinder, a solid sphere, and a ring be rolled down in an inclined plane simultaneously. Which will reach first?", options: ["disc", "cylinder", "solid sphere", "ring"], ans: 2 },
        { q: "Forces of 3N, 4N and 12N act at a point in mutually perpendicular direction. The magnitude of the resultant force in newton is", options: ["13", "11", "5", "indeterminate from the information given"], ans: 0 },
        { q: "Which of the following is not necessary for work to be done?", options: ["an applied force", "a force component along the displacement", "a displacement", "a constant speed"], ans: 3 },
        { q: "A body at rest may have", options: ["speed", "momentum", "velocity", "energy"], ans: 3 },

        // CHEMISTRY
        { q: "Matter is composed of", options: ["radicals", "molecules", "atoms", "ions"], ans: 2 },
        { q: "During the process of chemical bonding, atoms try to attain", options: ["noble gas configuration", "stable configuration", "simple configuration", "unstable configuration"], ans: 0 },
        { q: "The attractive force that holds atoms together in molecules is called", options: ["bond", "chemical bond", "force of attraction", "electrostatic force"], ans: 1 },
        { q: "Nature of cathode rays remains the same irrespective of the", options: ["glass used", "gas used", "electrode used", "potential used"], ans: 1 },
        { q: "Cathode rays always travel in a", options: ["circular path", "cured path", "zig zag path", "straight path"], ans: 3 },
        { q: "Deflecting of cathode rays towards positively charged plats indicate it is", options: ["negatively charged", "neutral", "electromagnetic wave", "positively charged"], ans: 0 },
        { q: "By reducing the pressure of the gas in a discharge tube", options: ["gas glows", "gas ionizes", "gas conducts electricity", "a discharge takes place"], ans: 2 },
        { q: "Neon sign is an example of", options: ["florescent tube", "distillation tube", "discharge tube", "electrolytic tube"], ans: 2 },

        // BIOLOGY
        { q: "The scientific study of livings is called", options: ["Zoology", "Anatomy", "Ecology", "Biology"], ans: 3 },
        { q: "Bios means", options: ["Study", "Life", "Fact", "True"], ans: 1 },
        { q: "The scientific study of plants is termed as", options: ["Zoology", "Botany", "Ecology", "Taxonomy"], ans: 1 },
        { q: "The scientific study animals is termed as", options: ["Zoology", "Biology", "Botany", "All of the above"], ans: 0 },
        { q: "It is the branch of biology which deals with the study of form, structure, shape and size of organism their parts seen with eye or with a microscope.", options: ["Anatomy", "Cell Biology", "Ecology", "Morphology"], ans: 3 },
        { q: "It is the study of internal organs of organisms.", options: ["Anatomy", "Physiology", "Morphology", "Cell Biology"], ans: 0 },
        { q: "Anopheles mosquito carries Plasmodium, which causes malaria in", options: ["Humans", "Animals", "Sparrows", "All of the above"], ans: 0 },
        { q: "Detail study of internal organs at level of tissue with the help of microscope is called", options: ["Histology", "Anatomy", "Ecology", "Taxonomy"], ans: 0 },
        { q: "The study of structure and functions of cells is termed as", options: ["Genetics", "Ecology", "Embryology", "Cell Biology"], ans: 3 },
        { q: "It is the branch of biology which deals with the study of functions of different parts of an organism.", options: ["Physiology", "Ecology", "Taxonomy", "Evolution"], ans: 0 },
        { q: "It is the branch of biology which deals with the study of structure and functions of molecules of the cells such as proteins, nucleic acid, hormones etc.", options: ["Molecular Biology", "Compound Biology", "Genetics", "Evolution"], ans: 0 },
        { q: "The study of forces and factors which create change or variations that lead to the formation of new species is termed as......", options: ["Evolution", "Ecology", "Palaeconotology", "Genetics"], ans: 0 },
        { q: "The study of nuclear cytology is known as", options: ["Neurology", "Mycology", "Rlinology", "Karyology"], ans: 3 },
        { q: "The study of preservation of life or the study of organisms at low temperature is known as", options: ["Kalology", "Malacology", "Cryobiology", "Dermatology"], ans: 2 }
    ]
};

questionBank["nat-im"] = questionBank["nat-igs"];
questionBank["nat-ics"] = questionBank["nat-ie"];
questionBank["nat-icom"] = questionBank["nat-ie"];
questionBank["nat-ia"] = questionBank["nat-ie"];
