import { QuizQuestion } from '../types';

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
        options: ['La nieve de los páramos', 'La paz y la transparencia', 'La pureza del algodón', 'El sector textil'],
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
