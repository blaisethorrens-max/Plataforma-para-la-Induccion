import { Badge } from '../types';
import { Language } from '../context/LanguageContext';

export const BADGES: Badge[] = [
  {
    id: 'badge-bienvenida',
    title: 'Semilla SENA',
    description: 'Iniciaste tu recorrido oficial en la plataforma de inducción interactiva.',
    icon: 'Sparkles',
    category: 'módulos'
  },
  {
    id: 'badge-identidad',
    title: 'Corazón Verde',
    description: 'Completaste el Módulo 1 sobre la historia, misión y símbolos patrios del SENA.',
    icon: 'HeartHandshake',
    category: 'módulos'
  },
  {
    id: 'badge-fpi',
    title: 'Estratega FPI',
    description: 'Comprendiste el modelo pedagógico integral, juicios A/D y las dos etapas formativas.',
    icon: 'Target',
    category: 'módulos'
  },
  {
    id: 'badge-digital',
    title: 'Navegante SofiaPlus',
    description: 'Aprobaste el módulo sobre el ecosistema tecnológico, Zajuna y biblioteca virtual.',
    icon: 'Compass',
    category: 'módulos'
  },
  {
    id: 'badge-juez-novato',
    title: 'Investigador Junior',
    description: 'Resolviste con éxito tu primer caso práctico en el Tribunal del Reglamento.',
    icon: 'Search',
    category: 'reglamento'
  },
  {
    id: 'badge-juez-experto',
    title: 'Magistrado del Reglamento',
    description: 'Clasificaste y dictaste la sanción correcta en al menos 6 casos disciplinarios.',
    icon: 'Gavel',
    category: 'reglamento'
  },
  {
    id: 'badge-guardian-etico',
    title: 'Guardián Ético',
    description: 'Dominaste los 3 casos de Faltas Gravísimas protegiendo la convivencia comunitaria.',
    icon: 'ShieldCheck',
    category: 'reglamento'
  },
  {
    id: 'badge-velocidad',
    title: 'Rayo del Conocimiento',
    description: 'Lograste una racha de más de 5 respuestas consecutivas en el Desafío Relámpago.',
    icon: 'Zap',
    category: 'desafíos'
  },
  {
    id: 'badge-induccion-master',
    title: 'Aprendiz Destacado SENA',
    description: 'Superaste todos los módulos formativos y obtuviste tu Certificado Oficial de Inducción.',
    icon: 'Award',
    category: 'maestría'
  }
];

export const BADGES_EN: Badge[] = [
  {
    id: 'badge-bienvenida',
    title: 'SENA Seedling',
    description: 'Begun your official training journey on the interactive induction platform.',
    icon: 'Sparkles',
    category: 'módulos'
  },
  {
    id: 'badge-identidad',
    title: 'Green Heart',
    description: 'Completed Module 1 on history, mission, and national symbols of SENA.',
    icon: 'HeartHandshake',
    category: 'módulos'
  },
  {
    id: 'badge-fpi',
    title: 'FPI Strategist',
    description: 'Mastered the pedagogical model, competency assessments A/D, and the two training stages.',
    icon: 'Target',
    category: 'módulos'
  },
  {
    id: 'badge-digital',
    title: 'SofiaPlus Navigator',
    description: 'Passed the module on the technology ecosystem, Zajuna LMS, and digital library.',
    icon: 'Compass',
    category: 'módulos'
  },
  {
    id: 'badge-juez-novato',
    title: 'Junior Investigator',
    description: 'Successfully resolved your first practical case in the Regulation Tribunal.',
    icon: 'Search',
    category: 'reglamento'
  },
  {
    id: 'badge-juez-experto',
    title: 'Regulation Magistrate',
    description: 'Accurately classified and sanctioned at least 6 disciplinary cases.',
    icon: 'Gavel',
    category: 'reglamento'
  },
  {
    id: 'badge-guardian-etico',
    title: 'Ethical Guardian',
    description: 'Mastered the 3 Very Serious Infraction cases safeguarding campus safety.',
    icon: 'ShieldCheck',
    category: 'reglamento'
  },
  {
    id: 'badge-velocidad',
    title: 'Knowledge Lightning',
    description: 'Achieved a streak of over 5 consecutive correct answers in the Speed Challenge.',
    icon: 'Zap',
    category: 'desafíos'
  },
  {
    id: 'badge-induccion-master',
    title: 'Distinguished SENA Apprentice',
    description: 'Completed all training modules and earned your Official Certificate of Induction.',
    icon: 'Award',
    category: 'maestría'
  }
];

export function getBadges(lang: Language = 'es'): Badge[] {
  return lang === 'en' ? BADGES_EN : BADGES;
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  perk: string;
  badgeName: string;
}

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: 'Aspirante en Adaptación',
    minXp: 0,
    maxXp: 299,
    perk: 'Acceso a los módulos fundamentales de inducción',
    badgeName: 'Novato'
  },
  {
    level: 2,
    title: 'Aprendiz en Formación',
    minXp: 300,
    maxXp: 699,
    perk: 'Desbloqueo de casos intermedios en el Tribunal',
    badgeName: 'Constante'
  },
  {
    level: 3,
    title: 'Aprendiz Competente',
    minXp: 700,
    maxXp: 1199,
    perk: 'Habilitación de Desafíos Relámpago Contrarreloj',
    badgeName: 'Competente'
  },
  {
    level: 4,
    title: 'Líder de Ficha',
    minXp: 1200,
    maxXp: 1799,
    perk: 'Consultas avanzadas con el Asesor del Reglamento',
    badgeName: 'Líder'
  },
  {
    level: 5,
    title: 'Embajador SENA de Excelencia',
    minXp: 1800,
    maxXp: 99999,
    perk: 'Generación del Certificado Oficial de Inducción con Honores',
    badgeName: 'Embajador'
  }
];

export const LEVELS_EN: LevelInfo[] = [
  {
    level: 1,
    title: 'Adapting Aspirant',
    minXp: 0,
    maxXp: 299,
    perk: 'Access to foundational induction modules',
    badgeName: 'Novice'
  },
  {
    level: 2,
    title: 'Apprentice in Training',
    minXp: 300,
    maxXp: 699,
    perk: 'Unlocks intermediate cases in the Tribunal',
    badgeName: 'Steadfast'
  },
  {
    level: 3,
    title: 'Competent Apprentice',
    minXp: 700,
    maxXp: 1199,
    perk: 'Enables timed Speed Challenges',
    badgeName: 'Competent'
  },
  {
    level: 4,
    title: 'Class Leader (Vocero)',
    minXp: 1200,
    maxXp: 1799,
    perk: 'Advanced consultations with AI Regulation Advisor',
    badgeName: 'Leader'
  },
  {
    level: 5,
    title: 'SENA Ambassador of Excellence',
    minXp: 1800,
    maxXp: 99999,
    perk: 'Official Induction Certificate with High Honors',
    badgeName: 'Ambassador'
  }
];

export function getLevelForXp(xp: number, lang: Language = 'es'): LevelInfo {
  const currentLevels = lang === 'en' ? LEVELS_EN : LEVELS;
  for (let i = currentLevels.length - 1; i >= 0; i--) {
    if (xp >= currentLevels[i].minXp) {
      return currentLevels[i];
    }
  }
  return currentLevels[0];
}
