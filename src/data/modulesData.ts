import { InductionModule } from '../types';
import { Language } from '../context/LanguageContext';
import { INDUCTION_MODULES_EN } from './modulesDataEn';

export function getInductionModules(lang: Language = 'es'): InductionModule[] {
  return lang === 'en' ? INDUCTION_MODULES_EN : INDUCTION_MODULES;
}

export const INDUCTION_MODULES: InductionModule[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Identidad Institucional y Símbolos SENA',
    shortTitle: 'Identidad y Símbolos',
    category: 'Cultura Institucional',
    durationMinutes: 15,
    xpReward: 150,
    summary: 'Descubre el origen, la misión transformadora del SENA y el significado de los símbolos patrios e institucionales que te acompañarán.',
    iconName: 'Building2',
    topics: [
      {
        id: 't-1-1',
        title: 'Historia y Misión del SENA',
        subtitle: 'El nacimiento de la institución más querida por los colombianos',
        content: [
          'El Servicio Nacional de Aprendizaje (SENA) nació el 21 de junio de 1957 por iniciativa del economista y visionario cartagenero Rodolfo Martínez Tono, mediante el Decreto Ley 118 de 1957.',
          'Su creación respondió a un pacto tripartito entre el Gobierno Nacional, los empresarios y los trabajadores, con el objetivo de brindar formación técnica profesional a la clase trabajadora colombiana para impulsar el desarrollo económico y social.',
          'El SENA es un establecimiento público del orden nacional, adscrito al Ministerio del Trabajo, con personería jurídica, patrimonio propio e independiente y autonomía administrativa.'
        ],
        keyHighlights: [
          'Fundador: Rodolfo Martínez Tono en 1957.',
          'Naturaleza: Educación técnica y tecnológica pública, gratuita y de calidad.',
          'Estructura Tripartita: Gobierno, Trabajadores y Sector Productivo.'
        ],
        proTip: 'Toda la formación y servicios del SENA son 100% gratuitos. Nunca nadie puede cobrarte por cupos, trámites, certificados o derechos de grado.'
      },
      {
        id: 't-1-2',
        title: 'Los Símbolos Institucionales',
        subtitle: 'Escudo, Bandera, Logotipo e Himno',
        content: [
          'El Escudo: Compuesto por el caduceo (comercio y servicios), el engranaje (sector industrial), el cafeto (sector agropecuario) y el sendero que conduce hacia el horizonte del conocimiento.',
          'La Bandera: De fondo blanco que simboliza la paz, la tranquilidad y la transparencia; en su centro lleva el escudo oficial del SENA sobre el verde institucional que representa la esperanza.',
          'El Logotipo (Logo-símbolo): Representa gráficamente a un ser humano caminando hacia el futuro, avanzando a paso firme sobre un camino trazado por su propia formación y proyecto de vida.',
          'El Himno: Compuesto por Jesús Firavitoba (letra) y Daniel Marlez (música). Su coro ensalza: "Estudiantes del SENA adelante, por Colombia luchad con amor, con el ánimo noble y radiante, transformemos el mundo en mejor".'
        ],
        keyHighlights: [
          'Escudo: Los 3 sectores productivos (Agro, Industria, Comercio).',
          'Bandera: Blanco (paz) y verde institucional (esperanza).',
          'Logo-símbolo: El aprendiz caminando hacia adelante.',
          'Himno: Llamado al trabajo digno y al progreso de la patria.'
        ],
        checklist: [
          'Conocer la letra del coro del himno para ceremonias oficiales.',
          'Identificar los colores y elementos del escudo.',
          'Comprender el concepto del ser humano al centro de la formación.'
        ]
      },
      {
        id: 't-1-3',
        title: 'Valores y Principios Éticos del Aprendiz',
        subtitle: 'El decálogo de convivencia comunitaria',
        content: [
          'En el SENA, la formación técnica va indisolublemente unida a la formación ciudadana y humanística. No formamos solo operarios, formamos ciudadanos integrales.',
          'Los valores centrales son: Respeto a la dignidad humana, Libre pensamiento y actitud crítica, Liderazgo transformador, Solidaridad, Justicia y Equidad, Transparencia y Creatividad.',
          'Como aprendiz, te comprometes a preservar el medio ambiente, cuidar la infraestructura pública y ser vocero de la convivencia armónica dentro y fuera de tu Centro de Formación.'
        ],
        keyHighlights: [
          'Formación Integral: Ser + Saber + Saber Hacer.',
          'Ética y cuidado de los recursos públicos.',
          'Convivencia pacífica y respeto a la diversidad.'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-1-1',
        question: '¿Quién fue el fundador y principal impulsor del SENA en el año 1957?',
        options: [
          'Alberto Lleras Camargo',
          'Rodolfo Martínez Tono',
          'Luis Carlos Galán',
          'Alfonso López Michelsen'
        ],
        correctIndex: 1,
        explanation: 'El economista cartagenero Rodolfo Martínez Tono concibió y fundó el SENA el 21 de junio de 1957 como una entidad tripartita para la formación para el trabajo.'
      },
      {
        id: 'q-1-2',
        question: '¿Qué representa gráficamente el logo-símbolo actual del SENA?',
        options: [
          'Un engranaje mecánico girando en una fábrica',
          'Un árbol de café floreciendo en los Andes',
          'Un ser humano que camina con paso firme hacia el futuro',
          'Una antorcha olímpica del conocimiento'
        ],
        correctIndex: 2,
        explanation: 'El logo-símbolo representa al aprendiz SENA avanzando hacia adelante, forjando su propio destino a través de la educación.'
      },
      {
        id: 'q-1-3',
        question: '¿Cuál es una característica fundamental de los programas y certificados del SENA?',
        options: [
          'Requieren un pago semestral obligatorio por derechos de carné',
          'Son 100% gratuitos y no requieren intermediarios',
          'Solo son válidos dentro de la ciudad donde se estudia',
          'Tienen costo únicamente durante la etapa productiva'
        ],
        correctIndex: 1,
        explanation: 'Todos los servicios, inscripciones, formación y certificados del SENA son de acceso público y completamente gratuitos.'
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'Modelo Pedagógico y Formación Profesional Integral',
    shortTitle: 'Modelo Pedagógico & FPI',
    category: 'Pedagogía SENA',
    durationMinutes: 20,
    xpReward: 200,
    summary: 'Comprende el enfoque por competencias, la metodología de proyectos formativos, los juicios evaluativos (Aprobado / No Aprobado) y las dos etapas de tu programa.',
    iconName: 'GraduationCap',
    topics: [
      {
        id: 't-2-1',
        title: 'La Formación Profesional Integral (FPI)',
        subtitle: 'Saber, Saber Hacer y Saber Ser',
        content: [
          'La FPI es un proceso educativo teórico-práctico orientado al desarrollo de conocimientos técnicos, habilidades destrezas y actitudes para el desempeño productivo y social.',
          'Consta de 3 dimensiones inseparables:',
          '1. Saber (Conocimiento cognitivo y científico).',
          '2. Saber Hacer (Habilidades psicomotrices y aplicación técnica real en ambientes de simulación o trabajo).',
          '3. Saber Ser (Ética profesional, responsabilidad, trabajo en equipo y relaciones humanas).'
        ],
        keyHighlights: [
          'Articulación teórico-práctica permanente.',
          'Desarrollo de competencias laborales certificables.',
          'Cultura del autocuidado y la seguridad laboral.'
        ],
        proTip: 'En el SENA no memorizas para un examen de memoria; demuestras competencias reales a través de evidencias de aprendizaje concretas.'
      },
      {
        id: 't-2-2',
        title: 'Etapa Lectiva vs. Etapa Productiva',
        subtitle: 'Las dos mitades del ciclo de formación',
        content: [
          'Etapa Lectiva: Periodo en el cual desarrollas las competencias básicas y específicas en los ambientes de aprendizaje del centro (aulas, talleres, laboratorios) mediante proyectos formativos.',
          'Etapa Productiva: Periodo donde aplicas, complementas y consolidas lo aprendido en un entorno empresarial o comunitario real.',
          'Modalidades autorizadas para realizar la Etapa Productiva:',
          '• Contrato de Aprendizaje (con empresa patrocinadora y apoyo de sostenimiento).',
          '• Proyecto Productivo (creación de tu propia empresa o unidad de negocio asesorada por Fondo Emprender).',
          '• Pasantía formativa o vinculación laboral formal relacionada con el programa.',
          '• Monitorías institucionales en el SENA.'
        ],
        keyHighlights: [
          'Lectiva: Talleres, proyectos, guías de aprendizaje y retos.',
          'Productiva: Experiencia laboral práctica supervisada.',
          'El aprendiz dispone de hasta 2 años tras culminar la lectiva para certificar su etapa productiva.'
        ]
      },
      {
        id: 't-2-3',
        title: 'Evaluación del Aprendizaje: Juicios A y D',
        subtitle: 'Cómo se califica en el SENA y el Plan de Mejoramiento',
        content: [
          'En el SENA la evaluación no utiliza notas numéricas tradicionales (de 1 a 5 o de 0 a 10). Se evalúa por Resultados de Aprendizaje (RAP) alcanzados.',
          'Los dos únicos juicios evaluativos en SofiaPlus son:',
          '• A = Aprobado (Alcanzó las competencias y cumplió con las evidencias solicitadas según la rúbrica).',
          '• D = No Aprobado / Deficiente (Aún no alcanza el resultado y requiere refuerzo pedagógico).',
          'Si obtienes una "D", el instructor no te reprueba de inmediato: tiene la obligación de concertar contigo un Plan de Mejoramiento Académico con un plazo máximo de 30 días para presentar nuevas evidencias y recuperar el RAP.'
        ],
        keyHighlights: [
          'Solo existen juicios A (Aprobado) y D (No Aprobado).',
          'Para graduarte debes tener TODOS los Resultados de Aprendizaje en "A".',
          'El Plan de Mejoramiento Académico es un derecho formativo antes de cualquier sanción.'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-2-1',
        question: '¿Cuáles son los dos únicos juicios evaluativos que se registran en el sistema SofiaPlus del SENA?',
        options: [
          'Excelente (E) e Insuficiente (I)',
          'Aprobado (A) y No Aprobado (D)',
          'Sobresaliente (S) y Reprobado (R)',
          'Calificación numérica de 1.0 a 5.0'
        ],
        correctIndex: 1,
        explanation: 'En el SENA se evalúa cualitativamente por competencias: A (Aprobado) cuando se alcanza el resultado de aprendizaje, y D (No Aprobado) cuando requiere refuerzo.'
      },
      {
        id: 'q-2-2',
        question: 'Si un aprendiz no alcanza un Resultado de Aprendizaje (RAP), ¿cuál es el procedimiento pedagógico inmediato?',
        options: [
          'Expulsión inmediata del centro de formación',
          'Concertación de un Plan de Mejoramiento Académico con plazo para presentar nuevas evidencias',
          'Repetir todo el semestre desde cero',
          'Pago de una multa económica al Centro de Formación'
        ],
        correctIndex: 1,
        explanation: 'El instructor y el aprendiz concertan un Plan de Mejoramiento Académico donde se fijan actividades complementarias para que el aprendiz alcance la competencia.'
      },
      {
        id: 'q-2-3',
        question: '¿Cuál de las siguientes NO es una modalidad autorizada para la Etapa Productiva?',
        options: [
          'Contrato de Aprendizaje con patrocinio empresarial',
          'Proyecto Productivo asesorado por el SENA',
          'Trabajo informal no remunerado ni relacionado con el programa de formación',
          'Pasantía formativa en entidad pública o privada'
        ],
        correctIndex: 2,
        explanation: 'La etapa productiva debe estar formalmente legalizada y tener directa coherencia técnica con el programa de formación cursado.'
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Ecosistema Tecnológico y Plataformas SENA',
    shortTitle: 'Plataformas & Ecosistema',
    category: 'Herramientas Digitales',
    durationMinutes: 18,
    xpReward: 180,
    summary: 'Domina las herramientas indispensables de tu día a día: SofiaPlus, Zajuna LMS, Correo MiSena, Biblioteca virtual y Carnet Digital.',
    iconName: 'Laptop',
    topics: [
      {
        id: 't-3-1',
        title: 'SofiaPlus: El Cerebro Administrativo',
        subtitle: 'Sistema Optimizado para la Formación Integral del Aprendizaje Activo',
        content: [
          'SofiaPlus es el portal maestro donde se gestiona tu historial como aprendiz SENA:',
          '• Consulta de tu número de Ficha de Caracterización (el código identificador de tu grupo).',
          '• Registro de novedades de matrícula (aplazamiento, traslado, retiro voluntario).',
          '• Consulta del estado de tu matrícula (En formación, Cancelado, Aplazado, Certificado).',
          '• Descarga de certificados de estudio, constancias de notas y juicios evaluativos vigentes.'
        ],
        keyHighlights: [
          'Tu usuario siempre es tu documento de identidad.',
          'No compartas tu contraseña con nadie; las acciones en SofiaPlus tienen validez legal.',
          'Revisa periódicamente el estado de tus RAPs.'
        ],
        proTip: 'Guarda tu número de Ficha. Cada vez que vayas a bienestar, biblioteca o soporte, te pedirán tu número de documento y número de ficha.'
      },
      {
        id: 't-3-2',
        title: 'Zajuna (LMS SENA) y Correo Institucional',
        subtitle: 'Tus aulas virtuales y canal oficial de comunicación',
        content: [
          'Zajuna es la plataforma de gestión del aprendizaje (LMS) donde interactúas académicamente:',
          '• Espacio para descargar guías de aprendizaje, talleres y material de apoyo.',
          '• Buzón de entrega de evidencias de conocimiento, desempeño y producto.',
          '• Foros de discusión académica y dudas pedagógicas con los instructores.',
          '• Evaluaciones en línea y enlaces a sesiones sincrónicas (Teams/Meet).',
          'Correo Institucional (@misena.edu.co o @soy.sena.edu.co):',
          'Es el único canal oficial para recibir notificaciones académicas, citaciones a comité, convocatorias de apoyos de sostenimiento y ofertas de empleo.'
        ],
        keyHighlights: [
          'Entrega de evidencias dentro de los plazos cronológicos del cronograma.',
          'Revisión diaria del correo institucional.',
          'Acceso a suite ofimática Office 365 con almacenamiento en la nube sin costo.'
        ]
      },
      {
        id: 't-3-3',
        title: 'Sistema de Bibliotecas y Carnet Digital',
        subtitle: 'Recursos de investigación y tu identidad en el campus',
        content: [
          'Biblioteca SENA (biblioteca.sena.edu.co): Te da acceso gratuito a más de 30 bases de datos científicas internacionales (Scopus, IEEE, ProQuest, Dialnet, e-Libro), normas técnicas Icontec y miles de libros.',
          'Carnet del Aprendiz: Es tu identificación obligatoria. Debes portarlo en un lugar visible en el pecho en todo momento mientras estés en la sede.',
          'El carnet te permite ingresar por torniquetes biométricos, solicitar préstamos de herramientas en talleres, ingresar a salas de cómputo y acceder a las rutas de transporte institucional.'
        ],
        keyHighlights: [
          'Porte de carnet visible: Deber permanente del aprendiz.',
          'Préstamo interbibliotecario y software especializado gratuito.',
          'Servicios de Bienestar al Aprendiz: Salud, psicología, deporte, cultura y subsidios.'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-3-1',
        question: '¿Cuál es la función principal de la plataforma SofiaPlus?',
        options: [
          'Red social para chatear entre compañeros de sede',
          'Portal administrativo para gestionar matrículas, novedades, consultar ficha y juicios evaluativos',
          'Videojuego institucional para ganar puntos',
          'Plataforma exclusiva para comprar computadores'
        ],
        correctIndex: 1,
        explanation: 'SofiaPlus es el sistema administrativo central del SENA para gestionar inscripciones, fichas, juicios evaluativos y certificaciones.'
      },
      {
        id: 'q-3-2',
        question: '¿Por qué es indispensable consultar diariamente el correo institucional MiSENA / soy.sena?',
        options: [
          'Porque contiene publicidad comercial de patrocinadores',
          'Porque es el medio oficial legal de comunicación para citaciones, apoyos y notificaciones',
          'Porque si no se abre a diario se desactiva el internet de tu casa',
          'Únicamente se usa el último día de formación'
        ],
        correctIndex: 1,
        explanation: 'El correo institucional es el canal formal y legal donde se notifican notas, comités, oportunidades de contrato de aprendizaje y citaciones oficiales.'
      },
      {
        id: 'q-3-3',
        question: '¿Dónde y cómo debe portarse el carnet del aprendiz dentro del centro de formación?',
        options: [
          'Guardado en el fondo del bolso para evitar que se raye',
          'Visible en la parte frontal superior (pecho) en todo momento',
          'Dejarlo en casa y mostrar solo una foto en el celular si preguntan',
          'Solo se muestra los días de examen final'
        ],
        correctIndex: 1,
        explanation: 'El reglamento del aprendiz estipula como deber el porte del carnet en un lugar visible en el pecho para garantizar la seguridad de toda la comunidad educativa.'
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Derechos, Deberes y Prohibiciones (Reglamento 2024 y Acuerdo Complementario 2026)',
    shortTitle: 'Reglamento 2024 - 2026',
    category: 'Normatividad Vigente',
    durationMinutes: 25,
    xpReward: 250,
    summary: 'Analiza el Reglamento del Aprendiz en su Versión 2024 y su Acuerdo Complementario de 2026: tus garantías como estudiante, uso ético de tecnologías e IA, deberes de seguridad y conductas prohibidas.',
    iconName: 'ShieldAlert',
    topics: [
      {
        id: 't-4-1',
        title: 'Derechos Fundamentales y Ciudadanía Digital (2024-2026)',
        subtitle: 'Garantías institucionales, bienestar integral y conectividad',
        content: [
          'El Reglamento del Aprendiz SENA (Versión 2024 y Acuerdo Complementario 2026) consolida tus derechos fundamentales y los adapta a los nuevos entornos presenciales e híbridos:',
          '• Recibir formación profesional integral de calidad acorde con las demandas tecnológicas y del sector productivo actual.',
          '• Hacer uso oportuno de las instalaciones, equipos de cómputo, laboratorios, talleres, biblioteca digital y entornos virtuales de aprendizaje Zajuna.',
          '• Ser escuchado, atendido y respetado en tu dignidad personal, integridad física y emocional, con estricta observancia del Protocolo de Convivencia y No Discriminación.',
          '• Conocer las notas y juicios evaluativos oportunamente a través de SofiaPlus antes de su registro definitivo.',
          '• Derecho a la salud mental, orientación psicopedagógica y acompañamiento del equipo de Bienestar al Aprendiz.',
          '• Exigir el debido proceso y la presunción de inocencia en cualquier informe o comité disciplinario.',
          '• Elegir y ser elegido democráticamente como Vocero de Ficha o Representante de Aprendices del Centro.'
        ],
        keyHighlights: [
          'Reglamento del Aprendiz: Versión 2024 con Acuerdo Complementario 2026.',
          'Inclusión de derechos digitales, conectividad institucional y bienestar socioemocional.',
          'Garantía estricta del debido proceso y canales oficiales de notificación.'
        ]
      },
      {
        id: 't-4-2',
        title: 'Deberes Esenciales y Convivencia',
        subtitle: 'El compromiso recíproco con la comunidad formativa',
        content: [
          'Como contraparte a tus derechos, el marco 2024-2026 estipula deberes indispensables:',
          '• Asistir puntualmente a las sesiones presenciales, talleres o encuentros sincrónicos en plataformas oficiales.',
          '• Portar permanentemente el carné institucional vigente en lugar visible del pecho para control de acceso y seguridad biométrica.',
          '• Justificar las inasistencias dentro de los 3 días hábiles siguientes al hecho mediante incapacidad EPS o soporte de fuerza mayor radicado ante coordinación.',
          '• Utilizar los Elementos de Protección Personal (EPP) y la indumentaria reglamentaria en talleres técnicos y laboratorios.',
          '• Cuidar los bienes, mobiliario, maquinaria, licencias y software del Centro de Formación.',
          '• Mantener un trato cordial, respetuoso, libre de acoso o discriminación hacia compañeros, instructores y funcionarios.'
        ],
        keyHighlights: [
          'Plazo de justificación de inasistencias: Máximo 3 días hábiles.',
          'Seguridad industrial: Uso obligatorio y correcto de EPP en talleres.',
          'Responsabilidad en el cuidado de la infraestructura física y tecnológica.'
        ]
      },
      {
        id: 't-4-3',
        title: 'Prohibiciones Expresas y Uso Ético de la IA (Acuerdo 2026)',
        subtitle: 'Límites claros, honestidad académica y entornos seguros',
        content: [
          'El Reglamento 2024 y su Acuerdo Complementario de 2026 prohíben taxativamente:',
          '• Ingresar, portar, suministrar o consumir en el SENA bebidas alcohólicas, sustancias psicoactivas o estupefacientes, o presentarse bajo sus efectos.',
          '• Fumar o vapear en cualquier espacio del campus institucional (sedes 100% libres de humo y aerosoles).',
          '• Portar armas de cualquier tipo (de fuego, blancas, corto-punzantes o contundentes).',
          '• Fraude y plagio en evidencias de aprendizaje, suplantación de identidad en plataformas y el uso indebido de Inteligencia Artificial (IA) sin atribución ni desarrollo intelectual propio.',
          '• Agredir verbal, física o digitalmente (ciberacoso) a compañeros, instructores o personal de apoyo.',
          '• Alterar, destruir o falsificar calificaciones, firmas o certificados oficiales en SofiaPlus.',
          '• Comercializar productos, rifas o préstamos informales en el Centro sin autorización formal.'
        ],
        keyHighlights: [
          'Acuerdo Complementario 2026: Regulación explícita sobre el uso ético y transparente de la IA en evidencias.',
          'Tolerancia cero ante armas, drogas, riñas y conductas de acoso.',
          'La falsificación de juicios o certificados acarrea cancelación inmediata e implicaciones penales.'
        ],
        proTip: 'En el SENA 2024-2026 puedes usar Inteligencia Artificial como herramienta de apoyo, pero debes declarar su uso, citar las fuentes y sustentar personalmente tu propio desarrollo.'
      }
    ],
    quickQuiz: [
      {
        id: 'q-4-1',
        question: '¿Cuántos días hábiles tiene el aprendiz para presentar la justificación médica o legal de una inasistencia?',
        options: [
          '15 días calendario',
          'Máximo 3 días hábiles siguientes a la inasistencia',
          'Hasta el final del trimestre formativo',
          'No es necesario justificar si avisa por WhatsApp a un amigo'
        ],
        correctIndex: 1,
        explanation: 'El reglamento estipula que el aprendiz dispone de máximo 3 días hábiles para radicar ante la coordinación su excusa justificada (incapacidad EPS o fuerza mayor).'
      },
      {
        id: 'q-4-2',
        question: '¿Cuál es la normatividad vigente del Reglamento del Aprendiz SENA?',
        options: [
          'El Código de Policía y Convivencia',
          'El Reglamento del Aprendiz Versión 2024 con su Acuerdo Complementario de 2026',
          'La Ley 100 de Seguridad Social',
          'El Estatuto Tributario Nacional'
        ],
        correctIndex: 1,
        explanation: 'El marco normativo que rige la formación integral del aprendiz es el Reglamento Versión 2024 actualizado con el Acuerdo Complementario de 2026.'
      },
      {
        id: 'q-4-3',
        question: 'Según el Acuerdo Complementario de 2026, si un aprendiz presenta código o evidencias generadas por IA como 100% propias sin citar ni desarrollar lógica:',
        options: [
          'Se le otorga matrícula de honor por rapidez',
          'Incurre en falta grave por fraude académico y violación de derechos de autor',
          'No pasa nada si nadie le revisa el archivo',
          'Es obligatorio entregar todo hecho por IA'
        ],
        correctIndex: 1,
        explanation: 'El marco 2024-2026 califica el uso encubierto de IA o plagio como fraude académico sujeto a juicio evaluativo "D" y proceso disciplinario.'
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'Trámites, Novedades y Prevención de la Deserción',
    shortTitle: 'Trámites & Deserción',
    category: 'Administración Académica',
    durationMinutes: 18,
    xpReward: 190,
    summary: 'Aprende a tramitar aplazamientos, traslados y retiros voluntarios a tiempo, y conoce las graves consecuencias de incurrir en deserción injustificada.',
    iconName: 'FileText',
    topics: [
      {
        id: 't-5-1',
        title: 'Novedades de Matrícula en SofiaPlus',
        subtitle: 'Cómo gestionar cambios en tu proceso formativo por la vía legal',
        content: [
          'La vida da giros y pueden presentarse circunstancias laborales, de salud o familiares. Para ello el SENA dispone de trámites formales de novedades:',
          '1. Traslado: Solicitud de cambio de ficha, jornada o centro de formación (sujeto a disponibilidad de cupo y mismo programa).',
          '2. Aplazamiento: Solicitud para suspender temporalmente los estudios por causas justificadas (servicio militar, enfermedad prolongada, maternidad). Se autoriza hasta por un periodo máximo de 6 meses (prorrogable en casos especiales).',
          '3. Reingreso: Solicitud para reactivar la formación antes de que venza el plazo del aplazamiento.',
          '4. Retiro Voluntario: Solicitud por escrito del aprendiz para retirarse del programa de manera ordenada y sin sanciones futuras.'
        ],
        keyHighlights: [
          'Los trámites se radican formalmente a través de SofiaPlus o ante la Coordinación Académica.',
          'El retiro voluntario te permite volver a presentarte al SENA en la siguiente convocatoria sin castigo.'
        ],
        proTip: 'Si no puedes continuar estudiando, NUNCA abandones el centro sin radicar tu Retiro Voluntario. Abandonar sin aviso se califica como DESERCIÓN.'
      },
      {
        id: 't-5-2',
        title: 'La Deserción y sus Implicaciones Legales',
        subtitle: 'La sanción más severa para tu futuro educativo',
        content: [
          'Se declara Deserción cuando el aprendiz:',
          '• Incumple de manera injustificada con la asistencia durante tres (3) días consecutivos en formación presencial.',
          '• En formación virtual, no ingresa a la plataforma ni entrega evidencias durante tres (3) semanas consecutivas sin justificación.',
          '• No presenta las evidencias concertadas en un Plan de Mejoramiento Académico o Disciplinario.',
          '• Culmina la etapa lectiva y pasan dos (2) años sin haber presentado los soportes para certificar la etapa productiva.',
          'Procedimiento de Deserción: El instructor reporta la inasistencia; la coordinación envía una citación por correo para que justifiques en 5 días hábiles. Si no respondes, se expide el acto administrativo de cancelación de matrícula por deserción.'
        ],
        keyHighlights: [
          'Causal: 3 días consecutivos sin justificación.',
          'Sanción por Deserción: Cancelación de matrícula e INHABILIDAD por 6 meses a 2 años para inscribirse en cualquier programa del SENA a nivel nacional.',
          'Pérdida de la oportunidad educativa y de apoyos económicos.'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-5-1',
        question: '¿Cuántos días continuos de inasistencia presencial injustificada configuran presunción de Deserción en el SENA?',
        options: [
          '15 días continuos',
          'Tres (3) días consecutivos sin justificación válida',
          'Un mes completo',
          'Diez semanas lectivas'
        ],
        correctIndex: 1,
        explanation: 'El artículo sobre deserción establece que 3 días consecutivos de inasistencia injustificada dan inicio formal al proceso de reporte por presunta deserción.'
      },
      {
        id: 'q-5-2',
        question: '¿Cuál es la consecuencia principal si a un aprendiz se le declara la Deserción oficial?',
        options: [
          'Una llamada de felicitación por su autonomía',
          'Cancelación definitiva de matrícula e inhabilidad para inscribirse en el SENA de 6 meses a 2 años',
          'Pagar una multa bancaria en el Banco Agrario',
          'Simplemente empezar de nuevo al día siguiente'
        ],
        correctIndex: 1,
        explanation: 'La deserción acarrea la cancelación de la matrícula y una sanción de bloqueo en el sistema SofiaPlus por un periodo de hasta 2 años en todo el país.'
      },
      {
        id: 'q-5-3',
        question: 'Si un aprendiz debe mudarse de ciudad por motivos de fuerza mayor, ¿qué novedad debe tramitar oportunamente?',
        options: [
          'Dejar de ir y esperar que lo llamen',
          'Solicitar formalmente Traslado de Centro o Aplazamiento de Matrícula en SofiaPlus',
          'Vender su puesto en la ficha a otro amigo',
          'Borrar la aplicación del SENA del teléfono'
        ],
        correctIndex: 1,
        explanation: 'Tramitar a tiempo el traslado de centro o un aplazamiento justificado protege la condición de aprendiz y evita sanciones disciplinarias.'
      }
    ]
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'Comité de Evaluación y Debido Proceso Disciplinario',
    shortTitle: 'Comité & Debido Proceso',
    category: 'Procedimiento Disciplinario',
    durationMinutes: 22,
    xpReward: 220,
    summary: 'Conoce cómo opera el Comité de Evaluación y Seguimiento, tus garantías de defensa, el pliego de descargos y la diferencia entre medidas formativas y sancionatorias.',
    iconName: 'Scale',
    topics: [
      {
        id: 't-6-1',
        title: 'El Comité de Evaluación y Seguimiento',
        subtitle: 'El órgano colegiado que vela por la justicia y el rigor formativo',
        content: [
          'El Comité de Evaluación y Seguimiento es el cuerpo consultivo del Subdirector de Centro encargado de analizar el rendimiento académico y el comportamiento disciplinario de los aprendices.',
          '¿Quiénes lo integran con voz y voto?:',
          '• Un instructor del programa (generalmente el líder de ficha).',
          '• El Coordinador Académico o Misional del Centro.',
          '• El Coordinador de Formación.',
          '• El Vocero de la Ficha a la que pertenece el aprendiz.',
          '• El Representante de los Aprendices del Centro.',
          '• Un profesional de Bienestar al Aprendiz (pedagogo o psicólogo con voz orientadora).'
        ],
        keyHighlights: [
          'Órgano colegiado y plural: Garantiza que no sea una decisión unilateral de un solo instructor.',
          'Participación estudiantil: Tienes la representación de tu vocero y del representante general.',
          'Enfoque prioritariamente formativo y pedagógico.'
        ]
      },
      {
        id: 't-6-2',
        title: 'El Debido Proceso y Pliego de Descargos',
        subtitle: 'Tus garantías constitucionales consagradas en el Art. 29',
        content: [
          'Nadie en el SENA puede ser sancionado sin haber tenido la oportunidad de defenderse formalmente.',
          'Fases del procedimiento disciplinario:',
          '1. Queja o Informe: El instructor, funcionario o vigilante radica un reporte formal con pruebas (testimonios, fotos, registros biológicos).',
          '2. Citación a Comité: Se notifica al aprendiz por escrito o a su correo institucional con mínimo 3 días hábiles de anticipación, adjuntando las pruebas.',
          '3. Sesión de Descargos: El aprendiz asiste (puede ir acompañado de su acudiente si es menor de edad) y expone su versión de los hechos de manera libre y espontánea, aportando descargos y pruebas a su favor.',
          '4. Deliberación y Recomendación: El comité evalúa agravantes y atenuantes, y emite una recomendación al Subdirector de Centro.',
          '5. Acto Administrativo y Recurso de Reposición: El Subdirector expide la Resolución. Si el aprendiz no está de acuerdo, tiene derecho a interponer el Recurso de Reposición dentro de los 10 días hábiles siguientes.'
        ],
        keyHighlights: [
          'Presunción de inocencia hasta que se demuestre la responsabilidad.',
          'Derecho a conocer todas las pruebas en su contra.',
          'Derecho a interponer Recurso de Reposición contra la resolución sancionatoria.'
        ]
      },
      {
        id: 't-6-3',
        title: 'Medidas Formativas vs. Medidas Sancionatorias',
        subtitle: 'La gradación proporcional según la gravedad de la falta',
        content: [
          'Medidas Formativas (Preventivas y Pedagógicas):',
          '• Llamado de atención verbal reflexivo.',
          '• Plan de Mejoramiento Académico o Disciplinario (actividades pedagógicas complementarias o de impacto social en el centro).',
          'Medidas Sancionatorias (Registradas en Hoja de Vida):',
          '• Llamado de atención formal por escrito con copia a la hoja de vida.',
          '• Condicionamiento de Matrícula (el aprendiz queda en periodo de prueba estricto; cualquier reincidencia causará la cancelación).',
          '• Cancelación Definitiva de Matrícula (implica desvinculación total del SENA y sanción de inhabilidad de 1 a 2 años).'
        ],
        keyHighlights: [
          'La sanción debe ser proporcional a la magnitud de la falta (Leve, Grave o Gravísima).',
          'Se valoran circunstancias atenuantes (haber confesado voluntariamente, reparar el daño, excelente conducta previa).',
          'Se valoran agravantes (reincidencia, premeditación, mentir en descargos, poner en peligro a terceros).'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q-6-1',
        question: '¿Quiénes tienen representación estudiantil dentro del Comité de Evaluación y Seguimiento?',
        options: [
          'Ningún estudiante puede participar en el comité',
          'El Vocero de la Ficha del aprendiz y el Representante de los Aprendices del Centro',
          'Únicamente los familiares del instructor',
          'Estudiantes de otras universidades externas'
        ],
        correctIndex: 1,
        explanation: 'El reglamento garantiza la participación democrática estudiantil a través del Vocero de Ficha y el Representante de Aprendices.'
      },
      {
        id: 'q-6-2',
        question: '¿Qué es el Recurso de Reposición dentro del debido proceso disciplinario del SENA?',
        options: [
          'Una solicitud de dinero para comprar refrigerios',
          'El derecho legal que tiene el aprendiz de solicitar al Subdirector que revise o revoque una sanción impuesta',
          'Un examen sorpresa de matemáticas',
          'Una carta de agradecimiento por la sanción'
        ],
        correctIndex: 1,
        explanation: 'El Recurso de Reposición es el mecanismo formal para apelar y solicitar formalmente la reconsideración de la sanción impuesta en la resolución.'
      },
      {
        id: 'q-6-3',
        question: '¿Cuál es la diferencia entre un Plan de Mejoramiento y una Cancelación de Matrícula?',
        options: [
          'El Plan de Mejoramiento es una oportunidad pedagógica correctiva; la Cancelación es la sanción máxima de desvinculación',
          'No hay diferencia, son exactamente lo mismo',
          'El plan de mejoramiento solo lo hacen los instructores',
          'La cancelación de matrícula permite volver a clases al día siguiente'
        ],
        correctIndex: 0,
        explanation: 'El Plan de Mejoramiento busca orientar y recuperar pedagógicamente al aprendiz; la Cancelación de Matrícula es la expulsión definitiva del programa con inhabilidad.'
      }
    ]
  }
];
