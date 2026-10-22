import { Badge } from '../types';

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

export function getLevelForXp(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}
