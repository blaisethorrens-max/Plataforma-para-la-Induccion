import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Clock, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  Shield,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApprenticeProfile } from '../types';
import { getSpeedChallenges, ChallengeLevel } from '../data/speedQuizData';
import { getLevelForXp } from '../data/badgesData';
import { sound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface SpeedQuizViewProps {
  profile: ApprenticeProfile;
  onRecordQuizScore: (score: number, earnedXp: number) => void;
}

export const SpeedQuizView: React.FC<SpeedQuizViewProps> = ({
  profile,
  onRecordQuizScore
}) => {
  const { t, language } = useLanguage();
  const currentLevel = getLevelForXp(profile.xp, language);
  const challenges = getSpeedChallenges(language);
  
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeLevel | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [streak, setStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [totalXpEarned, setTotalXpEarned] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeQuestion = selectedChallenge?.questions[questionIndex];

  // Start challenge
  const handleStartChallenge = (challenge: ChallengeLevel) => {
    sound.playClick();
    setSelectedChallenge(challenge);
    setQuestionIndex(0);
    setTimeLeft(challenge.timePerQuestion);
    setStreak(0);
    setScore(0);
    setTotalXpEarned(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  // Timer tick effect
  useEffect(() => {
    if (!selectedChallenge || isAnswered || quizFinished) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time expired
          clearInterval(timerRef.current!);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedChallenge, questionIndex, isAnswered, quizFinished]);

  const handleTimeExpired = () => {
    sound.playError();
    setIsAnswered(true);
    setSelectedOption(null);
    setStreak(0);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered || !activeQuestion || !selectedChallenge) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === activeQuestion.correctIndex;

    if (isCorrect) {
      sound.playSuccess();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(prev => prev + 1);

      // Streak multipliers
      let multiplier = 1;
      if (newStreak >= 5) multiplier = 2.5;
      else if (newStreak >= 3) multiplier = 2.0;
      else if (newStreak >= 2) multiplier = 1.5;

      const earned = Math.round(selectedChallenge.xpPerCorrect * multiplier);
      setTotalXpEarned(prev => prev + earned);

      if (newStreak % 3 === 0) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      sound.playError();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (!selectedChallenge) return;

    if (questionIndex < selectedChallenge.questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setTimeLeft(selectedChallenge.timePerQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed all questions in challenge
      setQuizFinished(true);
      sound.playLevelUp();
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.5 }
      });
      onRecordQuizScore(score, totalXpEarned);
    }
  };

  const handleResetChallenge = () => {
    sound.playClick();
    setSelectedChallenge(null);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-transparent dark:from-amber-950/30 dark:via-emerald-950/20 border border-amber-500/20 dark:border-amber-500/30 rounded-2xl p-6 sm:p-8 mb-8 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              {language === 'en' ? 'Gamified Timed Training (2026)' : 'Entrenamiento Gamificado Contrarreloj (2026)'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'en' ? 'Induction Challenges by Levels' : 'Desafíos de Inducción por Niveles'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-xl">
              {language === 'en'
                ? 'Test your reflexes and mastery of the 2024-2026 regulations. Answer before the timer expires, build correct answer streaks for XP multipliers (up to x2.5 XP), and climb the institutional ranking.'
                : 'Pon a prueba tus reflejos y conocimientos del reglamento actualizado a 2024-2026. Responde antes de que se agote el cronómetro, mantén rachas de aciertos para multiplicar tus puntos de experiencia (hasta x2.5 XP) y escala en el ranking institucional.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-2xs shrink-0">
            <div className="text-center px-2">
              <span className="text-xs text-slate-400 dark:text-slate-400 block font-medium">
                {language === 'en' ? 'High Score' : 'Récord'}
              </span>
              <span className="text-lg font-black text-amber-600 dark:text-amber-400">{profile.quizHighScore} Pts</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center px-2">
              <span className="text-xs text-slate-400 dark:text-slate-400 block font-medium">
                {language === 'en' ? 'Current Streak' : 'Racha Actual'}
              </span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{streak} 🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Challenge Area */}
      {!selectedChallenge ? (
        /* Level selector grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge) => {
            const isUnlocked = currentLevel.level >= challenge.minLevelRequired;

            return (
              <div
                key={challenge.levelId}
                className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isUnlocked
                    ? 'border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md'
                    : 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {language === 'en' ? 'Level' : 'Nivel'} {challenge.levelNumber}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {challenge.timePerQuestion}{language === 'en' ? 's per question' : 's por pregunta'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{challenge.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{challenge.description}</p>

                  <div className="flex items-center gap-2 mt-4 text-xs">
                    <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-bold border border-emerald-100 dark:border-emerald-800">
                      +{challenge.xpPerCorrect} {language === 'en' ? 'base XP' : 'XP base'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {challenge.questions.length} {language === 'en' ? 'dynamic questions' : 'preguntas dinámicas'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6 flex items-center justify-between">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleStartChallenge(challenge)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-101 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>{language === 'en' ? 'Start Challenge' : 'Iniciar Desafío'}</span>
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 font-semibold text-xs rounded-xl">
                      <Shield className="w-4 h-4" />
                      <span>
                        {language === 'en' 
                          ? `Requires Level ${challenge.minLevelRequired} to unlock` 
                          : `Requiere Nivel ${challenge.minLevelRequired} para desbloquear`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : !quizFinished && activeQuestion ? (
        /* In Quiz Arena */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6 transition-colors">
          
          {/* Quiz Top bar: Counter, Streak multiplier, Timer */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {selectedChallenge.title}
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                {language === 'en'
                  ? `Question ${questionIndex + 1} of ${selectedChallenge.questions.length}`
                  : `Pregunta ${questionIndex + 1} de ${selectedChallenge.questions.length}`}
              </p>
            </div>

            {/* Streak & Multiplier */}
            <div className="flex items-center gap-2">
              {streak > 1 && (
                <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-300 text-xs font-bold animate-bounce">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{language === 'en' ? 'Streak' : 'Racha'} x{streak >= 5 ? '2.5' : streak >= 3 ? '2.0' : '1.5'}</span>
                </div>
              )}

              {/* Countdown circle */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-sm border ${
                timeLeft <= 5 
                  ? 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 animate-pulse' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Time Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 linear ${
                timeLeft <= 5 ? 'bg-red-500' : 'bg-amber-500'
              }`}
              style={{ width: `${(timeLeft / selectedChallenge.timePerQuestion) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {activeQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {activeQuestion.options.map((opt, idx) => {
              let btnClass = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

              if (isAnswered) {
                if (idx === activeQuestion.correctIndex) {
                  btnClass = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                } else if (selectedOption === idx) {
                  btnClass = 'bg-red-100 dark:bg-red-950/80 border-red-400 text-red-950 dark:text-red-300 line-through';
                } else {
                  btnClass = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${btnClass}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 mt-0.5">{opt}</span>
                  {isAnswered && idx === activeQuestion.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && selectedOption === idx && idx !== activeQuestion.correctIndex && (
                    <XCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Rationale explanation after answer */}
          {isAnswered && (
            <div className={`p-4 rounded-xl text-xs space-y-1 ${
              selectedOption === activeQuestion.correctIndex 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200' 
                : 'bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span>
                  {selectedOption === activeQuestion.correctIndex 
                    ? (language === 'en' ? '¡Correct Answer!' : '¡Respuesta Correcta!') 
                    : (language === 'en' ? 'Time expired or incorrect answer' : 'Tiempo agotado o respuesta errónea')}
                </span>
                {selectedOption === activeQuestion.correctIndex && (
                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
                    +{Math.round(selectedChallenge.xpPerCorrect * (streak >= 5 ? 2.5 : streak >= 3 ? 2 : streak >= 2 ? 1.5 : 1))} XP
                  </span>
                )}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                {activeQuestion.explanation}
              </p>
            </div>
          )}

          {/* Bottom advance button */}
          {isAnswered && (
            <div className="text-right pt-2">
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>
                  {questionIndex < selectedChallenge.questions.length - 1 
                    ? (language === 'en' ? 'Next Question' : 'Siguiente Pregunta') 
                    : (language === 'en' ? 'Finish Challenge' : 'Finalizar Desafío')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Challenge Results View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs max-w-xl mx-auto text-center space-y-5 transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {language === 'en' ? 'Challenge Completed Successfully!' : '¡Desafío Completado con Éxito!'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'en'
                ? 'Outstanding practice reinforcing your knowledge of the regulations and life at SENA.'
                : 'Excelente entrenamiento para afianzar tus conocimientos sobre el reglamento y la vida en el SENA.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {language === 'en' ? 'Correct' : 'Aciertos'}
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {score} / {selectedChallenge?.questions.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {language === 'en' ? 'XP Earned' : 'XP Ganados'}
              </span>
              <span className="text-xl font-black text-[#39A900]">+{totalXpEarned}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {language === 'en' ? 'Accuracy' : 'Efectividad'}
              </span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                {Math.round((score / (selectedChallenge?.questions.length || 1)) * 100)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleResetChallenge}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              {language === 'en' ? 'Choose Another Challenge' : 'Elegir Otro Desafío'}
            </button>
            <button
              onClick={() => selectedChallenge && handleStartChallenge(selectedChallenge)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#329600] text-slate-950 text-xs font-bold shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {language === 'en' ? 'Retry Challenge' : 'Reintentar Desafío'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
