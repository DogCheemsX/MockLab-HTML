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
        { q: "A hall is 15 m long and 12 m broad. If the sum of the areas of the floor and the ceiling is equal to the sum of the areas of four walls, the volume of the hall is:", options: ["720", "900", "1200", "1800"], ans: 2 },
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
