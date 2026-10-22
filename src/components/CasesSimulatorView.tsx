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
import { REGULATION_CASES } from '../data/casesData';
import { sound } from '../utils/audio';

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
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'leve' | 'grave' | 'gravisima' | 'completed'>('all');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  // Investigation modal states
  const [modalTab, setModalTab] = useState<'facts' | 'evidence' | 'deliberation'>('facts');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityType | null>(null);
  const [selectedSanctionId, setSelectedSanctionId] = useState<string | null>(null);
  const [caseSubmitted, setCaseSubmitted] = useState<boolean>(false);

  const activeCase = REGULATION_CASES.find(c => c.id === activeCaseId);

  // Stats
  const totalCases = REGULATION_CASES.length;
  const completedCount = profile.completedCaseIds.length;
  const levesCount = REGULATION_CASES.filter(c => c.severity === 'leve').length;
  const gravesCount = REGULATION_CASES.filter(c => c.severity === 'grave').length;
  const gravisimasCount = REGULATION_CASES.filter(c => c.severity === 'gravisima').length;

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
    } else if (isSeverityCorrect || isSanctionCorrect) {
      sound.playSuccess();
      onRecordCaseDecision(activeCase.id, isSeverityCorrect, isSanctionCorrect, 45);
    } else {
      sound.playError();
      onRecordCaseDecision(activeCase.id, false, false, 20);
    }

    setCaseSubmitted(true);
  };

  // Filter logic
  const filteredCases = REGULATION_CASES.filter(c => {
    if (filterSeverity === 'completed') return profile.completedCaseIds.includes(c.id);
    if (filterSeverity === 'leve') return c.severity === 'leve';
    if (filterSeverity === 'grave') return c.severity === 'grave';
    if (filterSeverity === 'gravisima') return c.severity === 'gravisima';
    return true;
  });

  const getSeverityBadge = (sev: SeverityType) => {
    switch (sev) {
      case 'leve':
        return <span className="text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300/60 px-2.5 py-0.5 rounded-full">Falta Leve</span>;
      case 'grave':
        return <span className="text-[11px] font-bold text-orange-900 bg-orange-100 border border-orange-300/60 px-2.5 py-0.5 rounded-full">Falta Grave</span>;
      case 'gravisima':
        return <span className="text-[11px] font-bold text-red-900 bg-red-100 border border-red-300/60 px-2.5 py-0.5 rounded-full">Falta Gravísima</span>;
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
              Simulador del Comité de Evaluación y Seguimiento
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tribunal Ético del Reglamento del Aprendiz
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Asume el rol de miembro del Comité y analiza expedientes disciplinarios reales basados en el <strong>Reglamento del Aprendiz SENA (Versión Actualizada 2024 con su Acuerdo Complementario de 2026)</strong>. Evalúa los testimonios, califica la falta (Leve, Grave o Gravísima) y aplica la medida sancionatoria o formativa proporcional al debido proceso.
            </p>
          </div>

          {/* Quick stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
              <span className="text-xl font-black text-emerald-400">{completedCount}/{totalCases}</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Casos Resueltos</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
              <span className="text-xl font-black text-amber-300">{levesCount}L · {gravesCount}G · {gravisimasCount}GG</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Norma 2024-2026</p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white/10 rounded-xl p-3 border border-white/10 text-center">
              <span className="text-xl font-black text-[#59C31C]">+90 XP</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Por Veredicto</p>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1.5 mt-6 border-t border-white/10 pt-4 overflow-x-auto">
          {[
            { id: 'all', label: `Todos (${totalCases})` },
            { id: 'leve', label: `Faltas Leves (${levesCount})` },
            { id: 'grave', label: `Faltas Graves (${gravesCount})` },
            { id: 'gravisima', label: `Faltas Gravísimas (${gravisimasCount})` },
            { id: 'completed', label: `Resueltos (${completedCount})` }
          ].map((tab) => {
            const isActive = filterSeverity === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { sound.playClick(); setFilterSeverity(tab.id as typeof filterSeverity); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
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

                {/* Short narrative */}
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {c.shortDescription}
                </p>

                {/* Protagonist mini bar */}
                <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-2.5 mt-4 border border-slate-100 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                    <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>{c.protagonist.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Ficha {c.protagonist.ficha} · {c.protagonist.program}
                  </p>
                </div>
              </div>

              {/* Footer status */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-4 flex items-center justify-between text-xs">
                {isCompleted ? (
                  <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                    <span>Expediente Dictaminado</span>
                  </div>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500 font-medium">Expediente Pendiente</span>
                )}

                <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#39A900] dark:group-hover:text-[#59C31C] transition-colors">
                  <span>Investigar</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Dossier Modal */}
      {activeCase && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col my-auto transition-colors">
            
            {/* Modal Header */}
            <div className="bg-[#00324D] dark:bg-[#002235] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#59C31C]">
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-white/15 px-2 py-0.5 rounded text-emerald-200">
                      {activeCase.code}
                    </span>
                    <span className="text-xs text-slate-300">Sesión de Comité de Evaluación y Seguimiento</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">{activeCase.title}</h3>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Subnav Tabs */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shrink-0 overflow-x-auto">
              <button
                onClick={() => { sound.playClick(); setModalTab('facts'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  modalTab === 'facts' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                1. Hechos y Pruebas
              </button>

              <button
                onClick={() => { sound.playClick(); setModalTab('evidence'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  modalTab === 'evidence' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                2. Marco Normativo (2024 - 2026)
              </button>

              <button
                onClick={() => { sound.playClick(); setModalTab('deliberation'); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  modalTab === 'deliberation' 
                    ? 'bg-[#39A900] text-slate-950 shadow-2xs' 
                    : 'text-[#206900] bg-emerald-100/60 hover:bg-emerald-100'
                }`}
              >
                <Gavel className="w-3.5 h-3.5" />
                3. Deliberación y Fallo del Caso
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
              
              {/* TAB 1: FACTS & EVIDENCE */}
              {modalTab === 'facts' && (
                <div className="space-y-6">
                  
                  {/* Protagonist Dossier Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#39A900]" />
                      Expediente del Aprendiz Citado
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Nombre Completo</span>
                        <span className="font-bold text-slate-900">{activeCase.protagonist.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Programa Formativo</span>
                        <span className="font-medium text-slate-900">{activeCase.protagonist.program}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Ficha de Caracterización</span>
                        <span className="font-mono font-bold text-slate-900">{activeCase.protagonist.ficha}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Etapa Actual</span>
                        <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">Etapa {activeCase.protagonist.stage}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200/70 text-xs">
                      <span className="text-slate-500 font-semibold">Antecedentes en SofiaPlus: </span>
                      <span className="text-slate-700">{activeCase.protagonist.antecedents}</span>
                    </div>
                  </div>

                  {/* The Full Narrative Story */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-700" />
                      Relación Fidedigna de los Hechos Reportados
                    </h4>
                    <p className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 text-slate-700 leading-relaxed text-sm">
                      {activeCase.story}
                    </p>
                  </div>

                  {/* Documented Evidence List */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      Material Probatorio Anexado al Pliego de Cargos
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCase.evidenceList.map((ev, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                            <span className="font-bold text-slate-700">{ev.source}</span>
                            <span className="text-[10px] text-slate-400">{ev.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-normal">{ev.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Aggravating & Mitigating Factors Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4">
                      <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        Circunstancias Atenuantes
                      </h5>
                      <ul className="space-y-1.5 text-xs text-emerald-900">
                        {activeCase.attenuatingFactors.map((at, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                            <span>{at}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4">
                      <h5 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        Circunstancias Agravantes
                      </h5>
                      <ul className="space-y-1.5 text-xs text-amber-900">
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
                  <div className="text-right border-t border-slate-100 pt-4">
                    <button
                      onClick={() => { sound.playClick(); setModalTab('deliberation'); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                    >
                      <span>Ir a la Deliberación del Comité</span>
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
                      Fuente: Reglamento del Aprendiz SENA (Versión Actualizada 2024 con su Acuerdo Complementario de 2026).
                    </p>
                  </div>

                  <div className="bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 rounded-xl p-4 text-xs text-emerald-950 dark:text-emerald-200 space-y-2">
                    <p className="font-bold text-emerald-900">¿Cómo clasifica las faltas el Reglamento del Aprendiz?</p>
                    <p className="leading-relaxed">
                      <strong>Faltas Leves:</strong> Incumplimientos de deberes que no causan perjuicios graves a personas ni a la infraestructura del Centro de Formación.
                    </p>
                    <p className="leading-relaxed">
                      <strong>Faltas Graves:</strong> Conductas que entorpecen severamente el proceso formativo, atentan contra la seguridad industrial, causan daño a equipos o configuran plagio académico reiterado.
                    </p>
                    <p className="leading-relaxed">
                      <strong>Faltas Gravísimas:</strong> Taxativamente consagradas en el Art. 28: Porte de armas, estupefacientes/alcohol, violencia física, falsedad de documentos y delitos penales cometidos dentro del SENA.
                    </p>
                  </div>

                  <div className="text-right border-t border-slate-100 pt-4">
                    <button
                      onClick={() => { sound.playClick(); setModalTab('deliberation'); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#329600] text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-colors"
                    >
                      <span>Comenzar Deliberación</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: DELIBERATION & VERDICT (INTERACTIVE) */}
              {modalTab === 'deliberation' && (
                <div className="space-y-6">
                  
                  {/* Step 1: Severity classification */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#00324D] text-white flex items-center justify-center text-xs">1</span>
                        Paso 1: Tipificación y Calificación de la Falta
                      </h4>
                      <span className="text-[11px] text-slate-500">¿Qué tipo de falta se configuró?</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-4">
                      Teniendo en cuenta los hechos, pruebas y atenuantes, califica la conducta del aprendiz:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { type: 'leve' as SeverityType, label: 'Falta Leve', desc: 'Incumplimiento menor sin dolo destructivo' },
                        { type: 'grave' as SeverityType, label: 'Falta Grave', desc: 'Atenta contra la seguridad o ética troncal' },
                        { type: 'gravisima' as SeverityType, label: 'Falta Gravísima', desc: 'Drogas, armas, agresión o delito penal' }
                      ].map((item) => {
                        const isSelected = selectedSeverity === item.type;
                        return (
                          <button
                            key={item.type}
                            disabled={caseSubmitted}
                            onClick={() => handleSelectSeverity(item.type)}
                            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-emerald-50 border-[#39A900] ring-2 ring-[#39A900]/40 text-emerald-950'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span className="text-xs font-bold block">{item.label}</span>
                            <span className="text-[11px] text-slate-500 mt-1 block">{item.desc}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback on severity choice after selection or submission */}
                    {selectedSeverity && (
                      <div className="mt-3 p-3 rounded-lg text-xs bg-white border border-slate-200">
                        {(() => {
                          const opt = activeCase.severityOptions.find(o => o.value === selectedSeverity);
                          return (
                            <p className="text-slate-700">
                              <strong className={selectedSeverity === activeCase.severity ? 'text-emerald-700' : 'text-amber-700'}>
                                {selectedSeverity === activeCase.severity ? '✓ Análisis Legal Correcto: ' : '⚠️ Consideración Jurídica: '}
                              </strong>
                              {opt?.feedback}
                            </p>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Step 2: Sanction / Corrective measure */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#00324D] text-white flex items-center justify-center text-xs">2</span>
                        Paso 2: Determinación de la Medida Formativa o Sanción
                      </h4>
                      <span className="text-[11px] text-slate-500">Proporcionalidad y Debido Proceso</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-4">
                      ¿Qué medida debe recomendar el Comité de Evaluación y Seguimiento al Subdirector de Centro?
                    </p>

                    <div className="space-y-2.5">
                      {activeCase.sanctionOptions.map((s) => {
                        const isSelected = selectedSanctionId === s.id;
                        return (
                          <button
                            key={s.id}
                            disabled={caseSubmitted}
                            onClick={() => handleSelectSanction(s.id)}
                            className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-emerald-50 border-[#39A900] ring-2 ring-[#39A900]/40 text-emerald-950 font-semibold'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-bold text-slate-900">{s.title}</span>
                              {caseSubmitted && s.isCorrect && (
                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                                  Opción Correcta
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-1 font-normal">{s.description}</p>
                            
                            {/* Feedback if selected or submitted */}
                            {(isSelected || caseSubmitted) && (
                              <p className={`text-[11px] mt-2 pt-2 border-t border-slate-100 ${s.isCorrect ? 'text-emerald-800 font-medium' : 'text-amber-800'}`}>
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
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <p className="text-xs text-slate-500">
                        {(!selectedSeverity || !selectedSanctionId)
                          ? 'Debes completar ambos pasos para emitir el veredicto del Comité.'
                          : 'Listo para emitir el dictamen oficial.'}
                      </p>
                      <button
                        disabled={!selectedSeverity || !selectedSanctionId}
                        onClick={handleConfirmVerdict}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          selectedSeverity && selectedSanctionId
                            ? 'bg-[#39A900] hover:bg-[#329600] text-slate-950 shadow-md hover:scale-102 cursor-pointer'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Emitir Fallo del Comité (+90 XP)
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                          <Award className="w-5 h-5 text-[#39A900]" />
                          <span>Expediente Dictaminado con Éxito</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                          +90 XP Sumados
                        </span>
                      </div>

                      <div className="text-xs text-emerald-950 space-y-1.5 pt-2 border-t border-emerald-200">
                        <p><strong>Resolución Final:</strong> {activeCase.correctMeasureSummary}</p>
                        <p className="text-emerald-800">
                          <strong>Consejo Preventivo SENA:</strong> {activeCase.preventiveAdvice}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {onOpenMentorWithPrompt && (
                          <button
                            onClick={() => {
                              sound.playClick();
                              onOpenMentorWithPrompt(`Explícame a fondo las consecuencias de este caso: ${activeCase.title} según el reglamento`);
                            }}
                            className="text-xs text-emerald-800 hover:text-emerald-950 underline font-semibold flex items-center gap-1"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
                            Profundizar caso con Tutor SENA IA
                          </button>
                        )}

                        <button
                          onClick={handleCloseModal}
                          className="px-5 py-2 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-bold rounded-lg ml-auto"
                        >
                          Cerrar Expediente
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
