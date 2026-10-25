import React from 'react';
import { ApprenticeProfile } from '../types';
import { getLevelForXp } from '../data/badgesData';
import { INDUCTION_MODULES } from '../data/modulesData';
import { REGULATION_CASES } from '../data/casesData';
import { Award, CheckCircle2, User, ChevronRight, Sparkles, FileSpreadsheet } from 'lucide-react';
import { sound } from '../utils/audio';
import { SenaLogo } from './SenaLogo';
import { useLanguage } from '../context/LanguageContext';

interface ApprenticeHeaderProps {
  profile: ApprenticeProfile;
  onEditProfile: () => void;
  onOpenCarnet: () => void;
  onOpenGoogleSheets?: () => void;
  userRole?: 'instructor' | 'aprendiz';
  instructorName?: string;
  onReturnToInstructor?: () => void;
}

export const ApprenticeHeader: React.FC<ApprenticeHeaderProps> = ({
  profile,
  onEditProfile,
  onOpenCarnet,
  onOpenGoogleSheets,
  userRole = 'aprendiz',
  instructorName = 'Blas Thorrens',
  onReturnToInstructor
}) => {
  const { t } = useLanguage();
  const currentLevel = getLevelForXp(profile.xp);
  const totalModules = INDUCTION_MODULES.length;
  const completedModules = profile.completedModuleIds.length;
  const totalCases = REGULATION_CASES.length;
  const completedCases = profile.completedCaseIds.length;

  // Global Induction progress (50% from modules, 50% from cases)
  const modulesPct = (completedModules / totalModules) * 50;
  const casesPct = (completedCases / totalCases) * 50;
  const globalProgress = Math.round(modulesPct + casesPct);

  // Level progress
  const xpInCurrentLevel = profile.xp - currentLevel.minXp;
  const xpNeededForLevel = currentLevel.maxXp - currentLevel.minXp;
  const levelProgressPct = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForLevel) * 100));

  return (
    <div className="bg-gradient-to-r from-slate-900 via-[#002233] to-[#00324D] dark:from-slate-950 dark:via-[#001724] dark:to-[#002538] text-white py-5 px-4 sm:px-6 lg:px-8 border-b border-emerald-950/40 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#39A900_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-3">
        
        {/* Leadership Banner for Apprentice */}
        <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse"></span>
            <span>{t('header.trainingPath')}</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400 font-semibold">{t('header.instructorResponsible')}: {instructorName}</span>
          </div>

          {userRole === 'instructor' && onReturnToInstructor && (
            <button
              onClick={onReturnToInstructor}
              className="text-[11px] font-bold text-amber-300 hover:text-amber-200 underline flex items-center gap-1 cursor-pointer"
            >
              {t('header.returnToInstructor')}
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Apprentice details */}
          <div className="flex items-start sm:items-center gap-4">
            <div 
              onClick={() => { sound.playClick(); onOpenCarnet(); }}
              className="relative cursor-pointer group"
              title={t('header.viewCarnet')}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#39A900] to-[#59C31C] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-900 dark:bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-white overflow-hidden p-1">
                  <SenaLogo size={34} scale={0.7} color="#59C31C" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#39A900] text-[10px] font-black text-slate-950 px-1.5 py-0.5 rounded-full border-2 border-slate-900 shadow-xs">
                {t('common.level')} {currentLevel.level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  {profile.name}
                </h1>
                <button
                  onClick={() => { sound.playClick(); onEditProfile(); }}
                  className="text-xs text-emerald-300 hover:text-emerald-100 underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <User className="w-3 h-3" />
                  {t('header.editProfile')}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 flex-wrap mt-1">
                <span className="font-semibold text-emerald-400">Ficha {profile.ficha}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="truncate max-w-[280px] sm:max-w-md">{profile.program}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span>{profile.regional}</span>
              </div>

              {/* Level perk note */}
              <p className="text-[11px] text-emerald-200/80 mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#39A900]" />
                <span>Rango: <strong className="text-white">{currentLevel.title}</strong> ({profile.xp} XP)</span>
              </p>
            </div>
          </div>

          {/* Right: Progress Trackers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-6 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
            
            {/* Global Induction Progress */}
            <div className="min-w-[160px]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                  {t('header.globalProgress')}
                </span>
                <span className="font-extrabold text-emerald-400">{globalProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-[#39A900] to-[#59C31C] transition-all duration-500 rounded-full"
                  style={{ width: `${globalProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                <span>{completedModules}/{totalModules} {t('header.modulesProgress')}</span>
                <span>{completedCases}/{totalCases} {t('header.casesProgress')}</span>
              </div>
            </div>

            {/* Level XP Progress */}
            <div className="min-w-[160px] border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4 pt-2 sm:pt-0">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">{t('header.levelProgress')}</span>
                <span className="font-bold text-amber-300">{levelProgressPct}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500 rounded-full"
                  style={{ width: `${levelProgressPct}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                {currentLevel.level < 5 ? (
                  <span>{Math.max(0, currentLevel.maxXp - profile.xp)} XP {t('common.xp')}</span>
                ) : (
                  <span className="text-emerald-400 font-bold">Max Level!</span>
                )}
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex items-center gap-2 self-center sm:self-auto">
              {/* Google Drive Sheet Button is EXCLUSIVELY for the instructor */}
              {userRole === 'instructor' && onOpenGoogleSheets && (
                <button
                  onClick={() => { sound.playClick(); onOpenGoogleSheets(); }}
                  title={t('nav.googleDrive')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md border border-emerald-400/30 transition-all hover:scale-102 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                  <span>Google Drive</span>
                </button>
              )}

              <button
                onClick={() => { sound.playClick(); onOpenCarnet(); }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#39A900] hover:bg-[#329600] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>{t('nav.carnetDigital')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
