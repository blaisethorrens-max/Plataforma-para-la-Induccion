import React from 'react';
import { UserCheck, GraduationCap } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface RoleSelectionProps {
  onSelectRole: (role: 'instructor' | 'aprendiz') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative transition-colors duration-200">
      
      {/* Top Language Toggle Bar */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <LanguageToggle variant="pill" />
      </div>

      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 p-8 space-y-8 text-center transition-colors">
        <div className="flex justify-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
            <SenaLogo size={76} color="#39A900" />
          </div>
        </div>

        <div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80 inline-block mb-2">
            {t('app.inductionYear')}
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('role.welcome')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('app.regulation')}
          </p>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t('role.selectPrompt')}
        </p>

        <div className="grid gap-4">
          <button
            onClick={() => onSelectRole('instructor')}
            className="group flex items-center gap-4 p-5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-2xl transition-all text-left shadow-md hover:shadow-lg hover:scale-101 border border-slate-800 dark:border-slate-700 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#39A900] transition-colors">
              <UserCheck className="w-6 h-6 text-emerald-400 group-hover:text-slate-950 transition-colors" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base flex items-center justify-between">
                <span>{t('role.instructorTitle')}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold uppercase">Admin</span>
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-300 mt-0.5 leading-relaxed">
                {t('role.instructorDesc')}
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectRole('aprendiz')}
            className="group flex items-center gap-4 p-5 bg-white dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:border-[#39A900] dark:hover:border-[#39A900] hover:bg-emerald-50/40 dark:hover:bg-slate-800 transition-all text-left shadow-xs hover:shadow-md hover:scale-101 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#39A900] transition-colors">
              <GraduationCap className="w-6 h-6 text-[#39A900] group-hover:text-slate-950 transition-colors" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
                <span>{t('role.apprenticeTitle')}</span>
                <span className="text-[10px] text-[#39A900] font-mono font-semibold uppercase">Estudiante</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                {t('role.apprenticeDesc')}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
