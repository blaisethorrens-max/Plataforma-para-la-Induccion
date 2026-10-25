import { RegulationCase } from '../types';

export const REGULATION_CASES_EN: RegulationCase[] = [
  // ===================== MINOR INFRACTIONS =====================
  {
    id: 'case-leve-1',
    code: 'EXP-DISC-01',
    title: 'The Student ID in the Wallet and the Turnstile Dispute',
    shortDescription: 'An apprentice refuses to wear his ID card visibly on his chest upon entry, arguing security officers already recognize him.',
    severity: 'leve',
    story: `During morning entry at the Training Center, apprentice Mateo Gómez was halted by campus security at the main turnstile for failing to display his institutional ID card. Mateo reacted irritably, stating he "had his card tucked inside his back pocket and had no reason to pull it out since the guard sees him walk in every single day." After a short dispute that delayed his peers in line, he flashed the card but refused to wear it visibly on his chest as stipulated by campus security rules. The security company forwarded the report to Academic Coordination.`,
    protagonist: {
      name: 'Mateo Gómez',
      program: 'Technologist in 3D Animation',
      ficha: '2754190',
      stage: 'Lectiva',
      antecedents: 'Clean academic and disciplinary record with no previous warnings.'
    },
    evidenceList: [
      {
        source: 'Campus Security Incident Log',
        description: 'Officer on-duty report detailing the refusal to wear visible ID and the brief obstruction of the entry turnstile.',
        date: 'February 14, 06:45 AM'
      },
      {
        source: 'CCTV Security Footage',
        description: 'Surveillance video confirming the apprentice kept the ID in his wallet rather than on his chest while clearing access.',
        date: 'February 14, 06:46 AM'
      }
    ],
    attenuatingFactors: [
      'The apprentice has no prior disciplinary history at SENA.',
      'He had his genuine credential on him (he was not an external unauthorized person).',
      'He acknowledged his poor attitude during the interview with his class vocero.'
    ],
    aggravatingFactors: [
      'Initial resistance to complying with instructions from campus security staff.',
      'Caused a delay and disruption in the entry queue for fellow cohort peers.'
    ],
    applicableRegulation: {
      chapter: 'Chapter IV: Duties of the SENA Apprentice',
      article: 'Article 9, Item 2 & Article 26 (Criteria for Classifying Infractions)',
      ruleText: 'It is the continuous duty of the apprentice to wear the institutional ID card visibly on the chest during their presence at the Training Center and institutional functions.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Correct! Not wearing the ID on the chest or minor verbal resistance at entry without violence or property damage is classified as a Minor Infraction under SENA regulations.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Incorrect. This does not rise to a Serious Infraction because the apprentice possessed his genuine ID, did not impersonate anyone, and caused no harm to persons or property.'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Incorrect. Very serious infractions involve criminal acts, weapons, drugs, or document forgery, none of which occurred here.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-1-1',
        title: 'Immediate cancellation of enrollment with a 2-year ban',
        description: 'Permanent expulsion of the apprentice from the SENA system.',
        isCorrect: false,
        feedback: 'Disproportionate and unlawful. It violates the core constitutional principle of proportionality in disciplinary due process.'
      },
      {
        id: 's-1-2',
        title: 'Verbal warning and pedagogical self-care agreement',
        description: 'Preventive educational measure agreed with the instructor and class vocero to reinforce campus safety protocols.',
        isCorrect: true,
        feedback: 'Right verdict! For a first-time minor infraction with a clean record, the appropriate response is a restorative verbal reprimand and commitment to wear the ID.'
      },
      {
        id: 's-1-3',
        title: 'Conditional enrollment with notification to the Municipal Ombudsman',
        description: 'Severe disciplinary sanction reserved for repeat offenses or major violations.',
        isCorrect: false,
        feedback: 'Inappropriate. Conditional enrollment is a sanction for serious infractions or persistent recurrence of minor offenses.'
      }
    ],
    correctMeasureSummary: 'Formative Measure: Verbal warning recorded in the Center anecdote log and written commitment to wear the ID visibly at all times.',
    preventiveAdvice: 'The SENA ID card is not a superficial ornament; it is the security protocol that protects campus safety and verifies your student accident insurance policy.'
  },
  {
    id: 'case-leve-2',
    code: 'EXP-DISC-02',
    title: 'Informal Snack Sales and Commercial Activity in Training Environments',
    shortDescription: 'An apprentice sells homemade sandwiches and sodas inside the computer laboratory during class hours.',
    severity: 'leve',
    story: `Apprentice Viviana Castro set up a cooler bag with homemade sandwiches, chocolates, and carbonated beverages inside the Software Analysis and Development computer lab. During group development sprints, several apprentices gathered around her desk to buy food, spilling soda on a keyboard and leaving grease on computer mice. When asked by the instructor to cease commercial sales inside pedagogical spaces, Viviana stated she needed the money to pay for daily bus fare and that she was not hurting anyone.`,
    protagonist: {
      name: 'Viviana Castro',
      program: 'Technologist in Software Analysis and Development (ADSO)',
      ficha: '2694101',
      stage: 'Lectiva',
      antecedents: 'Outstanding academic evaluations and active class participation.'
    },
    evidenceList: [
      {
        source: 'Lab Instructor Technical Incident Report',
        description: 'Documentation of food and soda residue on electronic peripherals and unauthorized commercial activity during class hours.',
        date: 'March 22, 10:45 AM'
      }
    ],
    attenuatingFactors: [
      'Genuine, documented financial hardship to cover basic transportation costs.',
      'Excellent academic performance and high respect toward instructors and peers.'
    ],
    aggravatingFactors: [
      'Commercializing products in spaces housing high-value sensitive electronic hardware.',
      'Disregarding the explicit prohibition of food and drink consumption in computer labs.'
    ],
    applicableRegulation: {
      chapter: 'Chapter V: Prohibitions for the SENA Apprentice',
      article: 'Article 10, Item 11: Commercial activities inside pedagogical areas',
      ruleText: 'Commercializing goods, raffles, games of chance, or running informal sales within training centers without explicit institutional authorization is prohibited.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Correct! Unauthorized informal sales inside the classroom without violence constitutes a Minor Infraction.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Incorrect. While it risks electronics, it does not involve malicious damage, weapon possession, or violence.'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Incorrect. Very serious infractions are strictly reserved for statutory crimes, weapons, and narcotics.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-2-1',
        title: 'Written reprimand with referral to Apprentice Welfare for financial aid',
        description: 'Formative disciplinary measure to halt classroom sales while channeling her financial needs through the official Food Aid or Living Stipend programs.',
        isCorrect: true,
        feedback: 'Excellent pedagogical decision! It addresses regulatory compliance while connecting the apprentice to genuine support programs offered by SENA.'
      },
      {
        id: 's-2-2',
        title: 'Confiscation of products and immediate expulsion from cohort',
        description: 'Seizing goods without return and expelling the student.',
        isCorrect: false,
        feedback: 'Unlawful. Instructors have no authority to permanently confiscate private goods, and expulsion violates due process.'
      },
      {
        id: 's-2-3',
        title: 'Conditional enrollment and loss of the quarter',
        description: 'Extreme punitive sanction.',
        isCorrect: false,
        feedback: 'Inappropriate. Ignores mitigating circumstances and the educational purpose of the institution.'
      }
    ],
    correctMeasureSummary: 'Written reprimand on file with commitment to refrain from classroom commerce, paired with referral to Apprentice Welfare aid programs.',
    preventiveAdvice: 'If you face economic hardships, reach out to Apprentice Welfare. There are official living stipends, cafeteria meal bonuses, and paid student monitor positions available.'
  },
  {
    id: 'case-leve-3',
    code: 'EXP-DISC-03',
    title: 'Cell Phone and Video Distraction During Electrical Safety Briefing',
    shortDescription: 'An apprentice wears earphones and watches soccer highlights during a theoretical lecture on high-voltage electrical safety.',
    severity: 'leve',
    story: `During a technical session on arc flash hazards in the electrical lab, the instructor observed that apprentice Julián Castro had earphones in and was streaming a soccer match on his phone. When called on to answer a crucial safety question regarding circuit breaker lockouts, Julián could not answer and made mocking gestures toward his lab partners. The instructor instructed him to put the phone away, which Julián did reluctantly only after three separate verbal warnings.`,
    protagonist: {
      name: 'Julián Castro',
      program: 'Technician in Residential Electrical Installations',
      ficha: '2819033',
      stage: 'Lectiva',
      antecedents: 'Prior informal verbal warnings for classroom device distractions.'
    },
    evidenceList: [
      {
        source: 'Electrical Instructor Report',
        description: 'Report detailing persistent inattention and temporary defiance during safety instruction on high-risk electrical protocols.',
        date: 'May 05, 02:30 PM'
      }
    ],
    attenuatingFactors: [
      'Eventually put the phone away upon the third warning.',
      'No verbal insults or physical aggression directed at the instructor.'
    ],
    aggravatingFactors: [
      'Prior verbal warnings for identical distractions.',
      'The lesson covered life-or-death occupational safety protocols in electrical systems.'
    ],
    applicableRegulation: {
      chapter: 'Chapter IV: Duties of the Apprentice',
      article: 'Article 9, Item 5: Active participation in the training process',
      ruleText: 'Complete assigned learning plan activities and follow guidance delivered by instructors for competency acquisition.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Correct! It is a Minor Infraction of discipline and academic commitment regarding classroom distraction.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Incorrect. Phone usage by itself does not constitute a serious infraction unless it triggered an actual electrical accident or repeated post-improvement plan.'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Incorrect. Does not meet any element of very serious infractions.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-3-1',
        title: 'Disciplinary Improvement Plan with electrical risk workshop presentation',
        description: 'Assign a disciplinary improvement plan where the apprentice designs an infographic and presents the risks of distraction in high-voltage environments to his cohort.',
        isCorrect: true,
        feedback: 'Exact! The Disciplinary Improvement Plan converts disruptive behavior into constructive learning and reinforces occupational safety competency.'
      },
      {
        id: 's-3-2',
        title: 'Definitive cancellation of enrollment',
        description: 'Expulsion from the training program.',
        isCorrect: false,
        feedback: 'Completely inappropriate for a mobile phone distraction.'
      },
      {
        id: 's-3-3',
        title: 'Seizing the student cell phone for one month',
        description: 'Impounding personal property.',
        isCorrect: false,
        feedback: 'Unlawful. SENA has no statutory authority to seize private citizens personal property.'
      }
    ],
    correctMeasureSummary: 'Disciplinary Improvement Plan focused on electrical hazard prevention and signed commitment to responsible technology usage.',
    preventiveAdvice: 'In technical workshops and laboratories, a single cell phone distraction can cause fatal shocks, mechanical entanglement, or severe burns.'
  },

  // ===================== SERIOUS INFRACTIONS =====================
  {
    id: 'case-grave-1',
    code: 'EXP-DISC-04',
    title: 'Software Plagiarism and Fabricated Deliverable Attribution',
    shortDescription: 'Apprentices copy a complete GitHub repository from an international company and submit it as their own capstone project.',
    severity: 'grave',
    story: `During the evaluation phase presentation of their software development capstone project, apprentices Kevin and Daniela showcased a full-scale accounting ERP system. When questioned about backend routing and database architecture, they demonstrated complete ignorance. Code auditing revealed that 98% of the codebase was cloned from a proprietary GitHub repository, still retaining the original authors names in configuration headers. The apprentices had merely deleted the README to paste SENA logos and their own names as sole authors.`,
    protagonist: {
      name: 'Kevin Pardo and Daniela Mora',
      program: 'Technologist in Software Analysis and Development (ADSO)',
      ficha: '2618902',
      stage: 'Lectiva',
      antecedents: 'Clean disciplinary record but late deliveries on programming deliverables.'
    },
    evidenceList: [
      {
        source: 'Technical Code Audit Report (Git & Plagiarism Tool)',
        description: 'Evaluation showing 98.4% exact line matching with a third-party open-source repo with zero citation or original business logic.',
        date: 'November 10, 11:30 AM'
      },
      {
        source: 'Deliverable Submitted on Zajuna LMS',
        description: 'PDF document signed by both apprentices swearing under statement of honor that the code was 100% original work.',
        date: 'November 08, 11:59 PM'
      }
    ],
    attenuatingFactors: [
      'Both apprentices confessed to the copying during their defense hearing and apologized to their cohort.'
    ],
    aggravatingFactors: [
      'Premeditated intent to deceive evaluators by erasing original author names.',
      'Formal oral defense presenting third-party work as their own to pass the trimester.',
      'Violation of copyright laws and academic integrity protected under Colombian law.'
    ],
    applicableRegulation: {
      chapter: 'Chapter V: Prohibitions for the SENA Apprentice',
      article: 'Article 10, Item 3: Plagiarism and Academic Fraud',
      ruleText: 'Committing fraud or plagiarism in any activity, evaluation, or learning deliverable, as well as submitting false information or altered documents to the entity.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Incorrect. Deliberate fraud and plagiarism in a capstone project is never minor; it undermines vocational integrity.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Correct! Academic fraud and systematic deliverable plagiarism constitutes a Serious Infraction in the SENA Regulations.'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Incorrect. Although highly reprehensible, plagiarism without criminal forgery of official state credentials does not fall under Art. 28 very serious infractions.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-4-1',
        title: 'Deficient (D) mark, Conditional Enrollment, and Improvement Plan with a brand new project',
        description: 'Record Deficient evaluation (D), formal Conditional Enrollment on permanent record, and requirement to design and defend a new project from scratch.',
        isCorrect: true,
        feedback: 'Perfect legal and pedagogical decision! Conditional enrollment penalizes the ethical violation, while the new project requires demonstrating true competence.'
      },
      {
        id: 's-4-2',
        title: 'Assign Approved (A) mark for demonstrating good internet search skills',
        description: 'Rewarding clever web searching.',
        isCorrect: false,
        feedback: 'Unacceptable. SENA certifies real technical capability, not fraud or plagiarism.'
      },
      {
        id: 's-4-3',
        title: 'Immediate criminal complaint before the Attorney General and immediate expulsion',
        description: 'Direct criminal path without exhausting administrative procedures.',
        isCorrect: false,
        feedback: 'Inappropriate as an initial administrative measure before Committee evaluation.'
      }
    ],
    correctMeasureSummary: 'Sanction of Conditional Enrollment recorded in SofiaPlus, Deficient (D) evaluation mark, and mandatory Academic Improvement Plan with code defense.',
    preventiveAdvice: 'At SENA you may incorporate open source libraries, but you must always cite sources under technical standards and write your own application logic.'
  },
  {
    id: 'case-grave-2',
    code: 'EXP-DISC-05',
    title: 'Operating Industrial Lathe Without PPE and Safety Interlock Sabotage',
    shortDescription: 'An apprentice bypasses the emergency stop microswitch on a CNC lathe with wire to work faster and suffers torn clothing.',
    severity: 'grave',
    story: `In the Industrial Mechanics workshop, apprentice Santiago Vélez entered without safety goggles, wearing metallic wristwatches and loose clothing. Furthermore, to prevent the CNC lathe from automatically stopping when opening the acrylic shield, he wedged a wire into the safety interlock switch. Operating at 1,200 RPM, the loose sleeve of his smock brushed the rotating spindle and snagged. A quick-thinking classmate slammed the emergency stop button, resulting in torn clothing and arm lacerations, narrowly averting catastrophic injury.`,
    protagonist: {
      name: 'Santiago Vélez',
      program: 'Technologist in Industrial Mechanical Maintenance',
      ficha: '2598341',
      stage: 'Lectiva',
      antecedents: 'Had received explicit Occupational Safety (OSH) training with signed safety PPE agreement.'
    },
    evidenceList: [
      {
        source: 'Industrial Safety Inspection Report (OSH)',
        description: 'Photograph of the wire used to disable the safety interlock and report on the near-fatal incident.',
        date: 'June 19, 03:20 PM'
      },
      {
        source: 'Instructor and Peer Witness Statements',
        description: 'Testimony confirming the apprentice was aware of the prohibition on jewelry and loose garments near rotating spindles.',
        date: 'June 19, 04:00 PM'
      }
    ],
    attenuatingFactors: [
      'Acknowledged his recklessness and the grave danger he exposed himself to.'
    ],
    aggravatingFactors: [
      'Deliberate tampering with an emergency safety mechanism on industrial machinery.',
      'Willful disregard of occupational safety protocols.',
      'Imminent risk of amputation or death for himself and workshop peers.'
    ],
    applicableRegulation: {
      chapter: 'Chapters IV & V: Safety and Health Duties and Prohibitions',
      article: 'Article 9, Item 8 & Article 10, Item 8',
      ruleText: 'Strictly comply with industrial safety protocols and wear PPE. Tampering with or bypassing safety guards or electrical systems without authorization is prohibited.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Incorrect. Disabling machine safety switches and risking human life on heavy rotary equipment is never minor.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Correct! It is a Serious Disciplinary Infraction for directly endangering occupational safety, physical integrity, and technical equipment.'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Incorrect. It does not qualify as very serious since there was no malicious intent to harm others, no weapon, and no statutory felony.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-5-1',
        title: 'Conditional Enrollment and suspension of workshop access until safety recertification',
        description: 'Formal Conditional Enrollment on file, temporary bar from machine areas, and mandatory completion of an intensive industrial safety module.',
        isCorrect: true,
        feedback: 'Excellent Committee decision! It guarantees safety for all students, penalizes the machine tampering, and requires proven safety recertification before returning.'
      },
      {
        id: 's-5-2',
        title: 'Billing the apprentice for a new shirt',
        description: 'Restricting the issue to damaged clothing.',
        isCorrect: false,
        feedback: 'Absurd. The core issue was not the garment, but human life and intentional sabotage of machine emergency safety systems.'
      },
      {
        id: 's-5-3',
        title: 'Friendly verbal reminder without formal record',
        description: 'Overlooking the incident without formal documentation.',
        isCorrect: false,
        feedback: 'Dangerous and irresponsible; allows repeated behavior with potential fatal outcomes.'
      }
    ],
    correctMeasureSummary: 'Conditional Enrollment sanction for serious industrial safety violation and mandatory recertification in machine safety and PPE protocols.',
    preventiveAdvice: 'Occupational health standards at SENA are written from real accident lessons. Machine safety mechanisms save lives; never disable them.'
  },
  {
    id: 'case-grave-3',
    code: 'EXP-DISC-06',
    title: 'Unjustified Abandonment of Productive Stage Corporate Internship',
    shortDescription: 'An apprentice with an Apprenticeship Contract stops reporting to his sponsor enterprise without notice or filing paperwork with SENA.',
    severity: 'grave',
    story: `Apprentice Camilo Torres began his Productive Stage under an Apprenticeship Contract with a logistics corporation. After two months of satisfactory performance, he ceased reporting to work starting on a Monday. The enterprise attempted phone and email contact without success. After 5 business days of unexcused absence, the Corporate HR Director filed a formal complaint with SENA Corporate Relations requesting contract termination and referral to the Evaluation Committee.`,
    protagonist: {
      name: 'Camilo Torres',
      program: 'Technologist in Logistics Management',
      ficha: '2541209',
      stage: 'Productiva',
      antecedents: 'Completed schooling stage with all learning outcomes approved on schedule.'
    },
    evidenceList: [
      {
        source: 'Sponsor Company Official Notification',
        description: 'Letter documenting 5 continuous days of job abandonment without medical justification or prior notice.',
        date: 'August 12'
      },
      {
        source: 'Biometric Access Logs from Sponsor Company',
        description: 'Timeclock records proving absence starting August 5th onward.',
        date: 'August 12'
      }
    ],
    attenuatingFactors: [
      'During the defense hearing, Camilo explained he was offered an informal job and was unsure how to formally resign.'
    ],
    aggravatingFactors: [
      'Damaged the institutional relationship between SENA and the business sector and lost a legally regulated training slot.',
      'Failed to contact his SENA productive stage monitoring instructor for guidance before walking out.'
    ],
    applicableRegulation: {
      chapter: 'Chapter IV: Apprentice Duties in the Productive Stage',
      article: 'Article 9, Item 12 & Law 789 of 2002 (Apprenticeship Contract)',
      ruleText: 'Comply with hours, policies, and responsibilities established in the apprenticeship contract, maintaining continuous communication with SENA.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Incorrect. Abandoning a sponsored apprenticeship contract causes severe legal damage and cannot be labeled minor.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Correct! Serious, unexcused breach of productive stage commitments is classified as a Serious Infraction that imperils graduation.'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Incorrect. Does not qualify as very serious since there was no crime, physical violence, or damage to public state property.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-6-1',
        title: 'Contract cancellation, Conditional Enrollment, and mandatory completion via Productive Project',
        description: 'Justified corporate termination, forfeiture of future corporate contract sponsorship, and conditional enrollment requiring completion via an individual Productive Project.',
        isCorrect: true,
        feedback: 'Exact! The apprentice loses corporate sponsorship eligibility due to breach and must complete via an alternative modality such as a verified Productive Project.'
      },
      {
        id: 's-6-2',
        title: 'Ordering the enterprise to pay severance indemnity to the apprentice',
        description: 'Sanctioning the employer.',
        isCorrect: false,
        feedback: 'Unlawful. The apprentice violated workplace and contractual obligations without valid cause.'
      },
      {
        id: 's-6-3',
        title: 'Assigning a new company immediately with higher stipend',
        description: 'Rewarding contractual desertion.',
        isCorrect: false,
        feedback: 'Contrary to law and regulations. Anyone who causes justified contract termination forfeits future sponsorship.'
      }
    ],
    correctMeasureSummary: 'Cancellation of contract registry, disciplinary sanction with Conditional Enrollment, and final opportunity to certify through a Productive Project.',
    preventiveAdvice: 'If you face challenges at your internship company, NEVER walk out without first consulting your SENA monitoring instructor. They will guide your legal transition.'
  },

  // ===================== VERY SERIOUS INFRACTIONS =====================
  {
    id: 'case-gravisima-1',
    code: 'EXP-DISC-07',
    title: 'Possession and Consumption of Narcotics on Training Center Grounds',
    shortDescription: 'Two apprentices are caught possessing and smoking marijuana inside the campus restroom facilities.',
    severity: 'gravisima',
    story: `During a routine inspection in Building C, the duty instructor and campus security supervisor detected strong smoke emanating from the student restrooms. Upon entering, they caught apprentices Brayan and Nelson holding a package with portioned marijuana and inhaling with an improvised pipe. Caught in the act, they attempted to flush the evidence down the toilet. Security implemented protocol with local police liaisons for substance weighing and evidence logging.`,
    protagonist: {
      name: 'Brayan S. and Nelson R.',
      program: 'Technician in Agricultural Production',
      ficha: '2701844',
      stage: 'Lectiva',
      antecedents: 'One apprentice had a prior written warning for unexcused classroom absences.'
    },
    evidenceList: [
      {
        source: 'National Police Seizure Act',
        description: 'Confiscation of 45 grams of illegal narcotic substance and smoking apparatus inside Block C restroom.',
        date: 'September 02, 03:45 PM'
      },
      {
        source: 'Campus Security and Mission Coordinator Report',
        description: 'Detailed statement of the flagrant possession and attempt to dispose of evidence.',
        date: 'September 02, 04:30 PM'
      }
    ],
    attenuatingFactors: [
      'Expressed willingness to enter addiction rehabilitation and counseling programs through health providers.'
    ],
    aggravatingFactors: [
      'Committed flagrantly inside a public educational institution.',
      'Possession and consumption of substances prohibited by national law in school perimeters.',
      'Endangered safe coexistence for underage students present at the center.'
    ],
    applicableRegulation: {
      chapter: 'Chapters V & VIII: Prohibitions and Very Serious Infractions',
      article: 'Article 10, Item 1 & Article 28, Item 1',
      ruleText: 'Possessing, trafficking, supplying, or consuming alcoholic beverages or psychoactive substances inside SENA facilities or attending activities while impaired is a Very Serious Infraction.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Incorrect. Possessing or consuming drugs in an educational center is treated as a top-tier severity infraction.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Incorrect. Article 28 of the regulations explicitly categorizes this conduct as a Very Serious Infraction (Falta Gravísima).'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Correct! Possessing or consuming narcotics inside SENA facilities is explicitly cataloged as a Very Serious Infraction.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-7-1',
        title: 'Definitive Cancellation of Enrollment with a two-year nationwide SENA ban',
        description: 'Maximum disciplinary sanction with permanent removal, national system lockout in SofiaPlus, and healthcare referral.',
        isCorrect: true,
        feedback: 'Exact decision under regulations! Very serious infractions committed flagrantly warrant Cancellation of Enrollment and the maximum 2-year nationwide ban.'
      },
      {
        id: 's-7-2',
        title: 'Asking them to sweep the courtyard for one week',
        description: 'Informal chores without formal disciplinary proceedings.',
        isCorrect: false,
        feedback: 'Unlawful. Very serious infractions cannot be dismissed with minor informal tasks.'
      },
      {
        id: 's-7-3',
        title: 'Private verbal reminder without entry on student record',
        description: 'Concealing the incident from center leadership.',
        isCorrect: false,
        feedback: 'Violates public officer responsibilities and institutional safety policies.'
      }
    ],
    correctMeasureSummary: 'Definitive Cancellation of Enrollment with 2-year nationwide ban from all SENA programs and preventive referral to healthcare services.',
    preventiveAdvice: 'SENA campuses are territories of peace, free from drugs and alcohol. Breaching this standard dismantles your career and locks you out of SENA nationwide.'
  },
  {
    id: 'case-gravisima-2',
    code: 'EXP-DISC-08',
    title: 'Database Intrusion and Grade Alteration in SofiaPlus for Money',
    shortDescription: 'An apprentice uses unauthorized instructor credentials to alter evaluation judgments from "D" to "A" and charges classmates cash.',
    severity: 'gravisima',
    story: `Through an audit by the General Systems Directorate, discrepancies were detected between an instructor physical grade sheets and digital SofiaPlus entries. Technical inquiries revealed that 14 illicit alterations changing Deficient (D) marks to Approved (A) across 6 different apprentices originated from apprentice Andrés Mora home IP address. Andrés had taken advantage of an unlocked instructor terminal on campus to clone access tokens. Testimonies confirmed Andrés charged $50,000 COP for each altered learning outcome.`,
    protagonist: {
      name: 'Andrés Mora',
      program: 'Technologist in Data Network Management',
      ficha: '2647189',
      stage: 'Lectiva',
      antecedents: 'Outstanding technical computer networking skills.'
    },
    evidenceList: [
      {
        source: 'SENA Information Security Forensic Audit',
        description: 'Database audit trails, SofiaPlus server logs, home ISP IP tracking, and unauthorized packet captures.',
        date: 'October 22'
      },
      {
        source: 'Witness Testimony and Payment Screenshots',
        description: 'Bank transfer screenshots and WhatsApp chats coordinating illicit grade alterations in exchange for money.',
        date: 'October 23'
      }
    ],
    attenuatingFactors: [
      'None applicable due to the gravity of cybercrime and forgery.'
    ],
    aggravatingFactors: [
      'Premeditation, intentional malice, and exploitation of technical know-how.',
      'Financial profit defrauding public state records.',
      'Cybercrime under Colombian Law 1273 of 2009.',
      'Compromising the academic integrity of multiple students.'
    ],
    applicableRegulation: {
      chapter: 'Chapter VIII: Very Serious Infractions and Statutory Crimes',
      article: 'Article 28, Items 4 & 7: Forgery and Attacks on Information Systems',
      ruleText: 'Falsifying, altering, stealing, or destroying official SENA documents, grades, or institutional databases, as well as committing criminal offenses within the entity.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Totally incorrect. This involves computer cybercrimes and official document forgery.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Incorrect. Altering official state databases for profit vastly exceeds serious infractions.'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Correct! Altering SofiaPlus records and grade forgery is a Very Serious Infraction of the highest administrative and legal gravity.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-8-1',
        title: 'Immediate Enrollment Cancellation, 2-year nationwide ban, and criminal referral to the Attorney General',
        description: 'Definitive expulsion, maximum statutory system lockout, and formal criminal referral for cybercrimes (Law 1273 of 2009).',
        isCorrect: true,
        feedback: 'Right resolution! When public information systems and public records are breached, the entity is legally bound to file criminal charges in addition to canceling enrollment.'
      },
      {
        id: 's-8-2',
        title: 'Asking him to refund money to classmates and continue classes',
        description: 'Informal financial settlement without system sanction.',
        isCorrect: false,
        feedback: 'Completely illegal and legally unsustainable.'
      },
      {
        id: 's-8-3',
        title: 'Assigning an ethics essay improvement plan',
        description: 'Treating a felony as a simple classroom mistake.',
        isCorrect: false,
        feedback: 'Inappropriate. Violates the principle of legality and would conceal a formal crime.'
      }
    ],
    correctMeasureSummary: 'Definitive Cancellation of Enrollment with maximum institutional ban and criminal referral to the National Attorney General.',
    preventiveAdvice: 'SENA databases maintain constant digital audit forensics. Altering public administrative records is a federal crime punishable with prison time by civilian courts.'
  },
  {
    id: 'case-gravisima-3',
    code: 'EXP-DISC-09',
    title: 'Concealed Blade Weapon and Physical Assault in Common Campus Area',
    shortDescription: 'A violent argument on the sports court ends in physical assault and the brandishing of a folding knife.',
    severity: 'gravisima',
    story: `During lunch break on the sports courts, a verbal argument erupted between two apprentices over a soccer match outcome. Amid heated insults, apprentice Edwin Marín pulled a 10-centimeter folding knife from his backpack, lunged forward, sliced his opponent forearm, and made death threats against anyone attempting to intervene. Physical education instructors and campus security subdued the assailant with police support, while the injured apprentice was rushed to an emergency medical center.`,
    protagonist: {
      name: 'Edwin Marín',
      program: 'Technician in Woodworking and Carpentry',
      ficha: '2719801',
      stage: 'Lectiva',
      antecedents: 'Previously sanctioned with a verbal warning for cafeteria shouting matches.'
    },
    evidenceList: [
      {
        source: 'Forensic Medical Report & Emergency Hospital Intake',
        description: '6 cm laceration on left forearm with 18 days of certified medical incapacity.',
        date: 'October 04'
      },
      {
        source: 'Weapon Confiscation Log & Security CCTV Recording',
        description: 'Police weapon custody documentation and video showing premeditated blade assault.',
        date: 'October 04, 01:15 PM'
      }
    ],
    attenuatingFactors: [
      'None identifiable.'
    ],
    aggravatingFactors: [
      'Unauthorized possession of a deadly weapon inside an educational campus.',
      'Inflicted bodily injury on a community member.',
      'Recidivism in violent conduct.',
      'Generated collective panic among apprentices and instructors.'
    ],
    applicableRegulation: {
      chapter: 'Chapters V & VIII: Very Serious Infractions Threatening Human Life',
      article: 'Article 10, Item 4 & Article 28, Item 3',
      ruleText: 'Carrying firearms, bladed weapons, or explosive devices on SENA grounds, or physically assaulting any member of the educational community constitutes a Very Serious Infraction.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Minor Infraction',
        feedback: 'Unacceptable. Carrying weapons and physical assault can never be considered minor.'
      },
      {
        value: 'grave',
        label: 'Serious Infraction',
        feedback: 'Incorrect. Threatening life or bodily integrity with a deadly weapon is the clearest manifestation of a Very Serious Infraction.'
      },
      {
        value: 'gravisima',
        label: 'Very Serious Infraction',
        feedback: 'Correct! Carrying weapons and violent assault is indisputably a Very Serious Infraction.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-9-1',
        title: 'Immediate Cancellation of Enrollment, 2-year nationwide ban, and criminal referral for aggravated assault',
        description: 'Definitive expulsion, national register sanction, and referral to criminal justice for assault with a deadly weapon.',
        isCorrect: true,
        feedback: 'Completely agree! Protection of human life is the supreme legal standard. The maximum sanction is the only lawful outcome under regulations.'
      },
      {
        id: 's-9-2',
        title: 'Suspending him from the soccer team for one month',
        description: 'Superficial sports penalty.',
        isCorrect: false,
        feedback: 'Utterly absurd given a criminal assault with a knife.'
      },
      {
        id: 's-9-3',
        title: 'Public apology at the morning flag ceremony',
        description: 'Symbolic act without disciplinary consequences.',
        isCorrect: false,
        feedback: 'Contrary to due process and dangerous for campus safety.'
      }
    ],
    correctMeasureSummary: 'Definitive Cancellation of Enrollment, maximum 2-year nationwide ban, and criminal referral to judicial authorities.',
    preventiveAdvice: 'SENA promotes peaceful conflict resolution and mediation through Student Welfare. No disagreement ever justifies violence.'
  }
];
