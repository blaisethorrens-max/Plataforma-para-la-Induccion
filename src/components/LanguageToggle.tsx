import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
  variant?: 'navbar' | 'compact' | 'pill';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  variant = 'navbar'
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  const isEs = language === 'es';
  const tooltipText = t('lang.toggleTitle');

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleLanguage}
        title={tooltipText}
        aria-label={tooltipText}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer ${className}`}
      >
        <Languages className="w-4 h-4 text-[#39A900]" />
        <span className="flex items-center gap-1 font-mono tracking-wider">
          <span className={`transition-colors font-bold ${isEs ? 'text-[#39A900]' : 'text-slate-400 dark:text-slate-500'}`}>
            ES
          </span>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className={`transition-colors font-bold ${!isEs ? 'text-[#39A900]' : 'text-slate-400 dark:text-slate-500'}`}>
            EN
          </span>
        </span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        title={tooltipText}
        aria-label={tooltipText}
        className={`p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer ${className}`}
      >
        <Languages className="w-4 h-4 text-[#39A900]" />
        <span className="text-xs font-black uppercase text-[#39A900]">
          {language}
        </span>
      </button>
    );
  }

  // Default navbar variant with segmented pill indicator
  return (
    <button
      onClick={toggleLanguage}
      title={tooltipText}
      aria-label={tooltipText}
      className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer ${className}`}
    >
      <Languages className="w-4 h-4 text-[#39A900] group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Segmented language indicator */}
      <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200/80 dark:border-slate-700/60 text-[11px] font-mono font-black">
        <span
          className={`px-1.5 py-0.5 rounded transition-all duration-200 ${
            isEs
              ? 'bg-[#39A900] text-slate-950 font-black shadow-xs'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          ES
        </span>
        <span
          className={`px-1.5 py-0.5 rounded transition-all duration-200 ${
            !isEs
              ? 'bg-[#39A900] text-slate-950 font-black shadow-xs'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          EN
        </span>
      </div>
    </button>
  );
};
