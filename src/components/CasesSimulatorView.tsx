import React, { useState } from 'react';
import { 
  Gavel, 
  ShieldAlert, 
  FileCheck, 
  User, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  X,
  BookOpen,
  Scale,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RegulationCase, SeverityType, ApprenticeProfile } from '../types';
import { getRegulationCases } from '../data/casesData';
import { sound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface CasesSimulatorViewProps {
  profile: ApprenticeProfile;
  onRecordCaseDecision: (caseId: string, severityCorrect: boolean, sanctionCorrect: boolean, earnedXp: number) => void;
  onOpenMentorWithPrompt?: (prompt: string) => void;
}

export const CasesSimulatorView: React.FC<CasesSimulatorViewProps> = ({
  profile,
  onRecordCaseDecision,
  onOpenMentorWithPrompt
}) => {
  const { t, language } = useLanguage();
  const cases = getRegulationCases(language);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'leve' | 'grave' | 'gravisima' | 'completed'>('all');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  // Investigation modal states
  const [modalTab, setModalTab] = useState<'facts' | 'evidence' | 'deliberation'>('facts');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityType | null>(null);
  const [selectedSanctionId, setSelectedSanctionId] = useState<string | null>(null);
  const [caseSubmitted, setCaseSubmitted] = useState<boolean>(false);

  const activeCase = cases.find(c => c.id === activeCaseId);

  // Stats
  const totalCases = cases.length;
  const completedCount = profile.completedCaseIds.length;
  const levesCount = cases.filter(c => c.severity === 'leve').length;
  const gravesCount = cases.filter(c => c.severity === 'grave').length;
  const gravisimasCount = cases.filter(c => c.severity === 'gravisima').length;

  const handleOpenCase = (c: RegulationCase) => {
    sound.playClick();
    setActiveCaseId(c.id);
    setModalTab('facts');
    setSelectedSeverity(null);
    setSelectedSanctionId(null);
    setCaseSubmitted(false);

    // If already completed previously, prefill decisions
    const priorDecision = profile.caseDecisions[c.id];
    if (priorDecision) {
      setSelectedSeverity(c.severity);
      const correctSanction = c.sanctionOptions.find(s => s.isCorrect);
      if (correctSanction) setSelectedSanctionId(correctSanction.id);
      setCaseSubmitted(true);
    }
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveCaseId(null);
  };

  const handleSelectSeverity = (val: SeverityType) => {
    if (caseSubmitted) return;
    sound.playClick();
    setSelectedSeverity(val);
  };

  const handleSelectSanction = (id: string) => {
    if (caseSubmitted) return;
    sound.playClick();
    setSelectedSanctionId(id);
  };

  const handleConfirmVerdict = () => {
    if (!activeCase || !selectedSeverity || !selectedSanctionId) return;

    const isSeverityCorrect = selectedSeverity === activeCase.severity;
    const selectedSanctionObj = activeCase.sanctionOptions.find(s => s.id === selectedSanctionId);
    const isSanctionCorrect = Boolean(selectedSanctionObj?.isCorrect);

    if (isSeverityCorrect && isSanctionCorrect) {
      sound.playSuccess();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
      // Award 90 XP for full accuracy
      onRecordCaseDecision(activeCase.id, true, true, 90);
    } else {
      sound.playError();
      onRecordCaseDecision(activeCase.id, isSeverityCorrect, isSanctionCorrect, 30);
    }

    setCaseSubmitted(true);
  };

  const filteredCases = cases.filter(c => {
    if (filterSeverity === 'all') return true;
    if (filterSeverity === 'completed') return profile.completedCaseIds.includes(c.id);
    return c.severity === filterSeverity;
  });

  const getSeverityBadge = (sev: SeverityType) => {
    switch (sev) {
      case 'leve':
        return (
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300/60 dark:border-amber-800 px-2.5 py-0.5 rounded-full">
            {language === 'en' ? 'Minor Infraction' : 'Falta Leve'}
          </span>
        );
      case 'grave':
        return (
          <span className="text-[11px] font-bold text-orange-900 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 border border-orange-300/60 dark:border-orange-800 px-2.5 py-0.5 rounded-full">
            {language === 'en' ? 'Serious Infraction' : 'Falta Grave'}
          </span>
        );
      case 'gravisima':
        return (
          <span className="text-[11px] font-bold text-red-900 dark:text-red-300 bg-red-100 dark:bg-red-950/60 border border-red-300/60 dark:border-red-800 px-2.5 py-0.5 rounded-full">
            {language === 'en' ? 'Very Serious Infraction' : 'Falta Gravísima'}
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Tribunal Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#00283d] to-[#003852] text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4 text-[#59C31C]" />
              {language === 'en' ? 'Evaluation and Monitoring Committee Simulator' : 'Simulador del Comité de Evaluación y Seguimiento'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'en' ? 'Ethical Tribunal: SENA Apprentice Regulations' : 'Tribunal Ético del Reglamento del Aprendiz'}
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {language === 'en'
                ? 'Assume the role of an Evaluation Committee member and analyze authentic disciplinary dockets based on the SENA Apprentice Regulations (2024 Version with its 2026 Agreement). Evaluate witness accounts, classify infraction severity, and impose proportionate restorative or disciplinary rulings.'
                : 'Asume el rol de miembro del Comité y analiza expedientes disciplinarios reales basados en el Reglamento del Aprendiz SENA (Versión Actualizada 2024 con su Acuerdo Complementario de 2026). Evalúa los testimonios, califica la falta (Leve, Grave o Gravísima) y aplica la medida sancionatoria o formativa proporcional al debido proceso.'}
            </p>
          </div>

          {/* Quick stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
              <span className="text-xl font-black text-emerald-400">{completedCount}/{totalCases}</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                {language === 'en' ? 'Resolved Cases' : 'Casos Resueltos'}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
              <span className="text-xl font-black text-amber-300">
                {levesCount}{language === 'en' ? 'M' : 'L'} · {gravesCount}{language === 'en' ? 'S' : 'G'} · {gravisimasCount}{language === 'en' ? 'VS' : 'GG'}
              </span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                {language === 'en' ? '2024-2026 Rules' : 'Norma 2024-2026'}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white/10 rounded-xl p-3 border border-white/10 text-center">
              <span className="text-xl font-black text-[#59C31C]">+90 XP</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                {language === 'en' ? 'Per Verdict' : 'Por Veredicto'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1.5 mt-6 border-t border-white/10 pt-4 overflow-x-auto">
          {[
            { id: 'all', label: language === 'en' ? `All (${totalCases})` : `Todos (${totalCases})` },
            { id: 'leve', label: language === 'en' ? `Minor (${levesCount})` : `Faltas Leves (${levesCount})` },
            { id: 'grave', label: language === 'en' ? `Serious (${gravesCount})` : `Faltas Graves (${gravesCount})` },
            { id: 'gravisima', label: language === 'en' ? `Very Serious (${gravisimasCount})` : `Faltas Gravísimas (${gravisimasCount})` },
            { id: 'completed', label: language === 'en' ? `Resolved (${completedCount})` : `Resueltos (${completedCount})` }
          ].map((tab) => {
            const isActive = filterSeverity === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { sound.playClick(); setFilterSeverity(tab.id as typeof filterSeverity); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-white text-slate-900 shadow-sm font-bold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((c) => {
          const isCompleted = profile.completedCaseIds.includes(c.id);
          const decision = profile.caseDecisions[c.id];

          return (
            <div
              key={c.id}
              onClick={() => handleOpenCase(c)}
              className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 group ${
                isCompleted 
                  ? 'border-emerald-300 dark:border-emerald-600 ring-1 ring-emerald-300/60 dark:ring-emerald-600/40' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-[#39A900]/70 dark:hover:border-[#39A900]'
              }`}
            >
              <div>
                {/* Header: code & severity tag */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {c.code}
                  </span>
                  {getSeverityBadge(c.severity)}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] dark:group-hover:text-[#59C31C] transition-colors leading-snug">
                  {c.title}
                </h3>

                {/* Short snippet */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {c.shortDescription}
                </p>

                {/* Protagonist mini tag */}
                <div className="flex items-center gap-1.5 mt-4 text-[11px] text-slate-600 dark:text-slate-400">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{c.protagonist.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'en' ? 'Cohort' : 'Ficha'} {c.protagonist.ficha}</span>
                </div>
              </div>

              {/* Card Footer: Status and Action */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3.5 mt-5 flex items-center justify-between text-xs">
                {isCompleted ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                    <span>
                      {decision?.severityCorrect && decision?.sanctionCorrect 
                        ? (language === 'en' ? 'Ruling Dictated (Accurate)' : 'Fallo Dictado (Acertado)') 
                        : (language === 'en' ? 'Resolved with Notice' : 'Resuelto con Observación')}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {language === 'en' ? 'Pending Deliberation' : 'Pendiente de Deliberación'}
                  </span>
                )}

                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-[#39A900] dark:group-hover:text-[#59C31C] transition-colors">
                  {isCompleted ? (language === 'en' ? 'Review Docket' : 'Revisar Fallo') : (language === 'en' ? 'Open Docket' : 'Abrir Expediente')}
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Details & Deliberation Modal */}
      {activeCase && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto transition-colors">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800 text-[#59C31C] border border-slate-700">
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">{activeCase.code}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-300">
                      {language === 'en' ? 'Disciplinary Docket' : 'Expediente Disciplinario'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">{activeCase.title}</h3>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-6">
              {[
                { id: 'facts', label: language === 'en' ? '1. Case Facts' : '1. Hechos del Caso', icon: FileCheck },
                { id: 'evidence', label: language === 'en' ? '2. Applicable Law' : '2. Normatividad', icon: BookOpen },
                { id: 'deliberation', label: language === 'en' ? '3. Deliberation & Ruling' : '3. Deliberación y Fallo', icon: Scale }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = modalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { sound.playClick(); setModalTab(tab.id as typeof modalTab); }}
                    className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                      isActive 
                        ? 'border-[#39A900] text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900' 
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Tab Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              
              {/* TAB 1: FACTS */}
              {modalTab === 'facts' && (
                <div className="space-y-6">
                  {/* Protagonist Mini Dossier */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">
                          {language === 'en' ? 'Accused Apprentice' : 'Aprendiz Imputado'}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{activeCase.protagonist.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">
                          {language === 'en' ? 'Training Program' : 'Programa Formativo'}
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white">{activeCase.protagonist.program}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">
                          {language === 'en' ? 'Cohort Number' : 'Ficha de Caracterización'}
                        </span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{activeCase.protagonist.ficha}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">
                          {language === 'en' ? 'Current Stage' : 'Etapa Actual'}
                        </span>
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          {activeCase.protagonist.stage}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-700 text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">
                        {language === 'en' ? 'SofiaPlus History: ' : 'Antecedentes en SofiaPlus: '}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{activeCase.protagonist.antecedents}</span>
                    </div>
                  </div>

                  {/* The Full Narrative Story */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      {language === 'en' ? 'Certified Chronology of Case Facts' : 'Relación Fidedigna de los Hechos Reportados'}
                    </h4>
                    <p className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                      {activeCase.story}
                    </p>
                  </div>

                  {/* Documented Evidence List */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      {language === 'en' ? 'Documented Evidence Annexed to Docket' : 'Material Probatorio Anexado al Pliego de Cargos'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCase.evidenceList.map((ev, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 shadow-2xs">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                            <span className="font-bold text-slate-700 dark:text-slate-200">{ev.source}</span>
                            <span className="text-[10px] text-slate-400">{ev.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{ev.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Aggravating & Mitigating Factors Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl p-4">
                      <h5 className="text-xs font-bold text-emerald-950 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                        {language === 'en' ? 'Mitigating Factors' : 'Circunstancias Atenuantes'}
                      </h5>
                      <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                        {activeCase.attenuatingFactors.map((at, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                            <span>{at}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-xl p-4">
                      <h5 className="text-xs font-bold text-amber-950 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                        {language === 'en' ? 'Aggravating Factors' : 'Circunstancias Agravantes'}
                      </h5>
                      <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
                        {activeCase.aggravatingFactors.map((ag, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                            <span>{ag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Proceed to deliberation button */}
                  <div className="text-right border-t border-slate-100 dark:border-slate-800 pt-4">
                    <button
                      onClick={() => { sound.playClick(); setModalTab('deliberation'); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Proceed to Committee Deliberation' : 'Ir a la Deliberación del Comité'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: APPLICABLE REGULATION */}
              {modalTab === 'evidence' && (
                <div className="space-y-5">
                  <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      {activeCase.applicableRegulation.chapter}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {activeCase.applicableRegulation.article}
                    </h4>
                    <div className="bg-white dark:bg-slate-900 border-l-4 border-[#39A900] p-4 rounded-r-lg text-slate-700 dark:text-slate-300 italic text-xs leading-relaxed my-3">
                      "{activeCase.applicableRegulation.ruleText}"
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === 'en'
                        ? 'Source: SENA Apprentice Regulations (2024 Version updated with 2026 Complementary Agreement).'
                        : 'Fuente: Reglamento del Aprendiz SENA (Versión Actualizada 2024 con su Acuerdo Complementario de 2026).'}
                    </p>
                  </div>

                  <div className="text-right border-t border-slate-100 dark:border-slate-800 pt-4">
                    <button
                      onClick={() => { sound.playClick(); setModalTab('deliberation'); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#329600] text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Begin Deliberation' : 'Comenzar Deliberación'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: DELIBERATION & VERDICT (INTERACTIVE) */}
              {modalTab === 'deliberation' && (
                <div className="space-y-6">
                  
                  {/* Step 1: Severity classification */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#00324D] text-white flex items-center justify-center text-xs">1</span>
                        {language === 'en' ? 'Step 1: Classify Infraction Severity' : 'Paso 1: Tipificación y Calificación de la Falta'}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {language === 'en' ? 'What severity applies?' : '¿Qué tipo de falta se configuró?'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                      {language === 'en'
                        ? 'Weighing the facts, evidence, and mitigating factors, classify the conduct:'
                        : 'Teniendo en cuenta los hechos, pruebas y atenuantes, califica la conducta del aprendiz:'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { 
                          type: 'leve' as SeverityType, 
                          label: language === 'en' ? 'Minor Infraction' : 'Falta Leve', 
                          desc: language === 'en' ? 'Minor non-compliance without malice' : 'Incumplimiento menor sin dolo destructivo' 
                        },
                        { 
                          type: 'grave' as SeverityType, 
                          label: language === 'en' ? 'Serious Infraction' : 'Falta Grave', 
                          desc: language === 'en' ? 'Endangers safety or academic ethics' : 'Atenta contra la seguridad o ética troncal' 
                        },
                        { 
                          type: 'gravisima' as SeverityType, 
                          label: language === 'en' ? 'Very Serious Infraction' : 'Falta Gravísima', 
                          desc: language === 'en' ? 'Drugs, weapons, violence or statutory crime' : 'Drogas, armas, agresión o delito penal' 
                        }
                      ].map((item) => {
                        const isSelected = selectedSeverity === item.type;
                        return (
                          <button
                            key={item.type}
                            disabled={caseSubmitted}
                            onClick={() => handleSelectSeverity(item.type)}
                            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#39A900] ring-2 ring-[#39A900]/40 text-emerald-950 dark:text-emerald-200'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="text-xs font-bold block">{item.label}</span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">{item.desc}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback on severity choice */}
                    {selectedSeverity && (
                      <div className="mt-3 p-3 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {(() => {
                          const opt = activeCase.severityOptions.find(o => o.value === selectedSeverity);
                          return (
                            <p className="text-slate-700 dark:text-slate-300">
                              <strong className={selectedSeverity === activeCase.severity ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}>
                                {selectedSeverity === activeCase.severity 
                                  ? (language === 'en' ? '✓ Legal Analysis Accurate: ' : '✓ Análisis Legal Correcto: ') 
                                  : (language === 'en' ? '⚠️ Legal Consideration: ' : '⚠️ Consideración Jurídica: ')}
                              </strong>
                              {opt?.feedback}
                            </p>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Step 2: Sanction / Corrective measure */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#00324D] text-white flex items-center justify-center text-xs">2</span>
                        {language === 'en' ? 'Step 2: Determine Corrective Measure or Sanction' : 'Paso 2: Determinación de la Medida Formativa o Sanción'}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {language === 'en' ? 'Proportionality & Due Process' : 'Proporcionalidad y Debido Proceso'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                      {language === 'en'
                        ? 'Which measure should the Committee recommend to the Center Subdirector?'
                        : '¿Qué medida debe recomendar el Comité de Evaluación y Seguimiento al Subdirector de Centro?'}
                    </p>

                    <div className="space-y-2.5">
                      {activeCase.sanctionOptions.map((s) => {
                        const isSelected = selectedSanctionId === s.id;
                        return (
                          <button
                            key={s.id}
                            disabled={caseSubmitted}
                            onClick={() => handleSelectSanction(s.id)}
                            className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#39A900] ring-2 ring-[#39A900]/40 text-emerald-950 dark:text-emerald-200 font-semibold'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">{s.title}</span>
                              {caseSubmitted && s.isCorrect && (
                                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded shrink-0">
                                  {language === 'en' ? 'Correct Option' : 'Opción Correcta'}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-normal">{s.description}</p>
                            
                            {/* Feedback if selected or submitted */}
                            {(isSelected || caseSubmitted) && (
                              <p className={`text-[11px] mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 ${s.isCorrect ? 'text-emerald-800 dark:text-emerald-300 font-medium' : 'text-amber-800 dark:text-amber-300'}`}>
                                {s.feedback}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submission and Verdict Summary */}
                  {!caseSubmitted ? (
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {(!selectedSeverity || !selectedSanctionId)
                          ? (language === 'en' ? 'Complete both steps to issue the Committee ruling.' : 'Debes completar ambos pasos para emitir el veredicto del Comité.')
                          : (language === 'en' ? 'Ready to issue the official ruling.' : 'Listo para emitir el dictamen oficial.')}
                      </p>
                      <button
                        disabled={!selectedSeverity || !selectedSanctionId}
                        onClick={handleConfirmVerdict}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          selectedSeverity && selectedSanctionId
                            ? 'bg-[#39A900] hover:bg-[#329600] text-slate-950 shadow-md hover:scale-102 cursor-pointer'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {language === 'en' ? 'Issue Committee Ruling (+90 XP)' : 'Emitir Fallo del Comité (+90 XP)'}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-sm">
                          <Award className="w-5 h-5 text-[#39A900]" />
                          <span>{language === 'en' ? 'Docket Successfully Ruled' : 'Expediente Dictaminado con Éxito'}</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-1 rounded-full">
                          +90 XP
                        </span>
                      </div>

                      <div className="text-xs text-emerald-950 dark:text-emerald-200 space-y-1.5 pt-2 border-t border-emerald-200 dark:border-emerald-800">
                        <p><strong>{language === 'en' ? 'Final Resolution:' : 'Resolución Final:'}</strong> {activeCase.correctMeasureSummary}</p>
                        <p className="text-emerald-800 dark:text-emerald-300">
                          <strong>{language === 'en' ? 'SENA Preventive Advice:' : 'Consejo Preventivo SENA:'}</strong> {activeCase.preventiveAdvice}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {onOpenMentorWithPrompt && (
                          <button
                            onClick={() => {
                              sound.playClick();
                              onOpenMentorWithPrompt(
                                language === 'en'
                                  ? `Explain the detailed consequences of this case under regulations: ${activeCase.title}`
                                  : `Explícame a fondo las consecuencias de este caso: ${activeCase.title} según el reglamento`
                              );
                            }}
                            className="text-xs text-emerald-800 dark:text-emerald-300 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
                            {language === 'en' ? 'Deepen case with SENA AI Tutor' : 'Profundizar caso con Tutor SENA IA'}
                          </button>
                        )}

                        <button
                          onClick={handleCloseModal}
                          className="px-5 py-2 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-bold rounded-lg ml-auto cursor-pointer"
                        >
                          {language === 'en' ? 'Close Case File' : 'Cerrar Expediente'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
