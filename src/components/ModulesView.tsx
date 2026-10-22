import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  CheckSquare, 
  Award,
  ChevronLeft,
  GraduationCap,
  Building2,
  Laptop,
  ShieldAlert,
  FileText,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InductionModule, ApprenticeProfile } from '../types';
import { INDUCTION_MODULES } from '../data/modulesData';
import { sound } from '../utils/audio';

interface ModulesViewProps {
  profile: ApprenticeProfile;
  onCompleteModule: (moduleId: string, earnedXp: number) => void;
  onGoToCases: () => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({
  profile,
  onCompleteModule,
  onGoToCases
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [quizState, setQuizState] = useState<{
    inQuiz: boolean;
    answers: Record<string, number>;
    submitted: boolean;
    score: number;
  }>({
    inQuiz: false,
    answers: {},
    submitted: false,
    score: 0
  });

  const selectedModule = INDUCTION_MODULES.find(m => m.id === selectedModuleId);

  // Icon mapping
  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'Scale': return <Scale className="w-5 h-5" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  const handleSelectModule = (modId: string) => {
    sound.playClick();
    setSelectedModuleId(modId);
    setActiveTopicIndex(0);
    setQuizState({
      inQuiz: false,
      answers: {},
      submitted: false,
      score: 0
    });
  };

  const handleStartQuiz = () => {
    sound.playClick();
    setQuizState({
      inQuiz: true,
      answers: {},
      submitted: false,
      score: 0
    });
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (quizState.submitted) return;
    sound.playClick();
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: optionIndex }
    }));
  };

  const handleSubmitQuiz = () => {
    if (!selectedModule) return;
    const questions = selectedModule.quickQuiz;
    let correctCount = 0;

    questions.forEach(q => {
      if (quizState.answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const isPassed = correctCount >= Math.ceil(questions.length * 0.6);

    if (isPassed) {
      sound.playSuccess();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      onCompleteModule(selectedModule.id, selectedModule.xpReward);
    } else {
      sound.playError();
    }

    setQuizState(prev => ({
      ...prev,
      submitted: true,
      score: correctCount
    }));
  };

  // If a module is selected, render the interactive topic reader & quiz
  if (selectedModule) {
    const isCompleted = profile.completedModuleIds.includes(selectedModule.id);
    const activeTopic = selectedModule.topics[activeTopicIndex] || selectedModule.topics[0];

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Back and breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => { sound.playClick(); setSelectedModuleId(null); }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a la Ruta de Inducción
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-slate-500 dark:text-slate-400">Módulo {selectedModule.number} de {INDUCTION_MODULES.length}</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completado
              </span>
            )}
          </div>
        </div>

        {/* Module Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs mb-6 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0">
              {getModuleIcon(selectedModule.iconName)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{selectedModule.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedModule.durationMinutes} min estimados
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" />
                  +{selectedModule.xpReward} XP
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedModule.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{selectedModule.summary}</p>
            </div>
          </div>

          {/* Topic Navigation Pills */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 border-t border-slate-100 dark:border-slate-800 pt-4">
            {selectedModule.topics.map((topic, idx) => {
              const isActive = !quizState.inQuiz && activeTopicIndex === idx;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTopicIndex(idx);
                    setQuizState(prev => ({ ...prev, inQuiz: false }));
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#00324D] dark:bg-slate-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Tema {idx + 1}: {topic.title}
                </button>
              );
            })}

            {/* Quiz Tab */}
            <button
              onClick={handleStartQuiz}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                quizState.inQuiz
                  ? 'bg-[#39A900] text-slate-950 shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-[#206900] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Prueba Rápida ({selectedModule.quickQuiz.length} preg.)
            </button>
          </div>
        </div>

        {/* Content View: Topic or Quiz */}
        {!quizState.inQuiz ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 transition-colors">
            
            {/* Topic Header */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">Tema {activeTopicIndex + 1}</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{activeTopic.title}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{activeTopic.subtitle}</p>
            </div>

            {/* Topic Main Content Paragraphs */}
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
              {activeTopic.content.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Key Highlights Card */}
            {activeTopic.keyHighlights && activeTopic.keyHighlights.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-[#39A900]" />
                  Puntos Clave para Recordar
                </h4>
                <ul className="space-y-2">
                  {activeTopic.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] mt-1.5 shrink-0"></span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pro Tip Callout */}
            {activeTopic.proTip && (
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-900">Consejo de Oro para el Aprendiz</p>
                  <p className="text-xs text-amber-800 mt-0.5">{activeTopic.proTip}</p>
                </div>
              </div>
            )}

            {/* Checklist */}
            {activeTopic.checklist && (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-950 mb-2">Compromisos de Adaptación:</p>
                <div className="space-y-2">
                  {activeTopic.checklist.map((item, idx) => (
                    <label key={idx} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#39A900] focus:ring-[#39A900]" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons between topics */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              {activeTopicIndex > 0 ? (
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTopicIndex(activeTopicIndex - 1);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  ← Tema Anterior
                </button>
              ) : <div></div>}

              {activeTopicIndex < selectedModule.topics.length - 1 ? (
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTopicIndex(activeTopicIndex + 1);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] transition-colors shadow-xs"
                >
                  <span>Siguiente Tema</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleStartQuiz}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#39A900] hover:bg-[#329600] transition-transform hover:scale-102 shadow-md"
                >
                  <Award className="w-4 h-4" />
                  <span>Realizar Evaluación del Módulo</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Module Quick Quiz Mode */
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Evaluación Rápida del Módulo {selectedModule.number}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Responde correctamente para validar tus competencias y sumar +{selectedModule.xpReward} XP a tu perfil.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  +{selectedModule.xpReward} XP
                </span>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-6">
              {selectedModule.quickQuiz.map((q, qIndex) => {
                const selectedOpt = quizState.answers[q.id];
                const hasAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div key={q.id} className="bg-slate-50 border border-slate-200/90 rounded-xl p-5">
                    <p className="text-sm font-bold text-slate-900 mb-3">
                      <span className="text-emerald-700 mr-2">Pregunta {qIndex + 1}:</span>
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70';

                        if (hasAnswered && selectedOpt === optIndex) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                        }

                        if (quizState.submitted) {
                          if (optIndex === q.correctIndex) {
                            btnStyle = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold';
                          } else if (selectedOpt === optIndex && !isCorrect) {
                            btnStyle = 'bg-red-50 border-red-400 text-red-950 line-through';
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            disabled={quizState.submitted}
                            onClick={() => handleAnswerSelect(q.id, optIndex)}
                            className={`w-full text-left p-3 rounded-lg text-xs border transition-all flex items-start gap-2.5 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-slate-200/60 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation when submitted */}
                    {quizState.submitted && (
                      <div className={`mt-3 p-3 rounded-lg text-xs ${isCorrect ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-900' : 'bg-amber-50/80 border border-amber-200 text-amber-900'}`}>
                        <p className="font-semibold">{isCorrect ? '¡Correcto!' : 'Respuesta correcta:'}</p>
                        <p className="mt-0.5 text-slate-700">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Quiz Actions */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!quizState.submitted ? (
                <>
                  <p className="text-xs text-slate-500">
                    Respondidas {Object.keys(quizState.answers).length} de {selectedModule.quickQuiz.length} preguntas
                  </p>
                  <button
                    disabled={Object.keys(quizState.answers).length < selectedModule.quickQuiz.length}
                    onClick={handleSubmitQuiz}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      Object.keys(quizState.answers).length === selectedModule.quickQuiz.length
                        ? 'bg-[#39A900] hover:bg-[#329600] text-slate-950 shadow-md hover:scale-102 cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Calificar Evaluación
                  </button>
                </>
              ) : (
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Resultado: {quizState.score} de {selectedModule.quickQuiz.length} correctas
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {quizState.score >= Math.ceil(selectedModule.quickQuiz.length * 0.6)
                        ? '¡Excelente! Has alcanzado el Resultado de Aprendizaje (Aprobado - A).'
                        : 'No alcanzaste el puntaje mínimo. Puedes repetir la evaluación para afianzar el conocimiento.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleStartQuiz}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
                    >
                      Reintentar Quiz
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedModuleId(null);
                      }}
                      className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235]"
                    >
                      Continuar Ruta
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    );
  }

  // Otherwise, render the Roadmap / Modules List View
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Intro banner */}
      <div className="bg-gradient-to-br from-white to-emerald-50/40 dark:from-slate-900 dark:to-slate-800/80 rounded-2xl p-6 sm:p-8 border border-emerald-100 dark:border-slate-800 shadow-xs mb-8 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#39A900]"></span>
              Plan Estructurado de Inducción 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Ruta Formativa del Aprendiz SENA
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
              Supera cada uno de los 6 módulos diseñados para familiarizarte con la cultura institucional, las herramientas tecnológicas, los derechos, deberes y el régimen disciplinario actualizado (Reglamento 2024 con Acuerdo 2026). Acumula XP para ascender de nivel y desbloquear tu Certificado Oficial.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => { sound.playClick(); onGoToCases(); }}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-102 border border-emerald-500/20"
            >
              <Scale className="w-4 h-4 text-[#59C31C]" />
              <span>Simulador de Casos del Reglamento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUCTION_MODULES.map((module) => {
          const isCompleted = profile.completedModuleIds.includes(module.id);
          
          return (
            <div
              key={module.id}
              onClick={() => handleSelectModule(module.id)}
              className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 cursor-pointer p-6 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 ${
                isCompleted 
                  ? 'border-emerald-300 dark:border-emerald-600 ring-1 ring-emerald-300/60 dark:ring-emerald-600/40 shadow-xs' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-[#39A900]/60 dark:hover:border-[#39A900]'
              }`}
            >
              <div>
                {/* Card Top: Number, icon, status */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isCompleted 
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 group-hover:text-[#39A900]'
                  }`}>
                    {getModuleIcon(module.iconName)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/60">
                      +{module.xpReward} XP
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#39A900] fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                </div>

                {/* Subtitle / Category */}
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Módulo {module.number} · {module.category}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#39A900] dark:group-hover:text-[#59C31C] transition-colors leading-snug">
                  {module.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {module.summary}
                </p>
              </div>

              {/* Bottom metadata */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {module.durationMinutes} minutos
                </span>

                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 group-hover:text-[#39A900] dark:group-hover:text-[#59C31C] transition-colors">
                  {isCompleted ? 'Repasar módulo' : 'Iniciar módulo'}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
