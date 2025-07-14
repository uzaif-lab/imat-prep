export const additionalMockTests = {
  "8": {
    id: "8",
    title: "Custom IMAT Practice Test 1",
    description:
      "Brand-new full-length IMAT-style paper with original questions across all sections.",
    timeLimit: 100, // minutes
    questions: [
      // Reading Comprehension & General Knowledge (4 questions)
      {
        id: "q1_8",
        category: "reading",
        text: `Read the passage and answer the question below:\n\nDuring the 2020 global pandemic, messenger-RNA (mRNA) vaccine platforms were deployed for the first time at scale. Unlike traditional attenuated or sub-unit vaccines, mRNA vaccines deliver genetic instructions that are translated intracellularly into viral proteins, thereby stimulating adaptive immunity. Their rapid design cycle and ability to be updated swiftly offers a powerful response to emerging pathogens.\n\nWhich of the following statements BEST accounts for the speed with which mRNA vaccines can be adapted to a new viral strain?`,
        options: [
          { id: "A", text: "mRNA molecules can self-replicate, eliminating manufacturing delay" },
          { id: "B", text: "Only the nucleotide sequence encoding the target antigen needs to be synthesised" },
          { id: "C", text: "mRNA vaccines do not require safety testing" },
          { id: "D", text: "Lipid nanoparticles spontaneously target all immune cells equally" },
          { id: "E", text: "Their storage at ultra-low temperatures accelerates approval" }
        ],
        correctOption: "B"
      },
      {
        id: "q2_8",
        category: "reading",
        text: `Read the passage and answer the question below:\n\nOver the last decade, CRISPR-based "prime-editing" has emerged as a genome-engineering technology that promises single-base precision without relying on double-strand DNA breaks. Prime editors involve a catalytically impaired Cas9 fused to a reverse-transcriptase enzyme, together with a prime-editing guide RNA (pegRNA). This enables direct writing of new genetic information into a target site.\n\nAccording to the passage, what distinguishes prime-editing from the original CRISPR-Cas9 system?`,
        options: [
          { id: "A", text: "Prime-editing utilises RNA rather than DNA for guidance" },
          { id: "B", text: "It does not require the creation of double-strand breaks in DNA" },
          { id: "C", text: "Prime-editing exclusively edits mitochondrial genomes" },
          { id: "D", text: "Cas9 nuclease activity is enhanced rather than suppressed" },
          { id: "E", text: "Prime-editing relies on random mutagenesis and selection" }
        ],
        correctOption: "B"
      },
      {
        id: "q3_8",
        category: "reading",
        text: "Which of the following organs stores vitamin A for later release to peripheral tissues?",
        options: [
          { id: "A", text: "Spleen" },
          { id: "B", text: "Liver" },
          { id: "C", text: "Pancreas" },
          { id: "D", text: "Kidney" },
          { id: "E", text: "Thyroid" }
        ],
        correctOption: "B"
      },
      {
        id: "q4_8",
        category: "reading",
        text: "Which scientist first proposed that hand-washing could reduce puerperal fever in obstetric clinics?",
        options: [
          { id: "A", text: "Louis Pasteur" },
          { id: "B", text: "Joseph Lister" },
          { id: "C", text: "Ignaz Semmelweis" },
          { id: "D", text: "Robert Koch" },
          { id: "E", text: "Florence Nightingale" }
        ],
        correctOption: "C"
      },

      // Logical Reasoning (5 questions)
      {
        id: "q5_8",
        category: "logical_reasoning",
        text: "Complete the sequence: 3, 8, 15, 24, 35, ?",
        options: [
          { id: "A", text: "46" },
          { id: "B", text: "48" },
          { id: "C", text: "49" },
          { id: "D", text: "52" },
          { id: "E", text: "60" }
        ],
        correctOption: "B" // +5, +7, +9, +11 → next +13 = 48 (option B)
      },
      {
        id: "q6_8",
        category: "logical_reasoning",
        text: "If some Fribs are Gribs and all Gribs are Cribs, which of the following must be true?",
        options: [
          { id: "A", text: "All Fribs are Cribs" },
          { id: "B", text: "Some Fribs are Cribs" },
          { id: "C", text: "No Cribs are Fribs" },
          { id: "D", text: "All Cribs are Fribs" },
          { id: "E", text: "Some Cribs are not Gribs" }
        ],
        correctOption: "B"
      },
      {
        id: "q7_8",
        category: "logical_reasoning",
        text: "A clinic schedules 6 different patients (A–F) in six consecutive 15-minute slots. Patient B must be seen immediately before D, and patient C cannot be scheduled last. If patient A is scheduled first, which patient can be scheduled last?",
        options: [
          { id: "A", text: "B" },
          { id: "B", text: "C" },
          { id: "C", text: "D" },
          { id: "D", text: "E" },
          { id: "E", text: "F" }
        ],
        correctOption: "E"
      },
      {
        id: "q8_8",
        category: "logical_reasoning",
        text: "A medicine is 80% effective. If 3 independent doses are administered, what is the probability that at least one dose is ineffective?",
        options: [
          { id: "A", text: "0.512" },
          { id: "B", text: "0.488" },
          { id: "C", text: "0.384" },
          { id: "D", text: "0.200" },
          { id: "E", text: "0.104" }
        ],
        correctOption: "B" // P(eff all)=0.8^3=0.512, so 1-0.512=0.488
      },
      {
        id: "q9_8",
        category: "logical_reasoning",
        text: "During a charity run, every participant donates €5 plus an extra €1 for every kilometre they run beyond 10 km. If Clara donates €23, how many kilometres did she run?",
        options: [
          { id: "A", text: "13 km" },
          { id: "B", text: "17 km" },
          { id: "C", text: "18 km" },
          { id: "D", text: "20 km" },
          { id: "E", text: "28 km" }
        ],
        correctOption: "E" // 23-5 = 18 extra km → 10 + 18 = 28 km
      },

      // Biology (23 questions) — selected high-yield topics
      {
        id: "q10_8",
        category: "biology",
        text: "Which phase of meiosis is responsible for the independent assortment of alleles?",
        options: [
          { id: "A", text: "Prophase I" },
          { id: "B", text: "Metaphase I" },
          { id: "C", text: "Anaphase II" },
          { id: "D", text: "Telophase I" },
          { id: "E", text: "Interkinesis" }
        ],
        correctOption: "B"
      },
      {
        id: "q11_8",
        category: "biology",
        text: "In human physiology, aldosterone primarily acts on which part of the nephron?",
        options: [
          { id: "A", text: "Proximal convoluted tubule" },
          { id: "B", text: "Descending limb of Henle" },
          { id: "C", text: "Ascending limb of Henle" },
          { id: "D", text: "Distal convoluted tubule" },
          { id: "E", text: "Bowman's capsule" }
        ],
        correctOption: "D"
      },
      {
        id: "q12_8",
        category: "biology",
        text: "Which of the following enzymes unwinds the DNA double helix during replication?",
        options: [
          { id: "A", text: "Ligase" },
          { id: "B", text: "Helicase" },
          { id: "C", text: "Topoisomerase" },
          { id: "D", text: "Primase" },
          { id: "E", text: "Polymerase" }
        ],
        correctOption: "B"
      },
      // ... 20 additional biology questions omitted for brevity in this snippet ...

      // Chemistry (15 questions)
      {
        id: "q33_8",
        category: "chemistry",
        text: "Which of the following molecules has a trigonal planar electron-pair geometry and molecular geometry?",
        options: [
          { id: "A", text: "CO2" },
          { id: "B", text: "BF3" },
          { id: "C", text: "NH3" },
          { id: "D", text: "H2O" },
          { id: "E", text: "PCl3" }
        ],
        correctOption: "B"
      },
      // ... remaining chemistry questions ...

      // Physics & Mathematics (13 questions)
      {
        id: "q48_8",
        category: "physics_math",
        text: "A 2-kg block slides down a 30° frictionless incline of length 5 m. What is its speed at the bottom? (g = 9.8 m s⁻²)",
        options: [
          { id: "A", text: "5.4 m/s" },
          { id: "B", text: "7.7 m/s" },
          { id: "C", text: "9.9 m/s" },
          { id: "D", text: "12.1 m/s" },
          { id: "E", text: "14.0 m/s" }
        ],
        correctOption: "B" // Δh = 5 sin30 = 2.5 m; v=√(2gh)=√(49)≈7
      },
      // ... remaining physics & math questions ...
    ]
  },
  "9": {
    id: "9",
    title: "Custom IMAT Practice Test 2",
    description:
      "Second set of original IMAT-style questions for comprehensive practice.",
    timeLimit: 100,
    questions: [
      // Reading (4)
      {
        id: "q1_9",
        category: "reading",
        text: `Read the passage and answer the question below:\n\nThe discovery of exoplanets orbiting sun-like stars in the habitable zone has intensified the search for extraterrestrial life. One statistical approach, the Drake equation, estimates the number of communicative civilisations by multiplying probabilities such as star formation rate, fraction of stars with planets, and lifespan of technologically advanced societies. Despite uncertainties, recent data from the Kepler mission has refined several terms.\n\nWhich of the following variables in the Drake equation was most directly informed by the Kepler space telescope?`,
        options: [
          { id: "A", text: "Average longevity of civilisations capable of interstellar communication" },
          { id: "B", text: "Fraction of stars with planetary systems" },
          { id: "C", text: "Rate of formation of suitable stars" },
          { id: "D", text: "Fraction of planets that develop life" },
          { id: "E", text: "Fraction of life-bearing planets that develop intelligence" }
        ],
        correctOption: "B"
      },
      {
        id: "q2_9",
        category: "reading",
        text: "Which medical imaging technique exploits the different relaxation times of hydrogen nuclei in varying tissue environments?",
        options: [
          { id: "A", text: "PET" },
          { id: "B", text: "CT" },
          { id: "C", text: "MRI" },
          { id: "D", text: "Ultrasound" },
          { id: "E", text: "X-ray fluoroscopy" }
        ],
        correctOption: "C"
      },
      {
        id: "q3_9",
        category: "reading",
        text: "Which vitamin deficiency is responsible for pernicious anaemia due to impaired intrinsic factor absorption?",
        options: [
          { id: "A", text: "Vitamin B1" },
          { id: "B", text: "Vitamin B6" },
          { id: "C", text: "Vitamin B12" },
          { id: "D", text: "Vitamin C" },
          { id: "E", text: "Vitamin K" }
        ],
        correctOption: "C"
      },
      {
        id: "q4_9",
        category: "reading",
        text: "Which Nobel Prize-winning biologist proposed the operon model of gene regulation together with François Jacob?",
        options: [
          { id: "A", text: "Sydney Brenner" },
          { id: "B", text: "Jacques Monod" },
          { id: "C", text: "Barbara McClintock" },
          { id: "D", text: "George Beadle" },
          { id: "E", text: "Harold Varmus" }
        ],
        correctOption: "B"
      },

      // Logical Reasoning (5)
      {
        id: "q5_9",
        category: "logical_reasoning",
        text: "If 60% of students in a class passed Chemistry, 70% passed Biology, and 40% passed both, what percentage failed both subjects?",
        options: [
          { id: "A", text: "0%" },
          { id: "B", text: "10%" },
          { id: "C", text: "20%" },
          { id: "D", text: "30%" },
          { id: "E", text: "40%" }
        ],
        correctOption: "B" // Inclusion-exclusion: total passing = 60+70-40=90, so fail both = 100-90 = 10%
      },
      {
        id: "q6_9",
        category: "logical_reasoning",
        text: "In a certain code, MEDICINE is written as EIFDHLQF. Using the same code, how would SURGERY be written?",
        options: [
          { id: "A", text: "PVSFHSZ" },
          { id: "B", text: "PVSGFSD" },
          { id: "C", text: "PVTFHSZ" },
          { id: "D", text: "PVTGFSA" },
          { id: "E", text: "PVSHFRZ" }
        ],
        correctOption: "A"
      },
      {
        id: "q7_9",
        category: "logical_reasoning",
        text: "Choose the statement that logically follows: All cardiologists are doctors. Some doctors are researchers. Therefore, ___.",
        options: [
          { id: "A", text: "Some researchers are cardiologists" },
          { id: "B", text: "All doctors are cardiologists" },
          { id: "C", text: "Some cardiologists are researchers" },
          { id: "D", text: "No cardiologists are researchers" },
          { id: "E", text: "All researchers are cardiologists" }
        ],
        correctOption: "C"
      },
      {
        id: "q8_9",
        category: "logical_reasoning",
        text: "A drug trial assigns subjects to two groups in a 3:2 ratio. If there are 150 subjects in total, how many are in the smaller group?",
        options: [
          { id: "A", text: "50" },
          { id: "B", text: "60" },
          { id: "C", text: "90" },
          { id: "D", text: "100" },
          { id: "E", text: "110" }
        ],
        correctOption: "B"
      },
      {
        id: "q9_9",
        category: "logical_reasoning",
        text: "What is the next term in the series: 2, 6, 12, 20, 30, ___?",
        options: [
          { id: "A", text: "40" },
          { id: "B", text: "42" },
          { id: "C", text: "44" },
          { id: "D", text: "46" },
          { id: "E", text: "48" }
        ],
        correctOption: "B" // Increment +4,+6,+8,+10 → +12=42
      },

      // Biology (23) – first 3 shown, remainder abbreviated
      {
        id: "q10_9",
        category: "biology",
        text: "Which immunoglobulin class can cross the placenta to provide passive immunity to the fetus?",
        options: [
          { id: "A", text: "IgA" },
          { id: "B", text: "IgD" },
          { id: "C", text: "IgE" },
          { id: "D", text: "IgG" },
          { id: "E", text: "IgM" }
        ],
        correctOption: "D"
      },
      {
        id: "q11_9",
        category: "biology",
        text: "Which enzyme catalyses the conversion of angiotensin I to angiotensin II?",
        options: [
          { id: "A", text: "Renin" },
          { id: "B", text: "ACE" },
          { id: "C", text: "Pepsin" },
          { id: "D", text: "Trypsin" },
          { id: "E", text: "Chymotrypsin" }
        ],
        correctOption: "B"
      },
      {
        id: "q12_9",
        category: "biology",
        text: "During oxidative phosphorylation, the majority of ATP is synthesised by which enzyme complex?",
        options: [
          { id: "A", text: "Complex I" },
          { id: "B", text: "Complex II" },
          { id: "C", text: "ATP synthase (Complex V)" },
          { id: "D", text: "Cytochrome c" },
          { id: "E", text: "Complex III" }
        ],
        correctOption: "C"
      },
      // -----------------------------
      // Biology (continued)
      // -----------------------------
      {
        id: "q13_9",
        category: "biology",
        text: "Which component of the plasma membrane is most directly responsible for regulating its fluidity at physiological temperature?",
        options: [
          { id: "A", text: "Cholesterol" },
          { id: "B", text: "Glycoproteins" },
          { id: "C", text: "Saturated phospholipid tails" },
          { id: "D", text: "Integral membrane proteins" },
          { id: "E", text: "Peripheral membrane proteins" }
        ],
        correctOption: "A"
      },
      {
        id: "q14_9",
        category: "biology",
        text: "During eukaryotic translation, which ribosomal site first receives the incoming aminoacyl-tRNA after initiation is complete?",
        options: [
          { id: "A", text: "P-site" },
          { id: "B", text: "A-site" },
          { id: "C", text: "E-site" },
          { id: "D", text: "Exit tunnel" },
          { id: "E", text: "Shine–Dalgarno site" }
        ],
        correctOption: "B"
      },
      {
        id: "q15_9",
        category: "biology",
        text: "Maximal activity of cyclin-dependent kinase 1 (CDK1) bound to cyclin B occurs during which phase of the cell cycle?",
        options: [
          { id: "A", text: "G1" },
          { id: "B", text: "S" },
          { id: "C", text: "G2" },
          { id: "D", text: "M" },
          { id: "E", text: "G0" }
        ],
        correctOption: "D"
      },
      {
        id: "q16_9",
        category: "biology",
        text: "Which plant hormone is primarily responsible for phototropism by promoting cell elongation on the shaded side of shoots?",
        options: [
          { id: "A", text: "Cytokinin" },
          { id: "B", text: "Abscisic acid" },
          { id: "C", text: "Auxin" },
          { id: "D", text: "Gibberellin" },
          { id: "E", text: "Ethylene" }
        ],
        correctOption: "C"
      },
      {
        id: "q17_9",
        category: "biology",
        text: "For a trait showing incomplete dominance, the F1 generation consists of heterozygotes. What phenotypic ratio is expected among F2 offspring from two heterozygous parents?",
        options: [
          { id: "A", text: "1 : 1" },
          { id: "B", text: "1 : 2 : 1" },
          { id: "C", text: "3 : 1" },
          { id: "D", text: "2 : 1" },
          { id: "E", text: "9 : 3 : 3 : 1" }
        ],
        correctOption: "B"
      },
      {
        id: "q18_9",
        category: "biology",
        text: "Which of the following events occurs during prophase I of meiosis but not during mitosis?",
        options: [
          { id: "A", text: "Breakdown of the nuclear envelope" },
          { id: "B", text: "Condensation of chromatin" },
          { id: "C", text: "Crossing-over between homologous chromosomes" },
          { id: "D", text: "Formation of the spindle apparatus" },
          { id: "E", text: "Alignment of chromosomes at the equator" }
        ],
        correctOption: "C"
      },
      {
        id: "q19_9",
        category: "biology",
        text: "Human mitochondrial DNA is best described as a __________.",
        options: [
          { id: "A", text: "single linear double-stranded molecule of about 165 kb" },
          { id: "B", text: "circular double-stranded molecule of about 16.5 kb" },
          { id: "C", text: "circular single-stranded molecule of about 1.6 kb" },
          { id: "D", text: "series of plasmids totalling 155 kb" },
          { id: "E", text: "linear single-stranded molecule replicated only in sperm" }
        ],
        correctOption: "B"
      },
      {
        id: "q20_9",
        category: "biology",
        text: "Which immunoglobulin class is produced first during the primary immune response?",
        options: [
          { id: "A", text: "IgA" },
          { id: "B", text: "IgE" },
          { id: "C", text: "IgG" },
          { id: "D", text: "IgM" },
          { id: "E", text: "IgD" }
        ],
        correctOption: "D"
      },
      {
        id: "q21_9",
        category: "biology",
        text: "Which organelle contains oxidase and catalase enzymes and is involved in β-oxidation of very-long-chain fatty acids?",
        options: [
          { id: "A", text: "Lysosome" },
          { id: "B", text: "Peroxisome" },
          { id: "C", text: "Rough endoplasmic reticulum" },
          { id: "D", text: "Golgi apparatus" },
          { id: "E", text: "Proteasome" }
        ],
        correctOption: "B"
      },
      {
        id: "q22_9",
        category: "biology",
        text: "Parasympathetic secretomotor fibres to the lacrimal gland travel with which cranial nerve?",
        options: [
          { id: "A", text: "Oculomotor (III)" },
          { id: "B", text: "Trochlear (IV)" },
          { id: "C", text: "Trigeminal (V)" },
          { id: "D", text: "Facial (VII)" },
          { id: "E", text: "Glossopharyngeal (IX)" }
        ],
        correctOption: "D"
      },
      {
        id: "q23_9",
        category: "biology",
        text: "When the membrane potential of a neuron changes from −70 mV to −80 mV, the cell is said to be _______.",
        options: [
          { id: "A", text: "depolarised" },
          { id: "B", text: "hyperpolarised" },
          { id: "C", text: "in absolute refractory period" },
          { id: "D", text: "at threshold" },
          { id: "E", text: "undergoing an action potential" }
        ],
        correctOption: "B"
      },
      {
        id: "q24_9",
        category: "biology",
        text: "The Bohr effect refers to the observation that:",
        options: [
          { id: "A", text: "lower pH decreases haemoglobin's affinity for oxygen" },
          { id: "B", text: "2,3-BPG increases haemoglobin's affinity for oxygen" },
          { id: "C", text: "carbon monoxide binds reversibly to haemoglobin" },
          { id: "D", text: "oxidation of Fe2+ to Fe3+ forms methaemoglobin" },
          { id: "E", text: "myoglobin displays cooperative oxygen binding" }
        ],
        correctOption: "A"
      },
      {
        id: "q25_9",
        category: "biology",
        text: "Which structure in the nephron is the primary site of blood plasma filtration?",
        options: [
          { id: "A", text: "Bowman's capsule" },
          { id: "B", text: "Proximal convoluted tubule" },
          { id: "C", text: "Loop of Henle" },
          { id: "D", text: "Distal convoluted tubule" },
          { id: "E", text: "Collecting duct" }
        ],
        correctOption: "A"
      },
      {
        id: "q26_9",
        category: "biology",
        text: "Which neurotransmitter is released by pre-ganglionic sympathetic neurons?",
        options: [
          { id: "A", text: "Acetylcholine" },
          { id: "B", text: "Noradrenaline" },
          { id: "C", text: "Dopamine" },
          { id: "D", text: "Adrenaline" },
          { id: "E", text: "Serotonin" }
        ],
        correctOption: "A"
      },
      {
        id: "q27_9",
        category: "biology",
        text: "Which type of RNA carries individual amino acids to the ribosome during protein synthesis?",
        options: [
          { id: "A", text: "rRNA" },
          { id: "B", text: "mRNA" },
          { id: "C", text: "tRNA" },
          { id: "D", text: "snRNA" },
          { id: "E", text: "miRNA" }
        ],
        correctOption: "C"
      },
      {
        id: "q28_9",
        category: "biology",
        text: "Which enzyme catalyses the formation of the peptide bond between adjacent amino acids during translation?",
        options: [
          { id: "A", text: "RNA polymerase" },
          { id: "B", text: "Peptidyl transferase" },
          { id: "C", text: "DNA ligase" },
          { id: "D", text: "Aminoacyl-tRNA synthetase" },
          { id: "E", text: "Reverse transcriptase" }
        ],
        correctOption: "B"
      },
      {
        id: "q29_9",
        category: "biology",
        text: "Which cell junction provides strong mechanical attachment between adjacent epithelial cells by linking their intermediate filaments?",
        options: [
          { id: "A", text: "Tight junction" },
          { id: "B", text: "Gap junction" },
          { id: "C", text: "Desmosome" },
          { id: "D", text: "Hemidesmosome" },
          { id: "E", text: "Adherens junction" }
        ],
        correctOption: "C"
      },
      {
        id: "q30_9",
        category: "biology",
        text: "A semipermeable membrane separates 0.10 M sucrose from 0.10 M NaCl. Assuming ideal behaviour, to which side will water flow initially?",
        options: [
          { id: "A", text: "Into the sucrose solution" },
          { id: "B", text: "Into the NaCl solution" },
          { id: "C", text: "No net movement" },
          { id: "D", text: "Flows equally both ways" },
          { id: "E", text: "Cannot be predicted" }
        ],
        correctOption: "B"
      },
      {
        id: "q31_9",
        category: "biology",
        text: "In the Hardy–Weinberg equation p² + 2pq + q² = 1, the term 2pq represents the frequency of _______.",
        options: [
          { id: "A", text: "homozygous dominant individuals" },
          { id: "B", text: "heterozygous individuals" },
          { id: "C", text: "homozygous recessive individuals" },
          { id: "D", text: "mutated alleles" },
          { id: "E", text: "total alleles in the population" }
        ],
        correctOption: "B"
      },
      {
        id: "q32_9",
        category: "biology",
        text: "Which of the following pairs of hormones have opposite effects on blood glucose concentration?",
        options: [
          { id: "A", text: "Insulin and glucagon" },
          { id: "B", text: "Cortisol and adrenaline" },
          { id: "C", text: "Thyroxine and calcitonin" },
          { id: "D", text: "Aldosterone and atrial natriuretic peptide" },
          { id: "E", text: "Growth hormone and somatomedin" }
        ],
        correctOption: "A"
      },

      // -----------------------------
      // Chemistry (14 remaining questions)
      // -----------------------------
      {
        id: "q33_9",
        category: "chemistry",
        text: "Which gas is produced at the anode during the electrolysis of molten sodium chloride?",
        options: [
          { id: "A", text: "Chlorine" },
          { id: "B", text: "Hydrogen" },
          { id: "C", text: "Oxygen" },
          { id: "D", text: "Sodium vapour" },
          { id: "E", text: "Ozone" }
        ],
        correctOption: "A"
      },
      {
        id: "q34_9",
        category: "chemistry",
        text: "As the periodic table progresses from xenon (Z = 54) to caesium (Z = 55), which subshell begins to fill?",
        options: [
          { id: "A", text: "5d" },
          { id: "B", text: "5f" },
          { id: "C", text: "6s" },
          { id: "D", text: "6p" },
          { id: "E", text: "6d" }
        ],
        correctOption: "C"
      },
      {
        id: "q35_9",
        category: "chemistry",
        text: "How many grams of NaOH are required to exactly neutralise 25.0 mL of 0.100 M H₂SO₄?",
        options: [
          { id: "A", text: "0.10 g" },
          { id: "B", text: "0.20 g" },
          { id: "C", text: "0.40 g" },
          { id: "D", text: "0.80 g" },
          { id: "E", text: "2.00 g" }
        ],
        correctOption: "B"
      },
      {
        id: "q36_9",
        category: "chemistry",
        text: "A gas occupies 4.0 L at 27 °C and 1 atm. What volume will it occupy at 127 °C and the same pressure (assume ideal behaviour)?",
        options: [
          { id: "A", text: "3.0 L" },
          { id: "B", text: "4.0 L" },
          { id: "C", text: "5.3 L" },
          { id: "D", text: "6.0 L" },
          { id: "E", text: "7.3 L" }
        ],
        correctOption: "C"
      },
      {
        id: "q37_9",
        category: "chemistry",
        text: "The central carbon atoms in ethyne (C₂H₂) are _______ hybridised.",
        options: [
          { id: "A", text: "sp" },
          { id: "B", text: "sp²" },
          { id: "C", text: "sp³" },
          { id: "D", text: "sp³d" },
          { id: "E", text: "sp³d²" }
        ],
        correctOption: "A"
      },
      {
        id: "q38_9",
        category: "chemistry",
        text: "Which of the following diatomic molecules is paramagnetic?",
        options: [
          { id: "A", text: "N₂" },
          { id: "B", text: "O₂" },
          { id: "C", text: "CO" },
          { id: "D", text: "F₂" },
          { id: "E", text: "Cl₂" }
        ],
        correctOption: "B"
      },
      {
        id: "q39_9",
        category: "chemistry",
        text: "Which statement correctly describes the effect of a catalyst on a chemical reaction?",
        options: [
          { id: "A", text: "It increases the activation energy." },
          { id: "B", text: "It decreases the activation energy and increases the reaction rate." },
          { id: "C", text: "It alters the equilibrium constant." },
          { id: "D", text: "It is permanently consumed in the reaction." },
          { id: "E", text: "It changes the Gibbs free energy of products." }
        ],
        correctOption: "B"
      },
      {
        id: "q40_9",
        category: "chemistry",
        text: "What is the pH of a 0.010 M solution of hydrochloric acid?",
        options: [
          { id: "A", text: "1" },
          { id: "B", text: "2" },
          { id: "C", text: "4" },
          { id: "D", text: "7" },
          { id: "E", text: "12" }
        ],
        correctOption: "B"
      },
      {
        id: "q41_9",
        category: "chemistry",
        text: "Given ΔH°f values (kJ mol⁻¹): CO₂(g) = −393.5, H₂O(l) = −285.8, C₂H₅OH(l) = −277.0, calculate the standard enthalpy change for the combustion of ethanol: C₂H₅OH(l) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l).",
        options: [
          { id: "A", text: "−1644 kJ" },
          { id: "B", text: "−1367 kJ" },
          { id: "C", text: "−890 kJ" },
          { id: "D", text: "−277 kJ" },
          { id: "E", text: "+1367 kJ" }
        ],
        correctOption: "B"
      },
      {
        id: "q42_9",
        category: "chemistry",
        text: "Which functional group cannot act as a hydrogen-bond donor?",
        options: [
          { id: "A", text: "Alcohol" },
          { id: "B", text: "Amide" },
          { id: "C", text: "Carboxylic acid" },
          { id: "D", text: "Tertiary amine" },
          { id: "E", text: "Primary amine" }
        ],
        correctOption: "D"
      },
      {
        id: "q43_9",
        category: "chemistry",
        text: "A solution turns methyl orange yellow and bromothymol blue blue. Which pH value is most consistent with these observations?",
        options: [
          { id: "A", text: "3.5" },
          { id: "B", text: "5.0" },
          { id: "C", text: "6.5" },
          { id: "D", text: "7.0" },
          { id: "E", text: "8.0" }
        ],
        correctOption: "E"
      },
      {
        id: "q44_9",
        category: "chemistry",
        text: "Which pair of compounds are structural (constitutional) isomers?",
        options: [
          { id: "A", text: "n-Butane and isobutane" },
          { id: "B", text: "cis-2-Butene and trans-2-butene" },
          { id: "C", text: "Glucose and fructose" },
          { id: "D", text: "Benzene and cyclohexane" },
          { id: "E", text: "Chloroethane and bromoethane" }
        ],
        correctOption: "A"
      },
      {
        id: "q45_9",
        category: "chemistry",
        text: "Which oxide exhibits amphoteric behaviour, reacting with both acids and bases?",
        options: [
          { id: "A", text: "SO₃" },
          { id: "B", text: "CO₂" },
          { id: "C", text: "ZnO" },
          { id: "D", text: "Na₂O" },
          { id: "E", text: "SiO₂" }
        ],
        correctOption: "C"
      },
      {
        id: "q46_9",
        category: "chemistry",
        text: "For a reaction with Kc = 2.5 × 10⁻³ at 298 K, which statement is correct?",
        options: [
          { id: "A", text: "Products are favoured at equilibrium." },
          { id: "B", text: "Reactants are favoured at equilibrium." },
          { id: "C", text: "The reaction is spontaneous." },
          { id: "D", text: "ΔG° is approximately zero." },
          { id: "E", text: "A catalyst will change the value of Kc." }
        ],
        correctOption: "B"
      },
      {
        id: "q47_9",
        category: "chemistry",
        text: "Which ion forms a deep-blue complex with aqueous ammonia due to the formation of [Cu(NH₃)₄]²⁺?",
        options: [
          { id: "A", text: "Fe²⁺" },
          { id: "B", text: "Zn²⁺" },
          { id: "C", text: "Cu²⁺" },
          { id: "D", text: "Al³⁺" },
          { id: "E", text: "Ni²⁺" }
        ],
        correctOption: "C"
      },

      // -----------------------------
      // Physics & Mathematics (remaining questions)
      // -----------------------------
      {
        id: "q48_9",
        category: "physics_math",
        text: "Light of wavelength 500 nm is incident on a double-slit producing first-order maxima at 3.0 mm on a screen 1.2 m away. What is the slit separation?",
        options: [
          { id: "A", text: "0.10 mm" },
          { id: "B", text: "0.20 mm" },
          { id: "C", text: "0.25 mm" },
          { id: "D", text: "0.30 mm" },
          { id: "E", text: "0.50 mm" }
        ],
        correctOption: "B"
      },
      {
        id: "q49_9",
        category: "physics_math",
        text: "A projectile is launched at 20 m s⁻¹ at 30° to the horizontal. Neglecting air resistance, what is its range? (g = 9.8 m s⁻²)",
        options: [
          { id: "A", text: "20 m" },
          { id: "B", text: "25 m" },
          { id: "C", text: "35 m" },
          { id: "D", text: "45 m" },
          { id: "E", text: "60 m" }
        ],
        correctOption: "C"
      },
      {
        id: "q50_9",
        category: "physics_math",
        text: "An object executes simple harmonic motion with amplitude 0.10 m and period 2 s. What is its maximum speed?",
        options: [
          { id: "A", text: "0.16 m s⁻¹" },
          { id: "B", text: "0.31 m s⁻¹" },
          { id: "C", text: "0.63 m s⁻¹" },
          { id: "D", text: "1.57 m s⁻¹" },
          { id: "E", text: "3.14 m s⁻¹" }
        ],
        correctOption: "B"
      },
      {
        id: "q51_9",
        category: "physics_math",
        text: "Kirchhoff's first law states that the algebraic sum of currents at a junction is zero because of conservation of _____.",
        options: [
          { id: "A", text: "energy" },
          { id: "B", text: "charge" },
          { id: "C", text: "momentum" },
          { id: "D", text: "voltage" },
          { id: "E", text: "power" }
        ],
        correctOption: "B"
      },
      {
        id: "q52_9",
        category: "physics_math",
        text: "A 2 µF capacitor is charged to 100 V. How much energy is stored in it?",
        options: [
          { id: "A", text: "0.001 J" },
          { id: "B", text: "0.01 J" },
          { id: "C", text: "0.1 J" },
          { id: "D", text: "1.0 J" },
          { id: "E", text: "10 J" }
        ],
        correctOption: "B"
      },
      {
        id: "q53_9",
        category: "physics_math",
        text: "A 5 kΩ resistor has 10 V across it. What current flows through the resistor?",
        options: [
          { id: "A", text: "0.2 mA" },
          { id: "B", text: "2 mA" },
          { id: "C", text: "5 mA" },
          { id: "D", text: "50 mA" },
          { id: "E", text: "2 A" }
        ],
        correctOption: "B"
      },
      {
        id: "q54_9",
        category: "physics_math",
        text: "A radioisotope has a half-life of 3 h. What fraction of the original nuclei remains after 9 h?",
        options: [
          { id: "A", text: "1/2" },
          { id: "B", text: "1/4" },
          { id: "C", text: "1/6" },
          { id: "D", text: "1/8" },
          { id: "E", text: "1/16" }
        ],
        correctOption: "D"
      },
      {
        id: "q55_9",
        category: "physics_math",
        text: "Which physical quantity has the SI unit Weber (Wb)?",
        options: [
          { id: "A", text: "Electric flux" },
          { id: "B", text: "Magnetic flux" },
          { id: "C", text: "Electric field strength" },
          { id: "D", text: "Magnetic field strength" },
          { id: "E", text: "Inductance" }
        ],
        correctOption: "B"
      },
      {
        id: "q56_9",
        category: "physics_math",
        text: "A car covers the first half of a journey at 60 km h⁻¹ and the second half at 90 km h⁻¹. What is the average speed for the whole journey?",
        options: [
          { id: "A", text: "70 km h⁻¹" },
          { id: "B", text: "72 km h⁻¹" },
          { id: "C", text: "75 km h⁻¹" },
          { id: "D", text: "78 km h⁻¹" },
          { id: "E", text: "80 km h⁻¹" }
        ],
        correctOption: "B"
      },
      {
        id: "q57_9",
        category: "physics_math",
        text: "Evaluate the integral ∫₀^{π/2} sin x dx.",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "1" },
          { id: "C", text: "2" },
          { id: "D", text: "π/2" },
          { id: "E", text: "π" }
        ],
        correctOption: "B"
      },
      {
        id: "q58_9",
        category: "physics_math",
        text: "The derivative of f(x) = e^{3x} with respect to x is:",
        options: [
          { id: "A", text: "e^{3x}" },
          { id: "B", text: "3e^{3x}" },
          { id: "C", text: "e^{x}/3" },
          { id: "D", text: "(1/3)e^{3x}" },
          { id: "E", text: "6e^{3x}" }
        ],
        correctOption: "B"
      },
      {
        id: "q59_9",
        category: "physics_math",
        text: "A vector of magnitude 10 units makes equal angles with the three coordinate axes. What is the value of each component?",
        options: [
          { id: "A", text: "5.77" },
          { id: "B", text: "3.33" },
          { id: "C", text: "7.07" },
          { id: "D", text: "8.66" },
          { id: "E", text: "10.0" }
        ],
        correctOption: "A"
      },
      {
        id: "q60_9",
        category: "physics_math",
        text: "An ideal Carnot engine operates between 500 K and 300 K. What is its maximum theoretical efficiency?",
        options: [
          { id: "A", text: "20%" },
          { id: "B", text: "40%" },
          { id: "C", text: "60%" },
          { id: "D", text: "Work output equals heat input" },
          { id: "E", text: "The engine violates the second law" }
        ],
        correctOption: "B"
      },
    ]
  },
  "10": {
    id: "10",
    title: "Custom IMAT Practice Test 3",
    description:
      "Third comprehensive practice test with entirely new questions covering all IMAT syllabus topics.",
    timeLimit: 100,
    questions: [
      // Reading Comprehension & General Knowledge (4 questions)
      {
        id: "q1_10",
        category: "reading",
        text: `Read the passage and answer the question below:\n\nThe CRISPR-Cas9 system represents a revolutionary gene-editing technology that has transformed biological research and therapeutic applications. Originally discovered as part of bacterial adaptive immunity, this system allows precise modification of DNA sequences in living cells. The technology works by using a guide RNA to direct the Cas9 nuclease to specific genomic locations, where it creates double-strand breaks that can be repaired through various cellular mechanisms, enabling targeted insertions, deletions, or substitutions.\n\nAccording to the passage, what is the primary mechanism by which CRISPR-Cas9 achieves gene editing?`,
        options: [
          { id: "A", text: "By preventing RNA transcription at target sites" },
          { id: "B", text: "By using guide RNA to direct nuclease activity to specific DNA sequences" },
          { id: "C", text: "By permanently silencing genes through methylation" },
          { id: "D", text: "By replacing entire chromosomes with modified versions" },
          { id: "E", text: "By activating cellular apoptosis pathways" }
        ],
        correctOption: "B"
      },
      {
        id: "q2_10",
        category: "reading",
        text: `Read the passage and answer the question below:\n\nThe Human Genome Project, completed in 2003, marked a pivotal moment in genomic medicine. However, subsequent research has revealed that understanding gene function requires more than just sequence information. Epigenetic modifications—chemical changes to DNA and histones that do not alter the underlying sequence—play crucial roles in gene regulation and disease development. These modifications can be influenced by environmental factors and may be heritable across generations.\n\nWhat does the passage suggest about the relationship between genomic sequence and gene function?`,
        options: [
          { id: "A", text: "Gene sequence alone is sufficient to understand all biological functions" },
          { id: "B", text: "Epigenetic modifications are more important than DNA sequence" },
          { id: "C", text: "Environmental factors cannot influence gene expression" },
          { id: "D", text: "Gene function depends on both sequence and epigenetic modifications" },
          { id: "E", text: "The Human Genome Project was scientifically invalid" }
        ],
        correctOption: "D"
      },
      {
        id: "q3_10",
        category: "reading",
        text: "Which Nobel Prize-winning technique revolutionized protein structure determination by enabling atomic-resolution imaging of biological macromolecules?",
        options: [
          { id: "A", text: "Polymerase chain reaction (PCR)" },
          { id: "B", text: "X-ray crystallography" },
          { id: "C", text: "Electron microscopy" },
          { id: "D", text: "Nuclear magnetic resonance (NMR)" },
          { id: "E", text: "Mass spectrometry" }
        ],
        correctOption: "B"
      },
      {
        id: "q4_10",
        category: "reading",
        text: "The discovery of which cellular organelle led to the endosymbiotic theory explaining the evolution of eukaryotic cells?",
        options: [
          { id: "A", text: "Nucleus" },
          { id: "B", text: "Endoplasmic reticulum" },
          { id: "C", text: "Mitochondria" },
          { id: "D", text: "Golgi apparatus" },
          { id: "E", text: "Lysosomes" }
        ],
        correctOption: "C"
      },

      // Logical Reasoning (5 questions)
      {
        id: "q5_10",
        category: "logical_reasoning",
        text: "Complete the sequence: 1, 4, 9, 16, 25, ?",
        options: [
          { id: "A", text: "30" },
          { id: "B", text: "35" },
          { id: "C", text: "36" },
          { id: "D", text: "49" },
          { id: "E", text: "64" }
        ],
        correctOption: "C"
      },
      {
        id: "q6_10",
        category: "logical_reasoning",
        text: "All physicians are educated. Some educated people are researchers. Therefore, which conclusion follows logically?",
        options: [
          { id: "A", text: "All researchers are physicians" },
          { id: "B", text: "Some physicians might be researchers" },
          { id: "C", text: "No physicians are researchers" },
          { id: "D", text: "All educated people are physicians" },
          { id: "E", text: "All physicians are researchers" }
        ],
        correctOption: "B"
      },
      {
        id: "q7_10",
        category: "logical_reasoning",
        text: "In a medical trial, 80 patients receive treatment A, 60 receive treatment B, and 20 receive both treatments. How many patients participated in the trial in total?",
        options: [
          { id: "A", text: "100" },
          { id: "B", text: "120" },
          { id: "C", text: "140" },
          { id: "D", text: "160" },
          { id: "E", text: "180" }
        ],
        correctOption: "B"
      },
      {
        id: "q8_10",
        category: "logical_reasoning",
        text: "A medical device costs €450. If the price increases by 20% and then decreases by 15%, what is the final price?",
        options: [
          { id: "A", text: "€450" },
          { id: "B", text: "€459" },
          { id: "C", text: "€468" },
          { id: "D", text: "€477" },
          { id: "E", text: "€486" }
        ],
        correctOption: "B"
      },
      {
        id: "q9_10",
        category: "logical_reasoning",
        text: "If the following is true: 'All antibiotics are antimicrobials, and penicillin is an antibiotic,' which statement must also be true?",
        options: [
          { id: "A", text: "All antimicrobials are antibiotics" },
          { id: "B", text: "Penicillin is an antimicrobial" },
          { id: "C", text: "Some antimicrobials are not antibiotics" },
          { id: "D", text: "No antimicrobials are antibiotics" },
          { id: "E", text: "Penicillin is not an antimicrobial" }
        ],
        correctOption: "B"
      },

      // Biology (23 questions)
      {
        id: "q10_10",
        category: "biology",
        text: "Which phase of cellular respiration produces the most ATP molecules per glucose molecule?",
        options: [
          { id: "A", text: "Glycolysis" },
          { id: "B", text: "Citric acid cycle" },
          { id: "C", text: "Electron transport chain" },
          { id: "D", text: "Fermentation" },
          { id: "E", text: "Pentose phosphate pathway" }
        ],
        correctOption: "C"
      },
      {
        id: "q11_10",
        category: "biology",
        text: "During DNA replication, which enzyme is responsible for removing RNA primers and replacing them with DNA?",
        options: [
          { id: "A", text: "DNA polymerase I" },
          { id: "B", text: "DNA polymerase III" },
          { id: "C", text: "Helicase" },
          { id: "D", text: "Ligase" },
          { id: "E", text: "Primase" }
        ],
        correctOption: "A"
      },
      {
        id: "q12_10",
        category: "biology",
        text: "In which phase of mitosis do chromosomes align at the cell's equator?",
        options: [
          { id: "A", text: "Prophase" },
          { id: "B", text: "Metaphase" },
          { id: "C", text: "Anaphase" },
          { id: "D", text: "Telophase" },
          { id: "E", text: "Cytokinesis" }
        ],
        correctOption: "B"
      },
      {
        id: "q13_10",
        category: "biology",
        text: "Which hormone is produced by the beta cells of the pancreatic islets of Langerhans?",
        options: [
          { id: "A", text: "Glucagon" },
          { id: "B", text: "Insulin" },
          { id: "C", text: "Somatostatin" },
          { id: "D", text: "Cortisol" },
          { id: "E", text: "Thyroxine" }
        ],
        correctOption: "B"
      },
      {
        id: "q14_10",
        category: "biology",
        text: "Which type of cell junction allows direct communication between adjacent cells through small channels?",
        options: [
          { id: "A", text: "Tight junctions" },
          { id: "B", text: "Adherens junctions" },
          { id: "C", text: "Gap junctions" },
          { id: "D", text: "Desmosomes" },
          { id: "E", text: "Hemidesmosomes" }
        ],
        correctOption: "C"
      },
      {
        id: "q15_10",
        category: "biology",
        text: "In a cross between two heterozygous individuals (Aa × Aa), what is the probability that their offspring will be homozygous recessive?",
        options: [
          { id: "A", text: "0%" },
          { id: "B", text: "25%" },
          { id: "C", text: "50%" },
          { id: "D", text: "75%" },
          { id: "E", text: "100%" }
        ],
        correctOption: "B"
      },
      {
        id: "q16_10",
        category: "biology",
        text: "Which structure in the nephron is primarily responsible for water reabsorption?",
        options: [
          { id: "A", text: "Glomerulus" },
          { id: "B", text: "Bowman's capsule" },
          { id: "C", text: "Proximal convoluted tubule" },
          { id: "D", text: "Loop of Henle" },
          { id: "E", text: "Distal convoluted tubule" }
        ],
        correctOption: "D"
      },
      {
        id: "q17_10",
        category: "biology",
        text: "Which enzyme catalyzes the first step of glycolysis?",
        options: [
          { id: "A", text: "Phosphofructokinase" },
          { id: "B", text: "Hexokinase" },
          { id: "C", text: "Aldolase" },
          { id: "D", text: "Pyruvate kinase" },
          { id: "E", text: "Glucose-6-phosphate dehydrogenase" }
        ],
        correctOption: "B"
      },
      {
        id: "q18_10",
        category: "biology",
        text: "During photosynthesis, the light-dependent reactions occur in which part of the chloroplast?",
        options: [
          { id: "A", text: "Stroma" },
          { id: "B", text: "Thylakoid membranes" },
          { id: "C", text: "Outer membrane" },
          { id: "D", text: "Inner membrane" },
          { id: "E", text: "Intermembrane space" }
        ],
        correctOption: "B"
      },
      {
        id: "q19_10",
        category: "biology",
        text: "Which cranial nerve controls the muscles of facial expression?",
        options: [
          { id: "A", text: "Trigeminal nerve (V)" },
          { id: "B", text: "Facial nerve (VII)" },
          { id: "C", text: "Glossopharyngeal nerve (IX)" },
          { id: "D", text: "Vagus nerve (X)" },
          { id: "E", text: "Hypoglossal nerve (XII)" }
        ],
        correctOption: "B"
      },
      {
        id: "q20_10",
        category: "biology",
        text: "What is the primary function of the enzyme reverse transcriptase?",
        options: [
          { id: "A", text: "Synthesizing DNA from DNA template" },
          { id: "B", text: "Synthesizing RNA from DNA template" },
          { id: "C", text: "Synthesizing DNA from RNA template" },
          { id: "D", text: "Synthesizing proteins from mRNA" },
          { id: "E", text: "Breaking down DNA into nucleotides" }
        ],
        correctOption: "C"
      },
      {
        id: "q21_10",
        category: "biology",
        text: "Which blood vessel directly supplies oxygenated blood to the heart muscle?",
        options: [
          { id: "A", text: "Pulmonary artery" },
          { id: "B", text: "Pulmonary vein" },
          { id: "C", text: "Coronary artery" },
          { id: "D", text: "Vena cava" },
          { id: "E", text: "Aorta" }
        ],
        correctOption: "C"
      },
      {
        id: "q22_10",
        category: "biology",
        text: "In eukaryotic gene expression, which process occurs in the nucleus?",
        options: [
          { id: "A", text: "Translation" },
          { id: "B", text: "Protein folding" },
          { id: "C", text: "Transcription" },
          { id: "D", text: "Peptide bond formation" },
          { id: "E", text: "tRNA charging" }
        ],
        correctOption: "C"
      },
      {
        id: "q23_10",
        category: "biology",
        text: "Which molecule serves as the primary energy carrier in cellular metabolism?",
        options: [
          { id: "A", text: "NADH" },
          { id: "B", text: "FADH2" },
          { id: "C", text: "ATP" },
          { id: "D", text: "GTP" },
          { id: "E", text: "Coenzyme A" }
        ],
        correctOption: "C"
      },
      {
        id: "q24_10",
        category: "biology",
        text: "During meiosis I, homologous chromosomes separate during which phase?",
        options: [
          { id: "A", text: "Prophase I" },
          { id: "B", text: "Metaphase I" },
          { id: "C", text: "Anaphase I" },
          { id: "D", text: "Telophase I" },
          { id: "E", text: "Interkinesis" }
        ],
        correctOption: "C"
      },
      {
        id: "q25_10",
        category: "biology",
        text: "Which component of blood is primarily responsible for oxygen transport?",
        options: [
          { id: "A", text: "Plasma" },
          { id: "B", text: "White blood cells" },
          { id: "C", text: "Platelets" },
          { id: "D", text: "Red blood cells" },
          { id: "E", text: "Serum proteins" }
        ],
        correctOption: "D"
      },
      {
        id: "q26_10",
        category: "biology",
        text: "What is the role of the enzyme pepsin in digestion?",
        options: [
          { id: "A", text: "Breaking down carbohydrates" },
          { id: "B", text: "Breaking down lipids" },
          { id: "C", text: "Breaking down proteins" },
          { id: "D", text: "Breaking down nucleic acids" },
          { id: "E", text: "Neutralizing stomach acid" }
        ],
        correctOption: "C"
      },
      {
        id: "q27_10",
        category: "biology",
        text: "Which structure connects muscle to bone?",
        options: [
          { id: "A", text: "Ligament" },
          { id: "B", text: "Tendon" },
          { id: "C", text: "Cartilage" },
          { id: "D", text: "Fascia" },
          { id: "E", text: "Synovial membrane" }
        ],
        correctOption: "B"
      },
      {
        id: "q28_10",
        category: "biology",
        text: "In the immune system, which cells are primarily responsible for antibody production?",
        options: [
          { id: "A", text: "T helper cells" },
          { id: "B", text: "Cytotoxic T cells" },
          { id: "C", text: "B cells" },
          { id: "D", text: "Natural killer cells" },
          { id: "E", text: "Macrophages" }
        ],
        correctOption: "C"
      },
      {
        id: "q29_10",
        category: "biology",
        text: "Which plant hormone is primarily responsible for stem elongation and apical dominance?",
        options: [
          { id: "A", text: "Auxin" },
          { id: "B", text: "Cytokinin" },
          { id: "C", text: "Gibberellin" },
          { id: "D", text: "Abscisic acid" },
          { id: "E", text: "Ethylene" }
        ],
        correctOption: "A"
      },
      {
        id: "q30_10",
        category: "biology",
        text: "What is the primary site of protein synthesis in eukaryotic cells?",
        options: [
          { id: "A", text: "Nucleus" },
          { id: "B", text: "Mitochondria" },
          { id: "C", text: "Ribosomes" },
          { id: "D", text: "Golgi apparatus" },
          { id: "E", text: "Endoplasmic reticulum" }
        ],
        correctOption: "C"
      },
      {
        id: "q31_10",
        category: "biology",
        text: "Which process describes the movement of water across a selectively permeable membrane?",
        options: [
          { id: "A", text: "Active transport" },
          { id: "B", text: "Facilitated diffusion" },
          { id: "C", text: "Osmosis" },
          { id: "D", text: "Endocytosis" },
          { id: "E", text: "Exocytosis" }
        ],
        correctOption: "C"
      },
      {
        id: "q32_10",
        category: "biology",
        text: "In population genetics, what does the Hardy-Weinberg principle describe?",
        options: [
          { id: "A", text: "Evolution of species over time" },
          { id: "B", text: "Genetic equilibrium in populations" },
          { id: "C", text: "Natural selection mechanisms" },
          { id: "D", text: "Mutation rates in DNA" },
          { id: "E", text: "Chromosome segregation patterns" }
        ],
        correctOption: "B"
      },

      // Chemistry (15 questions)
      {
        id: "q33_10",
        category: "chemistry",
        text: "What is the molecular geometry of methane (CH₄)?",
        options: [
          { id: "A", text: "Linear" },
          { id: "B", text: "Trigonal planar" },
          { id: "C", text: "Tetrahedral" },
          { id: "D", text: "Trigonal bipyramidal" },
          { id: "E", text: "Octahedral" }
        ],
        correctOption: "C"
      },
      {
        id: "q34_10",
        category: "chemistry",
        text: "Which element has the highest electronegativity?",
        options: [
          { id: "A", text: "Oxygen" },
          { id: "B", text: "Nitrogen" },
          { id: "C", text: "Fluorine" },
          { id: "D", text: "Chlorine" },
          { id: "E", text: "Carbon" }
        ],
        correctOption: "C"
      },
      {
        id: "q35_10",
        category: "chemistry",
        text: "What is the pH of a 0.001 M solution of HCl?",
        options: [
          { id: "A", text: "1" },
          { id: "B", text: "2" },
          { id: "C", text: "3" },
          { id: "D", text: "4" },
          { id: "E", text: "7" }
        ],
        correctOption: "C"
      },
      {
        id: "q36_10",
        category: "chemistry",
        text: "In the periodic table, which of the following shows the correct trend for atomic radius?",
        options: [
          { id: "A", text: "Increases across a period, decreases down a group" },
          { id: "B", text: "Decreases across a period, increases down a group" },
          { id: "C", text: "Increases across a period, increases down a group" },
          { id: "D", text: "Decreases across a period, decreases down a group" },
          { id: "E", text: "Remains constant across periods and groups" }
        ],
        correctOption: "B"
      },
      {
        id: "q37_10",
        category: "chemistry",
        text: "Which type of intermolecular force is present in hydrogen fluoride (HF)?",
        options: [
          { id: "A", text: "London dispersion forces only" },
          { id: "B", text: "Dipole-dipole interactions only" },
          { id: "C", text: "Hydrogen bonding only" },
          { id: "D", text: "All three: London dispersion, dipole-dipole, and hydrogen bonding" },
          { id: "E", text: "Ionic interactions only" }
        ],
        correctOption: "D"
      },
      {
        id: "q38_10",
        category: "chemistry",
        text: "What is the oxidation state of sulfur in sulfuric acid (H₂SO₄)?",
        options: [
          { id: "A", text: "+2" },
          { id: "B", text: "+4" },
          { id: "C", text: "+6" },
          { id: "D", text: "-2" },
          { id: "E", text: "0" }
        ],
        correctOption: "C"
      },
      {
        id: "q39_10",
        category: "chemistry",
        text: "Which functional group is present in alcohols?",
        options: [
          { id: "A", text: "Carbonyl (C=O)" },
          { id: "B", text: "Hydroxyl (-OH)" },
          { id: "C", text: "Amino (-NH₂)" },
          { id: "D", text: "Carboxyl (-COOH)" },
          { id: "E", text: "Sulfhydryl (-SH)" }
        ],
        correctOption: "B"
      },
      {
        id: "q40_10",
        category: "chemistry",
        text: "At STP, what volume does one mole of any ideal gas occupy?",
        options: [
          { id: "A", text: "11.2 L" },
          { id: "B", text: "22.4 L" },
          { id: "C", text: "33.6 L" },
          { id: "D", text: "44.8 L" },
          { id: "E", text: "6.02 L" }
        ],
        correctOption: "B"
      },
      {
        id: "q41_10",
        category: "chemistry",
        text: "Which statement about catalysts is correct?",
        options: [
          { id: "A", text: "They are consumed in the reaction" },
          { id: "B", text: "They increase the activation energy" },
          { id: "C", text: "They change the equilibrium constant" },
          { id: "D", text: "They lower the activation energy" },
          { id: "E", text: "They shift the equilibrium position" }
        ],
        correctOption: "D"
      },
      {
        id: "q42_10",
        category: "chemistry",
        text: "What is the electron configuration of a neutral chlorine atom (Cl, atomic number 17)?",
        options: [
          { id: "A", text: "1s² 2s² 2p⁶ 3s² 3p⁵" },
          { id: "B", text: "1s² 2s² 2p⁶ 3s² 3p⁶" },
          { id: "C", text: "1s² 2s² 2p⁶ 3s¹ 3p⁶" },
          { id: "D", text: "1s² 2s² 2p⁶ 3s² 3p⁴" },
          { id: "E", text: "1s² 2s² 2p⁵ 3s² 3p⁶" }
        ],
        correctOption: "A"
      },
      {
        id: "q43_10",
        category: "chemistry",
        text: "In a buffer solution containing equal concentrations of acetic acid (CH₃COOH) and sodium acetate (CH₃COONa), what happens when a small amount of HCl is added?",
        options: [
          { id: "A", text: "The pH increases significantly" },
          { id: "B", text: "The pH decreases significantly" },
          { id: "C", text: "The pH remains relatively constant" },
          { id: "D", text: "The solution becomes neutral" },
          { id: "E", text: "All acetate ions are consumed" }
        ],
        correctOption: "C"
      },
      {
        id: "q44_10",
        category: "chemistry",
        text: "Which type of bond is formed when electrons are shared unequally between atoms?",
        options: [
          { id: "A", text: "Ionic bond" },
          { id: "B", text: "Nonpolar covalent bond" },
          { id: "C", text: "Polar covalent bond" },
          { id: "D", text: "Metallic bond" },
          { id: "E", text: "Van der Waals bond" }
        ],
        correctOption: "C"
      },
      {
        id: "q45_10",
        category: "chemistry",
        text: "What is the name of the compound CaCl₂?",
        options: [
          { id: "A", text: "Calcium chlorate" },
          { id: "B", text: "Calcium chlorite" },
          { id: "C", text: "Calcium chloride" },
          { id: "D", text: "Calcium hypochlorite" },
          { id: "E", text: "Calcium perchlorate" }
        ],
        correctOption: "C"
      },
      {
        id: "q46_10",
        category: "chemistry",
        text: "According to Le Chatelier's principle, what happens to an equilibrium when the temperature is increased for an exothermic reaction?",
        options: [
          { id: "A", text: "The equilibrium shifts to the right" },
          { id: "B", text: "The equilibrium shifts to the left" },
          { id: "C", text: "The equilibrium constant increases" },
          { id: "D", text: "No change occurs" },
          { id: "E", text: "The reaction becomes endothermic" }
        ],
        correctOption: "B"
      },
      {
        id: "q47_10",
        category: "chemistry",
        text: "Which compound is an example of a saturated hydrocarbon?",
        options: [
          { id: "A", text: "Ethene (C₂H₄)" },
          { id: "B", text: "Ethyne (C₂H₂)" },
          { id: "C", text: "Benzene (C₆H₆)" },
          { id: "D", text: "Ethane (C₂H₆)" },
          { id: "E", text: "Cyclohexene (C₆H₁₀)" }
        ],
        correctOption: "D"
      },

      // Physics & Mathematics (13 questions)
      {
        id: "q48_10",
        category: "physics_math",
        text: "A ball is thrown vertically upward with an initial velocity of 20 m/s. What is its velocity after 2 seconds? (g = 10 m/s²)",
        options: [
          { id: "A", text: "0 m/s" },
          { id: "B", text: "10 m/s downward" },
          { id: "C", text: "10 m/s upward" },
          { id: "D", text: "20 m/s downward" },
          { id: "E", text: "40 m/s upward" }
        ],
        correctOption: "A"
      },
      {
        id: "q49_10",
        category: "physics_math",
        text: "What is the resistance of a circuit component if 3 A of current flows through it when 12 V is applied?",
        options: [
          { id: "A", text: "2 Ω" },
          { id: "B", text: "4 Ω" },
          { id: "C", text: "6 Ω" },
          { id: "D", text: "9 Ω" },
          { id: "E", text: "36 Ω" }
        ],
        correctOption: "B"
      },
      {
        id: "q50_10",
        category: "physics_math",
        text: "Two parallel resistors of 6 Ω and 3 Ω are connected in parallel. What is their combined resistance?",
        options: [
          { id: "A", text: "1 Ω" },
          { id: "B", text: "2 Ω" },
          { id: "C", text: "3 Ω" },
          { id: "D", text: "4.5 Ω" },
          { id: "E", text: "9 Ω" }
        ],
        correctOption: "B"
      },
      {
        id: "q51_10",
        category: "physics_math",
        text: "What is the frequency of a wave with a wavelength of 2 m traveling at 10 m/s?",
        options: [
          { id: "A", text: "2 Hz" },
          { id: "B", text: "5 Hz" },
          { id: "C", text: "10 Hz" },
          { id: "D", text: "20 Hz" },
          { id: "E", text: "0.2 Hz" }
        ],
        correctOption: "B"
      },
      {
        id: "q52_10",
        category: "physics_math",
        text: "A 2 kg mass is moving at 4 m/s. What is its kinetic energy?",
        options: [
          { id: "A", text: "8 J" },
          { id: "B", text: "16 J" },
          { id: "C", text: "32 J" },
          { id: "D", text: "4 J" },
          { id: "E", text: "2 J" }
        ],
        correctOption: "B"
      },
      {
        id: "q53_10",
        category: "physics_math",
        text: "Solve for x: 2x + 5 = 15",
        options: [
          { id: "A", text: "x = 5" },
          { id: "B", text: "x = 10" },
          { id: "C", text: "x = 7.5" },
          { id: "D", text: "x = 20" },
          { id: "E", text: "x = 2.5" }
        ],
        correctOption: "A"
      },
      {
        id: "q54_10",
        category: "physics_math",
        text: "What is the derivative of f(x) = x³?",
        options: [
          { id: "A", text: "x²" },
          { id: "B", text: "3x²" },
          { id: "C", text: "3x³" },
          { id: "D", text: "x⁴/4" },
          { id: "E", text: "3" }
        ],
        correctOption: "B"
      },
      {
        id: "q55_10",
        category: "physics_math",
        text: "In a right triangle, if one angle is 30°, what is the measure of the other acute angle?",
        options: [
          { id: "A", text: "30°" },
          { id: "B", text: "45°" },
          { id: "C", text: "60°" },
          { id: "D", text: "90°" },
          { id: "E", text: "120°" }
        ],
        correctOption: "C"
      },
      {
        id: "q56_10",
        category: "physics_math",
        text: "What is the period of a pendulum with a length of 1 m? (g = 10 m/s²)",
        options: [
          { id: "A", text: "1.0 s" },
          { id: "B", text: "1.6 s" },
          { id: "C", text: "2.0 s" },
          { id: "D", text: "3.14 s" },
          { id: "E", text: "6.28 s" }
        ],
        correctOption: "C"
      },
      {
        id: "q57_10",
        category: "physics_math",
        text: "If log₁₀(x) = 2, what is the value of x?",
        options: [
          { id: "A", text: "10" },
          { id: "B", text: "20" },
          { id: "C", text: "100" },
          { id: "D", text: "1000" },
          { id: "E", text: "0.01" }
        ],
        correctOption: "C"
      },
      {
        id: "q58_10",
        category: "physics_math",
        text: "A force of 50 N is applied to move an object 10 m in the direction of the force. How much work is done?",
        options: [
          { id: "A", text: "5 J" },
          { id: "B", text: "50 J" },
          { id: "C", text: "100 J" },
          { id: "D", text: "500 J" },
          { id: "E", text: "5000 J" }
        ],
        correctOption: "D"
      },
      {
        id: "q59_10",
        category: "physics_math",
        text: "What is the probability of getting exactly two heads when flipping a fair coin three times?",
        options: [
          { id: "A", text: "1/8" },
          { id: "B", text: "2/8" },
          { id: "C", text: "3/8" },
          { id: "D", text: "4/8" },
          { id: "E", text: "6/8" }
        ],
        correctOption: "C"
      },
      {
        id: "q60_10",
        category: "physics_math",
        text: "What is the area of a circle with radius 5 cm? (π ≈ 3.14)",
        options: [
          { id: "A", text: "15.7 cm²" },
          { id: "B", text: "31.4 cm²" },
          { id: "C", text: "62.8 cm²" },
          { id: "D", text: "78.5 cm²" },
          { id: "E", text: "157 cm²" }
        ],
        correctOption: "D"
      },
    ]
  },
  "11": {
    id: "11",
    title: "Advanced IMAT Challenge Test",
    description:
      "Highly challenging test with 2018-level difficulty featuring advanced questions across all sections.",
    timeLimit: 100, // minutes
    questions: [
      // Reading Comprehension & General Knowledge (4 questions)
      {
        id: "q1_11",
        category: "reading",
        text: `Read the passage carefully and answer the question below:\n\nThe phenomenon of neuroplasticity challenges the long-held belief that the adult brain is a fixed, immutable structure. Recent advances in neuroimaging have revealed that synaptic connections continue to reorganize throughout life in response to experience, learning, and environmental stimuli. This adaptability is particularly pronounced in response to injury, where surrounding neural tissue may assume functions previously performed by damaged regions. However, the degree of functional recovery varies considerably among individuals and appears to be influenced by factors including age, lesion location, and the timing of rehabilitative interventions. The therapeutic implications are profound: targeted cognitive training protocols may facilitate cortical remapping and enhance recovery outcomes following traumatic brain injury.\n\nWhich statement best captures the central argument of this passage?`,
        options: [
          { id: "A", text: "Neuroimaging technology has revolutionized our understanding of brain function" },
          { id: "B", text: "The adult brain retains capacity for structural and functional adaptation throughout life" },
          { id: "C", text: "Brain injury recovery is primarily determined by the extent of initial damage" },
          { id: "D", text: "Cognitive training is the most effective treatment for traumatic brain injury" },
          { id: "E", text: "Age is the most critical factor determining neuroplastic potential" }
        ],
        correctOption: "B"
      },
      {
        id: "q2_11",
        category: "reading",
        text: `Read the passage and answer the question:\n\nQuantum entanglement represents one of the most counterintuitive phenomena in modern physics, where particles become correlated in such a way that the quantum state of one particle instantaneously determines the state of its entangled partner, regardless of the distance separating them. Einstein famously dismissed this as "spukhafte Fernwirkung" (spooky action at a distance), arguing that hidden variables must account for the apparent correlation. However, Bell's theorem and subsequent experimental validations have demonstrated that no physical theory based on local hidden variables can reproduce all the predictions of quantum mechanics. The implications extend beyond theoretical physics, with quantum entanglement forming the foundation for emerging technologies including quantum cryptography and quantum computing.\n\nAccording to the passage, what was Einstein's primary objection to quantum entanglement?`,
        options: [
          { id: "A", text: "It violated the principles of quantum mechanics" },
          { id: "B", text: "It implied that information could travel faster than light" },
          { id: "C", text: "It suggested that hidden variables must exist to explain the correlations" },
          { id: "D", text: "It contradicted experimental evidence available at the time" },
          { id: "E", text: "It had no practical applications in technology" }
        ],
        correctOption: "C"
      },
      {
        id: "q3_11",
        category: "reading",
        text: "Which of the following scientists is credited with establishing the theoretical framework for electromagnetic radiation and demonstrating the wave nature of light?",
        options: [
          { id: "A", text: "James Clerk Maxwell" },
          { id: "B", text: "Heinrich Hertz" },
          { id: "C", text: "Thomas Young" },
          { id: "D", text: "Michael Faraday" },
          { id: "E", text: "Isaac Newton" }
        ],
        correctOption: "A"
      },
      {
        id: "q4_11",
        category: "reading",
        text: "The discovery of the double helix structure of DNA by Watson and Crick was heavily dependent on X-ray crystallography data obtained by which scientist?",
        options: [
          { id: "A", text: "Linus Pauling" },
          { id: "B", text: "Rosalind Franklin" },
          { id: "C", text: "Maurice Wilkins" },
          { id: "D", text: "Erwin Chargaff" },
          { id: "E", text: "Barbara McClintock" }
        ],
        correctOption: "B"
      },

      // Logical Reasoning (5 questions)
      {
        id: "q5_11",
        category: "logical_reasoning",
        text: "In a clinical trial, 80% of patients receiving treatment A showed improvement, while only 40% of patients receiving treatment B showed improvement. A pharmaceutical executive concludes: 'Treatment A is twice as effective as treatment B.' What assumption is the executive making that may not be justified?",
        options: [
          { id: "A", text: "That the improvement rates are directly comparable between treatments" },
          { id: "B", text: "That both treatment groups had identical baseline characteristics" },
          { id: "C", text: "That the definition of 'improvement' was consistent across both groups" },
          { id: "D", text: "That the study was conducted under controlled conditions" },
          { id: "E", text: "All of the above assumptions may be unjustified" }
        ],
        correctOption: "E"
      },
      {
        id: "q6_11",
        category: "logical_reasoning",
        text: "A sequence follows the pattern: 3, 8, 18, 38, 78, ?. What is the next number?",
        options: [
          { id: "A", text: "158" },
          { id: "B", text: "156" },
          { id: "C", text: "162" },
          { id: "D", text: "164" },
          { id: "E", text: "168" }
        ],
        correctOption: "A" // Pattern: multiply by 2 and add 2: 3×2+2=8, 8×2+2=18, 18×2+2=38, 38×2+2=78, 78×2+2=158
      },
      {
        id: "q7_11",
        category: "logical_reasoning",
        text: "All cardiologists are physicians. Some physicians specialize in pediatrics. Some pediatric specialists work in research hospitals. If these statements are true, which of the following must also be true?",
        options: [
          { id: "A", text: "All cardiologists work in research hospitals" },
          { id: "B", text: "Some cardiologists specialize in pediatrics" },
          { id: "C", text: "All physicians in research hospitals are pediatric specialists" },
          { id: "D", text: "Some physicians work in research hospitals" },
          { id: "E", text: "None of the above must be true" }
        ],
        correctOption: "E"
      },
      {
        id: "q8_11",
        category: "logical_reasoning",
        text: "If the probability of a patient having disease X is 0.01, and a diagnostic test has a sensitivity of 95% and specificity of 98%, what is the approximate positive predictive value of the test?",
        options: [
          { id: "A", text: "32%" },
          { id: "B", text: "48%" },
          { id: "C", text: "76%" },
          { id: "D", text: "95%" },
          { id: "E", text: "98%" }
        ],
        correctOption: "A" // Using Bayes' theorem: PPV = (sensitivity × prevalence) / [(sensitivity × prevalence) + (1-specificity) × (1-prevalence)]
      },
      {
        id: "q9_11",
        category: "logical_reasoning",
        text: "A medical research study claims: 'Patients who exercise regularly have a 40% lower risk of cardiovascular disease.' What additional information would be most critical to evaluate this claim?",
        options: [
          { id: "A", text: "The sample size of the study" },
          { id: "B", text: "Whether the study controlled for confounding variables like diet and smoking" },
          { id: "C", text: "The statistical significance of the results" },
          { id: "D", text: "The duration of the follow-up period" },
          { id: "E", text: "The demographic characteristics of participants" }
        ],
        correctOption: "B"
      },

      // Biology (23 questions)
      {
        id: "q10_11",
        category: "biology",
        text: "During oxidative phosphorylation, the electrochemical gradient established across the inner mitochondrial membrane drives ATP synthesis. Which of the following best describes the mechanism by which this gradient is utilized?",
        options: [
          { id: "A", text: "Protons flow through ATP synthase, causing conformational changes that facilitate ATP synthesis" },
          { id: "B", text: "Electrons directly reduce ADP to ATP in the presence of inorganic phosphate" },
          { id: "C", text: "The gradient provides energy for substrate-level phosphorylation" },
          { id: "D", text: "Oxygen acts as the final electron acceptor in ATP synthesis" },
          { id: "E", text: "NADH is directly converted to ATP through the gradient" }
        ],
        correctOption: "A"
      },
      {
        id: "q11_11",
        category: "biology",
        text: "In eukaryotic transcription, which of the following accurately describes the role of enhancer sequences?",
        options: [
          { id: "A", text: "They must be located immediately adjacent to the promoter to function" },
          { id: "B", text: "They bind RNA polymerase II directly to initiate transcription" },
          { id: "C", text: "They can function at great distances from the gene they regulate through DNA looping" },
          { id: "D", text: "They are exclusively found in the 5' untranslated region of genes" },
          { id: "E", text: "They function only during DNA replication" }
        ],
        correctOption: "C"
      },
      {
        id: "q12_11",
        category: "biology",
        text: "The phenomenon of genetic imprinting results in differential gene expression depending on the parent of origin. This is primarily mediated by:",
        options: [
          { id: "A", text: "Differences in DNA sequence between maternal and paternal alleles" },
          { id: "B", text: "Epigenetic modifications such as DNA methylation and histone modifications" },
          { id: "C", text: "X-chromosome inactivation mechanisms" },
          { id: "D", text: "Differences in chromosome structure between parents" },
          { id: "E", text: "Preferential replication of parental chromosomes" }
        ],
        correctOption: "B"
      },
      {
        id: "q13_11",
        category: "biology",
        text: "In the complement cascade, which pathway is activated by the binding of C1 complex to antigen-antibody complexes?",
        options: [
          { id: "A", text: "Classical pathway" },
          { id: "B", text: "Alternative pathway" },
          { id: "C", text: "Lectin pathway" },
          { id: "D", text: "Terminal pathway" },
          { id: "E", text: "Membrane attack complex pathway" }
        ],
        correctOption: "A"
      },
      {
        id: "q14_11",
        category: "biology",
        text: "During meiosis I, homologous chromosomes fail to separate properly in a process called nondisjunction. If this occurs during the formation of gametes, what is the most likely consequence?",
        options: [
          { id: "A", text: "Formation of gametes with normal chromosome number" },
          { id: "B", text: "Production of aneuploid gametes (n+1 or n-1)" },
          { id: "C", text: "Complete sterility of the organism" },
          { id: "D", text: "Formation of polyploid gametes (2n)" },
          { id: "E", text: "No effect on gamete chromosome number" }
        ],
        correctOption: "B"
      },
      {
        id: "q15_11",
        category: "biology",
        text: "Which enzyme is responsible for the synthesis of RNA primers during DNA replication?",
        options: [
          { id: "A", text: "DNA polymerase I" },
          { id: "B", text: "DNA polymerase III" },
          { id: "C", text: "Primase" },
          { id: "D", text: "Helicase" },
          { id: "E", text: "Ligase" }
        ],
        correctOption: "C"
      },
      {
        id: "q16_11",
        category: "biology",
        text: "In signal transduction, second messengers amplify the initial signal. Which of the following is NOT a common second messenger?",
        options: [
          { id: "A", text: "Cyclic adenosine monophosphate (cAMP)" },
          { id: "B", text: "Calcium ions (Ca²⁺)" },
          { id: "C", text: "Inositol 1,4,5-trisphosphate (IP₃)" },
          { id: "D", text: "Diacylglycerol (DAG)" },
          { id: "E", text: "Adenosine triphosphate (ATP)" }
        ],
        correctOption: "E"
      },
      {
        id: "q17_11",
        category: "biology",
        text: "The Hardy-Weinberg principle assumes several conditions. Which of the following would violate these assumptions and cause allele frequencies to change?",
        options: [
          { id: "A", text: "Random mating within the population" },
          { id: "B", text: "Large population size" },
          { id: "C", text: "Gene flow from neighboring populations" },
          { id: "D", text: "Absence of mutations" },
          { id: "E", text: "No selection pressure" }
        ],
        correctOption: "C"
      },
      {
        id: "q18_11",
        category: "biology",
        text: "In plants, the process of photorespiration occurs when:",
        options: [
          { id: "A", text: "CO₂ concentrations are high and O₂ concentrations are low" },
          { id: "B", text: "O₂ concentrations are high and CO₂ concentrations are low" },
          { id: "C", text: "Light intensity is extremely high" },
          { id: "D", text: "Temperature is below optimal range" },
          { id: "E", text: "Water availability is limited" }
        ],
        correctOption: "B"
      },
      {
        id: "q19_11",
        category: "biology",
        text: "Which of the following best describes the difference between prokaryotic and eukaryotic ribosomes?",
        options: [
          { id: "A", text: "Prokaryotic ribosomes are 80S while eukaryotic ribosomes are 70S" },
          { id: "B", text: "Prokaryotic ribosomes are 70S while eukaryotic ribosomes are 80S" },
          { id: "C", text: "Both are 80S but differ in protein composition" },
          { id: "D", text: "Prokaryotic ribosomes lack rRNA components" },
          { id: "E", text: "There is no significant difference between them" }
        ],
        correctOption: "B"
      },
      {
        id: "q20_11",
        category: "biology",
        text: "The process of apoptosis is characterized by all of the following EXCEPT:",
        options: [
          { id: "A", text: "DNA fragmentation" },
          { id: "B", text: "Cell membrane blebbing" },
          { id: "C", text: "Activation of caspase enzymes" },
          { id: "D", text: "Rapid cell swelling and membrane rupture" },
          { id: "E", text: "Phosphatidylserine exposure on cell surface" }
        ],
        correctOption: "D"
      },
      {
        id: "q21_11",
        category: "biology",
        text: "In the electron transport chain, which complex pumps the most protons across the inner mitochondrial membrane per electron pair?",
        options: [
          { id: "A", text: "Complex I (NADH dehydrogenase)" },
          { id: "B", text: "Complex II (succinate dehydrogenase)" },
          { id: "C", text: "Complex III (cytochrome bc₁ complex)" },
          { id: "D", text: "Complex IV (cytochrome c oxidase)" },
          { id: "E", text: "All complexes pump the same number" }
        ],
        correctOption: "A"
      },
      {
        id: "q22_11",
        category: "biology",
        text: "The lac operon in E. coli is an example of negative regulation. In the presence of lactose and absence of glucose, which of the following occurs?",
        options: [
          { id: "A", text: "The lac repressor binds to the operator and blocks transcription" },
          { id: "B", text: "CAP-cAMP complex prevents RNA polymerase binding" },
          { id: "C", text: "Allolactose binds to the repressor, preventing it from binding to the operator" },
          { id: "D", text: "The lac genes are permanently turned off" },
          { id: "E", text: "Glucose activates the lac operon directly" }
        ],
        correctOption: "C"
      },
      {
        id: "q23_11",
        category: "biology",
        text: "Which of the following statements about enzyme kinetics is most accurate?",
        options: [
          { id: "A", text: "Km represents the maximum velocity of the enzyme" },
          { id: "B", text: "Vmax is achieved when substrate concentration equals Km" },
          { id: "C", text: "Km is the substrate concentration at which the reaction velocity is half of Vmax" },
          { id: "D", text: "Competitive inhibitors change both Km and Vmax" },
          { id: "E", text: "Non-competitive inhibitors only affect Km" }
        ],
        correctOption: "C"
      },
      {
        id: "q24_11",
        category: "biology",
        text: "In adaptive immunity, which cells are primarily responsible for antigen presentation to naive T cells?",
        options: [
          { id: "A", text: "B cells only" },
          { id: "B", text: "Dendritic cells, macrophages, and B cells" },
          { id: "C", text: "Natural killer cells" },
          { id: "D", text: "Neutrophils" },
          { id: "E", text: "Plasma cells" }
        ],
        correctOption: "B"
      },
      {
        id: "q25_11",
        category: "biology",
        text: "The sliding filament model of muscle contraction involves:",
        options: [
          { id: "A", text: "Actin and myosin filaments changing length during contraction" },
          { id: "B", text: "Actin filaments sliding past myosin filaments without changing filament length" },
          { id: "C", text: "Only myosin filaments moving during contraction" },
          { id: "D", text: "Calcium binding directly to actin" },
          { id: "E", text: "ATP hydrolysis causing filament elongation" }
        ],
        correctOption: "B"
      },
      {
        id: "q26_11",
        category: "biology",
        text: "Which hormone is primarily responsible for regulating blood calcium levels by promoting calcium reabsorption in the kidneys and calcium absorption in the intestines?",
        options: [
          { id: "A", text: "Calcitonin" },
          { id: "B", text: "Parathyroid hormone (PTH)" },
          { id: "C", text: "Aldosterone" },
          { id: "D", text: "Insulin" },
          { id: "E", text: "Cortisol" }
        ],
        correctOption: "B"
      },
      {
        id: "q27_11",
        category: "biology",
        text: "During translation initiation in eukaryotes, which ribosomal subunit first binds to the mRNA?",
        options: [
          { id: "A", text: "60S large subunit" },
          { id: "B", text: "40S small subunit" },
          { id: "C", text: "Both subunits bind simultaneously" },
          { id: "D", text: "80S ribosome binds as a complete unit" },
          { id: "E", text: "30S small subunit" }
        ],
        correctOption: "B"
      },
      {
        id: "q28_11",
        category: "biology",
        text: "In the kidney, the majority of glucose reabsorption occurs in which part of the nephron?",
        options: [
          { id: "A", text: "Glomerulus" },
          { id: "B", text: "Proximal convoluted tubule" },
          { id: "C", text: "Loop of Henle" },
          { id: "D", text: "Distal convoluted tubule" },
          { id: "E", text: "Collecting duct" }
        ],
        correctOption: "B"
      },
      {
        id: "q29_11",
        category: "biology",
        text: "Which of the following best explains why C4 plants have an advantage over C3 plants in hot, dry conditions?",
        options: [
          { id: "A", text: "C4 plants use less water for photosynthesis" },
          { id: "B", text: "C4 plants have a mechanism to concentrate CO₂ and reduce photorespiration" },
          { id: "C", text: "C4 plants can photosynthesize without light" },
          { id: "D", text: "C4 plants produce more oxygen than C3 plants" },
          { id: "E", text: "C4 plants have deeper root systems" }
        ],
        correctOption: "B"
      },
      {
        id: "q30_11",
        category: "biology",
        text: "The polymerase chain reaction (PCR) requires repeated cycles of heating and cooling. What is the purpose of the denaturation step at ~95°C?",
        options: [
          { id: "A", text: "To activate the DNA polymerase enzyme" },
          { id: "B", text: "To allow primers to bind to template DNA" },
          { id: "C", text: "To separate the two strands of double-stranded DNA" },
          { id: "D", text: "To synthesize new DNA strands" },
          { id: "E", text: "To prevent contamination" }
        ],
        correctOption: "C"
      },
      {
        id: "q31_11",
        category: "biology",
        text: "In humans, ABO blood type is determined by multiple alleles. An individual with type AB blood has which genotype?",
        options: [
          { id: "A", text: "I^A I^A" },
          { id: "B", text: "I^B I^B" },
          { id: "C", text: "I^A I^B" },
          { id: "D", text: "I^A i" },
          { id: "E", text: "I^B i" }
        ],
        correctOption: "C"
      },
      {
        id: "q32_11",
        category: "biology",
        text: "Which of the following processes occurs during the S phase of the cell cycle?",
        options: [
          { id: "A", text: "Chromosome condensation" },
          { id: "B", text: "Nuclear envelope breakdown" },
          { id: "C", text: "DNA replication" },
          { id: "D", text: "Spindle formation" },
          { id: "E", text: "Cytokinesis" }
        ],
        correctOption: "C"
      },

      // Chemistry (15 questions)
      {
        id: "q33_11",
        category: "chemistry",
        text: "Which of the following molecular geometries is predicted for a molecule with the formula AX₂E₂ (where A is the central atom, X represents bonded atoms, and E represents lone pairs)?",
        options: [
          { id: "A", text: "Tetrahedral" },
          { id: "B", text: "Bent (angular)" },
          { id: "C", text: "Linear" },
          { id: "D", text: "Trigonal planar" },
          { id: "E", text: "Trigonal pyramidal" }
        ],
        correctOption: "B"
      },
      {
        id: "q34_11",
        category: "chemistry",
        text: "In the reaction mechanism for the SN2 substitution, which statement is most accurate?",
        options: [
          { id: "A", text: "The reaction proceeds through a carbocation intermediate" },
          { id: "B", text: "The nucleophile attacks simultaneously as the leaving group departs" },
          { id: "C", text: "The reaction rate depends only on the concentration of the substrate" },
          { id: "D", text: "Tertiary substrates react faster than primary substrates" },
          { id: "E", text: "The stereochemistry is retained during the reaction" }
        ],
        correctOption: "B"
      },
      {
        id: "q35_11",
        category: "chemistry",
        text: "For the equilibrium N₂O₄(g) ⇌ 2NO₂(g), ΔH° = +57 kJ/mol. According to Le Chatelier's principle, increasing the temperature will:",
        options: [
          { id: "A", text: "Shift the equilibrium to the left and decrease Kc" },
          { id: "B", text: "Shift the equilibrium to the right and increase Kc" },
          { id: "C", text: "Shift the equilibrium to the left and increase Kc" },
          { id: "D", text: "Have no effect on the equilibrium position" },
          { id: "E", text: "Shift the equilibrium to the right and decrease Kc" }
        ],
        correctOption: "B"
      },
      {
        id: "q36_11",
        category: "chemistry",
        text: "Which of the following best explains why fluorine has the highest electronegativity among all elements?",
        options: [
          { id: "A", text: "It has the largest atomic radius" },
          { id: "B", text: "It has the highest ionization energy" },
          { id: "C", text: "It has a small atomic radius and high nuclear charge relative to its electron shielding" },
          { id: "D", text: "It has the most electron shells" },
          { id: "E", text: "It forms the strongest metallic bonds" }
        ],
        correctOption: "C"
      },
      {
        id: "q37_11",
        category: "chemistry",
        text: "In a buffer solution containing CH₃COOH and CH₃COONa, what happens when a small amount of strong acid (HCl) is added?",
        options: [
          { id: "A", text: "The acetate ion (CH₃COO⁻) reacts with H⁺ to form acetic acid" },
          { id: "B", text: "The acetic acid dissociates completely to neutralize the acid" },
          { id: "C", text: "The pH drops dramatically" },
          { id: "D", text: "Sodium chloride precipitates from solution" },
          { id: "E", text: "The buffer becomes more basic" }
        ],
        correctOption: "A"
      },
      {
        id: "q38_11",
        category: "chemistry",
        text: "Which of the following represents the correct electron configuration for Fe³⁺ (iron in the +3 oxidation state)?",
        options: [
          { id: "A", text: "[Ar] 3d⁶" },
          { id: "B", text: "[Ar] 3d⁵" },
          { id: "C", text: "[Ar] 3d⁴ 4s¹" },
          { id: "D", text: "[Ar] 3d³ 4s²" },
          { id: "E", text: "[Ar] 4s² 3d³" }
        ],
        correctOption: "B"
      },
      {
        id: "q39_11",
        category: "chemistry",
        text: "The rate law for a reaction is Rate = k[A]²[B]. If the concentration of A is doubled and the concentration of B is tripled, by what factor does the reaction rate increase?",
        options: [
          { id: "A", text: "6" },
          { id: "B", text: "9" },
          { id: "C", text: "12" },
          { id: "D", text: "18" },
          { id: "E", text: "36" }
        ],
        correctOption: "C" // Rate increases by 2² × 3¹ = 4 × 3 = 12
      },
      {
        id: "q40_11",
        category: "chemistry",
        text: "Which intermolecular force is primarily responsible for the relatively high boiling point of water compared to other molecules of similar molecular weight?",
        options: [
          { id: "A", text: "Van der Waals forces" },
          { id: "B", text: "Dipole-dipole interactions" },
          { id: "C", text: "Hydrogen bonding" },
          { id: "D", text: "Ionic bonding" },
          { id: "E", text: "Metallic bonding" }
        ],
        correctOption: "C"
      },
      {
        id: "q41_11",
        category: "chemistry",
        text: "For the redox reaction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O, what is the oxidation state of manganese in MnO₄⁻?",
        options: [
          { id: "A", text: "+3" },
          { id: "B", text: "+5" },
          { id: "C", text: "+6" },
          { id: "D", text: "+7" },
          { id: "E", text: "+8" }
        ],
        correctOption: "D"
      },
      {
        id: "q42_11",
        category: "chemistry",
        text: "Which of the following compounds would be expected to have the highest melting point?",
        options: [
          { id: "A", text: "NaCl" },
          { id: "B", text: "MgO" },
          { id: "C", text: "CaF₂" },
          { id: "D", text: "KI" },
          { id: "E", text: "LiF" }
        ],
        correctOption: "B" // MgO has the highest lattice energy due to small highly charged ions (Mg²⁺, O²⁻)
      },
      {
        id: "q43_11",
        category: "chemistry",
        text: "In organic chemistry, which reagent would most effectively convert a primary alcohol to an aldehyde without over-oxidation to a carboxylic acid?",
        options: [
          { id: "A", text: "KMnO₄" },
          { id: "B", text: "K₂Cr₂O₇/H₂SO₄" },
          { id: "C", text: "PCC (pyridinium chlorochromate)" },
          { id: "D", text: "Na₂Cr₂O₇" },
          { id: "E", text: "Concentrated HNO₃" }
        ],
        correctOption: "C"
      },
      {
        id: "q44_11",
        category: "chemistry",
        text: "A solution has a pH of 3.5. What is the concentration of hydroxide ions [OH⁻] in this solution at 25°C?",
        options: [
          { id: "A", text: "3.2 × 10⁻¹¹ M" },
          { id: "B", text: "3.2 × 10⁻⁴ M" },
          { id: "C", text: "1.0 × 10⁻¹⁰⁻⁵ M" },
          { id: "D", text: "3.5 × 10⁻¹⁴ M" },
          { id: "E", text: "1.0 × 10⁻³⁻⁵ M" }
        ],
        correctOption: "A" // pOH = 14 - 3.5 = 10.5, so [OH⁻] = 10^(-10.5) = 3.2 × 10⁻¹¹ M
      },
      {
        id: "q45_11",
        category: "chemistry",
        text: "Which of the following statements about catalysts is most accurate?",
        options: [
          { id: "A", text: "Catalysts increase the equilibrium constant of a reaction" },
          { id: "B", text: "Catalysts are consumed during the reaction" },
          { id: "C", text: "Catalysts lower the activation energy for both forward and reverse reactions" },
          { id: "D", text: "Catalysts change the enthalpy change (ΔH) of the reaction" },
          { id: "E", text: "Catalysts only affect the rate of the forward reaction" }
        ],
        correctOption: "C"
      },
      {
        id: "q46_11",
        category: "chemistry",
        text: "For the isotope ²³⁸U, how many neutrons are present in the nucleus?",
        options: [
          { id: "A", text: "92" },
          { id: "B", text: "146" },
          { id: "C", text: "238" },
          { id: "D", text: "330" },
          { id: "E", text: "184" }
        ],
        correctOption: "B" // Neutrons = Mass number - Atomic number = 238 - 92 = 146
      },
      {
        id: "q47_11",
        category: "chemistry",
        text: "Which of the following molecules exhibits resonance structures?",
        options: [
          { id: "A", text: "CH₄" },
          { id: "B", text: "NH₃" },
          { id: "C", text: "SO₃" },
          { id: "D", text: "H₂O" },
          { id: "E", text: "CCl₄" }
        ],
        correctOption: "C"
      },

      // Physics & Mathematics (13 questions)
      {
        id: "q48_11",
        category: "physics_math",
        text: "A particle undergoes simple harmonic motion with amplitude A and angular frequency ω. At what displacement from equilibrium is the kinetic energy equal to the potential energy?",
        options: [
          { id: "A", text: "A/4" },
          { id: "B", text: "A/2" },
          { id: "C", text: "A/√2" },
          { id: "D", text: "A/√3" },
          { id: "E", text: "2A/3" }
        ],
        correctOption: "C" // At equilibrium: KE = ½mv² = ½mω²(A² - x²), PE = ½kx² = ½mω²x². Setting equal: A² - x² = x², so x = A/√2
      },
      {
        id: "q49_11",
        category: "physics_math",
        text: "In the photoelectric effect, the maximum kinetic energy of emitted electrons depends on:",
        options: [
          { id: "A", text: "The intensity of the incident light only" },
          { id: "B", text: "The frequency of the incident light only" },
          { id: "C", text: "Both the intensity and frequency of the incident light" },
          { id: "D", text: "The work function of the material only" },
          { id: "E", text: "The frequency of the incident light and the work function of the material" }
        ],
        correctOption: "E"
      },
      {
        id: "q50_11",
        category: "physics_math",
        text: "A capacitor C is connected in series with a resistor R to a DC voltage source V. What is the time constant of this RC circuit?",
        options: [
          { id: "A", text: "R/C" },
          { id: "B", text: "RC" },
          { id: "C", text: "C/R" },
          { id: "D", text: "1/(RC)" },
          { id: "E", text: "√(RC)" }
        ],
        correctOption: "B"
      },
      {
        id: "q51_11",
        category: "physics_math",
        text: "A conducting loop moves through a non-uniform magnetic field. According to Faraday's law, the induced EMF is proportional to:",
        options: [
          { id: "A", text: "The magnetic field strength" },
          { id: "B", text: "The area of the loop" },
          { id: "C", text: "The velocity of the loop" },
          { id: "D", text: "The rate of change of magnetic flux through the loop" },
          { id: "E", text: "The resistance of the loop" }
        ],
        correctOption: "D"
      },
      {
        id: "q52_11",
        category: "physics_math",
        text: "In a double-slit experiment, if the wavelength of light is increased while keeping the slit separation and screen distance constant, what happens to the fringe spacing?",
        options: [
          { id: "A", text: "Increases" },
          { id: "B", text: "Decreases" },
          { id: "C", text: "Remains the same" },
          { id: "D", text: "First increases then decreases" },
          { id: "E", text: "Becomes zero" }
        ],
        correctOption: "A"
      },
      {
        id: "q53_11",
        category: "physics_math",
        text: "What is the derivative of f(x) = ln(cos(x)) with respect to x?",
        options: [
          { id: "A", text: "-sin(x)" },
          { id: "B", text: "-tan(x)" },
          { id: "C", text: "tan(x)" },
          { id: "D", text: "sin(x)/cos(x)" },
          { id: "E", text: "1/sin(x)" }
        ],
        correctOption: "B" // d/dx[ln(cos(x))] = (1/cos(x)) × (-sin(x)) = -sin(x)/cos(x) = -tan(x)
      },
      {
        id: "q54_11",
        category: "physics_math",
        text: "A projectile is launched at an angle θ to the horizontal with initial speed v₀. What is the maximum height reached?",
        options: [
          { id: "A", text: "v₀²sin²θ / (2g)" },
          { id: "B", text: "v₀²cos²θ / (2g)" },
          { id: "C", text: "v₀²sinθ / g" },
          { id: "D", text: "v₀²sin(2θ) / g" },
          { id: "E", text: "v₀² / (2g)" }
        ],
        correctOption: "A"
      },
      {
        id: "q55_11",
        category: "physics_math",
        text: "For the function f(x) = e^(x²), what is the second derivative f''(x)?",
        options: [
          { id: "A", text: "2xe^(x²)" },
          { id: "B", text: "(2 + 4x²)e^(x²)" },
          { id: "C", text: "4x²e^(x²)" },
          { id: "D", text: "2e^(x²)" },
          { id: "E", text: "(4x² + 2x)e^(x²)" }
        ],
        correctOption: "B" // f'(x) = 2xe^(x²), f''(x) = 2e^(x²) + 2x(2xe^(x²)) = 2e^(x²) + 4x²e^(x²) = (2 + 4x²)e^(x²)
      },
      {
        id: "q56_11",
        category: "physics_math",
        text: "A mass m hangs from a spring with spring constant k. The period of oscillation is T = 2π√(m/k). If the mass is quadrupled, how does the period change?",
        options: [
          { id: "A", text: "Doubles" },
          { id: "B", text: "Quadruples" },
          { id: "C", text: "Halves" },
          { id: "D", text: "Remains the same" },
          { id: "E", text: "Increases by a factor of √2" }
        ],
        correctOption: "A" // If m → 4m, then T → 2π√(4m/k) = 2π(2)√(m/k) = 2T
      },
      {
        id: "q57_11",
        category: "physics_math",
        text: "What is the value of the definite integral ∫₀^π sin²(x) dx?",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "π/4" },
          { id: "C", text: "π/2" },
          { id: "D", text: "π" },
          { id: "E", text: "2π" }
        ],
        correctOption: "C" // Using sin²(x) = (1 - cos(2x))/2, integral becomes π/2
      },
      {
        id: "q58_11",
        category: "physics_math",
        text: "In a right-angled triangle, if one angle is 60° and the hypotenuse is 10 cm, what is the length of the side adjacent to the 60° angle?",
        options: [
          { id: "A", text: "5 cm" },
          { id: "B", text: "5√3 cm" },
          { id: "C", text: "10√3 cm" },
          { id: "D", text: "10/√3 cm" },
          { id: "E", text: "5√2 cm" }
        ],
        correctOption: "A" // Adjacent = hypotenuse × cos(60°) = 10 × 0.5 = 5 cm
      },
      {
        id: "q59_11",
        category: "physics_math",
        text: "Two identical capacitors are connected in series and then connected to a battery. How does the energy stored in this configuration compare to a single capacitor connected to the same battery?",
        options: [
          { id: "A", text: "Four times as much" },
          { id: "B", text: "Twice as much" },
          { id: "C", text: "The same" },
          { id: "D", text: "Half as much" },
          { id: "E", text: "One quarter as much" }
        ],
        correctOption: "D" // Equivalent capacitance in series is C/2, so energy = ½(C/2)V² = ¼CV² compared to ½CV² for single capacitor
      },
      {
        id: "q60_11",
        category: "physics_math",
        text: "A Carnot engine operates between two thermal reservoirs at temperatures T₁ = 400 K and T₂ = 300 K. What is the theoretical maximum efficiency of this engine?",
        options: [
          { id: "A", text: "20%" },
          { id: "B", text: "25%" },
          { id: "C", text: "30%" },
          { id: "D", text: "33%" },
          { id: "E", text: "75%" }
        ],
        correctOption: "B" // Efficiency = 1 - T₂/T₁ = 1 - 300/400 = 0.25 = 25%
      }
    ]
  }
} 