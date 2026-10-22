export type SeverityType = 'leve' | 'grave' | 'gravisima';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleTopic {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  keyHighlights: string[];
  proTip?: string;
  checklist?: string[];
}

export interface InductionModule {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  category: string;
  durationMinutes: number;
  xpReward: number;
  summary: string;
  iconName: string;
  topics: ModuleTopic[];
  quickQuiz: QuizQuestion[];
}

export interface CaseEvidence {
  source: string;
  description: string;
  date: string;
}

export interface RegulationCase {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  severity: SeverityType;
  story: string;
  protagonist: {
    name: string;
    program: string;
    ficha: string;
    stage: 'Lectiva' | 'Productiva';
    antecedents: string;
  };
  evidenceList: CaseEvidence[];
  attenuatingFactors: string[];
  aggravatingFactors: string[];
  applicableRegulation: {
    chapter: string;
    article: string;
    ruleText: string;
  };
  severityOptions: {
    value: SeverityType;
    label: string;
    feedback: string;
  }[];
  sanctionOptions: {
    id: string;
    title: string;
    description: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  correctMeasureSummary: string;
  preventiveAdvice: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'módulos' | 'reglamento' | 'desafíos' | 'maestría';
  unlockedAt?: string;
}

export interface ApprenticeProfile {
  name: string;
  documentId: string;
  documentType: 'CC' | 'TI' | 'PPT' | 'CE';
  ficha: string;
  program: string;
  regional: string;
  centro: string;
  avatarSeed: string;
  xp: number;
  streakDays: number;
  completedModuleIds: string[];
  completedCaseIds: string[];
  caseDecisions: Record<string, { severityCorrect: boolean; sanctionCorrect: boolean; timestamp: string }>;
  unlockedBadgeIds: string[];
  quizHighScore: number;
  inductionCompletedAt?: string;
  whatsappNumber: string;
}

export interface GlossaryTerm {
  term: string;
  category: 'Institucional' | 'Académico' | 'Disciplinario' | 'Plataformas';
  definition: string;
  regulationReference?: string;
  example: string;
}
