'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock test data with actual questions
const mockTests = {
  '1': {
    id: '1',
    title: 'IMAT 2023 Mock Test',
    description: 'Based on the 2023 IMAT exam pattern with similar difficulty level.',
    timeLimit: 100, // minutes
    questions: [
      // Reading Comprehension (2 questions)
      {
        id: 'q1',
        text: `Read the following passage and answer the question below:\n\nThe human genome project was a collaborative research effort aimed at sequencing and mapping all human genes, collectively known as the genome. The project began in 1990 and was initially headed by James Watson. The project was completed in 2003, two years ahead of schedule, and identified approximately 20,500 human genes. The project\'s significance extends beyond gene mapping, having enabled the development of new medical applications, including more accurate diagnostic tests, improved understanding of disease mechanisms, and even targeted therapies based on individual genetic profiles.\n\nAccording to the passage, which of the following statements is correct?`,
        category: 'reading',
        options: [
          { id: 'A', text: 'The human genome project was completed behind schedule' },
          { id: 'B', text: 'James Watson was the sole researcher involved in the project' },
          { id: 'C', text: 'The project identified over 30,000 human genes' },
          { id: 'D', text: 'The project was completed in 2003, two years earlier than planned' },
          { id: 'E', text: 'The human genome project only focused on mapping genes without practical applications' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q2',
        text: `Read the following passage and answer the question below:\n\nPaul Nurse, Tim Hunt, and Leland Hartwell shared the 2001 Nobel Prize in Physiology or Medicine for their discoveries of key regulators of the cell cycle. Their work uncovered how the cell cycle is controlled and identified key regulatory molecules called cyclin-dependent kinases (CDKs). These findings have been crucial for understanding both normal cell division and how it goes awry in diseases like cancer. This fundamental cell cycle knowledge has led to the development of new cancer treatments that target specific steps in the cell cycle.\n\nBased on the passage, which of the following is a direct outcome of the Nobel laureates' work?`,
        category: 'reading',
        options: [
          { id: 'A', text: 'The discovery of DNA\'s double helix structure' },
          { id: 'B', text: 'The identification of cyclin-dependent kinases as cell cycle regulators' },
          { id: 'C', text: 'The development of the first cancer vaccine' },
          { id: 'D', text: 'The sequencing of the human genome' },
          { id: 'E', text: 'The invention of PCR technology' }
        ],
        correctOption: 'B'
      },
      // General Knowledge (2 questions)
      {
        id: 'q3',
        text: 'Which of the following hormones is NOT produced by the anterior pituitary gland?',
        category: 'reading',
        options: [
          { id: 'A', text: 'Growth hormone (GH)' },
          { id: 'B', text: 'Thyroid-stimulating hormone (TSH)' },
          { id: 'C', text: 'Adrenocorticotropic hormone (ACTH)' },
          { id: 'D', text: 'Antidiuretic hormone (ADH)' },
          { id: 'E', text: 'Prolactin (PRL)' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q4',
        text: 'Which of the following scientific achievements was recognized with a Nobel Prize in 2020?',
        category: 'reading',
        options: [
          { id: 'A', text: 'Development of CRISPR-Cas9 gene editing' },
          { id: 'B', text: 'Discovery of the Higgs boson particle' },
          { id: 'C', text: 'Creation of the first COVID-19 vaccine' },
          { id: 'D', text: 'Mapping of the human microbiome' },
          { id: 'E', text: 'Development of quantum computing' }
        ],
        correctOption: 'A'
      },
      // Logical Reasoning (5 questions)
      {
        id: 'q5',
        text: 'Complete the following sequence: 2, 6, 12, 20, 30, ?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '40' },
          { id: 'B', text: '42' },
          { id: 'C', text: '36' },
          { id: 'D', text: '45' },
          { id: 'E', text: '48' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q6',
        text: 'If all Zorks are Morks, and no Morks are Torks, which of the following statements must be true?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: 'All Torks are Zorks' },
          { id: 'B', text: 'Some Morks are Torks' },
          { id: 'C', text: 'No Zorks are Torks' },
          { id: 'D', text: 'Some Zorks are Torks' },
          { id: 'E', text: 'All Morks are Zorks' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q7',
        text: 'A doctor sees 5 patients every hour. How many patients can the doctor see in a 12-hour shift if they take a total of 2 hours for breaks?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '60 patients' },
          { id: 'B', text: '50 patients' },
          { id: 'C', text: '45 patients' },
          { id: 'D', text: '55 patients' },
          { id: 'E', text: '40 patients' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q8',
        text: 'In a class of 35 students, 20 study biology, 15 study chemistry, and 5 study both subjects. How many students study neither biology nor chemistry?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '5 students' },
          { id: 'B', text: '10 students' },
          { id: 'C', text: '15 students' },
          { id: 'D', text: '0 students' },
          { id: 'E', text: '20 students' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q9',
        text: 'If the following statements are true: "All medical students study anatomy" and "Some anatomy students also study physiology," which conclusion can be drawn with certainty?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: 'All physiology students are medical students' },
          { id: 'B', text: 'No medical students study physiology' },
          { id: 'C', text: 'Some medical students may study physiology' },
          { id: 'D', text: 'All medical students study physiology' },
          { id: 'E', text: 'Most anatomy students are medical students' }
        ],
        correctOption: 'C'
      },
      // Biology questions (23 questions) - First 5 shown here
      {
        id: 'q10',
        text: 'Which of the following organelles is responsible for ATP synthesis in eukaryotic cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Golgi apparatus' },
          { id: 'B', text: 'Mitochondria' },
          { id: 'C', text: 'Endoplasmic reticulum' },
          { id: 'D', text: 'Lysosome' },
          { id: 'E', text: 'Peroxisome' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q11',
        text: 'What is the primary function of the enzyme DNA polymerase?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To break down DNA into nucleotides' },
          { id: 'B', text: 'To join RNA fragments during transcription' },
          { id: 'C', text: 'To synthesize new DNA strands during replication' },
          { id: 'D', text: 'To repair damaged proteins' },
          { id: 'E', text: 'To catalyze the formation of peptide bonds' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q12',
        text: 'During which phase of mitosis do sister chromatids separate and move to opposite poles of the cell?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Prophase' },
          { id: 'B', text: 'Metaphase' },
          { id: 'C', text: 'Anaphase' },
          { id: 'D', text: 'Telophase' },
          { id: 'E', text: 'Interphase' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q13',
        text: 'Which of the following is NOT a characteristic of facilitated diffusion?',
        category: 'biology',
        options: [
          { id: 'A', text: 'It requires specific membrane proteins' },
          { id: 'B', text: 'It follows the concentration gradient' },
          { id: 'C', text: 'It does not require ATP' },
          { id: 'D', text: 'It can transport molecules against their concentration gradient' },
          { id: 'E', text: 'It is selective for specific molecules' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q14',
        text: 'In a healthy person, which blood vessels have the highest blood pressure?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Veins' },
          { id: 'B', text: 'Venules' },
          { id: 'C', text: 'Capillaries' },
          { id: 'D', text: 'Arterioles' },
          { id: 'E', text: 'Arteries' }
        ],
        correctOption: 'E'
      },
      {
        id: 'q15',
        text: 'Which of the following statements about enzymes is INCORRECT?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Enzymes lower the activation energy of reactions' },
          { id: 'B', text: 'Enzymes are consumed in the reactions they catalyze' },
          { id: 'C', text: 'Enzyme activity is affected by temperature' },
          { id: 'D', text: 'Enzymes are specific to particular substrates' },
          { id: 'E', text: 'Most enzymes are proteins' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q16',
        text: 'Which structure in neurons is primarily responsible for conducting nerve impulses away from the cell body?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Dendrites' },
          { id: 'B', text: 'Cell body' },
          { id: 'C', text: 'Myelin sheath' },
          { id: 'D', text: 'Axon' },
          { id: 'E', text: 'Nodes of Ranvier' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q17',
        text: 'Which of the following best describes the process of translation in protein synthesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'The conversion of DNA to RNA' },
          { id: 'B', text: 'The movement of mRNA from the nucleus to the cytoplasm' },
          { id: 'C', text: 'The assembly of amino acids into a polypeptide chain' },
          { id: 'D', text: 'The folding of a polypeptide into its tertiary structure' },
          { id: 'E', text: 'The replication of DNA before cell division' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q18',
        text: 'In a dihybrid cross between two heterozygous individuals (AaBb × AaBb), what proportion of offspring would be expected to have the dominant phenotype for both traits?',
        category: 'biology',
        options: [
          { id: 'A', text: '1/16' },
          { id: 'B', text: '3/16' },
          { id: 'C', text: '9/16' },
          { id: 'D', text: '12/16' },
          { id: 'E', text: '15/16' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q19',
        text: 'Which of the following is a function of the lymphatic system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Production of red blood cells' },
          { id: 'B', text: 'Regulation of body temperature' },
          { id: 'C', text: 'Return of excess tissue fluid to the blood' },
          { id: 'D', text: 'Secretion of digestive enzymes' },
          { id: 'E', text: 'Detoxification of drugs and alcohol' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q20',
        text: 'Which of the following is NOT a component of innate immunity?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Physical barriers like skin' },
          { id: 'B', text: 'Inflammatory response' },
          { id: 'C', text: 'Antibody production' },
          { id: 'D', text: 'Phagocytosis by neutrophils' },
          { id: 'E', text: 'Antimicrobial peptides' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q21',
        text: 'In the Calvin cycle of photosynthesis, which molecule directly accepts CO₂?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Glucose' },
          { id: 'B', text: 'Ribulose bisphosphate (RuBP)' },
          { id: 'C', text: 'Phosphoglycerate (PGA)' },
          { id: 'D', text: 'Pyruvate' },
          { id: 'E', text: 'ATP' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q22',
        text: 'Which of the following structures is responsible for producing cerebrospinal fluid (CSF)?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Cerebral cortex' },
          { id: 'B', text: 'Choroid plexus' },
          { id: 'C', text: 'Meninges' },
          { id: 'D', text: 'Corpus callosum' },
          { id: 'E', text: 'Cerebellum' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q23',
        text: 'What is the role of the enzyme carbonic anhydrase in red blood cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Breaking down hemoglobin' },
          { id: 'B', text: 'Converting carbon dioxide to bicarbonate' },
          { id: 'C', text: 'Oxygen transport' },
          { id: 'D', text: 'Iron storage' },
          { id: 'E', text: 'Cell membrane maintenance' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q24',
        text: 'In which part of the human digestive system does the majority of nutrient absorption occur?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Stomach' },
          { id: 'B', text: 'Duodenum' },
          { id: 'C', text: 'Small intestine' },
          { id: 'D', text: 'Large intestine' },
          { id: 'E', text: 'Esophagus' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q25',
        text: 'Which of the following describes the relationship between insulin and glucagon?',
        category: 'biology',
        options: [
          { id: 'A', text: 'They are produced by the same cells in the pancreas' },
          { id: 'B', text: 'They both increase blood glucose levels' },
          { id: 'C', text: 'They have antagonistic effects on blood glucose levels' },
          { id: 'D', text: 'They are both produced in response to high blood glucose' },
          { id: 'E', text: 'They both act primarily on muscle tissue' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q26',
        text: 'Which of the following is NOT a function of the liver?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Detoxification of drugs' },
          { id: 'B', text: 'Production of bile' },
          { id: 'C', text: 'Storage of glycogen' },
          { id: 'D', text: 'Production of insulin' },
          { id: 'E', text: 'Synthesis of plasma proteins' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q27',
        text: 'What is the major difference between DNA and RNA molecules?',
        category: 'biology',
        options: [
          { id: 'A', text: 'DNA contains adenine, while RNA contains guanine' },
          { id: 'B', text: 'DNA is single-stranded, while RNA is double-stranded' },
          { id: 'C', text: 'DNA contains deoxyribose sugar, while RNA contains ribose sugar' },
          { id: 'D', text: 'DNA contains phosphate groups, while RNA does not' },
          { id: 'E', text: 'DNA is found only in the nucleus, while RNA is found only in the cytoplasm' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q28',
        text: 'In the nervous system, what is the function of myelin?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To generate action potentials' },
          { id: 'B', text: 'To increase the speed of nerve impulse conduction' },
          { id: 'C', text: 'To produce neurotransmitters' },
          { id: 'D', text: 'To connect neurons at synapses' },
          { id: 'E', text: 'To provide nutrients to neurons' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q29',
        text: 'Which of the following is the correct sequence in spermatogenesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Spermatogonia → primary spermatocyte → secondary spermatocyte → spermatid → sperm' },
          { id: 'B', text: 'Spermatogonia → spermatid → primary spermatocyte → secondary spermatocyte → sperm' },
          { id: 'C', text: 'Primary spermatocyte → spermatogonia → secondary spermatocyte → spermatid → sperm' },
          { id: 'D', text: 'Spermatogonia → secondary spermatocyte → primary spermatocyte → spermatid → sperm' },
          { id: 'E', text: 'Primary spermatocyte → secondary spermatocyte → spermatogonia → spermatid → sperm' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q30',
        text: 'Which type of muscle tissue is responsible for voluntary movements in the human body?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Smooth muscle' },
          { id: 'B', text: 'Cardiac muscle' },
          { id: 'C', text: 'Skeletal muscle' },
          { id: 'D', text: 'Involuntary muscle' },
          { id: 'E', text: 'Transitional muscle' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q31',
        text: 'Which of the following is a true statement about enzymes?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Enzymes change the equilibrium of reactions' },
          { id: 'B', text: 'Enzymes are consumed during reactions' },
          { id: 'C', text: 'Enzyme activity is independent of pH' },
          { id: 'D', text: 'Enzymes lower the activation energy of reactions' },
          { id: 'E', text: 'Most enzymes are composed of lipids' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q32',
        text: 'What is the primary function of the lymphatic system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Blood cell production' },
          { id: 'B', text: 'Oxygen transport' },
          { id: 'C', text: 'Return of tissue fluid to the circulatory system' },
          { id: 'D', text: 'Regulation of body temperature' },
          { id: 'E', text: 'Filtration of blood' }
        ],
        correctOption: 'C'
      },
      // Chemistry questions (15 questions)
      {
        id: 'q33',
        text: 'What is the hybridization of nitrogen in ammonia (NH₃)?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'sp' },
          { id: 'B', text: 'sp²' },
          { id: 'C', text: 'sp³' },
          { id: 'D', text: 'sp³d' },
          { id: 'E', text: 'sp³d²' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q34',
        text: 'Which of the following functional groups is characterized by the C=O bond?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Alcohol' },
          { id: 'B', text: 'Amine' },
          { id: 'C', text: 'Ether' },
          { id: 'D', text: 'Carbonyl' },
          { id: 'E', text: 'Alkene' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q35',
        text: 'What is the pH of a 0.01 M HCl solution?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '1' },
          { id: 'B', text: '2' },
          { id: 'C', text: '3' },
          { id: 'D', text: '4' },
          { id: 'E', text: '5' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q36',
        text: 'Which of the following molecules has a tetrahedral molecular geometry?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'H₂O' },
          { id: 'B', text: 'NH₃' },
          { id: 'C', text: 'CH₄' },
          { id: 'D', text: 'CO₂' },
          { id: 'E', text: 'BF₃' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q37',
        text: 'Which of the following is an example of a redox reaction?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'NaOH + HCl → NaCl + H₂O' },
          { id: 'B', text: 'H₂O → H⁺ + OH⁻' },
          { id: 'C', text: 'CaCO₃ → CaO + CO₂' },
          { id: 'D', text: 'Zn + CuSO₄ → ZnSO₄ + Cu' },
          { id: 'E', text: 'NaCl + AgNO₃ → NaNO₃ + AgCl' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q38',
        text: 'Which of the following best describes the process of saponification?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Hydrolysis of esters to produce alcohols and acids' },
          { id: 'B', text: 'Hydrolysis of esters with a base to produce soap' },
          { id: 'C', text: 'Oxidation of alcohols to produce aldehydes' },
          { id: 'D', text: 'Reduction of ketones to produce alcohols' },
          { id: 'E', text: 'Polymerization of alkenes to produce plastics' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q39',
        text: 'What is the IUPAC name for the compound CH₃-CH₂-CH(CH₃)-CHO?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '2-Methylbutanal' },
          { id: 'B', text: '3-Methylbutanal' },
          { id: 'C', text: '2-Methylpropanol' },
          { id: 'D', text: '2-Methylbutanol' },
          { id: 'E', text: '3-Methylpropanal' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q39_8',
        text: 'Which of the following methods is most suitable for separating components of a mixture based on their boiling points?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Chromatography' },
          { id: 'B', text: 'Filtration' },
          { id: 'C', text: 'Distillation' },
          { id: 'D', text: 'Crystallization' },
          { id: 'E', text: 'Centrifugation' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q40',
        text: 'Which of the following statements about isotopes is correct?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Isotopes of an element have different numbers of protons' },
          { id: 'B', text: 'Isotopes of an element have different numbers of electrons' },
          { id: 'C', text: 'Isotopes of an element have different numbers of neutrons' },
          { id: 'D', text: 'Isotopes of an element have different chemical properties' },
          { id: 'E', text: 'Isotopes of an element cannot be separated physically' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q41',
        text: 'Which of the following types of bonding is present in diamond?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Ionic bonding' },
          { id: 'B', text: 'Metallic bonding' },
          { id: 'C', text: 'Covalent bonding' },
          { id: 'D', text: 'Hydrogen bonding' },
          { id: 'E', text: 'Van der Waals forces' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q42',
        text: 'What is the primary difference between a strong acid and a weak acid?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'A strong acid has a higher molecular weight' },
          { id: 'B', text: 'A strong acid completely dissociates in water' },
          { id: 'C', text: 'A strong acid has a higher boiling point' },
          { id: 'D', text: 'A strong acid has more hydrogen atoms' },
          { id: 'E', text: 'A strong acid is more viscous' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q43',
        text: 'Which functional group is present in amino acids that is not typically found in carbohydrates?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Hydroxyl (-OH)' },
          { id: 'B', text: 'Carbonyl (-C=O)' },
          { id: 'C', text: 'Carboxyl (-COOH)' },
          { id: 'D', text: 'Amino (-NH₂)' },
          { id: 'E', text: 'Ether (-O-)' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q44',
        text: 'What is the oxidation state of carbon in CO₂?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '+2' },
          { id: 'B', text: '+3' },
          { id: 'C', text: '+4' },
          { id: 'D', text: '-4' },
          { id: 'E', text: '0' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q45',
        text: 'Which of the following best describes an exothermic reaction?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'A reaction that absorbs heat from the surroundings' },
          { id: 'B', text: 'A reaction that releases heat to the surroundings' },
          { id: 'C', text: 'A reaction that occurs only at high temperatures' },
          { id: 'D', text: 'A reaction that requires a catalyst' },
          { id: 'E', text: 'A reaction that occurs spontaneously at low temperatures' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q46',
        text: 'Which of the following molecules has the highest boiling point?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'CH₄' },
          { id: 'B', text: 'C₂H₆' },
          { id: 'C', text: 'C₃H₈' },
          { id: 'D', text: 'C₄H₁₀' },
          { id: 'E', text: 'C₆H₁₄' }
        ],
        correctOption: 'E'
      },
      {
        id: 'q47',
        text: 'Which of the following correctly describes the relationship between reaction rate and temperature?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Reaction rate decreases exponentially with increasing temperature' },
          { id: 'B', text: 'Reaction rate increases linearly with increasing temperature' },
          { id: 'C', text: 'Reaction rate increases exponentially with increasing temperature' },
          { id: 'D', text: 'Reaction rate is independent of temperature' },
          { id: 'E', text: 'Reaction rate only increases with temperature in endothermic reactions' }
        ],
        correctOption: 'C'
      },
      // Physics & Math questions (15 questions)
      {
        id: 'q48',
        text: 'A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '2 m/s²' },
          { id: 'B', text: '4 m/s²' },
          { id: 'C', text: '5 m/s²' },
          { id: 'D', text: '10 m/s²' },
          { id: 'E', text: '100 m/s²' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q49',
        text: 'What is the equivalent resistance of three 6 Ω resistors connected in parallel?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '2 Ω' },
          { id: 'B', text: '3 Ω' },
          { id: 'C', text: '6 Ω' },
          { id: 'D', text: '18 Ω' },
          { id: 'E', text: '36 Ω' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q50',
        text: 'If P(A) = 0.3 and P(B) = 0.4 and A and B are independent events, what is P(A and B)?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '0.7' },
          { id: 'B', text: '0.12' },
          { id: 'C', text: '0.3' },
          { id: 'D', text: '0.4' },
          { id: 'E', text: '0.1' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q51',
        text: 'What is the derivative of f(x) = 3x² - 2x + 5?',
        category: 'physics_math',
        options: [
          { id: 'A', text: 'f\'(x) = 6x - 2' },
          { id: 'B', text: 'f\'(x) = 3x² - 2' },
          { id: 'C', text: 'f\'(x) = 6x² - 2x' },
          { id: 'D', text: 'f\'(x) = 6x - 2x + 5' },
          { id: 'E', text: 'f\'(x) = 3x - 2' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q52',
        text: 'A ball is thrown upward with an initial velocity of 15 m/s. How high will it go? (g = 10 m/s²)',
        category: 'physics_math',
        options: [
          { id: 'A', text: '7.5 m' },
          { id: 'B', text: '11.25 m' },
          { id: 'C', text: '15 m' },
          { id: 'D', text: '22.5 m' },
          { id: 'E', text: '30 m' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q53',
        text: 'If log₁₀(x) = 2, what is the value of x?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '20' },
          { id: 'B', text: '100' },
          { id: 'C', text: '200' },
          { id: 'D', text: '1000' },
          { id: 'E', text: '10000' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q54',
        text: 'Which of the following units is used to measure electric current?',
        category: 'physics_math',
        options: [
          { id: 'A', text: 'Volt' },
          { id: 'B', text: 'Watt' },
          { id: 'C', text: 'Ohm' },
          { id: 'D', text: 'Ampere' },
          { id: 'E', text: 'Joule' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q55',
        text: 'What is the volume of a sphere with radius 3 cm?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '9π cm³' },
          { id: 'B', text: '12π cm³' },
          { id: 'C', text: '27π cm³' },
          { id: 'D', text: '36π cm³' },
          { id: 'E', text: '108π cm³' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q56',
        text: 'Which of the following is an example of a vector quantity?',
        category: 'physics_math',
        options: [
          { id: 'A', text: 'Mass' },
          { id: 'B', text: 'Time' },
          { id: 'C', text: 'Temperature' },
          { id: 'D', text: 'Velocity' },
          { id: 'E', text: 'Energy' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q57',
        text: 'A 2 kg object moving at 5 m/s collides with a stationary 3 kg object. If the collision is perfectly elastic, what is the velocity of the 2 kg object after the collision?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '-1 m/s' },
          { id: 'B', text: '0 m/s' },
          { id: 'C', text: '1 m/s' },
          { id: 'D', text: '3 m/s' },
          { id: 'E', text: '5 m/s' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q58',
        text: 'What is the solution to the equation 2x² + 8x + 6 = 0?',
        category: 'physics_math',
        options: [
          { id: 'A', text: 'x = 1 or x = 3' },
          { id: 'B', text: 'x = -1 or x = -3' },
          { id: 'C', text: 'x = 2 or x = -6' },
          { id: 'D', text: 'x = -2 or x = -1.5' },
          { id: 'E', text: 'x = -4 or x = -0.75' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q39_8',
        text: 'Which of the following methods is most suitable for separating components of a mixture based on their boiling points?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Chromatography' },
          { id: 'B', text: 'Filtration' },
          { id: 'C', text: 'Distillation' },
          { id: 'D', text: 'Crystallization' },
          { id: 'E', text: 'Centrifugation' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q40_8',
        text: 'What is the value of the equilibrium constant (Kc) for the reaction 2NO(g) + O₂(g) ⇌ 2NO₂(g) at 25°C?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '0.012' },
          { id: 'B', text: '0.024' },
          { id: 'C', text: '0.048' },
          { id: 'D', text: '0.096' },
          { id: 'E', text: '0.192' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q13_5',
        text: 'Which of the following statements about the periodic table is correct?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Atomic radius decreases down a group' },
          { id: 'B', text: 'Electronegativity decreases across a period from left to right' },
          { id: 'C', text: 'First ionization energy decreases down a group' },
          { id: 'D', text: 'Metallic character increases across a period from left to right' },
          { id: 'E', text: 'Electron affinity generally increases down a group' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q18_5',
        text: 'What is the concentration of OH⁻ ions in a solution with a pH of 3?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '3 × 10⁻¹¹ M' },
          { id: 'B', text: '1 × 10⁻¹¹ M' },
          { id: 'C', text: '3 × 10⁻⁴ M' },
          { id: 'D', text: '1 × 10⁻³ M' },
          { id: 'E', text: '1 × 10⁻⁷ M' }
        ],
        correctOption: 'B'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'IMAT 2022 Mock Test',
    description: 'Practice with questions similar to the 2022 IMAT exam pattern.',
    timeLimit: 100, // minutes
    questions: [
      // Reading Comprehension (2 questions)
      {
        id: 'q1_2',
        text: `Read the following passage and answer the question below:\n\nThe field of epigenetics explores how environmental factors can affect gene expression without altering the underlying DNA sequence. These epigenetic modifications, such as DNA methylation and histone modification, can be influenced by diet, stress, and other environmental exposures. Surprisingly, some epigenetic changes appear to be heritable, meaning they can be passed from one generation to the next, challenging our traditional understanding of inheritance. This growing field has implications for understanding disease development, aging processes, and even potential therapeutic interventions.\n\nBased on the passage, which of the following statements about epigenetics is correct?`,
        category: 'reading',
        options: [
          { id: 'A', text: 'Epigenetic changes always involve alterations to the DNA sequence' },
          { id: 'B', text: 'Epigenetic modifications can be influenced by environmental factors' },
          { id: 'C', text: 'Epigenetic changes cannot be passed to offspring' },
          { id: 'D', text: 'The field of epigenetics has no relevance to disease treatment' },
          { id: 'E', text: 'Epigenetic modifications only occur during embryonic development' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q2_2',
        text: `Read the following passage and answer the question below:\n\nThe history of antibiotics began with Alexander Fleming's accidental discovery of penicillin in 1928. While away on vacation, Fleming left some cultures of Staphylococcus bacteria in his lab. Upon his return, he noticed that a mold (Penicillium notatum) had contaminated one of his cultures, and the bacteria surrounding the mold had been destroyed. Fleming's observation led to the development of penicillin, which was later mass-produced and used extensively during World War II to treat infected wounds. Fleming, along with Howard Florey and Ernst Chain who helped develop penicillin as a drug, shared the 1945 Nobel Prize in Physiology or Medicine for this groundbreaking work.\n\nAccording to the passage, how was penicillin discovered?`,
        category: 'reading',
        options: [
          { id: 'A', text: 'Through a systematic screening of thousands of compounds' },
          { id: 'B', text: 'By deliberate genetic modification of mold species' },
          { id: 'C', text: 'As a result of a government-funded wartime research project' },
          { id: 'D', text: 'Through accidental contamination of a bacterial culture' },
          { id: 'E', text: 'By isolating compounds from tropical plants' }
        ],
        correctOption: 'D'
      },
      // General Knowledge (2 questions)
      {
        id: 'q3_2',
        text: 'Which of the following organs is NOT part of the human digestive system?',
        category: 'reading',
        options: [
          { id: 'A', text: 'Gallbladder' },
          { id: 'B', text: 'Pancreas' },
          { id: 'C', text: 'Spleen' },
          { id: 'D', text: 'Liver' },
          { id: 'E', text: 'Salivary glands' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q4_2',
        text: 'Which of the following diseases is caused by a deficiency of vitamin C?',
        category: 'reading',
        options: [
          { id: 'A', text: 'Rickets' },
          { id: 'B', text: 'Beriberi' },
          { id: 'C', text: 'Pellagra' },
          { id: 'D', text: 'Scurvy' },
          { id: 'E', text: 'Night blindness' }
        ],
        correctOption: 'D'
      },
      // Logical Reasoning (5 questions)
      {
        id: 'q5_2',
        text: 'Complete the following number sequence: 1, 4, 9, 16, 25, ?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '30' },
          { id: 'B', text: '36' },
          { id: 'C', text: '40' },
          { id: 'D', text: '49' },
          { id: 'E', text: '64' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q6_2',
        text: 'If all mammals are vertebrates, and some vertebrates are warm-blooded, which of the following statements must be true?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: 'All vertebrates are mammals' },
          { id: 'B', text: 'All mammals are warm-blooded' },
          { id: 'C', text: 'Some mammals are not vertebrates' },
          { id: 'D', text: 'No cold-blooded animals are mammals' },
          { id: 'E', text: 'Some warm-blooded animals are not mammals' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q7_2',
        text: 'A researcher is analyzing blood samples from 80 patients. If 45 patients have type A blood, 30 have type B blood, and 10 have both type A and B blood, how many patients have neither type A nor type B blood?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '5' },
          { id: 'B', text: '10' },
          { id: 'C', text: '15' },
          { id: 'D', text: '20' },
          { id: 'E', text: '25' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q8_2',
        text: 'A prescription medication costs €50 per month. If the price increases by 8% and then decreases by 8%, what is the final cost of the medication?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '€50.00' },
          { id: 'B', text: '€49.68' },
          { id: 'C', text: '€49.97' },
          { id: 'D', text: '€50.32' },
          { id: 'E', text: '€51.84' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q9_2',
        text: 'Four medical students (Alex, Beth, Carlos, and Dina) are assigned to four different hospital departments (Cardiology, Neurology, Pediatrics, and Emergency). If Alex is assigned to Pediatrics and Carlos is not assigned to Emergency, which of the following CANNOT be true?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: 'Beth is assigned to Cardiology' },
          { id: 'B', text: 'Dina is assigned to Emergency' },
          { id: 'C', text: 'Carlos is assigned to Neurology' },
          { id: 'D', text: 'Beth is assigned to Emergency' },
          { id: 'E', text: 'Dina is assigned to Neurology' }
        ],
        correctOption: 'E'
      },
      // Biology questions (23 questions)
      {
        id: 'q10_2',
        text: 'Which of the following structures is NOT found in a prokaryotic cell?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Cell wall' },
          { id: 'B', text: 'Plasma membrane' },
          { id: 'C', text: 'Nucleus' },
          { id: 'D', text: 'Ribosomes' },
          { id: 'E', text: 'DNA' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q11_2',
        text: 'What is the primary role of helper T cells in the immune system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Direct killing of infected cells' },
          { id: 'B', text: 'Production of antibodies' },
          { id: 'C', text: 'Activation of other immune cells' },
          { id: 'D', text: 'Phagocytosis of pathogens' },
          { id: 'E', text: 'Inflammatory response regulation' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q12_2',
        text: 'Which of the following is an example of negative feedback in the human body?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Blood clotting after injury' },
          { id: 'B', text: 'Oxytocin release during childbirth' },
          { id: 'C', text: 'Insulin secretion in response to high blood glucose' },
          { id: 'D', text: 'Fever development during infection' },
          { id: 'E', text: 'Adrenaline release during fight-or-flight response' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q13_2',
        text: 'In which phase of meiosis does crossing over occur?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Prophase I' },
          { id: 'B', text: 'Metaphase I' },
          { id: 'C', text: 'Anaphase I' },
          { id: 'D', text: 'Prophase II' },
          { id: 'E', text: 'Metaphase II' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q14_2',
        text: 'Which of the following is the correct sequence of blood flow through the heart?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Right atrium → right ventricle → lungs → left atrium → left ventricle → body' },
          { id: 'B', text: 'Left atrium → left ventricle → lungs → right atrium → right ventricle → body' },
          { id: 'C', text: 'Right atrium → left atrium → right ventricle → left ventricle → lungs → body' },
          { id: 'D', text: 'Left ventricle → left atrium → lungs → right atrium → right ventricle → body' },
          { id: 'E', text: 'Right atrium → right ventricle → body → left atrium → left ventricle → lungs' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q15_2',
        text: 'Which of the following organelles is primarily responsible for detoxifying harmful substances in liver cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Lysosomes' },
          { id: 'B', text: 'Peroxisomes' },
          { id: 'C', text: 'Mitochondria' },
          { id: 'D', text: 'Smooth endoplasmic reticulum' },
          { id: 'E', text: 'Golgi apparatus' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q16_2',
        text: 'Which of the following hormones is produced by the adrenal medulla?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Insulin' },
          { id: 'B', text: 'Cortisol' },
          { id: 'C', text: 'Epinephrine (adrenaline)' },
          { id: 'D', text: 'Thyroxine' },
          { id: 'E', text: 'Estrogen' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q17_2',
        text: 'In humans, the inability to distinguish between certain colors is typically caused by:',
        category: 'biology',
        options: [
          { id: 'A', text: 'A dominant autosomal gene' },
          { id: 'B', text: 'A recessive autosomal gene' },
          { id: 'C', text: 'A recessive X-linked gene' },
          { id: 'D', text: 'A dominant X-linked gene' },
          { id: 'E', text: 'Mitochondrial DNA mutations' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q18_2',
        text: 'What is the primary function of the loop of Henle in the kidney nephron?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Filtration of blood' },
          { id: 'B', text: 'Concentration of urine' },
          { id: 'C', text: 'Reabsorption of glucose' },
          { id: 'D', text: 'Secretion of hydrogen ions' },
          { id: 'E', text: 'Regulation of blood pressure' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q19_2',
        text: 'Which of the following best describes the process of translation in protein synthesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'The conversion of DNA to RNA' },
          { id: 'B', text: 'The conversion of RNA to DNA' },
          { id: 'C', text: 'The conversion of RNA to protein' },
          { id: 'D', text: 'The replication of DNA' },
          { id: 'E', text: 'The splicing of introns from mRNA' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q20_2',
        text: 'Which structure in the human eye contains the highest concentration of cone cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Cornea' },
          { id: 'B', text: 'Iris' },
          { id: 'C', text: 'Lens' },
          { id: 'D', text: 'Fovea centralis' },
          { id: 'E', text: 'Optic nerve' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q21_2',
        text: 'What is the final electron acceptor in aerobic respiration?',
        category: 'biology',
        options: [
          { id: 'A', text: 'NAD+' },
          { id: 'B', text: 'Pyruvate' },
          { id: 'C', text: 'Oxygen' },
          { id: 'D', text: 'Carbon dioxide' },
          { id: 'E', text: 'FAD' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q22_2',
        text: 'Which of the following structures is responsible for producing cerebrospinal fluid (CSF)?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Cerebral cortex' },
          { id: 'B', text: 'Choroid plexus' },
          { id: 'C', text: 'Meninges' },
          { id: 'D', text: 'Corpus callosum' },
          { id: 'E', text: 'Cerebellum' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q23_2',
        text: 'What is the role of the enzyme carbonic anhydrase in red blood cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Breaking down hemoglobin' },
          { id: 'B', text: 'Converting carbon dioxide to bicarbonate' },
          { id: 'C', text: 'Oxygen transport' },
          { id: 'D', text: 'Iron storage' },
          { id: 'E', text: 'Cell membrane maintenance' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q24_2',
        text: 'In which part of the human digestive system does the majority of nutrient absorption occur?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Stomach' },
          { id: 'B', text: 'Duodenum' },
          { id: 'C', text: 'Small intestine' },
          { id: 'D', text: 'Large intestine' },
          { id: 'E', text: 'Esophagus' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q25_2',
        text: 'Which of the following describes the relationship between insulin and glucagon?',
        category: 'biology',
        options: [
          { id: 'A', text: 'They are produced by the same cells in the pancreas' },
          { id: 'B', text: 'They both increase blood glucose levels' },
          { id: 'C', text: 'They have antagonistic effects on blood glucose levels' },
          { id: 'D', text: 'They are both produced in response to high blood glucose' },
          { id: 'E', text: 'They both act primarily on muscle tissue' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q26_2',
        text: 'Which of the following is NOT a function of the liver?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Detoxification of drugs' },
          { id: 'B', text: 'Production of bile' },
          { id: 'C', text: 'Storage of glycogen' },
          { id: 'D', text: 'Production of insulin' },
          { id: 'E', text: 'Synthesis of plasma proteins' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q27_2',
        text: 'What is the major difference between DNA and RNA molecules?',
        category: 'biology',
        options: [
          { id: 'A', text: 'DNA contains adenine, while RNA contains guanine' },
          { id: 'B', text: 'DNA is single-stranded, while RNA is double-stranded' },
          { id: 'C', text: 'DNA contains deoxyribose sugar, while RNA contains ribose sugar' },
          { id: 'D', text: 'DNA contains phosphate groups, while RNA does not' },
          { id: 'E', text: 'DNA is found only in the nucleus, while RNA is found only in the cytoplasm' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q28_2',
        text: 'In the nervous system, what is the function of myelin?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To generate action potentials' },
          { id: 'B', text: 'To increase the speed of nerve impulse conduction' },
          { id: 'C', text: 'To produce neurotransmitters' },
          { id: 'D', text: 'To connect neurons at synapses' },
          { id: 'E', text: 'To provide nutrients to neurons' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q29_2',
        text: 'Which of the following is the correct sequence in spermatogenesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Spermatogonia → primary spermatocyte → secondary spermatocyte → spermatid → sperm' },
          { id: 'B', text: 'Spermatogonia → spermatid → primary spermatocyte → secondary spermatocyte → sperm' },
          { id: 'C', text: 'Primary spermatocyte → spermatogonia → secondary spermatocyte → spermatid → sperm' },
          { id: 'D', text: 'Spermatogonia → secondary spermatocyte → primary spermatocyte → spermatid → sperm' },
          { id: 'E', text: 'Primary spermatocyte → secondary spermatocyte → spermatogonia → spermatid → sperm' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q30_2',
        text: 'Which type of muscle tissue is responsible for voluntary movements in the human body?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Smooth muscle' },
          { id: 'B', text: 'Cardiac muscle' },
          { id: 'C', text: 'Skeletal muscle' },
          { id: 'D', text: 'Involuntary muscle' },
          { id: 'E', text: 'Transitional muscle' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q31_2',
        text: 'Which of the following is a true statement about enzymes?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Enzymes change the equilibrium of reactions' },
          { id: 'B', text: 'Enzymes are consumed during reactions' },
          { id: 'C', text: 'Enzyme activity is independent of pH' },
          { id: 'D', text: 'Enzymes lower the activation energy of reactions' },
          { id: 'E', text: 'Most enzymes are composed of lipids' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q32_2',
        text: 'What is the primary function of the lymphatic system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Blood cell production' },
          { id: 'B', text: 'Oxygen transport' },
          { id: 'C', text: 'Return of tissue fluid to the circulatory system' },
          { id: 'D', text: 'Regulation of body temperature' },
          { id: 'E', text: 'Filtration of blood' }
        ],
        correctOption: 'C'
      },
      // Chemistry questions (15 questions)
      {
        id: 'q33_2',
        text: 'What is the hybridization of nitrogen in ammonia (NH₃)?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'sp' },
          { id: 'B', text: 'sp²' },
          { id: 'C', text: 'sp³' },
          { id: 'D', text: 'sp³d' },
          { id: 'E', text: 'sp³d²' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q34_2',
        text: 'Which of the following functional groups is characterized by the C=O bond?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Alcohol' },
          { id: 'B', text: 'Amine' },
          { id: 'C', text: 'Ether' },
          { id: 'D', text: 'Carbonyl' },
          { id: 'E', text: 'Alkene' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q35_2',
        text: 'What is the pH of a 0.01 M HCl solution?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '1' },
          { id: 'B', text: '2' },
          { id: 'C', text: '3' },
          { id: 'D', text: '4' },
          { id: 'E', text: '5' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q36_2',
        text: 'Which of the following molecules has a tetrahedral molecular geometry?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'H₂O' },
          { id: 'B', text: 'NH₃' },
          { id: 'C', text: 'CH₄' },
          { id: 'D', text: 'CO₂' },
          { id: 'E', text: 'BF₃' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q37_2',
        text: 'Which of the following is an example of a redox reaction?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'NaOH + HCl → NaCl + H₂O' },
          { id: 'B', text: 'H₂O → H⁺ + OH⁻' },
          { id: 'C', text: 'CaCO₃ → CaO + CO₂' },
          { id: 'D', text: 'Zn + CuSO₄ → ZnSO₄ + Cu' },
          { id: 'E', text: 'NaCl + AgNO₃ → NaNO₃ + AgCl' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q38_2',
        text: 'Which of the following best describes the process of saponification?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Hydrolysis of esters to produce alcohols and acids' },
          { id: 'B', text: 'Hydrolysis of esters with a base to produce soap' },
          { id: 'C', text: 'Oxidation of alcohols to produce aldehydes' },
          { id: 'D', text: 'Reduction of ketones to produce alcohols' },
          { id: 'E', text: 'Polymerization of alkenes to produce plastics' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q39_2',
        text: 'What is the IUPAC name for the compound CH₃-CH₂-CH(CH₃)-CHO?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '2-Methylbutanal' },
          { id: 'B', text: '3-Methylbutanal' },
          { id: 'C', text: '2-Methylpropanol' },
          { id: 'D', text: '2-Methylbutanol' },
          { id: 'E', text: '3-Methylpropanal' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q40_2',
        text: 'Which of the following statements about isotopes is correct?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Isotopes of an element have different numbers of protons' },
          { id: 'B', text: 'Isotopes of an element have different numbers of electrons' },
          { id: 'C', text: 'Isotopes of an element have different numbers of neutrons' },
          { id: 'D', text: 'Isotopes of an element have different chemical properties' },
          { id: 'E', text: 'Isotopes of an element cannot be separated physically' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q41_2',
        text: 'Which of the following types of bonding is present in diamond?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Ionic bonding' },
          { id: 'B', text: 'Metallic bonding' },
          { id: 'C', text: 'Covalent bonding' },
          { id: 'D', text: 'Hydrogen bonding' },
          { id: 'E', text: 'Van der Waals forces' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q42_2',
        text: 'What is the primary difference between a strong acid and a weak acid?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'A strong acid has a higher molecular weight' },
          { id: 'B', text: 'A strong acid completely dissociates in water' },
          { id: 'C', text: 'A strong acid has a higher boiling point' },
          { id: 'D', text: 'A strong acid has more hydrogen atoms' },
          { id: 'E', text: 'A strong acid is more viscous' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q43_2',
        text: 'Which functional group is present in amino acids that is not typically found in carbohydrates?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Hydroxyl (-OH)' },
          { id: 'B', text: 'Carbonyl (-C=O)' },
          { id: 'C', text: 'Carboxyl (-COOH)' },
          { id: 'D', text: 'Amino (-NH₂)' },
          { id: 'E', text: 'Ether (-O-)' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q44_2',
        text: 'What is the oxidation state of carbon in CO₂?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '+2' },
          { id: 'B', text: '+3' },
          { id: 'C', text: '+4' },
          { id: 'D', text: '-4' },
          { id: 'E', text: '0' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q45_2',
        text: 'Which of the following best describes an exothermic reaction?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'A reaction that absorbs heat from the surroundings' },
          { id: 'B', text: 'A reaction that releases heat to the surroundings' },
          { id: 'C', text: 'A reaction that occurs only at high temperatures' },
          { id: 'D', text: 'A reaction that requires a catalyst' },
          { id: 'E', text: 'A reaction that occurs spontaneously at low temperatures' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q46_2',
        text: 'Which of the following molecules has the highest boiling point?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'CH₄' },
          { id: 'B', text: 'C₂H₆' },
          { id: 'C', text: 'C₃H₈' },
          { id: 'D', text: 'C₄H₁₀' },
          { id: 'E', text: 'C₆H₁₄' }
        ],
        correctOption: 'E'
      },
      {
        id: 'q47_2',
        text: 'Which of the following correctly describes the relationship between reaction rate and temperature?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Reaction rate decreases exponentially with increasing temperature' },
          { id: 'B', text: 'Reaction rate increases linearly with increasing temperature' },
          { id: 'C', text: 'Reaction rate increases exponentially with increasing temperature' },
          { id: 'D', text: 'Reaction rate is independent of temperature' },
          { id: 'E', text: 'Reaction rate only increases with temperature in endothermic reactions' }
        ],
        correctOption: 'C'
      },
      // Physics & Math questions (15 questions)
      {
        id: 'q48_2',
        text: 'A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '2 m/s²' },
          { id: 'B', text: '4 m/s²' },
          { id: 'C', text: '5 m/s²' },
          { id: 'D', text: '10 m/s²' },
          { id: 'E', text: '100 m/s²' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q49_2',
        text: 'What is the equivalent resistance of three 6 Ω resistors connected in parallel?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '2 Ω' },
          { id: 'B', text: '3 Ω' },
          { id: 'C', text: '6 Ω' },
          { id: 'D', text: '18 Ω' },
          { id: 'E', text: '36 Ω' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q50_2',
        text: 'If P(A) = 0.3 and P(B) = 0.4 and A and B are independent events, what is P(A and B)?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '0.7' },
          { id: 'B', text: '0.12' },
          { id: 'C', text: '0.3' },
          { id: 'D', text: '0.4' },
          { id: 'E', text: '0.1' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q51_2',
        text: 'What is the derivative of f(x) = 3x² - 2x + 5?',
        category: 'physics_math',
        options: [
          { id: 'A', text: 'f\'(x) = 6x - 2' },
          { id: 'B', text: 'f\'(x) = 3x² - 2' },
          { id: 'C', text: 'f\'(x) = 6x² - 2x' },
          { id: 'D', text: 'f\'(x) = 6x - 2x + 5' },
          { id: 'E', text: 'f\'(x) = 3x - 2' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q52_2',
        text: 'A ball is thrown upward with an initial velocity of 15 m/s. How high will it go? (g = 10 m/s²)',
        category: 'physics_math',
        options: [
          { id: 'A', text: '7.5 m' },
          { id: 'B', text: '11.25 m' },
          { id: 'C', text: '15 m' },
          { id: 'D', text: '22.5 m' },
          { id: 'E', text: '30 m' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q53_2',
        text: 'If log₁₀(x) = 2, what is the value of x?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '20' },
          { id: 'B', text: '100' },
          { id: 'C', text: '200' },
          { id: 'D', text: '1000' },
          { id: 'E', text: '10000' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q54_2',
        text: 'Which of the following units is used to measure electric current?',
        category: 'physics_math',
        options: [
          { id: 'A', text: 'Volt' },
          { id: 'B', text: 'Watt' },
          { id: 'C', text: 'Ohm' },
          { id: 'D', text: 'Ampere' },
          { id: 'E', text: 'Joule' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q55_2',
        text: 'What is the volume of a sphere with radius 3 cm?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '9π cm³' },
          { id: 'B', text: '12π cm³' },
          { id: 'C', text: '27π cm³' },
          { id: 'D', text: '36π cm³' },
          { id: 'E', text: '108π cm³' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q56_2',
        text: 'Which of the following is an example of a vector quantity?',
        category: 'physics_math',
        options: [
          { id: 'A', text: 'Mass' },
          { id: 'B', text: 'Time' },
          { id: 'C', text: 'Temperature' },
          { id: 'D', text: 'Velocity' },
          { id: 'E', text: 'Energy' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q57_2',
        text: 'A 2 kg object moving at 5 m/s collides with a stationary 3 kg object. If the collision is perfectly elastic, what is the velocity of the 2 kg object after the collision?',
        category: 'physics_math',
        options: [
          { id: 'A', text: '-1 m/s' },
          { id: 'B', text: '0 m/s' },
          { id: 'C', text: '1 m/s' },
          { id: 'D', text: '3 m/s' },
          { id: 'E', text: '5 m/s' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q58_2',
        text: 'What is the solution to the equation 2x² + 8x + 6 = 0?',
        category: 'physics_math',
        options: [
          { id: 'A', text: 'x = 1 or x = 3' },
          { id: 'B', text: 'x = -1 or x = -3' },
          { id: 'C', text: 'x = 2 or x = -6' },
          { id: 'D', text: 'x = -2 or x = -1.5' },
          { id: 'E', text: 'x = -4 or x = -0.75' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q39_8',
        text: 'Which of the following methods is most suitable for separating components of a mixture based on their boiling points?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Chromatography' },
          { id: 'B', text: 'Filtration' },
          { id: 'C', text: 'Distillation' },
          { id: 'D', text: 'Crystallization' },
          { id: 'E', text: 'Centrifugation' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q40_8',
        text: 'What is the value of the equilibrium constant (Kc) for the reaction 2NO(g) + O₂(g) ⇌ 2NO₂(g) at 25°C?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '0.012' },
          { id: 'B', text: '0.024' },
          { id: 'C', text: '0.048' },
          { id: 'D', text: '0.096' },
          { id: 'E', text: '0.192' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q13_5',
        text: 'Which of the following statements about the periodic table is correct?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Atomic radius decreases down a group' },
          { id: 'B', text: 'Electronegativity decreases across a period from left to right' },
          { id: 'C', text: 'First ionization energy decreases down a group' },
          { id: 'D', text: 'Metallic character increases across a period from left to right' },
          { id: 'E', text: 'Electron affinity generally increases down a group' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q18_5',
        text: 'What is the concentration of OH⁻ ions in a solution with a pH of 3?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '3 × 10⁻¹¹ M' },
          { id: 'B', text: '1 × 10⁻¹¹ M' },
          { id: 'C', text: '3 × 10⁻⁴ M' },
          { id: 'D', text: '1 × 10⁻³ M' },
          { id: 'E', text: '1 × 10⁻⁷ M' }
        ],
        correctOption: 'B'
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Biology Focus Test',
    description: 'Focus on biology questions to improve your understanding of key concepts.',
    timeLimit: 50, // minutes
    questions: [
      // Biology questions (30 questions)
      {
        id: 'q1_3',
        text: 'Which organelle is known as the "powerhouse of the cell"?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Ribosome' },
          { id: 'B', text: 'Golgi apparatus' },
          { id: 'C', text: 'Mitochondrion' },
          { id: 'D', text: 'Endoplasmic reticulum' },
          { id: 'E', text: 'Nucleus' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q2_3',
        text: 'Which of the following processes occurs in the mitochondria?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Glycolysis' },
          { id: 'B', text: 'Krebs cycle' },
          { id: 'C', text: 'Protein synthesis' },
          { id: 'D', text: 'DNA replication' },
          { id: 'E', text: 'Photosynthesis' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q3_3',
        text: 'What is the function of the nucleus in a eukaryotic cell?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Energy production' },
          { id: 'B', text: 'Protein synthesis' },
          { id: 'C', text: 'Lipid storage' },
          { id: 'D', text: 'Housing genetic material' },
          { id: 'E', text: 'Waste removal' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q4_3',
        text: 'Which of the following structures is responsible for protein synthesis in cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Ribosomes' },
          { id: 'B', text: 'Lysosomes' },
          { id: 'C', text: 'Peroxisomes' },
          { id: 'D', text: 'Centrosomes' },
          { id: 'E', text: 'Nucleolus' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q5_3',
        text: 'What is the primary role of DNA in a cell?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Energy storage' },
          { id: 'B', text: 'Structural support' },
          { id: 'C', text: 'Genetic information storage' },
          { id: 'D', text: 'Cell signaling' },
          { id: 'E', text: 'Enzyme activity' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q6_3',
        text: 'Which of the following organelles is involved in the modification and sorting of proteins?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Lysosome' },
          { id: 'B', text: 'Golgi apparatus' },
          { id: 'C', text: 'Peroxisome' },
          { id: 'D', text: 'Vacuole' },
          { id: 'E', text: 'Nucleolus' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q7_3',
        text: 'Which of the following statements about mitosis is correct?',
        category: 'biology',
        options: [
          { id: 'A', text: 'It results in daughter cells with half the chromosome number of the parent cell' },
          { id: 'B', text: 'It only occurs in reproductive cells' },
          { id: 'C', text: 'It produces four genetically different daughter cells' },
          { id: 'D', text: 'It maintains the chromosome number in daughter cells' },
          { id: 'E', text: 'It involves crossing over between homologous chromosomes' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q8_3',
        text: 'What is the role of tRNA in protein synthesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'It carries the genetic code from the nucleus to the ribosomes' },
          { id: 'B', text: 'It transports amino acids to the ribosomes' },
          { id: 'C', text: 'It forms the structural component of ribosomes' },
          { id: 'D', text: 'It catalyzes the formation of peptide bonds' },
          { id: 'E', text: 'It degrades misfolded proteins' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q9_3',
        text: 'Which of the following processes is directly involved in cellular respiration?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Calvin cycle' },
          { id: 'B', text: 'Light-dependent reactions' },
          { id: 'C', text: 'Krebs cycle' },
          { id: 'D', text: 'RNA splicing' },
          { id: 'E', text: 'DNA replication' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q10_3',
        text: 'Which of the following is a function of smooth endoplasmic reticulum?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Protein synthesis' },
          { id: 'B', text: 'Lipid synthesis' },
          { id: 'C', text: 'Energy production' },
          { id: 'D', text: 'Photosynthesis' },
          { id: 'E', text: 'DNA replication' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q11_3',
        text: 'What is the primary role of chloroplasts in plant cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Protein synthesis' },
          { id: 'B', text: 'Lipid metabolism' },
          { id: 'C', text: 'Photosynthesis' },
          { id: 'D', text: 'Cellular respiration' },
          { id: 'E', text: 'Waste disposal' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q12_3',
        text: 'Which of the following is an example of passive transport across a cell membrane?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Endocytosis' },
          { id: 'B', text: 'Active transport using ATP' },
          { id: 'C', text: 'Sodium-potassium pump' },
          { id: 'D', text: 'Facilitated diffusion' },
          { id: 'E', text: 'Secondary active transport' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q13_3',
        text: 'What is the function of lysosomes in eukaryotic cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Intracellular digestion' },
          { id: 'B', text: 'Protein synthesis' },
          { id: 'C', text: 'Energy production' },
          { id: 'D', text: 'DNA replication' },
          { id: 'E', text: 'Photosynthesis' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q14_3',
        text: 'Which of the following statements about cell division in somatic cells is correct?',
        category: 'biology',
        options: [
          { id: 'A', text: 'It always results in four daughter cells' },
          { id: 'B', text: 'It involves the process of crossing over' },
          { id: 'C', text: 'It produces haploid cells' },
          { id: 'D', text: 'It maintains the diploid number of chromosomes' },
          { id: 'E', text: 'It only occurs during embryonic development' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q15_3',
        text: 'Which structure is responsible for maintaining turgor pressure in plant cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Cell wall' },
          { id: 'B', text: 'Mitochondrion' },
          { id: 'C', text: 'Nucleus' },
          { id: 'D', text: 'Central vacuole' },
          { id: 'E', text: 'Golgi apparatus' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q16_3',
        text: 'What is the role of the enzyme DNA polymerase?',
        category: 'biology',
        options: [
          { id: 'A', text: 'It catalyzes the formation of peptide bonds' },
          { id: 'B', text: 'It synthesizes new DNA strands during replication' },
          { id: 'C', text: 'It breaks down proteins into amino acids' },
          { id: 'D', text: 'It synthesizes RNA from a DNA template' },
          { id: 'E', text: 'It forms the cell membrane' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q17_3',
        text: 'Which of the following best describes the process of translation in protein synthesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'The conversion of RNA to DNA' },
          { id: 'B', text: 'The conversion of DNA to RNA' },
          { id: 'C', text: 'The conversion of RNA to protein' },
          { id: 'D', text: 'The duplication of DNA' },
          { id: 'E', text: 'The modification of RNA' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q18_3',
        text: 'What is the function of the electron transport chain in cellular respiration?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To produce pyruvate from glucose' },
          { id: 'B', text: 'To convert NADH and FADH₂ to ATP' },
          { id: 'C', text: 'To break down fatty acids' },
          { id: 'D', text: 'To convert glucose to glycogen' },
          { id: 'E', text: 'To synthesize proteins' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q19_3',
        text: 'Which of the following is a function of the cell membrane?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To generate ATP' },
          { id: 'B', text: 'To synthesize proteins' },
          { id: 'C', text: 'To regulate the passage of substances in and out of the cell' },
          { id: 'D', text: 'To store genetic information' },
          { id: 'E', text: 'To break down waste materials' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q20_3',
        text: 'What is the primary function of the Calvin cycle in photosynthesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To produce oxygen' },
          { id: 'B', text: 'To split water molecules' },
          { id: 'C', text: 'To generate ATP and NADPH' },
          { id: 'D', text: 'To fix carbon dioxide into organic compounds' },
          { id: 'E', text: 'To transport electrons' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q21_3',
        text: 'Which of the following best describes the process of osmosis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'The movement of water molecules from a region of higher concentration to a region of lower concentration across a semipermeable membrane' },
          { id: 'B', text: 'The active transport of solutes against a concentration gradient' },
          { id: 'C', text: 'The movement of solutes from a region of lower concentration to a region of higher concentration' },
          { id: 'D', text: 'The transport of ions through specific protein channels' },
          { id: 'E', text: 'The engulfing of external particles by the cell membrane' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q22_3',
        text: 'What is the role of the cytoskeleton in eukaryotic cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Energy production' },
          { id: 'B', text: 'Protein synthesis' },
          { id: 'C', text: 'Cell structure and movement' },
          { id: 'D', text: 'DNA replication' },
          { id: 'E', text: 'Waste disposal' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q23_3',
        text: 'What is the main difference between prokaryotic and eukaryotic cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Prokaryotic cells have ribosomes, while eukaryotic cells do not' },
          { id: 'B', text: 'Eukaryotic cells have a cell wall, while prokaryotic cells do not' },
          { id: 'C', text: 'Prokaryotic cells have a nucleus, while eukaryotic cells do not' },
          { id: 'D', text: 'Eukaryotic cells have membrane-bound organelles, while prokaryotic cells do not' },
          { id: 'E', text: 'Prokaryotic cells have DNA, while eukaryotic cells have RNA' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q24_3',
        text: 'What happens during the process of glycolysis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Glucose is converted to pyruvate' },
          { id: 'B', text: 'Pyruvate is converted to acetyl-CoA' },
          { id: 'C', text: 'Acetyl-CoA enters the Krebs cycle' },
          { id: 'D', text: 'Carbon dioxide is fixed into organic compounds' },
          { id: 'E', text: 'Oxygen is used to generate ATP' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q25_3',
        text: 'Which of the following is NOT a component of the endomembrane system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Endoplasmic reticulum' },
          { id: 'B', text: 'Golgi apparatus' },
          { id: 'C', text: 'Lysosomes' },
          { id: 'D', text: 'Vacuoles' },
          { id: 'E', text: 'Ribosomes' }
        ],
        correctOption: 'E'
      },
      {
        id: 'q26_3',
        text: 'During which phase of mitosis do chromosomes align at the metaphase plate?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Prophase' },
          { id: 'B', text: 'Metaphase' },
          { id: 'C', text: 'Anaphase' },
          { id: 'D', text: 'Telophase' },
          { id: 'E', text: 'Interphase' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q27_3',
        text: 'What is the primary function of the pancreas in the digestive system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Storage of bile' },
          { id: 'B', text: 'Absorption of nutrients' },
          { id: 'C', text: 'Production of digestive enzymes' },
          { id: 'D', text: 'Mechanical breakdown of food' },
          { id: 'E', text: 'Storage of glycogen' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q28_3',
        text: 'Which of the following correctly describes facilitated diffusion?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Movement of molecules against the concentration gradient using ATP' },
          { id: 'B', text: 'Passive movement of molecules through protein channels' },
          { id: 'C', text: 'Transport of large molecules via vesicles' },
          { id: 'D', text: 'Active transport of ions using a concentration gradient' },
          { id: 'E', text: 'Movement of water across a semipermeable membrane' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q29_3',
        text: 'What is the primary function of meiosis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Growth and repair of tissues' },
          { id: 'B', text: 'Production of gametes with haploid number of chromosomes' },
          { id: 'C', text: 'Asexual reproduction in single-celled organisms' },
          { id: 'D', text: 'Energy production in cells' },
          { id: 'E', text: 'Synthesis of proteins' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q30_3',
        text: 'What happens during the light-dependent reactions of photosynthesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Carbon dioxide is fixed into organic compounds' },
          { id: 'B', text: 'Glucose is produced from carbon dioxide' },
          { id: 'C', text: 'ATP and NADPH are produced using energy from light' },
          { id: 'D', text: 'Oxygen is consumed to generate ATP' },
          { id: 'E', text: 'Pyruvate is converted to carbon dioxide and water' }
        ],
        correctOption: 'C'
      }
    ]
  },
  '4': {
    id: '4',
    title: 'Advanced Biology Test',
    description: 'In-depth biology test covering cellular biology, genetics, physiology, and more.',
    timeLimit: 50, // minutes
    questions: [
      {
        id: 'q1_4',
        text: 'Which cellular mechanism is responsible for generating ATP through substrate-level phosphorylation during anaerobic conditions?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Oxidative phosphorylation' },
          { id: 'B', text: 'Photophosphorylation' },
          { id: 'C', text: 'Glycolysis' },
          { id: 'D', text: 'Beta-oxidation' },
          { id: 'E', text: 'Calvin cycle' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q2_4',
        text: 'What is the significance of the wobble hypothesis in the context of the genetic code?',
        category: 'biology',
        options: [
          { id: 'A', text: 'It explains why the genetic code is universal across most species' },
          { id: 'B', text: 'It explains how a single tRNA can recognize multiple codons' },
          { id: 'C', text: 'It describes how DNA replication errors are corrected' },
          { id: 'D', text: 'It explains the mechanism of genetic recombination' },
          { id: 'E', text: 'It describes how mutations lead to genetic diversity' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q3_4',
        text: 'Which of the following best describes the function of tight junctions in epithelial tissues?',
        category: 'biology',
        options: [
          { id: 'A', text: 'They allow for the exchange of small molecules between adjacent cells' },
          { id: 'B', text: 'They create a virtually impermeable barrier between adjacent cells' },
          { id: 'C', text: 'They anchor cells to the extracellular matrix' },
          { id: 'D', text: 'They facilitate direct communication through cytoplasmic channels' },
          { id: 'E', text: 'They provide mechanical strength to tissues' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q4_4',
        text: 'The Bohr effect describes:',
        category: 'biology',
        options: [
          { id: 'A', text: 'How carbon dioxide affects the oxygen-binding capacity of hemoglobin' },
          { id: 'B', text: 'The relationship between atomic structure and light emission' },
          { id: 'C', text: 'How pH affects enzyme activity' },
          { id: 'D', text: 'The mechanism of electron transfer in photosystems' },
          { id: 'E', text: 'How temperature affects metabolic rate' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q5_4',
        text: 'What is the primary function of the glyoxylate cycle in plants and some microorganisms?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To generate glucose from fatty acids' },
          { id: 'B', text: 'To fix atmospheric nitrogen' },
          { id: 'C', text: 'To eliminate reactive oxygen species' },
          { id: 'D', text: 'To synthesize amino acids' },
          { id: 'E', text: 'To convert light energy to chemical energy' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q6_4',
        text: 'The concept of fluid mosaic model, proposed by Singer and Nicolson, refers to:',
        category: 'biology',
        options: [
          { id: 'A', text: 'The structure of the cytoskeleton' },
          { id: 'B', text: 'The arrangement of tissues in organs' },
          { id: 'C', text: 'The organization of the cell membrane' },
          { id: 'D', text: 'The pattern of blood flow in capillaries' },
          { id: 'E', text: 'The distribution of organelles in the cytoplasm' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q7_4',
        text: 'Which of the following ion channels is voltage-gated and primarily responsible for the upstroke of the action potential in neurons?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Potassium leak channels' },
          { id: 'B', text: 'Calcium-activated potassium channels' },
          { id: 'C', text: 'Ligand-gated sodium channels' },
          { id: 'D', text: 'Voltage-gated sodium channels' },
          { id: 'E', text: 'Chloride channels' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q8_4',
        text: 'Which epigenetic modification involves the addition of a methyl group to cytosine residues in DNA?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Histone acetylation' },
          { id: 'B', text: 'DNA methylation' },
          { id: 'C', text: 'Chromatin remodeling' },
          { id: 'D', text: 'RNA interference' },
          { id: 'E', text: 'Histone phosphorylation' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q9_4',
        text: 'The countercurrent multiplier system in the loop of Henle of the kidney functions to:',
        category: 'biology',
        options: [
          { id: 'A', text: 'Filter blood plasma' },
          { id: 'B', text: 'Secrete hydrogen ions' },
          { id: 'C', text: 'Reabsorb glucose' },
          { id: 'D', text: 'Create a concentration gradient for water reabsorption' },
          { id: 'E', text: 'Regulate blood pressure' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q10_4',
        text: 'Which of the following is NOT a mechanism of post-translational protein modification?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Phosphorylation' },
          { id: 'B', text: 'Glycosylation' },
          { id: 'C', text: 'Ubiquitination' },
          { id: 'D', text: 'Splicing' },
          { id: 'E', text: 'Acetylation' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q11_4',
        text: 'What is the primary function of the proteasome in eukaryotic cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Synthesis of proteins' },
          { id: 'B', text: 'Degradation of ubiquitin-tagged proteins' },
          { id: 'C', text: 'DNA replication' },
          { id: 'D', text: 'RNA processing' },
          { id: 'E', text: 'ATP synthesis' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q12_4',
        text: 'Which of the following is a characteristic of stem cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'They cannot divide' },
          { id: 'B', text: 'They are terminally differentiated' },
          { id: 'C', text: 'They lack the ability to self-renew' },
          { id: 'D', text: 'They can differentiate into multiple cell types' },
          { id: 'E', text: 'They are only found in embryonic tissues' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q13_4',
        text: 'The sodium-potassium pump (Na⁺/K⁺ ATPase) functions to:',
        category: 'biology',
        options: [
          { id: 'A', text: 'Transport glucose into cells' },
          { id: 'B', text: 'Maintain the resting membrane potential' },
          { id: 'C', text: 'Facilitate diffusion of lipids across the membrane' },
          { id: 'D', text: 'Generate ATP from ADP and phosphate' },
          { id: 'E', text: 'Synthesize proteins at the ribosome' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q14_4',
        text: 'Which of the following is an example of a second messenger in cellular signaling?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Insulin' },
          { id: 'B', text: 'Receptor tyrosine kinase' },
          { id: 'C', text: 'Cyclic AMP (cAMP)' },
          { id: 'D', text: 'G protein' },
          { id: 'E', text: 'Transcription factor' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q15_4',
        text: 'What is the primary role of the Golgi apparatus in protein secretion?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Initial protein synthesis' },
          { id: 'B', text: 'Degradation of misfolded proteins' },
          { id: 'C', text: 'Post-translational modification and sorting' },
          { id: 'D', text: 'Oxidative phosphorylation' },
          { id: 'E', text: 'Ribosomal RNA synthesis' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q16_4',
        text: 'The process of converting pyruvate to lactate during anaerobic conditions serves what primary purpose?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To generate additional ATP' },
          { id: 'B', text: 'To reduce muscle fatigue' },
          { id: 'C', text: 'To regenerate NAD⁺ for continued glycolysis' },
          { id: 'D', text: 'To eliminate excess pyruvate' },
          { id: 'E', text: 'To provide carbon skeletons for amino acid synthesis' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q17_4',
        text: 'Which of the following statements about telomeres is correct?',
        category: 'biology',
        options: [
          { id: 'A', text: 'They are coding regions at the beginning of genes' },
          { id: 'B', text: 'They are protective structures at the ends of chromosomes' },
          { id: 'C', text: 'They are enzymes that repair DNA damage' },
          { id: 'D', text: 'They are involved in protein synthesis' },
          { id: 'E', text: 'They are membrane receptors for hormones' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q18_4',
        text: 'What is the primary role of cyclins in the cell cycle?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To synthesize DNA during the S phase' },
          { id: 'B', text: 'To regulate the activity of cyclin-dependent kinases' },
          { id: 'C', text: 'To form the mitotic spindle' },
          { id: 'D', text: 'To facilitate cytokinesis' },
          { id: 'E', text: 'To initiate DNA repair mechanisms' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q19_4',
        text: 'Which of the following is a key characteristic of apoptosis that distinguishes it from necrosis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'It is a rapid, uncontrolled process' },
          { id: 'B', text: 'It results in an inflammatory response' },
          { id: 'C', text: 'It is an energy-dependent, programmed process' },
          { id: 'D', text: 'It involves cell swelling and rupture' },
          { id: 'E', text: 'It only occurs in response to severe tissue damage' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q20_4',
        text: 'What is the primary function of restriction endonucleases in bacterial cells?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To synthesize bacterial cell walls' },
          { id: 'B', text: 'To cleave foreign DNA at specific recognition sites' },
          { id: 'C', text: 'To replicate bacterial DNA' },
          { id: 'D', text: 'To facilitate conjugation between bacterial cells' },
          { id: 'E', text: 'To repair damaged DNA' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q21_4',
        text: 'The enzyme telomerase functions to:',
        category: 'biology',
        options: [
          { id: 'A', text: 'Repair double-strand breaks in DNA' },
          { id: 'B', text: 'Add nucleotides to the 3\' end of telomeres' },
          { id: 'C', text: 'Remove introns during RNA processing' },
          { id: 'D', text: 'Synthesize RNA primers during DNA replication' },
          { id: 'E', text: 'Catalyze the formation of peptide bonds' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q22_4',
        text: 'In the mechanism of RNA interference (RNAi), what is the function of the RISC complex?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To transcribe DNA into mRNA' },
          { id: 'B', text: 'To synthesize proteins from mRNA' },
          { id: 'C', text: 'To process pre-mRNA into mature mRNA' },
          { id: 'D', text: 'To cleave target mRNA or inhibit its translation' },
          { id: 'E', text: 'To replicate viral RNA' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q23_4',
        text: 'Which of the following best describes the process of facilitated diffusion across cell membranes?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Active transport requiring ATP hydrolysis' },
          { id: 'B', text: 'Movement of molecules against their concentration gradient' },
          { id: 'C', text: 'Passive transport of specific molecules through channel or carrier proteins' },
          { id: 'D', text: 'Bulk transport of materials via vesicles' },
          { id: 'E', text: 'Direct diffusion through the phospholipid bilayer' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q24_4',
        text: 'What is the primary function of the electron transport chain in mitochondria?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To generate NADH and FADH₂' },
          { id: 'B', text: 'To synthesize fatty acids' },
          { id: 'C', text: 'To establish a proton gradient for ATP synthesis' },
          { id: 'D', text: 'To break down glucose to pyruvate' },
          { id: 'E', text: 'To regenerate NAD⁺ during anaerobic respiration' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q25_4',
        text: 'Which of the following is a key function of the lymphatic system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Production of red blood cells' },
          { id: 'B', text: 'Return of excess tissue fluid to the circulatory system' },
          { id: 'C', text: 'Regulation of body temperature' },
          { id: 'D', text: 'Secretion of digestive enzymes' },
          { id: 'E', text: 'Generation of electrical impulses in the heart' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q26_4',
        text: 'What is the primary function of the cochlea in the inner ear?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Maintenance of balance' },
          { id: 'B', text: 'Amplification of sound waves' },
          { id: 'C', text: 'Conversion of sound waves to nerve impulses' },
          { id: 'D', text: 'Secretion of cerumen (ear wax)' },
          { id: 'E', text: 'Detection of angular acceleration' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q27_4',
        text: 'Which of the following processes is directly involved in the regulation of gene expression in eukaryotes?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Facilitated diffusion' },
          { id: 'B', text: 'Chromatin remodeling' },
          { id: 'C', text: 'Glycolysis' },
          { id: 'D', text: 'Osmotic regulation' },
          { id: 'E', text: 'DNA replication' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q28_4',
        text: 'What is the primary role of the corpus callosum in the brain?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To connect the cerebrum to the cerebellum' },
          { id: 'B', text: 'To connect the right and left cerebral hemispheres' },
          { id: 'C', text: 'To regulate the autonomic nervous system' },
          { id: 'D', text: 'To produce cerebrospinal fluid' },
          { id: 'E', text: 'To store long-term memories' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q29_4',
        text: 'In the process of translation, which of the following directly catalyzes the formation of peptide bonds?',
        category: 'biology',
        options: [
          { id: 'A', text: 'tRNA' },
          { id: 'B', text: 'mRNA' },
          { id: 'C', text: 'The ribosomal RNA (rRNA) of the large subunit' },
          { id: 'D', text: 'Aminoacyl-tRNA synthetase' },
          { id: 'E', text: 'Release factors' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q30_4',
        text: 'What is the primary function of the glomerulus in the nephron?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Reabsorption of glucose and amino acids' },
          { id: 'B', text: 'Secretion of hydrogen ions' },
          { id: 'C', text: 'Filtration of blood' },
          { id: 'D', text: 'Concentration of urine' },
          { id: 'E', text: 'Reabsorption of water' }
        ],
        correctOption: 'C'
      }
    ]
  },
  '8': {
    id: '8',
    title: 'Custom IMAT Practice Test 1',
    description: 'Custom practice test with all-new questions matching the real IMAT exam difficulty and format.',
    timeLimit: 100, // minutes
    questions: [
      // Reading Comprehension & General Knowledge (4 questions)
      {
        id: 'q1_8',
        text: `Read the following passage and answer the question below:\n\nA growing body of evidence suggests that microplastics—tiny plastic particles less than 5mm in size—have become pervasive environmental pollutants. These particles originate from various sources, including the breakdown of larger plastic items and microbeads from personal care products. Recent studies have detected microplastics in drinking water, food products, and even in human blood and lung tissues. While the full health implications remain unclear, researchers are concerned about potential bioaccumulation and the ability of these particles to transport harmful chemicals into body tissues. Despite these concerns, there are currently no comprehensive regulations specifically targeting microplastic pollution.\n\nAccording to the passage, which of the following statements is correct?`,
        category: 'reading',
        options: [
          { id: 'A', text: 'Microplastics are defined as plastic particles larger than 5mm in size' },
          { id: 'B', text: 'The health effects of microplastic exposure are thoroughly understood' },
          { id: 'C', text: 'Microplastics can originate from the breakdown of larger plastic items' },
          { id: 'D', text: 'Strict international regulations exist to control microplastic pollution' },
          { id: 'E', text: 'Microplastics have only been detected in marine environments' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q2_8',
        text: `Read the following passage and answer the question below:\n\nAntimicrobial resistance (AMR) poses one of the most significant threats to global public health in the 21st century. The overuse and misuse of antimicrobial agents in human medicine, animal husbandry, and agriculture have accelerated the natural process by which microorganisms develop resistance to treatment. Without effective antimicrobials, routine surgeries and minor infections could become life-threatening events. The World Health Organization has emphasized that AMR requires a coordinated, multisectoral "One Health" approach involving human and animal health, agriculture, and environmental sectors. Strategies to combat AMR include developing new antimicrobial agents, improving diagnostic techniques to ensure appropriate treatment, implementing antimicrobial stewardship programs, and reducing the use of antimicrobials in food-producing animals.\n\nWhich of the following is described in the passage as a strategy to combat antimicrobial resistance?`,
        category: 'reading',
        options: [
          { id: 'A', text: 'Increasing the use of prophylactic antibiotics in healthy individuals' },
          { id: 'B', text: 'Focusing exclusively on human medical interventions' },
          { id: 'C', text: 'Expanding antimicrobial use in agriculture to prevent crop diseases' },
          { id: 'D', text: 'Improving diagnostic techniques to ensure appropriate treatment' },
          { id: 'E', text: 'Developing broader spectrum antibiotics for widespread use' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q3_8',
        text: 'Which of the following diseases is caused by a prion?',
        category: 'reading',
        options: [
          { id: 'A', text: 'Malaria' },
          { id: 'B', text: 'Influenza' },
          { id: 'C', text: 'Creutzfeldt-Jakob disease' },
          { id: 'D', text: 'Tuberculosis' },
          { id: 'E', text: 'Hepatitis B' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q4_8',
        text: 'Which of the following discoveries resulted in the 2020 Nobel Prize in Physiology or Medicine?',
        category: 'reading',
        options: [
          { id: 'A', text: 'Development of mRNA vaccines' },
          { id: 'B', text: 'Discovery of the hepatitis C virus' },
          { id: 'C', text: 'Identification of cancer immunotherapy targets' },
          { id: 'D', text: 'Development of CRISPR-Cas9 gene editing' },
          { id: 'E', text: 'Discovery of the role of telomeres in cellular aging' }
        ],
        correctOption: 'B'
      },
      // Logical Reasoning (5 questions)
      {
        id: 'q5_8',
        text: 'In a hospital, 60% of patients are female. If 25% of female patients and 30% of male patients are over 65 years old, what percentage of all patients in the hospital are over 65 years old?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '25%' },
          { id: 'B', text: '27%' },
          { id: 'C', text: '28%' },
          { id: 'D', text: '30%' },
          { id: 'E', text: '55%' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q6_8',
        text: 'If the statement "All medical students study anatomy" is true, which of the following statements must also be true?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: 'Only medical students study anatomy' },
          { id: 'B', text: 'If someone studies anatomy, they are a medical student' },
          { id: 'C', text: 'If someone does not study anatomy, they are not a medical student' },
          { id: 'D', text: 'Some medical students do not study anatomy' },
          { id: 'E', text: 'No medical students study physiology' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q7_8',
        text: 'A medical research study enrolls participants who are either smokers or non-smokers, and who either exercise regularly or do not. The study includes 50 smokers, 80 participants who exercise regularly, and 30 participants who both smoke and exercise regularly. How many participants are in the study?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '100' },
          { id: 'B', text: '110' },
          { id: 'C', text: '130' },
          { id: 'D', text: '160' },
          { id: 'E', text: '180' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q8_8',
        text: 'Five patients arrive at a clinic and must be seen in a specific order. How many different possible orders are there?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '5' },
          { id: 'B', text: '15' },
          { id: 'C', text: '25' },
          { id: 'D', text: '60' },
          { id: 'E', text: '120' }
        ],
        correctOption: 'E'
      },
      {
        id: 'q9_8',
        text: 'A doctor can prescribe either medication A, B, or C for a certain condition. 50% of patients receive medication A, 30% receive medication B, and 20% receive medication C. If 10% of patients who receive medication A experience side effects, 15% with medication B, and 5% with medication C, what percentage of all patients experience side effects?',
        category: 'logical_reasoning',
        options: [
          { id: 'A', text: '5%' },
          { id: 'B', text: '10%' },
          { id: 'C', text: '10.5%' },
          { id: 'D', text: '15%' },
          { id: 'E', text: '30%' }
        ],
        correctOption: 'C'
      },
      // Biology Questions (23 questions)
      {
        id: 'q10_8',
        text: 'Which of the following is the primary site for gluconeogenesis in the human body?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Skeletal muscle' },
          { id: 'B', text: 'Liver' },
          { id: 'C', text: 'Adipose tissue' },
          { id: 'D', text: 'Pancreas' },
          { id: 'E', text: 'Kidneys' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q11_8',
        text: 'Which of the following is NOT a component of the extracellular matrix?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Collagen' },
          { id: 'B', text: 'Elastin' },
          { id: 'C', text: 'Fibronectin' },
          { id: 'D', text: 'Actin' },
          { id: 'E', text: 'Proteoglycans' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q12_8',
        text: 'What is the function of dendritic cells in the immune system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Antibody production' },
          { id: 'B', text: 'Antigen presentation to T lymphocytes' },
          { id: 'C', text: 'Direct killing of infected cells' },
          { id: 'D', text: 'Release of histamine during allergic reactions' },
          { id: 'E', text: 'Production of red blood cells' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q13_8',
        text: 'Which of the following organelles contains its own DNA and ribosomes?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Golgi apparatus' },
          { id: 'B', text: 'Endoplasmic reticulum' },
          { id: 'C', text: 'Mitochondria' },
          { id: 'D', text: 'Lysosome' },
          { id: 'E', text: 'Peroxisome' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q14_8',
        text: 'What is the primary role of cytochrome c in cellular respiration?',
        category: 'biology',
        options: [
          { id: 'A', text: 'It is a component of ATP synthase' },
          { id: 'B', text: 'It catalyzes the first step of glycolysis' },
          { id: 'C', text: 'It carries electrons in the electron transport chain' },
          { id: 'D', text: 'It transports pyruvate into the mitochondria' },
          { id: 'E', text: 'It converts glucose to glucose-6-phosphate' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q15_8',
        text: 'Which of the following is a direct outcome of meiotic recombination?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Separation of sister chromatids' },
          { id: 'B', text: 'Increase in chromosome number' },
          { id: 'C', text: 'Production of identical daughter cells' },
          { id: 'D', text: 'Exchange of genetic material between homologous chromosomes' },
          { id: 'E', text: 'Synthesis of new DNA strands' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q16_8',
        text: 'What is the source of oxygen released during photosynthesis?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Carbon dioxide (CO₂)' },
          { id: 'B', text: 'Glucose (C₆H₁₂O₆)' },
          { id: 'C', text: 'Water (H₂O)' },
          { id: 'D', text: 'Pyruvate (C₃H₄O₃)' },
          { id: 'E', text: 'Chlorophyll' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q17_8',
        text: 'Which neurotransmitter is associated with reward pathways in the brain and is often implicated in addiction?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Acetylcholine' },
          { id: 'B', text: 'GABA' },
          { id: 'C', text: 'Dopamine' },
          { id: 'D', text: 'Serotonin' },
          { id: 'E', text: 'Glutamate' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q18_8',
        text: 'Which of the following hormones regulates calcium levels in the blood?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Insulin' },
          { id: 'B', text: 'Calcitonin' },
          { id: 'C', text: 'Thyroxine' },
          { id: 'D', text: 'Adrenaline' },
          { id: 'E', text: 'Aldosterone' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q19_8',
        text: 'What is the function of the corpus luteum in the menstrual cycle?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Production of estrogen during the follicular phase' },
          { id: 'B', text: 'Release of the secondary oocyte during ovulation' },
          { id: 'C', text: 'Production of progesterone during the luteal phase' },
          { id: 'D', text: 'Shedding of the endometrium during menstruation' },
          { id: 'E', text: 'Transport of the zygote to the uterus' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q20_8',
        text: 'What is the primary function of the zona pellucida?',
        category: 'biology',
        options: [
          { id: 'A', text: 'To protect the developing embryo from the immune system' },
          { id: 'B', text: 'To provide nutrients to the early embryo' },
          { id: 'C', text: 'To serve as a barrier that sperm must penetrate for fertilization' },
          { id: 'D', text: 'To form the placenta during implantation' },
          { id: 'E', text: 'To support nuclear division in the zygote' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q21_8',
        text: 'Which of the following is a characteristic of RNA but not DNA?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Contains phosphate groups' },
          { id: 'B', text: 'Made up of nucleotides' },
          { id: 'C', text: 'Contains uracil' },
          { id: 'D', text: 'Forms hydrogen bonds' },
          { id: 'E', text: 'Contains nitrogenous bases' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q22_8',
        text: 'Which of the following cell types is responsible for myelin production in the central nervous system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Microglia' },
          { id: 'B', text: 'Astrocytes' },
          { id: 'C', text: 'Oligodendrocytes' },
          { id: 'D', text: 'Ependymal cells' },
          { id: 'E', text: 'Schwann cells' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q23_8',
        text: 'What is the primary function of the Bowman\'s capsule in the nephron?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Reabsorption of glucose' },
          { id: 'B', text: 'Collection of filtrate from the glomerulus' },
          { id: 'C', text: 'Secretion of hydrogen ions' },
          { id: 'D', text: 'Concentration of urine' },
          { id: 'E', text: 'Regulation of blood pressure' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q24_8',
        text: 'Which of the following enzymes is responsible for unwinding the DNA double helix during replication?',
        category: 'biology',
        options: [
          { id: 'A', text: 'DNA ligase' },
          { id: 'B', text: 'DNA helicase' },
          { id: 'C', text: 'DNA polymerase' },
          { id: 'D', text: 'Topoisomerase' },
          { id: 'E', text: 'Primase' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q25_8',
        text: 'Which type of muscle tissue has intercalated discs that allow for coordinated contraction?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Skeletal muscle' },
          { id: 'B', text: 'Smooth muscle' },
          { id: 'C', text: 'Cardiac muscle' },
          { id: 'D', text: 'Striated muscle' },
          { id: 'E', text: 'Voluntary muscle' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q26_8',
        text: 'What is the role of the thymus gland in the immune system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Production of antibodies' },
          { id: 'B', text: 'Maturation of T lymphocytes' },
          { id: 'C', text: 'Production of red blood cells' },
          { id: 'D', text: 'Storage of memory B cells' },
          { id: 'E', text: 'Activation of the complement system' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q27_8',
        text: 'Which of the following is the primary neurotransmitter at the neuromuscular junction?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Dopamine' },
          { id: 'B', text: 'Serotonin' },
          { id: 'C', text: 'Acetylcholine' },
          { id: 'D', text: 'Norepinephrine' },
          { id: 'E', text: 'GABA' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q28_8',
        text: 'Which of the following vitamins is required for blood clotting?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Vitamin A' },
          { id: 'B', text: 'Vitamin C' },
          { id: 'C', text: 'Vitamin D' },
          { id: 'D', text: 'Vitamin E' },
          { id: 'E', text: 'Vitamin K' }
        ],
        correctOption: 'E'
      },
      {
        id: 'q29_8',
        text: 'What is the primary function of the bulbourethral glands in the male reproductive system?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Production of sperm' },
          { id: 'B', text: 'Secretion of testosterone' },
          { id: 'C', text: 'Production of seminal fluid' },
          { id: 'D', text: 'Secretion of mucus to neutralize urethral acidity' },
          { id: 'E', text: 'Storage of mature sperm' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q30_8',
        text: 'Which of the following blood vessels carries oxygenated blood?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Pulmonary artery' },
          { id: 'B', text: 'Renal vein' },
          { id: 'C', text: 'Hepatic portal vein' },
          { id: 'D', text: 'Superior vena cava' },
          { id: 'E', text: 'Pulmonary vein' }
        ],
        correctOption: 'E'
      },
      {
        id: 'q31_8',
        text: 'What is the primary function of surfactant in the lungs?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Facilitation of gas exchange' },
          { id: 'B', text: 'Reduction of surface tension in alveoli' },
          { id: 'C', text: 'Elimination of carbon dioxide' },
          { id: 'D', text: 'Protection against inhaled pathogens' },
          { id: 'E', text: 'Transport of oxygen from alveoli to blood' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q32_8',
        text: 'What happens during the depolarization phase of an action potential in a neuron?',
        category: 'biology',
        options: [
          { id: 'A', text: 'Potassium channels open, allowing K⁺ to enter the cell' },
          { id: 'B', text: 'Sodium channels close, preventing Na⁺ from entering the cell' },
          { id: 'C', text: 'Sodium channels open, allowing Na⁺ to enter the cell' },
          { id: 'D', text: 'Calcium channels close, preventing Ca²⁺ from entering the cell' },
          { id: 'E', text: 'The membrane potential becomes more negative' }
        ],
        correctOption: 'C'
      },
      // Chemistry Questions (15 questions)
      {
        id: 'q33_8',
        text: 'Which of the following functional groups is responsible for the acidic properties of carboxylic acids?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Hydroxyl (-OH)' },
          { id: 'B', text: 'Carbonyl (C=O)' },
          { id: 'C', text: 'Carboxyl (-COOH)' },
          { id: 'D', text: 'Amino (-NH₂)' },
          { id: 'E', text: 'Aldehyde (-CHO)' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q34_8',
        text: 'Which of the following statements about buffer solutions is correct?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'They maintain a constant pH when strong acids are added' },
          { id: 'B', text: 'They are typically composed of a strong acid and its conjugate base' },
          { id: 'C', text: 'They work most effectively when the pH is far from the pKa of the acid' },
          { id: 'D', text: 'They increase the rate of chemical reactions' },
          { id: 'E', text: 'They cannot contain proteins' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q35_8',
        text: 'What type of isomerism is exhibited between glucose and fructose?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Geometric isomerism' },
          { id: 'B', text: 'Conformational isomerism' },
          { id: 'C', text: 'Enantiomerism' },
          { id: 'D', text: 'Functional group isomerism' },
          { id: 'E', text: 'Positional isomerism' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q36_8',
        text: 'What is the hybridization of the carbon atom in carbon dioxide (CO₂)?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'sp' },
          { id: 'B', text: 'sp²' },
          { id: 'C', text: 'sp³' },
          { id: 'D', text: 'sp³d' },
          { id: 'E', text: 'sp³d²' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q37_8',
        text: 'Which of the following is an example of a nucleophile?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'H⁺' },
          { id: 'B', text: 'BF₃' },
          { id: 'C', text: 'AlCl₃' },
          { id: 'D', text: 'OH⁻' },
          { id: 'E', text: 'NO₂⁺' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q38_8',
        text: 'What is the IUPAC name for the compound CH₃-CH(OH)-CH₂-CHO?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '3-Hydroxybutanal' },
          { id: 'B', text: '2-Hydroxybutanal' },
          { id: 'C', text: '3-Hydroxybutanol' },
          { id: 'D', text: '2-Hydroxypropanal' },
          { id: 'E', text: 'Butanol-2-al' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q39_8',
        text: 'Which of the following methods is most suitable for separating components of a mixture based on their boiling points?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Chromatography' },
          { id: 'B', text: 'Filtration' },
          { id: 'C', text: 'Distillation' },
          { id: 'D', text: 'Crystallization' },
          { id: 'E', text: 'Centrifugation' }
        ],
        correctOption: 'C'
      },
      {
        id: 'q40_8',
        text: 'What is the value of the equilibrium constant (Kc) for the reaction 2NO(g) + O₂(g) ⇌ 2NO₂(g) at 25°C?',
        category: 'chemistry',
        options: [
          { id: 'A', text: '0.012' },
          { id: 'B', text: '0.024' },
          { id: 'C', text: '0.048' },
          { id: 'D', text: '0.096' },
          { id: 'E', text: '0.192' }
        ],
        correctOption: 'B'
      },
      {
        id: 'q41_8',
        text: 'Which of the following statements about the periodic table is correct?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Elements are arranged in order of increasing atomic number' },
          { id: 'B', text: 'Elements are arranged in order of increasing atomic mass' },
          { id: 'C', text: 'Elements are arranged in order of increasing electronegativity' },
          { id: 'D', text: 'Elements are arranged in order of increasing ionization energy' },
          { id: 'E', text: 'Elements are arranged in order of increasing melting point' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q42_8',
        text: 'What is the formula of the compound that forms a white precipitate with barium chloride solution?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'AgNO₃' },
          { id: 'B', text: 'Pb(NO₃)₂' },
          { id: 'C', text: 'CaCl₂' },
          { id: 'D', text: 'BaSO₄' },
          { id: 'E', text: 'Na₂CO₃' }
        ],
        correctOption: 'D'
      },
      {
        id: 'q43_8',
        text: 'Which of the following is a property of a strong acid?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'Completely ionizes in water' },
          { id: 'B', text: 'Has a pH of 7' },
          { id: 'C', text: 'Has a pH less than 7' },
          { id: 'D', text: 'Has a pH greater than 7' },
          { id: 'E', text: 'Has a pH of 1' }
        ],
        correctOption: 'A'
      },
      {
        id: 'q50_8',
        text: 'What is the formula of the compound that forms a colorless gas with a rotten egg odor?',
        category: 'chemistry',
        options: [
          { id: 'A', text: 'H₂S' },
          { id: 'B', text: 'CO₂' },
          { id: 'C', text: 'NH₃' },
          { id: 'D', text: 'SO₂' },
          { id: 'E', text: 'O₂' }
        ],
        correctOption: 'A'
      }
    ]
  }
}

export default function MockTest() {
  const router = useRouter();
  const params = useParams();
  const testId = params.id as string;
  
  const [currentTest, setCurrentTest] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | null>>({});
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validate test data
  const validateTest = (testData: any) => {
    if (!testData) {
      return "Test not found";
    }
    
    const expectedQuestionCount = {
      '1': 60, // IMAT 2023 (Full mock test)
      '2': 60, // IMAT 2022 (Full mock test)
      '3': 30, // Biology Focus Test
      '4': 30, // Advanced Biology Test
      '5': 30, // Chemistry Focus Test
      '6': 20, // Physics & Mathematics Focus Test
      '7': 20, // Reading & Logical Reasoning Focus Test
      '8': 60, // Custom IMAT Practice Test 1
    };
    
    const actualQuestionCount = testData.questions?.length || 0;
    const expectedCount = expectedQuestionCount[testId] || 60;
    
    console.log(`Test ID: ${testId}, Expected: ${expectedCount}, Actual: ${actualQuestionCount}`);
    
    if (actualQuestionCount < expectedCount) {
      return `This test is incomplete. Expected ${expectedCount} questions but found ${actualQuestionCount}. Please try another test.`;
    }
    
    return null;
  };

  // Load test data
  useEffect(() => {
    if (testId && mockTests[testId]) {
      const testData = mockTests[testId];
      const validationError = validateTest(testData);
      
      if (validationError) {
        setErrorMessage(validationError);
        setIsLoading(false);
        return;
      }
      
      setCurrentTest(testData);
      setTimeRemaining(testData.timeLimit * 60); // Convert minutes to seconds
      
      // Initialize userAnswers
      const answers: Record<string, string | null> = {};
      testData.questions.forEach((q: any) => {
        answers[q.id] = null;
      });
      setUserAnswers(answers);
    } else {
      // Test not found
      router.push('/mock-tests');
    }
    
    setIsLoading(false);
  }, [testId, router]);

  // Timer effect
  useEffect(() => {
    if (!testStarted || testCompleted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTestCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testCompleted, timeRemaining]);

  const startTest = () => {
    setTestStarted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, option: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const removeAnswer = (questionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: null,
    }));
  };

  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < currentTest?.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const completeTest = () => {
    setTestCompleted(true);
    // In a real app, you would save the results to the server here
  };

  const calculateScore = () => {
    if (!currentTest) return 0;
    
    let score = 0;
    currentTest.questions.forEach((question: any) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === question.correctOption) {
        score += 1.5; // Correct answer
      } else if (userAnswer !== null) {
        score -= 0.4; // Incorrect answer
      }
      // No penalty for unanswered questions
    });
    
    return score; // Return the raw score, even if negative
  };

  // Get the displayed score (never negative)
  const getDisplayedScore = () => {
    return Math.max(0, calculateScore());
  };

  // Group questions by category
  const getQuestionsByCategory = () => {
    if (!currentTest) return {};
    
    const categories: Record<string, any[]> = {
      'reading': [],
      'logical_reasoning': [],
      'biology': [],
      'chemistry': [],
      'physics_math': []
    };
    
    currentTest.questions.forEach((question: any, index: number) => {
      if (categories[question.category]) {
        categories[question.category].push({...question, index});
      }
    });
    
    return categories;
  };

  const downloadPDF = () => {
    // Get arrays of correct, incorrect, and unanswered questions
    const correctAnswers = currentTest.questions.filter((q: any) => 
      userAnswers[q.id] === q.correctOption
    );
    
    const incorrectAnswers = currentTest.questions.filter((q: any) => 
      userAnswers[q.id] !== undefined && userAnswers[q.id] !== null && userAnswers[q.id] !== q.correctOption
    );
    
    const unansweredQuestions = currentTest.questions.filter((q: any) => 
      userAnswers[q.id] === undefined || userAnswers[q.id] === null
    );

    // Initialize PDF document with explicit margins to prevent text cropping
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      margins: { top: 20, bottom: 20, left: 20, right: 20 }
    });
    
    // Set document properties
    doc.setProperties({
      title: `${currentTest.title} - Results`,
      subject: 'IMAT Mock Test Results',
      author: 'IMAT Prep',
      creator: 'IMAT Prep'
    });
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(41, 98, 255);
    doc.text(currentTest.title, 105, 15, { align: 'center' });
    
    // Add test information
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const testInfo = `Date: ${new Date().toLocaleDateString()} | Score: ${getDisplayedScore().toFixed(1)} | Time: ${formatTime((currentTest.timeLimit * 60) - timeRemaining)}`;
    doc.text(testInfo, 105, 22, { align: 'center' });
    
    doc.line(20, 25, 190, 25);
    
    // Add table of contents
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Table of Contents', 105, 35, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text('1. Questions by Category', 40, 45);
    doc.text('2. Answer Key', 40, 52);
    doc.text('3. Score Summary', 40, 59);
    
    doc.addPage();
    
    // Add questions by category
    doc.setFontSize(16);
    doc.setTextColor(41, 98, 255);
    doc.text('Questions by Category', 105, 15, { align: 'center' });
    
    doc.line(20, 17, 190, 17);
    
    const categoryNames: Record<string, string> = {
      'reading': 'Reading Comprehension & General Knowledge',
      'logical_reasoning': 'Logical Reasoning',
      'biology': 'Biology',
      'chemistry': 'Chemistry',
      'physics_math': 'Physics & Mathematics'
    };
    
    const categorizedQuestions = getQuestionsByCategory();
    let yPos = 28;
    
    Object.entries(categorizedQuestions).forEach(([category, questions], categoryIndex) => {
      if (questions.length === 0) return;
      
      // Start a new page if needed
      if (yPos > 260 && categoryIndex < Object.keys(categorizedQuestions).length - 1) {
        doc.addPage();
        yPos = 28;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 102);
      doc.text(categoryNames[category] || category, 20, yPos);
      yPos += 8;
      
      questions.forEach((question: any, index: number) => {
        // Start a new page if we're close to the bottom
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const qNumber = currentTest.questions.findIndex((q: any) => q.id === question.id) + 1;
        
        // Question text with reduced width to prevent cropping at edges
        const questionText = `Q${qNumber}: ${question.text}`;
        const splitTitle = doc.splitTextToSize(questionText, 150);  // Reduced from 160 to 150
        
        doc.text(splitTitle, 25, yPos);
        yPos += splitTitle.length * 5 + 3;  // Add more space between question text and options
        
        // Question options
        question.options.forEach((option: any) => {
          // Start a new page if needed
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          
          const userAnswer = userAnswers[question.id];
          const optionText = `${option.id}. ${option.text}`;
          
          // Adjust this from 145 to 135 to prevent option text from being cropped
          const splitOption = doc.splitTextToSize(optionText, 135);
          
          if (option.id === question.correctOption) {
            doc.setTextColor(0, 128, 0);
          } else if (option.id === userAnswer && option.id !== question.correctOption) {
            doc.setTextColor(200, 0, 0);
          } else {
            doc.setTextColor(0, 0, 0);
          }
          
          doc.text(splitOption, 30, yPos);
          yPos += splitOption.length * 4.5 + 1.5;  // Increase line spacing slightly
        });
        
        yPos += 3;  // Add extra space between questions
      });
      
      yPos += 5;
    });
    
    // Add answer key
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(41, 98, 255);
    doc.text('Answer Key', 105, 15, { align: 'center' });
    
    doc.line(20, 17, 190, 17);
    
    // Calculate the number of tables needed based on the number of questions
    // Reduced the answers per table to ensure everything fits well
    const answersPerTable = 35;  // Reduced from 40 to 35
    const tableCount = Math.ceil(currentTest.questions.length / answersPerTable);
    
    for (let table = 0; table < tableCount; table++) {
      const startIdx = table * answersPerTable;
      const endIdx = Math.min(startIdx + answersPerTable, currentTest.questions.length);
      const tableData: any = [];
      
      // Add header row
      const headerRow = [
        { content: 'Q #', styles: { fontStyle: 'bold', halign: 'center' } },
        { content: 'Category', styles: { fontStyle: 'bold', halign: 'center' } },
        { content: 'Correct Answer', styles: { fontStyle: 'bold', halign: 'center' } },
        { content: 'Your Answer', styles: { fontStyle: 'bold', halign: 'center' } },
        { content: 'Result', styles: { fontStyle: 'bold', halign: 'center' } }
      ];
      
      // Populate table data
      for (let i = startIdx; i < endIdx; i++) {
        const question = currentTest.questions[i];
        const userAnswer = userAnswers[question.id] || '-';
        const isCorrect = userAnswer === question.correctOption;
        
        tableData.push([
          { content: (i + 1).toString(), styles: { halign: 'center' } },
          { content: categoryNames[question.category] || question.category, styles: { fontSize: 8, halign: 'left' } },
          { content: question.correctOption, styles: { halign: 'center', fontStyle: 'bold' } },
          { content: userAnswer, styles: { halign: 'center' } },
          { 
            content: isCorrect ? 'Correct' : userAnswer === '-' ? 'Unanswered' : 'Incorrect', 
            styles: { 
              halign: 'center',
              textColor: isCorrect ? [0, 128, 0] : userAnswer === '-' ? [100, 100, 100] : [200, 0, 0]
            } 
          }
        ]);
      }
      
      // Add the table to the document with adjusted cell padding for better readability
      autoTable(doc, {
        startY: table === 0 ? 35 : 20,
        head: [headerRow],
        body: tableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [41, 98, 255],
          textColor: [255, 255, 255]
        },
        alternateRowStyles: { 
          fillColor: [240, 240, 240] 
        },
        styles: { 
          fontSize: 9, 
          cellPadding: 7,  // Increased padding from 6 to 7
          overflow: 'linebreak',
          lineWidth: 0.1,
          lineColor: [200, 200, 200]
        },
        columnStyles: {
          0: { cellWidth: 12 },
          1: { cellWidth: 45 },  // Reduced from 50 to 45
          2: { cellWidth: 28 },
          3: { cellWidth: 28 },
          4: { cellWidth: 28 }
        },
        margin: { left: 30, right: 30 },  // Increased margins for table from 25 to 30
        // Add handlers for text overflow
        didParseCell: function(data) {
          // Reduce font size for long text
          const cell = data.cell;
          if (cell.text && cell.text.toString().length > 20) { // Reduced threshold from 25 to 20
            cell.styles.fontSize = 7;
          }
          if (cell.text && cell.text.toString().length > 40) { // Additional reduction for very long text
            cell.styles.fontSize = 6;
          }
        },
        // Handle table rendering to ensure it fits properly on the page
        didDrawPage: function(data) {
          // Add header to new pages
          if (data.pageNumber > 1 && table === tableCount - 1) {
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text('Answer Key (continued)', 105, 15, { align: 'center' });
            doc.line(20, 17, 190, 17);
          }
        }
      });
      
      // Add a new page for the next table if needed
      if (table < tableCount - 1) {
        doc.addPage();
      }
    }
    
    // Add a score summary at the end
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text('Test Summary', 105, 20, { align: 'center' });
    
    // Score circle with total
    const score = calculateScore();
    const displayedScore = Math.max(0, score); // Ensure non-negative for display
    const totalPossibleScore = currentTest.questions.length * 1.5;
    const percentageScore = Math.round((displayedScore / totalPossibleScore) * 100);
    
    // Draw circle with score
    doc.setFillColor(41, 98, 255);
    doc.circle(105, 60, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`${percentageScore}%`, 105, 58, { align: 'center' });
    doc.setFontSize(8);
    doc.text('SCORE', 105, 65, { align: 'center' });
    
    // Add raw marks below the circle
    doc.setTextColor(0, 51, 102);
    doc.setFontSize(12);
    doc.text('Raw Marks:', 85, 85, { align: 'right' });
    
    // Set color based on whether score is negative or positive
    if (score < 0) {
      doc.setTextColor(200, 0, 0);
    } else {
      doc.setTextColor(0, 100, 0);
    }
    doc.setFontSize(12);
    doc.text(`${score.toFixed(1)}`, 125, 85, { align: 'left' });
    
    // Summary boxes
    doc.setDrawColor(0);
    doc.setFillColor(220, 240, 220);
    doc.roundedRect(40, 90, 50, 30, 3, 3, 'F');
    doc.setTextColor(0, 100, 0);
    doc.setFontSize(10);
    doc.text('Correct Answers', 65, 100, { align: 'center' });
    doc.setFontSize(14);
    doc.text(correctAnswers.length.toString(), 65, 110, { align: 'center' });
    
    doc.setFillColor(250, 220, 220);
    doc.roundedRect(120, 90, 50, 30, 3, 3, 'F');
    doc.setTextColor(200, 0, 0);
    doc.text('Incorrect Answers', 145, 100, { align: 'center' });
    doc.setFontSize(14);
    doc.text(incorrectAnswers.length.toString(), 145, 110, { align: 'center' });
    
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(40, 130, 50, 30, 3, 3, 'F');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text('Unanswered', 65, 140, { align: 'center' });
    doc.setFontSize(14);
    doc.text(unansweredQuestions.length.toString(), 65, 150, { align: 'center' });
    
    doc.setFillColor(220, 230, 250);
    doc.roundedRect(120, 130, 50, 30, 3, 3, 'F');
    doc.setTextColor(0, 51, 153);
    doc.setFontSize(10);
    doc.text('Time Taken', 145, 140, { align: 'center' });
    doc.setFontSize(14);
    doc.text(formatTime((currentTest.timeLimit * 60) - timeRemaining), 145, 150, { align: 'center' });
    
    // Save the document
    doc.save(`${currentTest.title.replace(/\s+/g, '_')}_Results.pdf`);
  };

  // Render error message if test is invalid
  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Unavailable</h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <Link href="/mock-tests" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Return to Test List
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !currentTest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentTest.title}</h1>
            <p className="text-gray-700 mb-6">{currentTest.description}</p>
            
            <div className="border-t border-b border-gray-200 py-4 my-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-800 font-medium">Time Limit:</span>
                <span className="font-medium text-gray-900">{currentTest.timeLimit} minutes</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-800 font-medium">Number of Questions:</span>
                <span className="font-medium text-gray-900">{currentTest.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800 font-medium">Scoring:</span>
                <span className="font-medium text-gray-900">+1.5 correct, -0.4 incorrect, 0 unanswered</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md mb-6">
              <h2 className="font-medium text-yellow-800 mb-2">Important Information</h2>
              <ul className="list-disc pl-5 text-yellow-700 text-sm space-y-1">
                <li>Once you start the test, the timer cannot be paused.</li>
                <li>Make sure you have a stable internet connection.</li>
                <li>You can navigate between questions during the test.</li>
                <li>Your answers are saved as you progress.</li>
                <li>When the time is up, the test will be automatically submitted.</li>
              </ul>
            </div>
            
            <button
              onClick={startTest}
              className="w-full py-3 px-4 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Start Test Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    const rawScore = calculateScore();
    const displayedScore = getDisplayedScore();
    const totalPossibleScore = currentTest.questions.length * 1.5;
    const percentageScore = Math.round((displayedScore / totalPossibleScore) * 100);
    
    // Get arrays of correct and incorrect answers
    const correctAnswers = currentTest.questions.filter((q: any, idx: number) => 
      userAnswers[q.id] === q.correctOption
    );
    
    const incorrectAnswers = currentTest.questions.filter((q: any) => 
      userAnswers[q.id] !== null && userAnswers[q.id] !== q.correctOption
    );
    
    const unansweredQuestions = currentTest.questions.filter((q: any) => 
      userAnswers[q.id] === null
    );
    
    // Group incorrect answers by category
    const incorrectByCategory: Record<string, any[]> = {
      'reading': [],
      'logical_reasoning': [],
      'biology': [],
      'chemistry': [],
      'physics_math': []
    };
    
    incorrectAnswers.forEach((question: any) => {
      if (incorrectByCategory[question.category]) {
        incorrectByCategory[question.category].push(question);
      }
    });
    
    const categoryNames: Record<string, string> = {
      'reading': 'Reading Comprehension & General Knowledge',
      'logical_reasoning': 'Logical Reasoning',
      'biology': 'Biology',
      'chemistry': 'Chemistry',
      'physics_math': 'Physics & Mathematics'
    };
    
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Completed</h1>
            <p className="text-gray-700 mb-6">You have completed the {currentTest.title}.</p>
            
            <div className="border-t border-b border-gray-200 py-6 my-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-medium text-gray-900">Your Score</h2>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-blue-700">{displayedScore.toFixed(1)}</span>
                  <span className="text-gray-700 ml-2">/ {totalPossibleScore.toFixed(1)}</span>
                </div>
                <p className="text-gray-700 mt-2">{percentageScore}% correct</p>
                <p className="text-gray-700 mt-2">Raw Marks: <span className={rawScore < 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>{rawScore.toFixed(1)}</span></p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-green-800">Correct Answers</p>
                    <p className="text-xl font-medium text-green-900 mt-1">
                      {correctAnswers.length}
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-red-800">Incorrect Answers</p>
                    <p className="text-xl font-medium text-red-900 mt-1">
                      {incorrectAnswers.length}
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-800">Unanswered</p>
                    <p className="text-xl font-medium text-gray-900 mt-1">
                      {unansweredQuestions.length}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-blue-800">Time Taken</p>
                    <p className="text-xl font-medium text-blue-900 mt-1">
                      {formatTime((currentTest.timeLimit * 60) - timeRemaining)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 flex justify-end">
              <button
                onClick={downloadPDF}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Question Paper with Answer Key
              </button>
            </div>
            
            {/* Incorrect Answers Review */}
            {incorrectAnswers.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Questions You Attempted Wrong</h3>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {Object.entries(incorrectByCategory).map(([category, questions]) => {
                    if (questions.length === 0) return null;
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1 text-sm rounded-full ${
                          activeCategory === category 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {categoryNames[category]} ({questions.length})
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      activeCategory === null 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    All ({incorrectAnswers.length})
                  </button>
                </div>
                
                <div className="space-y-6">
                  {Object.entries(incorrectByCategory).map(([category, questions]) => {
                    if ((activeCategory && category !== activeCategory) || questions.length === 0) {
                      return null;
                    }
                    
                    return (
                      <div key={category}>
                        {activeCategory === null && (
                          <h4 className="font-medium text-gray-800 mt-4 mb-2">
                            {categoryNames[category]}
                          </h4>
                        )}
                        
                        {questions.map((question: any) => (
                          <div key={question.id} className="bg-red-50 p-4 rounded-md mb-4">
                            <p className="font-medium text-gray-900">Question {currentTest.questions.findIndex((q: any) => q.id === question.id) + 1}</p>
                            <p className="text-gray-800 mt-2">{question.text}</p>
                            <div className="mt-3 space-y-2">
                              {question.options.map((option: any) => (
                                <div 
                                  key={option.id}
                                  className={`p-2 rounded border ${
                                    option.id === question.correctOption
                                      ? 'border-green-500 bg-green-50'
                                      : option.id === userAnswers[question.id]
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm ${
                                      option.id === question.correctOption
                                        ? 'bg-green-600 text-white'
                                        : option.id === userAnswers[question.id]
                                          ? 'bg-red-600 text-white'
                                          : 'bg-gray-200 text-gray-700'
                                    }`}>
                                      {option.id}
                                    </div>
                                    <p className="text-sm text-gray-800">{option.text}</p>
                                    {option.id === question.correctOption && (
                                      <span className="ml-2 text-xs font-medium text-green-700">Correct answer</span>
                                    )}
                                    {option.id === userAnswers[question.id] && (
                                      <span className="ml-2 text-xs font-medium text-red-700">Your answer</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mock-tests"
                className="py-2 px-4 text-center font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 flex-1"
              >
                Back to Tests
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="py-2 px-4 text-center font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex-1"
              >
                Retry Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const questionsByCategory = getQuestionsByCategory();
  const categoryNames: Record<string, string> = {
    'reading': 'Reading Comprehension & General Knowledge',
    'logical_reasoning': 'Logical Reasoning',
    'biology': 'Biology',
    'chemistry': 'Chemistry',
    'physics_math': 'Physics & Mathematics'
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">{currentTest.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-medium">
              Time: {formatTime(timeRemaining)}
            </div>
            <button
              onClick={completeTest}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Finish Test
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question navigation sidebar */}
          <div className="hidden lg:block bg-white p-4 rounded-lg shadow-md h-fit sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Questions</h2>
            
            {Object.entries(questionsByCategory).map(([category, questions]) => {
              if (questions.length === 0) return null;
              
              return (
                <div key={category} className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{categoryNames[category]}</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((q: any) => {
                      let bgColor = 'bg-gray-100 text-gray-900';
                      
                      if (userAnswers[q.id] !== null) {
                        bgColor = 'bg-blue-100 text-blue-800';
                      }
                      
                      if (q.index === currentQuestionIndex) {
                        bgColor = 'bg-blue-600 text-white';
                      }
                      
                      return (
                        <button
                          key={q.id}
                          onClick={() => navigateToQuestion(q.index)}
                          className={`${bgColor} w-8 h-8 rounded-md flex items-center justify-center font-medium text-sm`}
                        >
                          {q.index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-800 font-medium">Answered:</span>
                <span className="font-medium text-gray-900">
                  {Object.values(userAnswers).filter(ans => ans !== null).length} / {currentTest.questions.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-800 font-medium">Remaining:</span>
                <span className="font-medium text-gray-900">
                  {Object.values(userAnswers).filter(ans => ans === null).length}
                </span>
              </div>
            </div>
          </div>
          
          {/* Question content */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Question {currentQuestionIndex + 1} of {currentTest.questions.length}
                </h2>
                <span className="text-sm font-medium text-gray-700">
                  Category: {categoryNames[currentQuestion.category] || currentQuestion.category}
                </span>
              </div>
              
              <p className="text-gray-800 mb-6">{currentQuestion.text}</p>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option: any) => (
                  <div 
                    key={option.id}
                    onClick={() => handleAnswer(currentQuestion.id, option.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      userAnswers[currentQuestion.id] === option.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                        userAnswers[currentQuestion.id] === option.id
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-300 text-gray-700'
                      }`}>
                        {option.id}
                      </div>
                      <p className="text-gray-800">{option.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {userAnswers[currentQuestion.id] !== null && (
                  <button
                    onClick={() => removeAnswer(currentQuestion.id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
                  >
                    Remove Response
                  </button>
                )}
                
                <button
                  onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                  disabled={currentQuestionIndex === currentTest.questions.length - 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 