import { GlossaryTerm } from '../types';
import { Language } from '../context/LanguageContext';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'FPI (Formación Profesional Integral)',
    category: 'Académico',
    definition: 'Proceso teórico-práctico integral orientado al desarrollo de conocimientos técnicos, tecnológicos y de actitudes y valores para el desarrollo humano y la convivencia social.',
    regulationReference: 'Estatuto de la Formación Profesional & Lineamientos 2024-2026',
    example: 'En la FPI no solo aprendes a programar o reparar motores, sino a convivir en sociedad con ética laboral.'
  },
  {
    term: 'RAP (Resultado de Aprendizaje)',
    category: 'Académico',
    definition: 'Logro o meta concreta que el aprendiz debe demostrar haber alcanzado mediante evidencias de conocimiento, desempeño y producto.',
    regulationReference: 'Diseño Curricular del Programa (SofiaPlus / Zajuna)',
    example: 'Para aprobar la fase de análisis debes tener el RAP 01 calificado en Aprobado (A).'
  },
  {
    term: 'Plan de Mejoramiento Académico',
    category: 'Académico',
    definition: 'Medida pedagógica formativa concertada entre el instructor y el aprendiz para subsanar deficiencias en el logro de competencias, con un plazo máximo de 30 días calendario.',
    regulationReference: 'Reglamento del Aprendiz 2024, Capítulo de Evaluación',
    example: 'Si obtuviste un juicio "D" en la evidencia de bases de datos, concertas un plan de mejoramiento con nuevas actividades de refuerzo.'
  },
  {
    term: 'Plan de Mejoramiento Disciplinario',
    category: 'Disciplinario',
    definition: 'Medida pedagógica correctiva impuesta por el Comité de Evaluación ante faltas leves o reiteradas, orientada a que el aprendiz reflexione y compense su conducta mediante compromisos institucionales o comunitarios.',
    regulationReference: 'Reglamento del Aprendiz 2024 con Acuerdo Complementario 2026',
    example: 'Hacer una campaña informativa para su ficha sobre el uso correcto de los Elementos de Protección Personal.'
  },
  {
    term: 'Uso Ético de Inteligencia Artificial (IA)',
    category: 'Académico',
    definition: 'Directriz reglamentaria obligatoria que autoriza el uso de IA generativa únicamente como apoyo formativo, prohibiendo el plagio encubierto y exigiendo la citación explícita de prompts y sustentación personal de la evidencia.',
    regulationReference: 'Acuerdo Complementario de 2026 sobre Tecnologías Emergentes e IA',
    example: 'Puedes apoyarte en ChatGPT o Gemini para estructurar ideas, pero el código y análisis deben ser desarrollados y explicados por ti.'
  },
  {
    term: 'Deserción',
    category: 'Disciplinario',
    definition: 'Declaración administrativa de abandono injustificado del proceso de formación (por 3 días consecutivos sin justificación, o 3 semanas en virtualidad, o 2 años sin reportar etapa productiva). Acarrea cancelación de matrícula e inhabilidad de 6 meses a 2 años.',
    regulationReference: 'Reglamento del Aprendiz 2024 con Acuerdo 2026, Régimen de Novedades',
    example: 'Dejar de ir al centro durante una semana sin enviar la incapacidad médica EPS a la coordinación acarrea proceso por presunta deserción.'
  },
  {
    term: 'Condicionamiento de Matrícula',
    category: 'Disciplinario',
    definition: 'Sanción disciplinaria formal impuesta por el Subdirector de Centro ante faltas graves o reincidencia en faltas leves. El aprendiz queda en estado de prueba; cualquier nueva falta conllevará a la cancelación de matrícula.',
    regulationReference: 'Reglamento del Aprendiz 2024 con Acuerdo Complementario 2026',
    example: 'Queda registrado en la hoja de vida institucional en SofiaPlus como antecedente disciplinario.'
  },
  {
    term: 'Cancelación de Matrícula',
    category: 'Disciplinario',
    definition: 'Máxima sanción disciplinaria y administrativa que expulsa al aprendiz del programa de formación, implicando la pérdida de la calidad de aprendiz e inhabilidad para reingresar al SENA por un periodo de hasta dos años.',
    regulationReference: 'Reglamento del Aprendiz 2024 con Acuerdo Complementario 2026',
    example: 'Se aplica directamente ante faltas gravísimas como porte de armas, agresión física, drogas ilícitas o delitos informáticos.'
  },
  {
    term: 'Contrato de Aprendizaje (Modalidad Híbrida / Remota)',
    category: 'Institucional',
    definition: 'Forma especial de vinculación laboral (Ley 789 de 2002 actualizada con acuerdos 2024-2026) mediante la cual una empresa patrocina al aprendiz presencialmente o en teletrabajo legal, con apoyo de sostenimiento y EPS/ARL.',
    regulationReference: 'Ley 789 de 2002 & Acuerdos SENA 2024-2026',
    example: 'Una empresa de tecnología te paga el 100% del SMMLV en etapa productiva y cubre tu seguridad social en modalidad remota o presencial.'
  },
  {
    term: 'Protocolo de Convivencia y No Discriminación',
    category: 'Institucional',
    definition: 'Mecanismo institucional para garantizar espacios formativos libres de todo tipo de violencia, acoso escolar, acoso digital, discriminación de género o etnia.',
    regulationReference: 'Reglamento del Aprendiz 2024, Capítulo de Convivencia y Bienestar',
    example: 'Si un aprendiz es víctima o testigo de acoso o discriminación, activa la ruta de atención prioritaria de Bienestar.'
  },
  {
    term: 'Vocero de Ficha',
    category: 'Institucional',
    definition: 'Aprendiz elegido democráticamente por sus compañeros de grupo para representarlos ante los instructores, la coordinación académica y participar con voz y voto en el Comité de Evaluación y Seguimiento.',
    regulationReference: 'Reglamento del Aprendiz 2024 (Representación Estudiantil)',
    example: 'El vocero transmite inquietudes grupales y acompaña al compañero citado en su sesión de descargos.'
  },
  {
    term: 'Recurso de Reposición',
    category: 'Disciplinario',
    definition: 'Mecanismo legal que tiene el aprendiz para solicitar por escrito al Subdirector de Centro que aclare, modifique o revoque una sanción disciplinaria notificada, dentro de los 10 días hábiles siguientes.',
    regulationReference: 'CPACA & Procedimiento Disciplinario SENA 2024-2026',
    example: 'Si consideras que la sanción no respetó tus pruebas atenuantes, radicas un recurso de reposición formal.'
  },
  {
    term: 'SofiaPlus & Zajuna',
    category: 'Plataformas',
    definition: 'Ecosistema digital unificado donde SofiaPlus administra matrículas, fichas y certificaciones, y Zajuna actúa como el LMS de gestión pedagógica, foros y evidencias.',
    regulationReference: 'Ecosistema Digital SENA 2024-2026',
    example: 'En Zajuna subes tus proyectos y en SofiaPlus descargas tu constancia de notas y certificado final.'
  }
];

export const GLOSSARY_TERMS_EN: GlossaryTerm[] = [
  {
    term: 'FPI (Integral Professional Training)',
    category: 'Académico',
    definition: 'Comprehensive theoretical-practical process geared toward developing technical expertise, technological competencies, ethical attitudes, and values for human development and social coexistence.',
    regulationReference: 'Vocational Training Statute & 2024-2026 Guidelines',
    example: 'In FPI you do not just learn to code or maintain engines; you learn to coexist with workplace integrity.'
  },
  {
    term: 'RAP (Learning Outcome)',
    category: 'Académico',
    definition: 'Concrete benchmark or competency milestone that an apprentice must demonstrate having mastered through evidence of knowledge, performance, and product.',
    regulationReference: 'Curriculum Program Blueprint (SofiaPlus / Zajuna)',
    example: 'To pass the analysis phase, you must hold RAP 01 graded as Approved (A).'
  },
  {
    term: 'Academic Improvement Plan',
    category: 'Académico',
    definition: 'Formative pedagogical measure agreed between instructor and apprentice to remedy competence gaps, with a maximum window of 30 calendar days.',
    regulationReference: 'Apprentice Regulations 2024, Evaluation Chapter',
    example: 'If you receive a "D" mark on database modeling, you establish an improvement plan with targeted reinforcement tasks.'
  },
  {
    term: 'Disciplinary Improvement Plan',
    category: 'Disciplinario',
    definition: 'Corrective pedagogical measure imposed by the Evaluation Committee for minor or repeated infractions, encouraging the apprentice to reflect and compensate through institutional or community commitments.',
    regulationReference: 'Apprentice Regulations 2024 with 2026 Agreement',
    example: 'Organizing an informational campaign for your cohort on the proper use of Personal Protective Equipment.'
  },
  {
    term: 'Ethical Use of Artificial Intelligence (AI)',
    category: 'Académico',
    definition: 'Mandatory regulatory guideline permitting generative AI solely as an assistive learning resource, strictly prohibiting disguised plagiarism and requiring prompt disclosure and personal oral defense.',
    regulationReference: '2026 Complementary Agreement on Emerging Technologies & AI',
    example: 'You can use ChatGPT or Gemini to structure ideas, but code and analysis must be created and defended by you.'
  },
  {
    term: 'Dropout (Deserción)',
    category: 'Disciplinario',
    definition: 'Administrative ruling of unexcused training abandonment (3 consecutive unexcused days in person, 3 weeks in virtuality, or 2 years without certifying the productive stage). Triggers enrollment cancellation and a 6-month to 2-year nationwide ban.',
    regulationReference: 'Apprentice Regulations 2024 with 2026 Agreement, Status Updates',
    example: 'Skipping classes for a week without submitting verified EPS medical documentation initiates a formal dropout procedure.'
  },
  {
    term: 'Conditional Enrollment (Condicionamiento de Matrícula)',
    category: 'Disciplinario',
    definition: 'Formal disciplinary sanction imposed by the Center Subdirector for serious infractions or repeat minor violations. The apprentice remains on strict probation; any repeat offense triggers expulsion.',
    regulationReference: 'Apprentice Regulations 2024 with 2026 Agreement',
    example: 'Recorded on the permanent SofiaPlus institutional record as a disciplinary antecedent.'
  },
  {
    term: 'Enrollment Cancellation (Cancelación de Matrícula)',
    category: 'Disciplinario',
    definition: 'Highest disciplinary and administrative sanction expelling the apprentice from the program, causing loss of student status and a nationwide ban from re-entering SENA for up to two years.',
    regulationReference: 'Apprentice Regulations 2024 with 2026 Agreement',
    example: 'Applied directly for very serious infractions such as weapons, physical assault, illicit narcotics, or cybercrimes.'
  },
  {
    term: 'Apprenticeship Contract (Hybrid / Remote Modality)',
    category: 'Institucional',
    definition: 'Specialized labor-educational agreement (Law 789 of 2002 updated with 2024-2026 provisions) through which an enterprise sponsors the apprentice on-site or via legal telework with a stipend and healthcare/workplace insurance.',
    regulationReference: 'Law 789 of 2002 & SENA Agreements 2024-2026',
    example: 'A tech enterprise pays 100% of the minimum wage during the productive stage and covers insurance in remote or on-site mode.'
  },
  {
    term: 'Coexistence and Anti-Discrimination Protocol',
    category: 'Institucional',
    definition: 'Institutional safeguard ensuring educational environments free from all forms of violence, bullying, cyber harassment, and gender or ethnic discrimination.',
    regulationReference: 'Apprentice Regulations 2024, Coexistence and Welfare Chapter',
    example: 'If an apprentice witnesses or experiences harassment, they activate the priority support route through Student Welfare.'
  },
  {
    term: 'Class Vocero (Vocero de Ficha)',
    category: 'Institucional',
    definition: 'Apprentice democratically elected by cohort classmates to represent them before instructors and academic coordination, holding voice and vote in the Evaluation and Monitoring Committee.',
    regulationReference: 'Apprentice Regulations 2024 (Student Representation)',
    example: 'The vocero channels group concerns and accompanies a classmate called to a committee hearing.'
  },
  {
    term: 'Appeal for Reconsideration (Recurso de Reposición)',
    category: 'Disciplinario',
    definition: 'Legal mechanism allowing an apprentice to submit a written request to the Center Subdirector to clarify, amend, or revoke a notified disciplinary sanction within 10 business days.',
    regulationReference: 'CPACA & SENA Disciplinary Procedure 2024-2026',
    example: 'If you consider that the sanction ignored your mitigating evidence, you submit a formal appeal for reconsideration.'
  },
  {
    term: 'SofiaPlus & Zajuna',
    category: 'Plataformas',
    definition: 'Unified digital ecosystem where SofiaPlus manages student enrollments, cohort codes, and certificates, while Zajuna acts as the LMS for coursework, discussion forums, and evidence submission.',
    regulationReference: 'SENA Digital Ecosystem 2024-2026',
    example: 'On Zajuna you submit project deliverables, and on SofiaPlus you download transcripts and your final diploma.'
  }
];

export function getGlossaryTerms(lang: Language = 'es'): GlossaryTerm[] {
  return lang === 'en' ? GLOSSARY_TERMS_EN : GLOSSARY_TERMS;
}
