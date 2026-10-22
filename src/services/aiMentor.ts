import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Comprehensive local knowledge base updated to Reglamento 2024 and Acuerdo Complementario 2026
const SENA_KNOWLEDGE_BASE: Array<{ keywords: string[]; answer: string; articles: string }> = [
  {
    keywords: ['falta', '3 dias', 'inasistencia', 'desercion', 'faltar', 'ausencia', 'medica', 'excusa'],
    answer: `¡Atención con las inasistencias en el SENA 2024-2026! Si faltas durante tres (3) días consecutivos sin causa justificada en formación presencial (o 3 semanas consecutivas en entornos virtuales Zajuna sin reportar evidencias), se inicia de inmediato el proceso de presunta **DESERCIÓN**. 
    
El procedimiento formal vigente es:
1. El instructor reporta la inasistencia en SofiaPlus / Zajuna.
2. La Coordinación Académica te notifica a tu correo institucional para que justifiques en un plazo perentorio de cinco (5) días hábiles.
3. Si no aportas soporte legal (incapacidad médica EPS o fuerza mayor comprobable), el Subdirector de Centro expide el acto administrativo de **Cancelación de Matrícula** e imposición de **inhabilidad de 6 meses a 2 años** a nivel nacional.
    
**Consejo clave:** Tienes máximo 3 días hábiles tras tu ausencia para radicar la justificación médica. ¡Comunícate siempre a tiempo con tu instructor y vocero de ficha!`,
    articles: 'Reglamento del Aprendiz SENA 2024 (Acuerdo Complementario 2026), Régimen de Inasistencias y Deserción.'
  },
  {
    keywords: ['ia', 'inteligencia artificial', 'chatgpt', 'gemini', 'plagio', 'copia', 'fraude', 'prompts'],
    answer: `El **Acuerdo Complementario de 2026** regula de forma expresa el uso de **Inteligencia Artificial (IA)** en el SENA:
• **Uso permitido y formativo:** Puedes utilizar herramientas de IA para consulta bibliográfica, lluvia de ideas, corrección ortográfica o exploración de conceptos.
• **Obligación de transparencia:** Siempre debes declarar en tus evidencias el uso de herramientas de IA, citar los prompts utilizados y referenciar las fuentes.
• **Prohibición estricta (Falta Grave):** Presentar código, proyectos, informes o respuestas generadas 100% por IA haciéndolas pasar como de tu autoría intelectual propia se califica como **Fraude y Plagio Académico**. Implica juicio evaluativo **"D" (No Aprobado)**, citación al Comité y posible condicionamiento de matrícula.`,
    articles: 'Acuerdo Complementario de 2026: Lineamientos sobre Uso Ético y Responsable de Tecnologías Emergentes e Inteligencia Artificial en la FPI.'
  },
  {
    keywords: ['etapa productiva', 'contrato de aprendizaje', 'practicas', 'pasantia', 'empresa', 'patrocinio', 'plazo productiva', 'remoto', 'teletrabajo'],
    answer: `La Etapa Productiva consolida tus competencias en el sector real. Según las disposiciones 2024-2026, dispones de **hasta dos (2) años** tras terminar tu etapa lectiva para certificarla.

Modalidades autorizadas vigentes:
1. **Contrato de Aprendizaje (Presencial o Híbrido/Remoto):** Patrocinio empresarial con apoyo de sostenimiento y afiliación obligatoria a EPS y ARL.
2. **Proyecto Productivo (Sennova / Fondo Emprender):** Formulación de proyectos de investigación aplicada, innovación o creación de empresas.
3. **Pasantía Formativa o Vinculación Laboral:** Desempeño en organizaciones públicas o privadas con funciones directamente coherentes con tu perfil de egreso.
4. **Monitorías Institucionales:** Apoyo técnico-pedagógico remunerado o formativo dentro de los ambientes del SENA.`,
    articles: 'Reglamento del Aprendiz Versión 2024 y Acuerdos de Modernización Productiva 2026.'
  },
  {
    keywords: ['celular', 'telefono', 'musica', 'audifonos', 'taller', 'maquinas', 'seguridad', 'epp'],
    answer: `El uso de dispositivos móviles y elementos personales bajo la norma 2024-2026:
• En ambientes de clase magistral: Solo se permite con fines netamente pedagógicos orientados por el instructor. El uso recreativo injustificado es **Falta Leve**.
• En talleres, laboratorios o ambientes con maquinaria rotativa/pesada: Está **estrictamente prohibido** el uso de celular o audífonos por normas de Seguridad y Salud en el Trabajo (SST). Una distracción atenta contra tu vida o la de tus compañeros y se sanciona como **Falta Grave**.`,
    articles: 'Reglamento del Aprendiz 2024, Deberes de Seguridad Industrial y Salud Ocupacional.'
  },
  {
    keywords: ['carne', 'carnet', 'identificacion', 'puerta', 'porteria', 'ingreso', 'digital'],
    answer: `El carné institucional del SENA (físico o digital en la App SENA):
• Es un **DEBER permanente** portarlo visible en el pecho en todas las sedes del país.
• Te identifica ante el personal de seguridad, habilita el acceso a talleres, laboratorios, biblioteca y acredita tu póliza médica estudiantil contra accidentes escolares.
• Renuencia a identificarse o no portarlo en lugar visible se tipifica como **Falta Leve** sujeta a llamado de atención formativo.`,
    articles: 'Reglamento del Aprendiz 2024 con Acuerdo Complementario 2026, Deberes del Aprendiz.'
  },
  {
    keywords: ['aplazamiento', 'retirarme', 'traslado', 'reingreso', 'novedades', 'suspender'],
    answer: `Si requieres pausar o modificar tu formación bajo el marco 2024-2026:
1. **Aplazamiento:** Puedes solicitarlo a través de SofiaPlus / Zajuna hasta por un máximo de seis (6) meses justificando servicio militar, incapacidad médica prolongada o fuerza mayor demostrable.
2. **Traslado:** Puedes pedir cambio de jornada, grupo o Centro de Formación si existe cupo disponible en el mismo programa técnico/tecnológico.
3. **Retiro Voluntario:** Si no puedes continuar, radícalo oportunamente por el sistema oficial. Te exime de sanciones y te permite postularte nuevamente en siguientes convocatorias.
    
*¡Nunca abandones sin radicar el retiro voluntario formal! Si dejas de asistir sin justificar, se declarará Deserción con inhabilidad nacional de hasta 2 años.*`,
    articles: 'Reglamento del Aprendiz 2024, Capítulo de Trámites y Novedades.'
  },
  {
    keywords: ['droga', 'marihuana', 'alcohol', 'vapear', 'armas', 'pelea', 'agresion', 'gravisima', 'acoso', 'genero'],
    answer: `Bajo el Reglamento 2024 y el Acuerdo Complementario de 2026, las siguientes conductas son **FALTAS GRAVÍSIMAS**:
1. Portar, consumir, suministrar o ingresar bajo el efecto de sustancias psicoactivas, estupefacientes o alcohol a cualquier sede del SENA o actividad institucional.
2. Portar armas de fuego, blancas, punzantes o artefactos explosivos.
3. Violencia física, agresiones graves o actos de acoso sexual / discriminación de género (Protocolo de No Violencias 2024-2026).
4. Falsificación de notas en SofiaPlus, certificados o títulos institucionales.
    
*Consecuencia:* **Cancelación Inmediata de Matrícula e Inhabilidad de hasta 2 años**, más compulsa de copias a las autoridades judiciales (Fiscalía / Policía Nacional).`,
    articles: 'Reglamento del Aprendiz Versión 2024 y Acuerdo Complementario 2026, Catálogo de Faltas Gravísimas.'
  },
  {
    keywords: ['debido proceso', 'comite', 'descargos', 'defensa', 'reposicion', 'vocero'],
    answer: `El Comité de Evaluación y Seguimiento garantiza de forma irrestricta tu **Debido Proceso** (Art. 29 de la Constitución y Reglamento 2024):
1. **Citación formal previa:** Con mínimo tres (3) días hábiles de anticipación a tu correo institucional, indicando las pruebas y cargos imputados.
2. **Audiencia de descargos:** Derecho a ser escuchado libremente, aportar pruebas a tu favor y estar acompañado de tu Vocero de Ficha (y acudiente legal si eres menor de edad).
3. **Medidas proporcionales:** El Comité prioriza medidas formativas pedagógicas y planes de mejoramiento antes de sugerir sanciones extremas.
4. **Recurso de Reposición:** Si se expide una resolución sancionatoria del Subdirector con la que estés en desacuerdo, tienes diez (10) días hábiles para radicar el recurso formal de apelación y revisión.`,
    articles: 'Reglamento del Aprendiz SENA 2024 con Acuerdo Complementario 2026, Procedimiento Disciplinario.'
  }
];

export async function askSenaAiMentor(userQuery: string, history: ChatMessage[] = []): Promise<string> {
  const normalizedQuery = userQuery.toLowerCase().trim();

  // Try Gemini API first if configured
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
                 (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GEMINI_API_KEY) ||
                 '';

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Eres "Mentor SENA", el asesor oficial de inducción y régimen disciplinario del Servicio Nacional de Aprendizaje (SENA) en Colombia.
Tu misión es orientar con empatía, claridad pedagógica y rigor legal a los nuevos aprendices técnicos y tecnólogos.
Basa tus respuestas en el Reglamento del Aprendiz SENA Versión 2024 con su Acuerdo Complementario de 2026, el Estatuto de la Formación Profesional Integral (FPI), y los principios de modernización tecnológica e inclusión.
Distingue con claridad entre faltas leves, graves y gravísimas. Explica el uso ético y transparente de la Inteligencia Artificial (IA) en evidencias de aprendizaje, el debido proceso, los trámites en SofiaPlus/Zajuna y las modalidades de etapa productiva presenciales y remotas.
Responde en español colombiano formal pero muy cercano, usando negritas y viñetas para que sea muy fácil de leer. Siempre resalta la vocación formativa y preventiva del SENA.`;

      const contents = [
        ...history.slice(-4).map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: userQuery }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.4,
          maxOutputTokens: 600,
        }
      });

      if (response.text) {
        return response.text;
      }
    } catch {
      // Fallback to local expert knowledge base
    }
  }

  // Fallback to rich Colombian SENA knowledge engine
  let bestMatch = null;
  let maxScore = 0;

  for (const item of SENA_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (normalizedQuery.includes(kw)) {
        score += 2;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    return `${bestMatch.answer}\n\n📌 **Fundamento Legal:** ${bestMatch.articles}`;
  }

  // Default helpful guidance if no specific keyword matched
  return `¡Hola, aprendiz! Como tu Asesor del Reglamento del SENA, estoy aquí para guiarte en tu proceso de inducción y vida en el Centro de Formación.

Sobre tu consulta: Todo el régimen de derechos, deberes, prohibiciones y sanciones se fundamenta en el **Reglamento del Aprendiz SENA (Versión 2024 con su Acuerdo Complementario de 2026)**. La institución busca primordialmente tu formación profesional integral ciudadana y técnica.

Puedes preguntarme sobre:
• ¿Cómo está regulado el uso de Inteligencia Artificial (IA) en las evidencias de aprendizaje (Acuerdo 2026)?
• ¿Qué sucede si falto 3 días seguidos? (Deserción)
• ¿Cómo solicitar un aplazamiento o retiro voluntario en SofiaPlus?
• ¿Qué diferencia hay entre falta leve, grave y gravísima?
• ¿Cuáles son las modalidades para hacer la Etapa Productiva (presencial o remota)?`;
}
