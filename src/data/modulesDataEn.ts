import { InductionModule } from '../types';

export const INDUCTION_MODULES_EN: InductionModule[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Institutional Identity and SENA Symbols',
    shortTitle: 'Identity & Symbols',
    category: 'Institutional Culture',
    durationMinutes: 15,
    xpReward: 150,
    summary: 'Discover the origins, the transformative mission of SENA, and the meaning behind the national and institutional symbols that will guide your journey.',
    iconName: 'Building2',
    topics: [
      {
        id: 't-1-1',
        title: 'History and Mission of SENA',
        subtitle: 'The birth of Colombia’s most beloved public institution',
        content: [
          'The National Apprenticeship Service (SENA) was founded on June 21, 1957, initiated by the Cartagena economist and visionary Rodolfo Martínez Tono, through Decree-Law 118 of 1957.',
          'Its establishment was the result of a tripartite alliance between the National Government, business leaders, and labor organizations, aimed at offering professional technical training to the Colombian working class to drive economic and social progress.',
          'SENA is a national public establishment affiliated with the Ministry of Labor, endowed with legal personality, independent patrimony, and administrative autonomy.'
        ],
        keyHighlights: [
          'Founder: Rodolfo Martínez Tono in 1957.',
          'Core Purpose: Free, public, and high-quality technical and technological education.',
          'Tripartite Structure: Government, Workers, and Productive Industry.'
        ],
        proTip: 'All SENA training and services are 100% free of charge. No one is ever allowed to charge you for admission, forms, certificates, or graduation fees.'
      },
      {
        id: 't-1-2',
        title: 'Institutional Symbols',
        subtitle: 'Shield, Flag, Logo-symbol, and Institutional Anthem',
        content: [
          'The Shield: Featuring the caduceus (commerce and services), the gear (manufacturing industry), the coffee branch (agriculture and livestock), and the pathway stretching toward the horizon of knowledge.',
          'The Flag: A clean white field symbolizing peace, serenity, and transparency, centered by SENA’s official shield set over the institutional green representing hope.',
          'The Logo-Symbol: Graphically portrays an apprentice walking with determination into the future, advancing along a path forged by their own vocational training and life project.',
          'The Anthem: Written by Jesús Firavitoba (lyrics) and Daniel Marlez (music). Its chorus proclaims: "Forward SENA students, fight for Colombia with love; with noble and radiant spirits, let us transform the world for the better."'
        ],
        keyHighlights: [
          'Shield: Represents the 3 economic sectors (Agro, Industry, Commerce).',
          'Flag: White (peace) and institutional green (hope).',
          'Logo-symbol: An apprentice striding confidently forward.',
          'Anthem: A summons to dignified work and patriotic progress.'
        ],
        checklist: [
          'Memorize the anthem chorus for official campus ceremonies.',
          'Identify the colors and elements of the institutional crest.',
          'Understand the human-centered philosophy at the core of all training.'
        ]
      },
      {
        id: 't-1-3',
        title: 'Apprentice Values and Ethical Principles',
        subtitle: 'The community code of coexistence',
        content: [
          'At SENA, technical skills go hand-in-hand with civic duty and humanistic ethics. We do not merely train operators; we cultivate well-rounded citizens.',
          'Core values include: Respect for human dignity, Free thought and critical inquiry, Transformative leadership, Solidarity, Justice and Equity, Transparency, and Creative Innovation.',
          'As an apprentice, you commit to environmental conservation, caring for public infrastructure, and being an ambassador of harmony on and off campus.'
        ],
        keyHighlights: [
          'Integral Formation: Being + Knowing + Doing.',
          'Ethics and stewardship of public resources.',
          'Peaceful coexistence and respect for human diversity.'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-1-1',
        question: 'Who was the founder and primary advocate for SENA in 1957?',
        options: [
          'Alberto Lleras Camargo',
          'Rodolfo Martínez Tono',
          'Luis Carlos Galán',
          'Alfonso López Michelsen'
        ],
        correctIndex: 1,
        explanation: 'Cartagena economist Rodolfo Martínez Tono conceived and established SENA on June 21, 1957, as a tripartite institution dedicated to vocational training.'
      },
      {
        id: 'q-1-2',
        question: 'What does the official SENA logo-symbol depict?',
        options: [
          'A mechanical gear turning inside a factory',
          'A coffee tree blossoming in the Andes',
          'A human being stepping forward firmly toward the future',
          'An Olympic torch of knowledge'
        ],
        correctIndex: 2,
        explanation: 'The logo-symbol portrays the SENA apprentice walking forward, shaping their own destiny through education and skills.'
      },
      {
        id: 'q-1-3',
        question: 'What is a fundamental characteristic of all SENA programs and credentials?',
        options: [
          'They require a mandatory semester ID card maintenance fee',
          'They are 100% free of charge and require no intermediaries',
          'They are only valid within the city where classes take place',
          'Tuition fees apply exclusively during the productive stage'
        ],
        correctIndex: 1,
        explanation: 'All SENA services, admissions, classes, and graduation certificates are completely free and open to the public.'
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'Pedagogical Model & Integral Professional Training (FPI)',
    shortTitle: 'Pedagogical Model & FPI',
    category: 'SENA Pedagogy',
    durationMinutes: 20,
    xpReward: 200,
    summary: 'Understand the competency-based approach, project-based learning methodology, evaluative judgments (Approved / Deficient), and the two phases of your program.',
    iconName: 'GraduationCap',
    topics: [
      {
        id: 't-2-1',
        title: 'Integral Professional Training (FPI)',
        subtitle: 'Knowing, Doing, and Being',
        content: [
          'FPI is a theoretical-practical educational process aimed at developing technical knowledge, practical skills, and ethical attitudes for productive work and civic life.',
          'It comprises three inseparable dimensions:',
          '1. Knowing (Cognitive, technical, and scientific foundation).',
          '2. Doing (Psychomotor skills and hands-on application in workshops, labs, or workplace simulations).',
          '3. Being (Professional ethics, accountability, teamwork, and human relations).'
        ],
        keyHighlights: [
          'Continuous blend of theory and practice.',
          'Development of certified workplace competencies.',
          'Culture of occupational safety and self-care.'
        ],
        proTip: 'At SENA you do not memorize facts for a standard written exam; you demonstrate genuine workplace competence through concrete evidence of learning.'
      },
      {
        id: 't-2-2',
        title: 'Schooling Stage vs. Productive Stage',
        subtitle: 'The two halves of the vocational cycle',
        content: [
          'Schooling Stage (Etapa Lectiva): The phase where you master core and technical competencies in campus learning environments (classrooms, workshops, labs) through training projects.',
          'Productive Stage (Etapa Productiva): The phase where you apply, enhance, and solidify your learning within an authentic business or community setting.',
          'Authorized modalities to complete the Productive Stage:',
          '• Apprenticeship Contract (Contrato de Aprendizaje, with a sponsor enterprise and monthly living stipend).',
          '• Productive Project (launching your own business or startup mentored by Fondo Emprender).',
          '• Formal Internship or employment contract related directly to your study curriculum.',
          '• Institutional Monitor roles within SENA centers.'
        ],
        keyHighlights: [
          'Schooling: Workshops, collaborative projects, learning guides, and design challenges.',
          'Productive: Supervised practical workplace experience.',
          'Apprentices have up to 2 years after finishing the schooling stage to certify their productive stage.'
        ]
      },
      {
        id: 't-2-3',
        title: 'Learning Assessment: Judgments A and D',
        subtitle: 'Grading scale and the Academic Improvement Plan',
        content: [
          'SENA evaluations do not use traditional numerical grades (such as 1 to 5 or 0 to 100). Assessment is based on achieved Learning Outcomes (Resultados de Aprendizaje - RAP).',
          'The only two evaluative judgments recorded in SofiaPlus are:',
          '• A = Approved (Mastered competencies and completed all required evidence according to rubric criteria).',
          '• D = Deficient / Not Approved (Has not yet reached the required benchmark and needs pedagogical reinforcement).',
          'If you receive a "D", the instructor will not immediately fail you: they are legally required to agree with you on an Academic Improvement Plan (Plan de Mejoramiento) with a maximum period of 30 calendar days to submit revised evidence and achieve the RAP.'
        ],
        keyHighlights: [
          'Only judgments A (Approved) and D (Not Approved) exist.',
          'To graduate, you must hold judgment "A" in ALL curriculum Learning Outcomes.',
          'The Academic Improvement Plan is an apprentice right before any disciplinary or academic penalty.'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-2-1',
        question: 'What are the only two evaluative judgments recorded on the SENA SofiaPlus system?',
        options: [
          'Excellent (E) and Insufficient (I)',
          'Approved (A) and Deficient / Not Approved (D)',
          'Outstanding (S) and Failed (R)',
          'A numerical grade from 1.0 to 5.0'
        ],
        correctIndex: 1,
        explanation: 'SENA evaluates qualitatively by competence: A (Approved) when the learning outcome is demonstrated, and D (Not Approved) when reinforcement is required.'
      },
      {
        id: 'q-2-2',
        question: 'If an apprentice does not achieve a Learning Outcome (RAP), what is the immediate pedagogical step?',
        options: [
          'Immediate expulsion from the training center',
          'Agreeing on an Academic Improvement Plan with a deadline to deliver revised evidence',
          'Restarting the entire semester from day one',
          'Paying an administrative fine to the center'
        ],
        correctIndex: 1,
        explanation: 'The instructor and apprentice formulate an Academic Improvement Plan with tailored reinforcement activities to help the apprentice master the competence.'
      },
      {
        id: 'q-2-3',
        question: 'Which of the following is NOT an authorized modality for the Productive Stage?',
        options: [
          'Apprenticeship Contract sponsored by a verified enterprise',
          'Productive Project advised by SENA and Fondo Emprender',
          'Informal unpaid labor completely unrelated to the training program',
          'Professional internship in a certified public or private entity'
        ],
        correctIndex: 2,
        explanation: 'The productive stage must be formally registered and directly aligned with the technical curriculum of the enrolled program.'
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Technology Ecosystem and SENA Platforms',
    shortTitle: 'Platforms & Ecosystem',
    category: 'Digital Tools',
    durationMinutes: 18,
    xpReward: 180,
    summary: 'Master the essential platforms for your day-to-day training: SofiaPlus, Zajuna LMS, MiSENA institutional email, Digital Library, and Digital ID.',
    iconName: 'Laptop',
    topics: [
      {
        id: 't-3-1',
        title: 'SofiaPlus: The Administrative Core',
        subtitle: 'Optimized System for Comprehensive Active Learning',
        content: [
          'SofiaPlus is the master portal that records and coordinates your official profile as a SENA apprentice:',
          '• Check your Ficha de Caracterización number (the unique cohort group identifier).',
          '• Register enrollment status updates (deferrals, campus transfers, voluntary withdrawal).',
          '• Verify enrollment status (In Training, Cancelled, Deferred, Certified).',
          '• Download study certificates, transcripts, and official evaluation records.'
        ],
        keyHighlights: [
          'Your username is always your national identity document number.',
          'Never share your password; operations in SofiaPlus carry legal weight.',
          'Regularly check the status of your assigned learning outcomes (RAPs).'
        ],
        proTip: 'Keep your Ficha number handy. Whenever you visit Student Welfare, the Library, or Academic Coordination, you will be asked for your ID and Ficha.'
      },
      {
        id: 't-3-2',
        title: 'Zajuna (SENA LMS) & Institutional Email',
        subtitle: 'Your virtual classrooms and official communication conduit',
        content: [
          'Zajuna is SENA’s official Learning Management System (LMS) where all academic activities take place:',
          '• Repository to download learning guides, workshops, and reference material.',
          '• Assignment inbox to submit evidence of knowledge, performance, and product.',
          '• Academic discussion forums and instructor question boards.',
          '• Online assessments and links to live synchronous sessions (Teams/Meet).',
          'Institutional Email (@misena.edu.co or @soy.sena.edu.co):',
          'The only official legal channel for academic notices, committee summons, scholarship calls, and corporate job postings.'
        ],
        keyHighlights: [
          'Submit evidence promptly within the official schedule deadlines.',
          'Check institutional email daily.',
          'Complimentary access to Microsoft 365 cloud tools with enterprise cloud storage.'
        ]
      },
      {
        id: 't-3-3',
        title: 'Digital Library System and Student ID',
        subtitle: 'Research databases and your institutional credential on campus',
        content: [
          'SENA Library System (biblioteca.sena.edu.co): Provides free access to over 30 international peer-reviewed scientific databases (Scopus, IEEE, ProQuest, Dialnet, e-Libro), Icontec technical standards, and thousands of eBooks.',
          'Digital Student ID Card: Your mandatory credential. Must be worn visibly on your chest at all times while on campus.',
          'The ID unlocks biometric gates, tool borrowing in workshops, computer lab access, and institutional transport services.'
        ],
        keyHighlights: [
          'Wearing the ID visibly: Continuous obligation of all apprentices.',
          'Inter-library loans and specialized licensed software at no cost.',
          'Apprentice Welfare Services: Health, counseling, sports, arts, and financial aid.'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-3-1',
        question: 'What is the primary role of the SofiaPlus system?',
        options: [
          'A social network to chat with classmates on campus',
          'An administrative portal to manage enrollment, request status changes, view cohort records, and check grades',
          'A casual gaming website to earn recreational points',
          'An online store dedicated exclusively to purchasing computers'
        ],
        correctIndex: 1,
        explanation: 'SofiaPlus is SENA’s core administrative portal for managing admissions, cohort enrollments, evaluative judgments, and certificates.'
      },
      {
        id: 'q-3-2',
        question: 'Why is it mandatory to check your institutional MiSENA / soy.sena email daily?',
        options: [
          'Because it broadcasts commercial brand advertising',
          'Because it is the official legal vehicle for committee summons, welfare aid calls, and formal academic notices',
          'Because home internet disconnects if the inbox remains unopened',
          'It is only supposed to be consulted on the final day of the course'
        ],
        correctIndex: 1,
        explanation: 'The institutional email is the binding legal channel for grades, committee hearings, sponsorship openings, and official announcements.'
      },
      {
        id: 'q-3-3',
        question: 'Where and how must the apprentice ID card be worn while inside the training center?',
        options: [
          'Tucked deep inside a backpack to prevent scratches',
          'Worn visibly on the chest at all times',
          'Left at home and shown only as a mobile screenshot if asked',
          'Shown only on the day of final exams'
        ],
        correctIndex: 1,
        explanation: 'Apprentice regulations dictate that the ID card must be worn visibly on the upper chest to maintain security across the educational campus.'
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Rights, Duties, and Prohibitions (2024 Regulations & 2026 Agreement)',
    shortTitle: '2024 - 2026 Regulations',
    category: 'Current Legal Framework',
    durationMinutes: 25,
    xpReward: 250,
    summary: 'Analyze the Apprentice Regulations (2024 Version and 2026 Complementary Agreement): your student guarantees, ethical use of AI, safety duties, and prohibited actions.',
    iconName: 'ShieldAlert',
    topics: [
      {
        id: 't-4-1',
        title: 'Fundamental Rights and Digital Citizenship (2024-2026)',
        subtitle: 'Institutional guarantees, holistic wellbeing, and connectivity',
        content: [
          'The SENA Apprentice Regulations (2024 Version and 2026 Agreement) reinforce fundamental rights and adapt them to in-person and hybrid learning:',
          '• Receive high-quality integral professional education responsive to modern industry and technological needs.',
          '• Timely access to campus facilities, computer labs, technical workshops, the digital library, and Zajuna virtual platforms.',
          '• Be treated with dignity, physical and emotional respect, under strict adherence to the Anti-Harassment and Non-Discrimination Protocol.',
          '• Review grades and evaluative judgments in SofiaPlus before final submission.',
          '• Right to mental health services, psychological counseling, and support from Apprentice Welfare.',
          '• Entitlement to due process and presumption of innocence in any inquiry or disciplinary committee.',
          '• Right to vote and be elected as Class Representative (Vocero de Ficha) or Center Student Representative.'
        ],
        keyHighlights: [
          'Regulations: 2024 Version updated with the 2026 Complementary Agreement.',
          'Explicit protection of digital rights, campus connectivity, and socio-emotional health.',
          'Strict adherence to due process and official notification protocols.'
        ]
      },
      {
        id: 't-4-2',
        title: 'Essential Duties and Campus Coexistence',
        subtitle: 'Mutual commitment with the educational community',
        content: [
          'In balance with your rights, the 2024-2026 regulatory framework sets forth fundamental duties:',
          '• Arrive punctually to face-to-face sessions, workshops, and synchronous online classes on official platforms.',
          '• Wear the current institutional ID visibly on your chest at all times for biometric access and campus safety.',
          '• Justify absences within 3 business days of the occurrence with EPS medical certificates or documented force majeure.',
          '• Wear mandatory Personal Protective Equipment (PPE) and regulatory gear in technical workshops and laboratories.',
          '• Protect campus assets, machinery, computer labs, software licenses, and physical facilities.',
          '• Maintain respectful, collaborative behavior free from bullying, harassment, or prejudice toward peers, instructors, and staff.'
        ],
        keyHighlights: [
          'Absence justification window: Maximum 3 business days.',
          'Occupational safety: Mandatory and correct use of PPE in industrial spaces.',
          'Stewardship and care of public physical and technological infrastructure.'
        ]
      },
      {
        id: 't-4-3',
        title: 'Strict Prohibitions and Ethical AI Usage (2026 Agreement)',
        subtitle: 'Clear boundaries, academic honesty, and secure environments',
        content: [
          'The 2024 Regulations and 2026 Agreement categorically prohibit:',
          '• Bringing, possessing, distributing, or consuming alcoholic beverages or psychoactive substances on campus, or entering while impaired.',
          '• Smoking or vaping anywhere on institutional grounds (100% smoke-free and aerosol-free facilities).',
          '• Carrying weapons of any kind (firearms, knives, sharp objects, or blunt instruments).',
          '• Academic fraud, plagiarism, platform impersonation, and uncredited AI-generated submissions passed off as original work.',
          '• Verbal, physical, or cyber aggression directed against peers, instructors, or staff.',
          '• Altering, deleting, or falsifying evaluation marks, signatures, or official documents in SofiaPlus.',
          '• Running unauthorized commercial sales, raffles, or informal lending schemes on campus.'
        ],
        keyHighlights: [
          '2026 Agreement: Explicit guidelines on ethical, transparent AI assistance in course deliverables.',
          'Zero tolerance for weapons, narcotics, fighting, and harassment.',
          'Falsifying records or certificates leads to immediate expulsion and criminal referral.'
        ],
        proTip: 'Under the 2024-2026 guidelines, you may use AI tools to support learning, but you must cite your prompts, acknowledge sources, and demonstrate personal understanding.'
      }
    ],
    quickQuiz: [
      {
        id: 'q-4-1',
        question: 'How many business days does an apprentice have to file a medical or legal excuse for an absence?',
        options: [
          '15 calendar days',
          'A maximum of 3 business days following the absence',
          'Until the end of the academic quarter',
          'No excuse is required if a peer is notified via WhatsApp'
        ],
        correctIndex: 1,
        explanation: 'The regulations stipulate a maximum of 3 business days to submit verified medical or force majeure documentation to academic coordination.'
      },
      {
        id: 'q-4-2',
        question: 'What is the current regulatory framework governing SENA apprentice conduct and rights?',
        options: [
          'The National Police and Coexistence Code',
          'The Apprentice Regulations 2024 Version with its 2026 Complementary Agreement',
          'Law 100 on Social Security',
          'The National Tax Statute'
        ],
        correctIndex: 1,
        explanation: 'Apprentice rights and duties are governed by the updated 2024 Regulations together with the 2026 Complementary Agreement.'
      },
      {
        id: 'q-4-3',
        question: 'Under the 2026 Agreement, what happens if an apprentice submits AI-generated code or reports as 100% original work without attribution?',
        options: [
          'They receive an honors certificate for speed',
          'It constitutes a serious infraction for academic fraud and copyright violation',
          'Nothing occurs as long as the file opens properly',
          'It is compulsory to deliver all homework through AI'
        ],
        correctIndex: 1,
        explanation: 'Uncredited AI submission is treated as academic fraud, resulting in a Deficient (D) mark and disciplinary committee proceedings.'
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'Procedures, Status Changes, and Dropout Prevention',
    shortTitle: 'Procedures & Retention',
    category: 'Academic Administration',
    durationMinutes: 18,
    xpReward: 190,
    summary: 'Learn how to process course deferrals, campus transfers, and voluntary withdrawals in time, and understand the severe consequences of unjustified desertion.',
    iconName: 'FileText',
    topics: [
      {
        id: 't-5-1',
        title: 'Enrollment Status Requests in SofiaPlus',
        subtitle: 'Managing life transitions lawfully and transparently',
        content: [
          'Life circumstances can change due to health, work, or family events. SENA provides lawful procedures for these transitions:',
          '1. Transfer (Traslado): Request to change cohort schedule, study shift, or campus location (subject to slot availability within the same curriculum).',
          '2. Deferral (Aplazamiento): Formal request to temporarily pause studies for justified causes (military service, extended illness, maternity). Allowed for up to 6 months (renewable in exceptional situations).',
          '3. Readmission (Reingreso): Request to resume training before the approved deferral window expires.',
          '4. Voluntary Withdrawal (Retiro Voluntario): Written request to withdraw cleanly without penalty, leaving your record in good standing for future application cycles.'
        ],
        keyHighlights: [
          'All requests must be submitted through SofiaPlus or directly to Academic Coordination.',
          'Voluntary withdrawal allows you to reapply to SENA in subsequent recruitment cycles without penalties.'
        ],
        proTip: 'If you must stop studying, NEVER abandon classes without filing a formal Voluntary Withdrawal. Unreported absence is classified as DROPOUT (Deserción).'
      },
      {
        id: 't-5-2',
        title: 'Dropout (Deserción) and Legal Repercussions',
        subtitle: 'The heaviest penalty for an apprentice educational path',
        content: [
          'An apprentice is officially declared in Desertion / Dropout when they:',
          '• Fail to attend in-person classes for three (3) consecutive days without verified justification.',
          '• In virtual training, fail to log into the LMS or submit evidence for three (3) consecutive weeks without explanation.',
          '• Fail to submit agreed deliverables under an Academic or Disciplinary Improvement Plan.',
          '• Complete the schooling phase and let two (2) years elapse without certifying their productive stage.',
          'Dropout Procedure: The instructor logs the absences; coordination sends a formal summons via email giving 5 business days to justify. If unanswered, an administrative resolution of Enrollment Cancellation for Dropout is issued.'
        ],
        keyHighlights: [
          'Trigger: 3 consecutive days of unexcused absence.',
          'Dropout Penalty: Permanent enrollment cancellation and a 6-month to 2-year nationwide ban from enrolling in any SENA program.',
          'Loss of educational opportunity, stipends, and institutional sponsorship.'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-5-1',
        question: 'How many consecutive days of unexcused in-person absence trigger a dropout (Deserción) inquiry?',
        options: [
          '15 continuous days',
          'Three (3) consecutive business days without valid justification',
          'One full calendar month',
          'Ten instructional weeks'
        ],
        correctIndex: 1,
        explanation: 'Apprentice regulations state that 3 consecutive unexcused absences trigger the formal process of presumed dropout.'
      },
      {
        id: 'q-5-2',
        question: 'What is the main sanction if an apprentice is officially declared in Dropout (Deserción)?',
        options: [
          'A congratulatory phone call for independence',
          'Permanent enrollment cancellation and a 6-month to 2-year nationwide enrollment ban in SENA',
          'A monetary banking fine paid at Banco Agrario',
          'Simply resuming classes the very next day'
        ],
        correctIndex: 1,
        explanation: 'Dropout leads to enrollment cancellation and an institutional lockout in SofiaPlus for up to 2 years across Colombia.'
      },
      {
        id: 'q-5-3',
        question: 'If an apprentice must move to another city due to unforeseen life events, what formal request should they file?',
        options: [
          'Stop attending and wait for someone to call',
          'Formally apply for a Campus Transfer (Traslado) or Enrollment Deferral (Aplazamiento) in SofiaPlus',
          'Sell their enrollment slot to a friend',
          'Delete the SENA mobile app from their phone'
        ],
        correctIndex: 1,
        explanation: 'Promptly filing for a transfer or justified deferral preserves apprentice status and avoids disciplinary disqualification.'
      }
    ]
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'Evaluation Committee and Disciplinary Due Process',
    shortTitle: 'Committee & Due Process',
    category: 'Disciplinary Procedures',
    durationMinutes: 22,
    xpReward: 220,
    summary: 'Discover how the Evaluation and Monitoring Committee operates, your legal rights to defense, the hearing process, and the distinction between corrective and punitive measures.',
    iconName: 'Scale',
    topics: [
      {
        id: 't-6-1',
        title: 'The Evaluation and Monitoring Committee',
        subtitle: 'The collective body ensuring justice, fairness, and educational rigor',
        content: [
          'The Evaluation and Monitoring Committee is the advisory council to the Center Subdirector responsible for reviewing student performance and conduct.',
          'Who participates with voice and vote?:',
          '• A program instructor (typically the cohort lead instructor).',
          '• The Academic Coordination or Center Mission Coordinator.',
          '• The Vocational Training Coordinator.',
          '• The Class Representative (Vocero de Ficha) representing the student cohort.',
          '• The Center Apprentice Representative (Representante de Aprendices).',
          '• An Apprentice Welfare professional (counselor or psychologist offering guidance).'
        ],
        keyHighlights: [
          'Plural, collective body: Ensures no decision is made arbitrarily by a single instructor.',
          'Student representation: Your class vocero and the center representative advocate for you.',
          'Primary focus on pedagogy, restorative learning, and student success.'
        ]
      },
      {
        id: 't-6-2',
        title: 'Due Process and the Right to a Defense Hearing',
        subtitle: 'Your constitutional guarantees anchored in Article 29',
        content: [
          'No apprentice at SENA may be penalized without the full opportunity to present a formal defense.',
          'Phases of the disciplinary procedure:',
          '1. Formal Report: An instructor, campus official, or guard files a report with tangible evidence (witnesses, photos, security records).',
          '2. Committee Summons: The apprentice is notified in writing or by official email at least 3 business days prior, with copies of all charges and evidence.',
          '3. Defense Hearing (Descargos): The apprentice attends (minors may be accompanied by a parent/guardian) and freely shares their account, presenting supporting arguments and evidence.',
          '4. Deliberation and Recommendation: The committee weighs mitigating and aggravating factors, issuing an advisory recommendation to the Center Subdirector.',
          '5. Administrative Resolution and Right of Appeal (Recurso de Reposición): The Subdirector issues the official decision. The apprentice has 10 business days to appeal for reconsideration.'
        ],
        keyHighlights: [
          'Presumption of innocence until proven responsible.',
          'Right to inspect all evidence in the case file.',
          'Right to appeal (Recurso de Reposición) against any sanction resolution.'
        ]
      },
      {
        id: 't-6-3',
        title: 'Pedagogical Measures vs. Disciplinary Sanctions',
        subtitle: 'Proportional response calibrated to infraction severity',
        content: [
          'Pedagogical Measures (Preventive & Educational):',
          '• Reflective verbal warning.',
          '• Academic or Disciplinary Improvement Plan (restorative educational tasks or campus community service).',
          'Formal Disciplinary Sanctions (Recorded on Student Record):',
          '• Formal written reprimand placed on the institutional transcript.',
          '• Conditional Enrollment (the apprentice is placed on strict probation; any repeat offense triggers expulsion).',
          '• Enrollment Cancellation (permanent expulsion from SENA with a 1 to 2-year nationwide enrollment ban).'
        ],
        keyHighlights: [
          'Sanctions must be strictly proportional to infraction severity (Minor, Serious, or Very Serious).',
          'Mitigating circumstances are weighed (voluntary confession, repairing damage, clean prior record).',
          'Aggravating circumstances are evaluated (repeat offense, premeditation, dishonesty, endangering others).'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-6-1',
        question: 'Who holds student representation inside the Evaluation and Monitoring Committee?',
        options: [
          'No students are permitted to participate in the committee',
          'The Class Vocero and the Center Student Representative',
          'Only personal friends of the lead instructor',
          'External students from other universities'
        ],
        correctIndex: 1,
        explanation: 'Apprentice regulations guarantee democratic student involvement through the Class Vocero and the Center Representative.'
      },
      {
        id: 'q-6-2',
        question: 'What is the Appeal for Reconsideration (Recurso de Reposición) in SENA due process?',
        options: [
          'A formal request for snack funds',
          'The apprentice legal right to request that the Subdirector review or revoke an imposed sanction',
          'A surprise math test',
          'A thank-you note regarding the sanction'
        ],
        correctIndex: 1,
        explanation: 'The Recurso de Reposición is the formal legal mechanism to appeal and request reconsideration of an administrative disciplinary resolution.'
      },
      {
        id: 'q-6-3',
        question: 'What is the key difference between an Improvement Plan and Enrollment Cancellation?',
        options: [
          'An Improvement Plan is a restorative learning opportunity; Cancellation is the ultimate punitive expulsion',
          'There is no difference; they are identical measures',
          'Improvement plans can only be written by instructors',
          'Enrollment cancellation allows resuming classes the next day'
        ],
        correctIndex: 0,
        explanation: 'Improvement plans aim to guide and restore the apprentice educationally, whereas enrollment cancellation expels the student with an institutional ban.'
      }
    ]
  }
];
