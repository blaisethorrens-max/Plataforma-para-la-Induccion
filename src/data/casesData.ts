import { RegulationCase } from '../types';

export const REGULATION_CASES: RegulationCase[] = [
  // ===================== FALTAS LEVES =====================
  {
    id: 'case-leve-1',
    code: 'EXP-DISC-01',
    title: 'El Carné en la Billetera y el Reto en Portería',
    shortDescription: 'Un aprendiz se niega a portar el carné en el pecho e ingresa al centro alegando que los vigilantes ya lo conocen de vista.',
    severity: 'leve',
    story: `Durante el ingreso matutino al Centro de Formación, el aprendiz Mateo Gómez fue requerido por el personal de vigilancia en el torniquete principal por no tener su carné institucional visible. Mateo manifestó de forma airada que "llevaba el carné guardado en el bolsillo trasero y que no tenía por qué sacarlo si el vigilante ya lo veía entrar todos los días". Tras una breve discusión donde retardó el ingreso de sus compañeros, mostró el carné pero se negó a colgarlo en el pecho como estipula el protocolo de seguridad del Centro. El reporte fue remitido por la empresa de seguridad a la Coordinación de Formación.`,
    protagonist: {
      name: 'Mateo Gómez',
      program: 'Tecnólogo en Animación 3D',
      ficha: '2754190',
      stage: 'Lectiva',
      antecedents: 'Sin anotaciones previas en su hoja de vida académica ni llamados de atención.'
    },
    evidenceList: [
      {
        source: 'Minuta de Vigilancia y Seguridad',
        description: 'Reporte del vigilante de turno detallando la negativa a identificarse con el carné visible y la obstrucción momentánea del torniquete.',
        date: '14 de Febrero, 06:45 AM'
      },
      {
        source: 'Cámaras del Circuito Cerrado de TV',
        description: 'Video que confirma que el aprendiz tenía el carné en su billetera y no en el pecho al cruzar el control de acceso.',
        date: '14 de Febrero, 06:46 AM'
      }
    ],
    attenuatingFactors: [
      'El aprendiz no tiene antecedentes disciplinarios en el SENA.',
      'Efectivamente portaba el documento dentro de sus pertenencias (no era una persona extraña al Centro).',
      'Reconoció la mala actitud en la entrevista formativa con el vocero.'
    ],
    aggravatingFactors: [
      'Resistencia inicial a acatar las instrucciones del personal de seguridad.',
      'Generación de malestar y retraso en la fila de ingreso de sus compañeros de ficha.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo IV: De los Deberes del Aprendiz SENA',
      article: 'Artículo 9, Numeral 2 & Artículo 26 (Criterios de Calificación de Faltas)',
      ruleText: 'Es deber del aprendiz portar permanentemente y en lugar visible el carné que lo identifica como miembro de la comunidad educativa SENA, durante su permanencia en el Centro de Formación y en actividades institucionales.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: '¡Correcto! No portar el carné en el pecho o manifestar desobediencia menor en los accesos sin violencia ni daño material se tipifica como Falta Leve según el Reglamento del Aprendiz.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: 'Incorrecto. No alcanza a ser Falta Grave porque el aprendiz efectivamente poseía el carné, no suplantó a nadie ni causó daños a la infraestructura o personas.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: 'Incorrecto. Las faltas gravísimas corresponden a conductas delictivas, porte de armas, consumo de drogas o falsificación, situaciones que no se presentaron en este caso.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-1-1',
        title: 'Cancelación inmediata de la matrícula con inhabilidad de 2 años',
        description: 'Expulsión definitiva del aprendiz del sistema educativo SENA.',
        isCorrect: false,
        feedback: 'Desproporcionado e ilegal. Viola el principio de proporcionalidad del debido proceso disciplinario.'
      },
      {
        id: 's-1-2',
        title: 'Llamado de atención verbal y compromiso pedagógico de autocuidado',
        description: 'Acción preventiva formativa concertada con el instructor y el líder de ficha para reforzar la importancia de la seguridad en el campus.',
        isCorrect: true,
        feedback: '¡Decisión acertada! Al tratarse de una falta leve por primera vez y sin antecedentes, corresponde una medida formativa: llamado de atención verbal y compromiso de portar el carné.'
      },
      {
        id: 's-1-3',
        title: 'Condicionamiento de matrícula con copia a la Personería Municipal',
        description: 'Sanción severa reservada para reincidencia o faltas de mayor envergadura.',
        isCorrect: false,
        feedback: 'Inadecuado. El condicionamiento de matrícula es una sanción para faltas graves o reincidencia persistente de faltas leves.'
      }
    ],
    correctMeasureSummary: 'Medida Formativa: Llamado de atención verbal con registro en el anecdotario del Centro y compromiso escrito de portar el carné visible permanentemente.',
    preventiveAdvice: 'El carné del SENA no es un capricho estético; es el protocolo que protege tu seguridad dentro de la sede y acredita tu póliza estudiantil contra accidentes.'
  },
  {
    id: 'case-leve-2',
    code: 'EXP-DISC-02',
    title: 'La Venta Informal de Dulces y Snacks en Aula de Informática',
    shortDescription: 'Una aprendiz organiza una tienda ambulante dentro del ambiente de formación vendiendo comestibles sobre los teclados de cómputo.',
    severity: 'leve',
    story: `En la sala de sistemas 302, la aprendiz Carolina Rivas instaló una caja plástica sobre su escritorio con chocolatinas, empanadas y bebidas gaseosas que comercializaba entre sus compañeros durante las explicaciones del instructor. Durante una sesión, un vaso con líquido se derramó sobre el teclado de un equipo de escritorio. Aunque el equipo no sufrió un cortocircuito irreversible, el instructor detuvo la sesión y le solicitó guardar los alimentos. Carolina alegó que "el SENA apoya el emprendimiento y que ella está practicando ventas".`,
    protagonist: {
      name: 'Carolina Rivas',
      program: 'Técnico en Asistencia Administrativa',
      ficha: '2698124',
      stage: 'Lectiva',
      antecedents: 'Excelente rendimiento académico en competencias previas.'
    },
    evidenceList: [
      {
        source: 'Informe del Instructor de Ambiente',
        description: 'Constancia del derrame de bebida sobre teclado institucional y la realización de actividades comerciales no autorizadas en el aula.',
        date: '28 de Marzo, 10:15 AM'
      },
      {
        source: 'Soporte de Limpieza y Mantenimiento Técnico',
        description: 'Intervención del monitor de sistemas para desarmar y secar el teclado de la terminal #14.',
        date: '28 de Marzo, 11:00 AM'
      }
    ],
    attenuatingFactors: [
      'La aprendiz limpió el teclado de inmediato y asumió su responsabilidad.',
      'Excelente récord de notas y asistencia previa.',
      'Situación socioeconómica vulnerable que la motivó a generar ingresos adicionales.'
    ],
    aggravatingFactors: [
      'Ingreso y consumo de alimentos en ambientes de cómputo donde está expresamente prohibido.',
      'Poner en riesgo material informático del Estado.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo V: De las Prohibiciones del Aprendiz SENA',
      article: 'Artículo 10, Numerales 11 y 14',
      ruleText: 'Se prohíbe comercializar productos, realizar rifas o actividades de comercio no autorizadas dentro de los ambientes de formación y Centro, así como ingresar alimentos o bebidas a salas de cómputo y laboratorios.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: '¡Exacto! Es una Falta Leve de carácter disciplinario. Aunque incumplió las normas de los ambientes de cómputo, no hubo dolo destructivo ni reincidencia formal.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: 'Incorrecto. Hubiera escalado a grave si hubiese destruido intencionalmente la máquina o si reincidiera tras múltiples advertencias previas por escrito.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: 'Incorrecto. No encaja bajo ninguna de las causales taxativas de falta gravísima del artículo 28 del Reglamento.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-2-1',
        title: 'Llamado de atención escrito con remisión a Bienestar al Aprendiz',
        description: 'Medida formativo-disciplinaria para cesar la venta en ambientes pedagógicos y canalizar su necesidad económica a través de la convocatoria oficial de Apoyos de Sostenimiento FIC o Alimentario.',
        isCorrect: true,
        feedback: '¡Excelente decisión pedagógica! Aborda la falta a la norma y a su vez conecta a la aprendiz con los subsidios reales que el SENA ofrece a estudiantes con dificultades.'
      },
      {
        id: 's-2-2',
        title: 'Decomiso de los productos y expulsión inmediata de la ficha',
        description: 'Quitarle los productos sin devolverlos y retirarla del programa.',
        isCorrect: false,
        feedback: 'Ilegal. Los instructores no tienen potestad de decomiso permanente y la expulsión viola el debido proceso.'
      },
      {
        id: 's-2-3',
        title: 'Condicionamiento de matrícula y pérdida total del trimestre',
        description: 'Sanción punitiva extrema.',
        isCorrect: false,
        feedback: 'Inadecuada. Ignora los factores atenuantes y la vocación formativa de la institución.'
      }
    ],
    correctMeasureSummary: 'Llamado de atención por escrito en hoja de vida con compromiso de no comercializar en ambientes y vinculación al programa de Bienestar del Aprendiz.',
    preventiveAdvice: 'Si tienes dificultades económicas, acude a Bienestar al Aprendiz. Existen apoyos de sostenimiento, bono alimentario y monitorías remuneradas dentro del centro.'
  },
  {
    id: 'case-leve-3',
    code: 'EXP-DISC-03',
    title: 'El Celular y los Videos en Plena Instrucción Técnica',
    shortDescription: 'Un aprendiz utiliza audífonos y observa partidos de fútbol durante la explicación teórica de seguridad eléctrica.',
    severity: 'leve',
    story: `Durante la inducción técnica sobre riesgos de arco eléctrico en el ambiente de electricidad, el instructor observó que el aprendiz Julián Castro tenía audífonos puestos y estaba viendo un partido de fútbol en su teléfono móvil. Al ser requerido para responder una pregunta de seguridad sobre desconexión de breakers, Julián no supo qué responder y respondió con evasivas burlonas hacia sus compañeros de mesa. El instructor le llamó la atención para que guardara el dispositivo, ante lo cual Julián acató de mala gana luego de que se lo repitieran tres veces.`,
    protagonist: {
      name: 'Julián Castro',
      program: 'Técnico en Instalaciones Eléctricas Residenciales',
      ficha: '2819033',
      stage: 'Lectiva',
      antecedents: 'Llamados de atención verbales previos por distracciones similares en clase.'
    },
    evidenceList: [
      {
        source: 'Reporte del Instructor de Electricidad',
        description: 'Informe sobre desatención persistente y desacato temporal a la instrucción pedagógica en tema de alto riesgo eléctrico.',
        date: '05 de Mayo, 02:30 PM'
      }
    ],
    attenuatingFactors: [
      'Finalmente guardó el celular tras la tercera advertencia.',
      'No generó agresión física ni verbal contra el docente.'
    ],
    aggravatingFactors: [
      'Reiteración de llamados de atención verbales anteriores por el mismo motivo.',
      'El tema tratado involucraba protocolos de vida o muerte en instalaciones de media tensión.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo IV: De los Deberes del Aprendiz',
      article: 'Artículo 9, Numeral 5: Participar activamente en el proceso de formación',
      ruleText: 'Cumplir con las actividades propias de su plan de aprendizaje y acatar las orientaciones impartidas por los instructores para la adquisición de competencias.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: '¡Correcto! Es una Falta Leve de carácter disciplinario y académico por distracción y falta de compromiso en el ambiente formativo.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: 'Incorrecto. Por sí sola no constituye falta grave, a menos que el uso del celular en un taller hubiese provocado un accidente eléctrico real o reincidiera formalmente tras plan de mejoramiento.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: 'Incorrecto. No cumple ninguna característica de falta gravísima.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-3-1',
        title: 'Plan de Mejoramiento Disciplinario con exposición sobre riesgos eléctricos',
        description: 'Fijar un plan de mejoramiento disciplinario donde el aprendiz elabore una infografía y exponga a su ficha los riesgos de la distracción en entornos de alta tensión.',
        isCorrect: true,
        feedback: '¡Exacto! El Plan de Mejoramiento Disciplinario transforma la conducta disruptiva en un aprendizaje constructivo y refuerza la competencia técnica de seguridad.'
      },
      {
        id: 's-3-2',
        title: 'Cancelación definitiva de la matrícula',
        description: 'Retiro del sistema formativo.',
        isCorrect: false,
        feedback: 'Totalmente improcedente para una distracción con celular.'
      },
      {
        id: 's-3-3',
        title: 'Retener el teléfono celular del aprendiz por un mes',
        description: 'Incautar el bien personal del aprendiz.',
        isCorrect: false,
        feedback: 'Ilegal. El SENA no tiene facultades para retener bienes privados de los ciudadanos.'
      }
    ],
    correctMeasureSummary: 'Plan de Mejoramiento Disciplinario enfocado en la prevención de riesgos y compromiso escrito de uso responsable de dispositivos tecnológicos.',
    preventiveAdvice: 'En talleres técnicos y laboratorios, una distracción con el celular puede causar quemaduras, atrapamientos mecánicos o descargas mortales.'
  },

  // ===================== FALTAS GRAVES =====================
  {
    id: 'case-grave-1',
    code: 'EXP-DISC-04',
    title: 'El Plagio de Software y Falsedad en Evidencia de Aprendizaje',
    shortDescription: 'Un grupo de aprendices copia íntegramente el repositorio de GitHub de una empresa internacional y lo hace pasar como su proyecto de grado.',
    severity: 'grave',
    story: `Durante la sustentación de la fase de Evaluación del proyecto formativo de software, los aprendices Kevin y Daniela presentaron un sistema ERP contable completo. Al ser interrogados sobre la arquitectura del backend y las rutas API, mostraron absoluto desconocimiento. El instructor evaluador realizó un análisis del código fuente encontrando que el 98% del código correspondía a un repositorio público con licencia privativa en GitHub, conservando incluso los nombres de los autores originales en las cabeceras de los archivos de configuración. Los aprendices habían borrado únicamente el README original para colocar los logos del SENA y sus propios nombres como autores exclusivos.`,
    protagonist: {
      name: 'Kevin Pardo y Daniela Mora',
      program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      ficha: '2618902',
      stage: 'Lectiva',
      antecedents: 'Buen historial disciplinario pero entregas tardías en evidencias de programación.'
    },
    evidenceList: [
      {
        source: 'Reporte Técnico de Auditoría de Código (Git & Turnitin)',
        description: 'Dictamen pericial del instructor mostrando un 98.4% de coincidencia exacta con el repositorio open-source ajeno sin ninguna cita.',
        date: '10 de Noviembre, 11:30 AM'
      },
      {
        source: 'Evidencia entregada en la plataforma Zajuna',
        description: 'Documento PDF firmado por los dos aprendices donde declaraban bajo juramento que el código era de su autoría original.',
        date: '08 de Noviembre, 11:59 PM'
      }
    ],
    attenuatingFactors: [
      'Ambos aprendices aceptaron la copia durante la sesión de descargos y pidieron disculpas a la ficha.'
    ],
    aggravatingFactors: [
      'Dolo y premeditación manifiesta al alterar los nombres de autoría en el encabezado del proyecto.',
      'Sustentación formal ante jurados presentando trabajo ajeno como propio para aprobar el trimestre.',
      'Violación de derechos de autor y propiedad intelectual protegida por la ley colombiana.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo V: De las Prohibiciones del Aprendiz SENA',
      article: 'Artículo 10, Numeral 3: Plagio y Fraude Académico',
      ruleText: 'Plagiar o cometer fraude en cualquier actividad, evaluación o evidencia de aprendizaje, así como suministrar información falsa o documentos alterados a la entidad.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: 'Incorrecto. El fraude deliberado y el plagio de una evidencia troncal de proyecto formativo nunca es leve; atenta contra la honestidad académica y la ética profesional.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: '¡Correcto! El fraude académico y plagio sistemático en proyectos formativos constituye una Falta Grave en el Reglamento del Aprendiz SENA.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: 'Incorrecto. Aunque es sumamente reprochable, el plagio académico sin falsificación de títulos notariales o sellos de la República no encuadra como falta gravísima según el catálogo del Art. 28.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-4-1',
        title: 'Juicio Evaluativo "D", Condicionamiento de Matrícula y Plan de Mejoramiento con nuevo proyecto',
        description: 'Reprobar la competencia técnica (D), fijar sanción de Condicionamiento de Matrícula registrada en hoja de vida y obligar al desarrollo de un nuevo proyecto desde cero.',
        isCorrect: true,
        feedback: '¡Decisión jurídica y pedagógica perfecta! El condicionamiento de matrícula sanciona la gravedad de la falta ética, mientras que el plan de mejoramiento con un nuevo proyecto los obliga a demostrar competencias reales.'
      },
      {
        id: 's-4-2',
        title: 'Calificar con "A" porque supieron encontrar el código en internet',
        description: 'Premiar la astucia para buscar en la web.',
        isCorrect: false,
        feedback: 'Inaceptable. El SENA certifica idoneidad técnica real, no fraude ni apropiación ilegítima.'
      },
      {
        id: 's-4-3',
        title: 'Denuncia penal ante la Fiscalía y cancelación inmediata',
        description: 'Vía penal directa sin agotar el trámite disciplinario institucional.',
        isCorrect: false,
        feedback: 'Inadecuado como primera medida administrativa en el Centro de Formación antes de la recomendación del Comité.'
      }
    ],
    correctMeasureSummary: 'Sanción de Condicionamiento de Matrícula con registro en SofiaPlus, juicio evaluativo "D" y Plan de Mejoramiento Académico bajo supervisión rigurosa.',
    preventiveAdvice: 'En el SENA puedes apoyarte en librerías open source, pero siempre debes citar las fuentes según normas técnicas e implementar tu propia lógica de negocio.'
  },
  {
    id: 'case-grave-2',
    code: 'EXP-DISC-05',
    title: 'Operación de Torno Mecánico sin EPP y Sabotaje de Seguridad',
    shortDescription: 'Un aprendiz desactiva el sensor de parada de emergencia de un torno para trabajar más rápido y sufre un desgarro en su ropa.',
    severity: 'grave',
    story: `En el taller de Mecánica Industrial, el aprendiz Santiago Vélez ingresó sin sus gafas de seguridad, con reloj metálico y pulseras, y con la bata de taller desabrochada. Adicionalmente, para evitar que la máquina se apagara automáticamente al abrir la guarda protectora de acrílico, colocó un trozo de alambre que trababa el microrruptor de seguridad del torno CNC. Cuando el torno giraba a 1.200 RPM, la manga holgada de su bata rozó el husillo y fue atrapada. Afortunadamente, un compañero activó el hongo de parada general, resultando únicamente en el desgarro completo de la camisa del aprendiz y laceraciones leves en el brazo.`,
    protagonist: {
      name: 'Santiago Vélez',
      program: 'Tecnólogo en Mantenimiento Mecánico Industrial',
      ficha: '2598341',
      stage: 'Lectiva',
      antecedents: 'Había recibido inducción explícita de Seguridad y Salud en el Trabajo (SST) con firma de compromiso de uso de EPP.'
    },
    evidenceList: [
      {
        source: 'Acta de Inspección de Seguridad Industrial (SST)',
        description: 'Fotografía del alambre colocado para vulnerar el sistema de seguridad interlock del torno y reporte del casi accidente fatal.',
        date: '19 de Junio, 03:20 PM'
      },
      {
        source: 'Testimonio firmado por el instructor y compañeros de taller',
        description: 'Declaración que confirma que el aprendiz conocía la prohibición de usar joyas y prendas holgadas cerca de ejes giratorios.',
        date: '19 de Junio, 04:00 PM'
      }
    ],
    attenuatingFactors: [
      'Reconoció la imprudencia y el peligro al que expuso su vida.'
    ],
    aggravatingFactors: [
      'Sabotaje intencional de un dispositivo de parada de emergencia de una máquina industrial.',
      'Incumplimiento deliberado de los protocolos de Seguridad y Salud en el Trabajo.',
      'Riesgo inminente de mutilación o muerte propia y de terceros en el taller.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo IV y V: Deberes y Prohibiciones en Seguridad y Salud',
      article: 'Artículo 9 Numeral 8 y Artículo 10 Numeral 8',
      ruleText: 'Es deber cumplir estrictamente las normas de seguridad industrial y usar los EPP. Se prohíbe manipular o alterar sistemas de protección, maquinaria o instalaciones eléctricas sin autorización o violando protocolos.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: 'Incorrecto. Manipular un sistema de seguridad y operar maquinaria rotativa arriesgando la vida humana jamás es una falta leve.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: '¡Correcto! Es una Falta Grave disciplinaria por atentar directamente contra la seguridad industrial, la integridad física y la infraestructura técnica del centro.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: 'Incorrecto. No constituye falta gravísima dado que no hubo dolo de lesionar a otros, no hubo armas, ni delito penal tipificado como tal.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-5-1',
        title: 'Condicionamiento de Matrícula y suspensión de ingreso a talleres hasta recertificar SST',
        description: 'Imposición de Condicionamiento de Matrícula formal, retiro temporal del ambiente de máquinas-herramientas y obligación de cursar y aprobar módulo intensivo de Seguridad en el Trabajo.',
        isCorrect: true,
        feedback: '¡Excelente decisión del Comité! Garantiza la seguridad de todos los aprendices, sanciona con severidad la vulneración del equipo y exige remediación técnica comprobada antes de volver a tocar una máquina.'
      },
      {
        id: 's-5-2',
        title: 'Cobrarle el valor de una camisa nueva',
        description: 'Limitarse a compensar la ropa rota.',
        isCorrect: false,
        feedback: 'Absurdo. El peligro no fue la prenda sino la vida humana y la alteración deliberada de los dispositivos de parada de seguridad.'
      },
      {
        id: 's-5-3',
        title: 'Un simple llamado de atención verbal amistoso',
        description: 'Dejar pasar el incidente sin registro formal.',
        isCorrect: false,
        feedback: 'Peligroso e irresponsable. Permitiría que la conducta se repita con consecuencias fatales.'
      }
    ],
    correctMeasureSummary: 'Sanción de Condicionamiento de Matrícula por falta grave contra la seguridad industrial y plan de recertificación obligatoria en protocolos de máquinas y EPP.',
    preventiveAdvice: 'Las normas de SST en el SENA están escritas con lecciones aprendidas de accidentes reales. Los sistemas de seguridad de las máquinas salvan vidas; jamás los desactives.'
  },
  {
    id: 'case-grave-3',
    code: 'EXP-DISC-06',
    title: 'Abandono Injustificado del Puesto en Etapa Productiva',
    shortDescription: 'Un aprendiz con contrato de aprendizaje deja de asistir a la empresa patrocinadora sin avisar ni radicar novedad ante el SENA.',
    severity: 'grave',
    story: `El aprendiz Camilo Torres inició su Etapa Productiva mediante Contrato de Aprendizaje con una reconocida empresa de logística. Tras cumplir dos meses de labores satisfactorias, dejó de presentarse a la compañía a partir del día lunes. La empresa intentó contactarlo telefónicamente y por correo sin éxito. Cumplidos 5 días hábiles de ausencia injustificada, el departamento de Gestión Humana de la empresa radicó una queja formal ante la Coordinación de Relaciones Corporativas del SENA solicitando la terminación unilateral del contrato por incumplimiento grave de las obligaciones del aprendiz y reportando el caso al Comité de Evaluación.`,
    protagonist: {
      name: 'Camilo Torres',
      program: 'Tecnólogo en Gestión Logística',
      ficha: '2541209',
      stage: 'Productiva',
      antecedents: 'Culminó la etapa lectiva con todas las competencias aprobadas en tiempo récord.'
    },
    evidenceList: [
      {
        source: 'Oficio de la Empresa Patrocinadora',
        description: 'Comunicación oficial donde se reportan 5 días continuos de abandono del puesto de trabajo sin soporte médico ni aviso previo.',
        date: '12 de Agosto'
      },
      {
        source: 'Control Biométrico de la Empresa',
        description: 'Registros de entrada que demuestran la inasistencia a partir del 5 de Agosto.',
        date: '12 de Agosto'
      }
    ],
    attenuatingFactors: [
      'Al ser citado a descargos, Camilo manifestó que le ofrecieron otro trabajo informal y no sabía cómo renunciar formalmente.'
    ],
    aggravatingFactors: [
      'Afectó el cupo de aprendizaje regulado por ley y la relación institucional entre el SENA y el sector empresarial.',
      'No se comunicó con el instructor de seguimiento de etapa productiva para solicitar orientación antes de abandonar.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo IV: Deberes del Aprendiz en Etapa Productiva',
      article: 'Artículo 9 Numeral 12 & Régimen de Contrato de Aprendizaje (Ley 789 de 2002)',
      ruleText: 'Cumplir con los horarios, directrices y responsabilidades pactadas en el contrato de aprendizaje o modalidad de etapa productiva, manteniendo comunicación constante con el Centro de Formación.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: 'Incorrecto. El abandono de un contrato de aprendizaje patrocinado causa graves perjuicios jurídicos y no puede catalogarse como leve.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: '¡Correcto! El incumplimiento grave e injustificado de las obligaciones pactadas en la Etapa Productiva se clasifica como Falta Grave que compromete la culminación del programa.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: 'Incorrecto. No encuadra como gravísima al no haber delito, violencia física ni afectación de bienes públicos del Estado.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-6-1',
        title: 'Cancelación de la Matrícula o Condicionamiento con cambio forzoso de modalidad productiva',
        description: 'Terminación justificada del contrato por la empresa, pérdida del derecho a nuevo contrato de aprendizaje y condicionamiento de matrícula debiendo culminar por Proyecto Productivo propio.',
        isCorrect: true,
        feedback: '¡Exacto! El aprendiz pierde el beneficio del patrocinio empresarial por incumplimiento y, de no cancelársele la matrícula por consideraciones atenuantes, queda condicionado a terminar por una modalidad alternativa que no involucre contrato.'
      },
      {
        id: 's-6-2',
        title: 'Obligar a la empresa a pagarle una indemnización al aprendiz',
        description: 'Sancionar a la empresa contratante.',
        isCorrect: false,
        feedback: 'Ilegal. Fue el aprendiz quien incumplió sus deberes laborales y contractuales sin causa justificada.'
      },
      {
        id: 's-6-3',
        title: 'Asignarle una nueva empresa inmediatamente con mejor sueldo',
        description: 'Premiar el abandono contractual.',
        isCorrect: false,
        feedback: 'Contrario a la ley y al reglamento. Quien da por terminado culpablemente un contrato de aprendizaje pierde la opción de ser patrocinado nuevamente.'
      }
    ],
    correctMeasureSummary: 'Cancelación del registro de contrato con la empresa, sanción disciplinaria y condicionamiento con opción de única oportunidad de Proyecto Productivo.',
    preventiveAdvice: 'Si tienes problemas en tu empresa de práctica, NUNCA abandones sin hablar antes con tu instructor de seguimiento de etapa productiva. Te guiarán en el trámite legal.'
  },

  // ===================== FALTAS GRAVÍSIMAS =====================
  {
    id: 'case-gravisima-1',
    code: 'EXP-DISC-07',
    title: 'Consumo y Porte de Estupefacientes en Instalaciones del Centro',
    shortDescription: 'Dos aprendices son sorprendidos portando y consumiendo marihuana en los baños del bloque agroindustrial del Centro de Formación.',
    severity: 'gravisima',
    story: `Durante una ronda de inspección de rutina en el Bloque C, el docente de turno y el supervisor de seguridad detectaron un fuerte olor a humo proveniente de los baños estudiantiles. Al ingresar, sorprendieron a los aprendices Brayan y Nelson manipulando un paquete con sustancias psicoactivas (marihuana dosificada) e inhalando con una pipa artesanal. Al verse descubiertos, intentaron arrojar la sustancia al inodoro. El personal de vigilancia procedió a aplicar el protocolo institucional con acompañamiento de la Policía de Infancia y Adolescencia / Cuadrante local para el pesaje de la sustancia y la elaboración del acta respectiva.`,
    protagonist: {
      name: 'Brayan S. y Nelson R.',
      program: 'Técnico en Producción Agropecuaria',
      ficha: '2701844',
      stage: 'Lectiva',
      antecedents: 'Uno de los aprendices tenía un llamado de atención por faltar a formación sin justificación.'
    },
    evidenceList: [
      {
        source: 'Acta de Policía Nacional y Cuadrante de Vigilancia',
        description: 'Incautación de 45 gramos de sustancia vegetal estupefaciente y elementos para su consumo en flagrancia dentro del baño del bloque C.',
        date: '02 de Septiembre, 03:45 PM'
      },
      {
        source: 'Informe suscrito por el Coordinador Misional y Vigilante',
        description: 'Relato detallado de la flagrancia y el intento de deshacerse de las pruebas.',
        date: '02 de Septiembre, 04:30 PM'
      }
    ],
    attenuatingFactors: [
      'Manifestaron voluntad de ingresar a programas de apoyo psicológico y rehabilitación de adicciones en su EPS.'
    ],
    aggravatingFactors: [
      'Comisión de la conducta en flagrancia dentro de un establecimiento educativo público.',
      'Porte y consumo de sustancias prohibidas por la ley nacional en entornos escolares.',
      'Poner en riesgo la convivencia y el ambiente seguro para menores de edad presentes en el centro.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo V y VIII: Prohibiciones y Faltas Gravísimas',
      article: 'Artículo 10 Numeral 1 & Artículo 28 Numeral 1',
      ruleText: 'Constituye falta gravísima portar, suministrar, traficar o consumir bebidas alcohólicas o sustancias psicoactivas o psicotrópicas dentro de las instalaciones del SENA o presentarse a las actividades bajo su efecto.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: 'Incorrecto. El consumo o porte de drogas en un centro educativo es considerado por el reglamento y la ley colombiana como una falta de máxima severidad.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: 'Incorrecto. Aunque es grave en el sentido común, la clasificación técnica del artículo 28 del Reglamento la tipifica explícitamente como FALTA GRAVÍSIMA.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: '¡Correcto! El porte, consumo o distribución de sustancias estupefacientes dentro de las instalaciones del SENA está taxativamente catalogado como FALTA GRAVÍSIMA.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-7-1',
        title: 'Cancelación Definitiva de la Matrícula e Inhabilidad para ingresar al SENA por dos (2) años',
        description: 'Máxima sanción disciplinaria establecida en el reglamento, con desvinculación formal y bloqueo nacional en SofiaPlus, más orientación hacia rutas de salud pública.',
        isCorrect: true,
        feedback: '¡Decisión ajustada al Reglamento del Aprendiz! Las faltas gravísimas consumadas en flagrancia ameritan la Cancelación de Matrícula y la máxima sanción de inhabilidad de 2 años.'
      },
      {
        id: 's-7-2',
        title: 'Pedirles que barran el patio durante una semana',
        description: 'Trabajo social sin trámite disciplinario.',
        isCorrect: false,
        feedback: 'Ilegal. Una falta gravísima no puede subsanarse con medidas menores informales.'
      },
      {
        id: 's-7-3',
        title: 'Un llamado de atención verbal privado sin registrar en la hoja de vida',
        description: 'Ocultar el hecho a las directivas del centro.',
        isCorrect: false,
        feedback: 'Violatorio de los deberes de los funcionarios públicos y del reglamento institucional.'
      }
    ],
    correctMeasureSummary: 'Cancelación Definitiva de Matrícula con Inhabilidad por dos (2) años para participar en convocatorias del SENA y remisión preventiva a servicios de salud.',
    preventiveAdvice: 'Las sedes del SENA son territorios de paz y libres de drogas y alcohol. Vulnerar esta regla destruye tu futuro profesional y cierra las puertas de la institución en todo el país.'
  },
  {
    id: 'case-gravisima-2',
    code: 'EXP-DISC-08',
    title: 'Alteración de la Base de Datos y Calificaciones en SofiaPlus',
    shortDescription: 'Un aprendiz utiliza credenciales indebidas para modificar juicios evaluativos de "D" a "A" y cobrar dinero a sus compañeros de curso.',
    severity: 'gravisima',
    story: `A través de una auditoría aleatoria de seguridad de la Dirección General de Sistemas, se descubrieron discrepancias entre las planillas físicas de evaluación de un instructor y los registros asentados en SofiaPlus. Las pesquisas técnicas revelaron que desde la dirección IP de la residencia del aprendiz Andrés Mora se realizaron 14 modificaciones indebidas de juicios evaluativos pasando de Deficiente (D) a Aprobado (A) para 6 aprendices distintos. Andrés había aprovechado que un instructor dejó abierta su sesión en un computador del centro para clonar tokens de acceso. Además, testimonios de aprendices confirmaron que Andrés cobraba $50.000 pesos colombianos por cada RAP modificado en el sistema.`,
    protagonist: {
      name: 'Andrés Mora',
      program: 'Tecnólogo en Gestión de Redes de Datos',
      ficha: '2647189',
      stage: 'Lectiva',
      antecedents: 'Destacadas habilidades técnicas en informática y redes.'
    },
    evidenceList: [
      {
        source: 'Informe Forense de Seguridad de la Información SENA',
        description: 'Trazas de auditoría de base de datos, logs de SofiaPlus, dirección IP del proveedor domiciliario y captura de paquetes con acceso no autorizado.',
        date: '22 de Octubre'
      },
      {
        source: 'Declaraciones de Aprendices Afectados',
        description: 'Capturas de transferencias por Nequi/Daviplata y chats de WhatsApp donde se coordinaba la alteración ilícita de calificaciones a cambio de dinero.',
        date: '23 de Octubre'
      }
    ],
    attenuatingFactors: [
      'Ninguno aplicable debido a la gravedad de los hechos.'
    ],
    aggravatingFactors: [
      'Premeditación, dolo manifiesto y aprovechamiento indebido de conocimientos técnicos.',
      'Cobro de dinero ilícito (lucro indebido) defraudando la fe pública del Estado.',
      'Vulneración de sistemas informáticos oficiales clasificada como delito informático en la Ley 1273 de 2009.',
      'Afectación al historial académico de múltiples estudiantes.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo VIII: De las Faltas Gravísimas y Delitos',
      article: 'Artículo 28, Numerales 4 y 7: Falsedad y Ataque a la Información',
      ruleText: 'Falsificar, adulterar, sustraer o destruir documentos oficiales del SENA, firmas, juicios evaluativos o bases de datos institucionales, así como cometer delitos tipificados en el Código Penal colombiano dentro de la entidad.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: 'Totalmente incorrecto. Se trata de un delito informático y falsificación de documento público del Estado.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: 'Incorrecto. La alteración de notas en la base de datos oficial y el cobro ilícito supera con creces el límite de las faltas graves.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: '¡Correcto! La alteración de registros en SofiaPlus y la falsificación de calificaciones es una FALTA GRAVÍSIMA de máxima gravedad institucional y penal.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-8-1',
        title: 'Cancelación Inmediata de Matrícula, Inhabilidad por 2 años y Denuncia Penal ante la Fiscalía General de la Nación',
        description: 'Expulsión definitiva, bloqueo nacional en la plataforma SENA por el término máximo y traslado de pruebas a la Fiscalía por delitos informáticos (Ley 1273 de 2009).',
        isCorrect: true,
        feedback: '¡Resolución correcta del Comité y Subdirección! Al tratarse de un delito contra los sistemas de información pública y la fe del Estado, la entidad tiene la obligación legal de denunciar penalmente además de cancelar la matrícula.'
      },
      {
        id: 's-8-2',
        title: 'Pedirle que devuelva la plata a los compañeros y dejarlo continuar',
        description: 'Acuerdo económico interno sin sanción en el sistema.',
        isCorrect: false,
        feedback: 'Totalmente ilegal e insostenible jurídicamente.'
      },
      {
        id: 's-8-3',
        title: 'Plan de mejoramiento en el área de ética',
        description: 'Tratar el delito como un error de aprendizaje común.',
        isCorrect: false,
        feedback: 'Inadecuado. Viola el principio de legalidad y encubriría un delito formal.'
      }
    ],
    correctMeasureSummary: 'Cancelación definitiva de matrícula con la máxima inhabilidad institucional y compulsa de copias a la Fiscalía General de la Nación.',
    preventiveAdvice: 'Las bases de datos del SENA tienen trazabilidad forense permanente. Alterar registros es un delito federal sancionado con penas de prisión por la justicia ordinaria.'
  },
  {
    id: 'case-gravisima-3',
    code: 'EXP-DISC-09',
    title: 'Porte de Arma Blanca y Agresión Física en Zona Común',
    shortDescription: 'Una riña violenta en la cancha deportiva termina con agresiones físicas y la exhibición de un cuchillo corto-punzante.',
    severity: 'gravisima',
    story: `Durante el receso del mediodía en la cancha polideportiva del Centro, surgió una disputa verbal entre dos aprendices por el resultado de un partido de microfútbol. En medio de los insultos, el aprendiz Edwin Marín sacó de su morral una navaja con hoja de 10 centímetros, lanzando una estocada que cortó el antebrazo de su contrincante y amenazó de muerte a quienes intentaron intervenir. Instructores de educación física y personal de seguridad intervinieron oportunamente reduciendo al agresor con apoyo del cuadrante policial, mientras el aprendiz herido fue trasladado de urgencia en ambulancia a un centro asistencial.`,
    protagonist: {
      name: 'Edwin Marín',
      program: 'Técnico en Carpintería y Maderas',
      ficha: '2719801',
      stage: 'Lectiva',
      antecedents: 'Había sido sancionado previamente con un llamado de atención por altercados verbales en el cafetín.'
    },
    evidenceList: [
      {
        source: 'Dictamen de Medicina Legal y Epicrisis de Urgencias',
        description: 'Herida cortante de 6 cm en antebrazo izquierdo con incapacidad médico-legal de 18 días.',
        date: '04 de Octubre'
      },
      {
        source: 'Incautación de Arma y Video de Seguridad',
        description: 'Acta de entrega del arma blanca a la Policía Nacional y grabación donde se aprecia la agresión premeditada.',
        date: '04 de Octubre, 01:15 PM'
      }
    ],
    attenuatingFactors: [
      'Ninguno identificable.'
    ],
    aggravatingFactors: [
      'Porte no autorizado de arma cortopunzante en un centro educativo.',
      'Causación de lesiones personales a un miembro de la comunidad educativa.',
      'Reincidencia en conductas violentas previas.',
      'Generación de pánico colectivo entre aprendices e instructores.'
    ],
    applicableRegulation: {
      chapter: 'Capítulo V y VIII: De las Faltas Gravísimas que Atentan contra la Integridad',
      article: 'Artículo 10 Numeral 4 & Artículo 28 Numeral 3',
      ruleText: 'Constituye falta gravísima portar armas de fuego, blancas, punzantes o artefactos explosivos en las instalaciones del SENA, así como agredir física o verbalmente a cualquier integrante de la comunidad educativa.'
    },
    severityOptions: [
      {
        value: 'leve',
        label: 'Falta Leve',
        feedback: 'Inaceptable. El porte de armas y las agresiones físicas jamás pueden considerarse faltas leves.'
      },
      {
        value: 'grave',
        label: 'Falta Grave',
        feedback: 'Incorrecto. Atentar contra la vida o integridad con arma blanca es la más clara manifestación de Falta Gravísima en cualquier reglamento estudiantil.'
      },
      {
        value: 'gravisima',
        label: 'Falta Gravísima',
        feedback: '¡Correcto! El porte de armas y la agresión física violenta constituyen una FALTA GRAVÍSIMA de manera indiscutible.'
      }
    ],
    sanctionOptions: [
      {
        id: 's-9-1',
        title: 'Cancelación Inmediata de la Matrícula, Inhabilidad de 2 años y Puesta a Disposición Judicial',
        description: 'Cancelación definitiva de la matrícula con anotación en el registro nacional de sanciones del SENA y entrega del caso a la justicia penal por lesiones personales.',
        isCorrect: true,
        feedback: '¡Completamente de acuerdo! La protección de la vida es el bien jurídico supremo. La sanción máxima es la única aplicable conforme al reglamento.'
      },
      {
        id: 's-9-2',
        title: 'Suspenderlo del equipo de microfútbol por un mes',
        description: 'Medida deportiva superficial.',
        isCorrect: false,
        feedback: 'Totalmente descabellado ante un acto criminal con arma blanca.'
      },
      {
        id: 's-9-3',
        title: 'Pedir disculpas públicas en el izamiento de bandera',
        description: 'Acto simbólico sin consecuencias disciplinarias.',
        isCorrect: false,
        feedback: 'Contrario al debido proceso y peligroso para la seguridad comunitaria.'
      }
    ],
    correctMeasureSummary: 'Cancelación Definitiva de Matrícula, máxima inhabilidad nacional de dos (2) años y trámite ante las autoridades judiciales.',
    preventiveAdvice: 'El SENA promueve la resolución pacífica de conflictos y la mediación comunitaria a través del equipo de Bienestar. Ninguna diferencia justifica la violencia.'
  }
];
