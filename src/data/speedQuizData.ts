import { QuizQuestion } from '../types';
import { Language } from '../context/LanguageContext';

export interface ChallengeLevel {
  levelId: string;
  levelNumber: number;
  title: string;
  description: string;
  minLevelRequired: number;
  timePerQuestion: number;
  xpPerCorrect: number;
  questions: QuizQuestion[];
}

export const SPEED_CHALLENGES: ChallengeLevel[] = [
  {
    levelId: 'chal-1',
    levelNumber: 1,
    title: 'Nivel 1: Fundamentos y ADN SENA',
    description: 'Preguntas ágiles sobre historia, símbolos y principios institucionales.',
    minLevelRequired: 1,
    timePerQuestion: 20,
    xpPerCorrect: 25,
    questions: [
      {
        id: 'sq-1-1',
        question: '¿En qué año fue fundado el Servicio Nacional de Aprendizaje (SENA)?',
        options: ['1948', '1957', '1972', '1991'],
        correctIndex: 1,
        explanation: 'El SENA fue fundado el 21 de junio de 1957 por iniciativa del doctor Rodolfo Martínez Tono.'
      },
      {
        id: 'sq-1-2',
        question: '¿Qué simboliza el color blanco en la bandera institucional del SENA?',
        options: ['La nieve de los páramos', 'La paz y la tranquilidad', 'La pureza del algodón', 'El sector textil'],
        correctIndex: 1,
        explanation: 'El blanco en la bandera representa la paz, tranquilidad y rectitud de la comunidad formativa.'
      },
      {
        id: 'sq-1-3',
        question: '¿Cuál es la naturaleza económica de los programas de formación y trámites en el SENA?',
        options: ['Gratuitos y sin costo para todos', 'Pagos por semestre', 'Solo gratis para menores de 18', 'Financiados con crédito bancario'],
        correctIndex: 0,
        explanation: 'En el SENA todos los programas, inscripciones y certificaciones son 100% gratuitos y sin intermediarios.'
      },
      {
        id: 'sq-1-4',
        question: '¿Cuál de estos tres sectores productivos está representado por el engranaje en el escudo del SENA?',
        options: ['Sector Minero', 'Sector Industrial', 'Sector Transporte', 'Sector Bancario'],
        correctIndex: 1,
        explanation: 'El engranaje simboliza la industria manufacturera y el avance tecnológico nacional.'
      }
    ]
  },
  {
    levelId: 'chal-2',
    levelNumber: 2,
    title: 'Nivel 2: Dinámica Pedagógica y Deberes',
    description: 'Desafíos sobre resultados de aprendizaje, SofiaPlus y deberes del aprendiz.',
    minLevelRequired: 2,
    timePerQuestion: 18,
    xpPerCorrect: 35,
    questions: [
      {
        id: 'sq-2-1',
        question: '¿Qué significa la letra "D" en la evaluación de una evidencia en SofiaPlus?',
        options: ['Destacado', 'No Aprobado / Deficiente', 'Diferido', 'Desaprobado definitivamente sin derecho a reclamo'],
        correctIndex: 1,
        explanation: 'Significa "No Aprobado" o deficiente, e indica que el aprendiz debe concertar un Plan de Mejoramiento.'
      },
      {
        id: 'sq-2-2',
        question: '¿Cuál es el plazo reglamentario para justificar una inasistencia médica ante la coordinación?',
        options: ['1 día', 'Máximo 3 días hábiles', '8 días calendario', 'Al terminar el trimestre'],
        correctIndex: 1,
        explanation: 'El reglamento del aprendiz fija 3 días hábiles contados a partir de la inasistencia para presentar la justificación legal.'
      },
      {
        id: 'sq-2-3',
        question: '¿Cuántos días continuos de inasistencia presencial sin justificación configuran presunta deserción?',
        options: ['1 día', '3 días consecutivos', '5 días hábiles', '2 semanas'],
        correctIndex: 1,
        explanation: 'El reglamento estipula que 3 días consecutivos de inasistencia injustificada dan inicio al proceso formal de deserción.'
      },
      {
        id: 'sq-2-4',
        question: '¿Qué documento identifica oficialmente al aprendiz y debe portarse visible en todo momento?',
        options: ['Cédula de ciudadanía', 'Carné institucional del SENA', 'Fotocopia del SISBÉN', 'Certificado de votación'],
        correctIndex: 1,
        explanation: 'El carné institucional del SENA es de porte obligatorio y visible en el pecho en todas las sedes.'
      }
    ]
  },
  {
    levelId: 'chal-3',
    levelNumber: 3,
    title: 'Nivel 3: El Tribunal de Faltas Disciplinarias',
    description: 'Identifica al instante si una conducta es falta Leve, Grave o Gravísima según el reglamento.',
    minLevelRequired: 3,
    timePerQuestion: 15,
    xpPerCorrect: 45,
    questions: [
      {
        id: 'sq-3-1',
        question: 'Ingresar o consumir sustancias psicoactivas o estupefacientes dentro de una sede del SENA se clasifica como:',
        options: ['Falta Leve', 'Falta Grave', 'Falta Gravísima', 'No es considerada falta si no está en clase'],
        correctIndex: 2,
        explanation: 'El porte, tráfico o consumo de sustancias psicoactivas dentro del SENA es taxativamente una Falta Gravísima (Art. 28).'
      },
      {
        id: 'sq-3-2',
        question: 'No portar el carné en el pecho al momento de ingresar por primera vez sin generar conflicto se considera:',
        options: ['Falta Leve', 'Falta Grave', 'Falta Gravísima', 'Causal de expulsión inmediata'],
        correctIndex: 0,
        explanation: 'Es una falta leve de deberes que amerita un llamado de atención verbal formativo.'
      },
      {
        id: 'sq-3-3',
        question: 'Cometer plagio total del proyecto formativo copiando el software de otra empresa sin citar es:',
        options: ['Falta Leve', 'Falta Grave', 'Falta Gravísima', 'Conducta permitida en internet'],
        correctIndex: 1,
        explanation: 'El fraude y plagio en evidencias de aprendizaje principales constituye una Falta Grave en el régimen disciplinario.'
      },
      {
        id: 'sq-3-4',
        question: 'Alterar calificaciones en la base de datos de SofiaPlus a cambio de dinero se clasifica como:',
        options: ['Falta Leve', 'Falta Grave', 'Falta Gravísima y presunto delito informático', 'Falta sin importancia'],
        correctIndex: 2,
        explanation: 'Es una Falta Gravísima que acarrea cancelación de matrícula e inhabilidad de 2 años y denuncia ante la Fiscalía General.'
      }
    ]
  },
  {
    levelId: 'chal-4',
    levelNumber: 4,
    title: 'Nivel 4: Debido Proceso, Sanciones y Recursos',
    description: 'Preguntas avanzadas sobre el Comité de Evaluación, descargos y recursos legales.',
    minLevelRequired: 4,
    timePerQuestion: 15,
    xpPerCorrect: 60,
    questions: [
      {
        id: 'sq-4-1',
        question: '¿Con cuántos días hábiles de antelación mínima debe ser citado un aprendiz a sesión de descargos en el Comité?',
        options: ['El mismo día por WhatsApp', 'Mínimo 3 días hábiles', '24 horas antes', '30 días calendario'],
        correctIndex: 1,
        explanation: 'Para garantizar el derecho de defensa y preparación de pruebas, la citación debe hacerse con mínimo 3 días hábiles de anticipación.'
      },
      {
        id: 'sq-4-2',
        question: '¿Cuál es el recurso legal formal que tiene el aprendiz contra una resolución sancionatoria del Subdirector?',
        options: ['Recurso de Casación', 'Recurso de Reposición', 'Acción de Tutela automática', 'Carta de súplica al vigilante'],
        correctIndex: 1,
        explanation: 'El Recurso de Reposición es el mecanismo formal para que la misma autoridad que sancionó reexamine la decisión y los descargos.'
      },
      {
        id: 'sq-4-3',
        question: '¿Cuál es la máxima consecuencia sancionatoria que puede imponer el SENA a un aprendiz?',
        options: ['Condicionamiento de matrícula por un mes', 'Cancelación de Matrícula con inhabilidad de hasta 2 años', 'Pagar 5 salarios mínimos', 'Repetir la primaria'],
        correctIndex: 1,
        explanation: 'La cancelación definitiva de matrícula con inhabilidad nacional para reingresar al SENA por hasta 2 años es la sanción máxima.'
      },
      {
        id: 'sq-4-4',
        question: '¿Quién representa la voz de los estudiantes de la ficha en el Comité de Evaluación y Seguimiento?',
        options: ['El estudiante con mejor nota', 'El Vocero de Ficha elegido democráticamente', 'El acudiente de mayor edad', 'Cualquier voluntario'],
        correctIndex: 1,
        explanation: 'El Vocero de la Ficha es el representante legítimo de sus compañeros en las sesiones del Comité.'
      },
      {
        id: 'sq-4-5',
        question: 'Bajo el Reglamento del Aprendiz 2024 y su Acuerdo Complementario de 2026, el uso de Inteligencia Artificial en evidencias:',
        options: [
          'Está terminantemente prohibido bajo expulsión',
          'Es permitido como apoyo declarando su uso y citando prompts, pero atribuirse autoría sin desarrollo es falta grave',
          'Es obligatorio entregar todo generado con prompts de ChatGPT',
          'Solo se permite si el aprendiz paga una licencia institucional'
        ],
        correctIndex: 1,
        explanation: 'El Acuerdo Complementario de 2026 exige transparencia y autoría intelectual real: la IA es una herramienta de apoyo, no un reemplazo no atribuido.'
      }
    ]
  }
];

export const SPEED_CHALLENGES_EN: ChallengeLevel[] = [
  {
    levelId: 'chal-1',
    levelNumber: 1,
    title: 'Level 1: Foundations and SENA DNA',
    description: 'Fast-paced challenges covering history, institutional symbols, and founding principles.',
    minLevelRequired: 1,
    timePerQuestion: 20,
    xpPerCorrect: 25,
    questions: [
      {
        id: 'sq-1-1',
        question: 'In what year was the National Apprenticeship Service (SENA) founded?',
        options: ['1948', '1957', '1972', '1991'],
        correctIndex: 1,
        explanation: 'SENA was established on June 21, 1957, initiated by Dr. Rodolfo Martínez Tono.'
      },
      {
        id: 'sq-1-2',
        question: 'What does the color white symbolize on the SENA institutional flag?',
        options: ['Moorland snow', 'Peace and transparency', 'Cotton purity', 'The textile trade'],
        correctIndex: 1,
        explanation: 'The white field represents peace, serenity, and ethical uprightness across the training community.'
      },
      {
        id: 'sq-1-3',
        question: 'What is the financial nature of all SENA training programs and credentials?',
        options: ['Free of charge for everyone', 'Paid per semester', 'Only free for minors under 18', 'Financed via bank credit'],
        correctIndex: 0,
        explanation: 'At SENA all educational programs, admissions, and certifications are 100% free with no intermediaries.'
      },
      {
        id: 'sq-1-4',
        question: 'Which economic sector is represented by the gear on the SENA shield?',
        options: ['Mining Sector', 'Industrial Manufacturing Sector', 'Transportation Sector', 'Banking Sector'],
        correctIndex: 1,
        explanation: 'The gear symbolizes industrial manufacturing and national technological development.'
      }
    ]
  },
  {
    levelId: 'chal-2',
    levelNumber: 2,
    title: 'Level 2: Pedagogical Dynamics & Duties',
    description: 'Challenges on learning outcomes (RAP), SofiaPlus, and apprentice responsibilities.',
    minLevelRequired: 2,
    timePerQuestion: 18,
    xpPerCorrect: 35,
    questions: [
      {
        id: 'sq-2-1',
        question: 'What does the letter "D" indicate in a SofiaPlus learning outcome assessment?',
        options: ['Distinguished', 'Not Approved / Deficient', 'Deferred', 'Permanently failed without appeal'],
        correctIndex: 1,
        explanation: 'It denotes "Not Approved" / Deficient, meaning the apprentice must formulate an Academic Improvement Plan.'
      },
      {
        id: 'sq-2-2',
        question: 'What is the statutory deadline to submit a medical excuse for an absence to coordination?',
        options: ['1 day', 'Maximum 3 business days', '8 calendar days', 'At the end of the quarter'],
        correctIndex: 1,
        explanation: 'Regulations grant 3 business days from the absence date to file verified documentation.'
      },
      {
        id: 'sq-2-3',
        question: 'How many continuous days of unexcused in-person absence configure presumed dropout (Deserción)?',
        options: ['1 day', '3 consecutive days', '5 business days', '2 weeks'],
        correctIndex: 1,
        explanation: 'Apprentice rules state that 3 consecutive unexcused absences trigger the formal dropout procedure.'
      },
      {
        id: 'sq-2-4',
        question: 'Which document officially identifies an apprentice and must be worn visibly at all times?',
        options: ['National Citizenship ID', 'Institutional SENA Student ID', 'SISBÉN photocopy', 'Voter certificate'],
        correctIndex: 1,
        explanation: 'The institutional SENA ID is mandatory and must be worn visibly on the chest at all campus locations.'
      }
    ]
  },
  {
    levelId: 'chal-3',
    levelNumber: 3,
    title: 'Level 3: Tribunal of Disciplinary Infractions',
    description: 'Instantly identify whether a conduct is Minor, Serious, or Very Serious under regulations.',
    minLevelRequired: 3,
    timePerQuestion: 15,
    xpPerCorrect: 45,
    questions: [
      {
        id: 'sq-3-1',
        question: 'Bringing, possessing, or consuming psychoactive narcotics inside a SENA campus is classified as:',
        options: ['Minor Infraction', 'Serious Infraction', 'Very Serious Infraction', 'Not an infraction if outside class hours'],
        correctIndex: 2,
        explanation: 'Possessing or distributing narcotics on institutional grounds is explicitly a Very Serious Infraction (Art. 28).'
      },
      {
        id: 'sq-3-2',
        question: 'Failing to wear the ID on your chest upon entry for the first time without conflict is:',
        options: ['Minor Infraction', 'Serious Infraction', 'Very Serious Infraction', 'Grounds for immediate expulsion'],
        correctIndex: 0,
        explanation: 'It is a minor infraction of duties subject to a restorative verbal reminder.'
      },
      {
        id: 'sq-3-3',
        question: 'Committing total project plagiarism by copying third-party commercial software without citation is:',
        options: ['Minor Infraction', 'Serious Infraction', 'Very Serious Infraction', 'Permitted internet practice'],
        correctIndex: 1,
        explanation: 'Deliberate academic fraud and plagiarism in core training deliverables is a Serious Infraction.'
      },
      {
        id: 'sq-3-4',
        question: 'Altering grades inside the SofiaPlus database in exchange for money is classified as:',
        options: ['Minor Infraction', 'Serious Infraction', 'Very Serious Infraction and cybercrime', 'Minor oversight'],
        correctIndex: 2,
        explanation: 'It is a Very Serious Infraction warranting enrollment cancellation, a 2-year ban, and criminal referral.'
      }
    ]
  },
  {
    levelId: 'chal-4',
    levelNumber: 4,
    title: 'Level 4: Due Process, Sanctions, and Appeals',
    description: 'Advanced questions on the Evaluation Committee, defense hearings, and legal remedies.',
    minLevelRequired: 4,
    timePerQuestion: 15,
    xpPerCorrect: 60,
    questions: [
      {
        id: 'sq-4-1',
        question: 'How many business days of advance notice must an apprentice receive before a Committee hearing?',
        options: ['Same day via WhatsApp', 'At least 3 business days', '24 hours prior', '30 calendar days'],
        correctIndex: 1,
        explanation: 'To protect the fundamental right to defense, formal summons must be delivered at least 3 business days prior.'
      },
      {
        id: 'sq-4-2',
        question: 'What formal legal remedy does an apprentice hold against a sanction resolution issued by the Subdirector?',
        options: ['Cassation Appeal', 'Appeal for Reconsideration (Recurso de Reposición)', 'Automatic Injunction', 'Letter to campus security'],
        correctIndex: 1,
        explanation: 'The Recurso de Reposición is the formal legal appeal requesting that the sanctioning authority review the case.'
      },
      {
        id: 'sq-4-3',
        question: 'What is the maximum disciplinary sanction that SENA can impose upon an apprentice?',
        options: ['One month conditional enrollment', 'Enrollment Cancellation with up to a 2-year nationwide ban', 'Payment of 5 minimum wages', 'Repeating elementary school'],
        correctIndex: 1,
        explanation: 'Definitive cancellation of enrollment with an institutional lockout for up to 2 years is the highest sanction.'
      },
      {
        id: 'sq-4-4',
        question: 'Who represents the voice of cohort peers inside the Evaluation and Monitoring Committee?',
        options: ['The student with highest GPA', 'The democratically elected Class Vocero', 'The oldest parent', 'Any walk-in volunteer'],
        correctIndex: 1,
        explanation: 'The Class Vocero is the legitimate student representative for cohort members in Committee sessions.'
      },
      {
        id: 'sq-4-5',
        question: 'Under the 2024 Regulations and 2026 Agreement, the usage of Artificial Intelligence in assignments:',
        options: [
          'Is strictly forbidden under immediate expulsion',
          'Is permitted as an assistive tool if disclosed with prompts cited, but claiming uncredited authorship is a serious infraction',
          'Is mandatory to generate all content via ChatGPT',
          'Is only allowed if the student pays a corporate license'
        ],
        correctIndex: 1,
        explanation: 'The 2026 Agreement mandates transparency: AI may assist, but uncredited submission constitutes serious fraud.'
      }
    ]
  }
];

export function getSpeedChallenges(lang: Language = 'es'): ChallengeLevel[] {
  return lang === 'en' ? SPEED_CHALLENGES_EN : SPEED_CHALLENGES;
}
