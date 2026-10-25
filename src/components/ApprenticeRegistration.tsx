import React, { useState } from 'react';
import { User, BookOpen, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { ApprenticeProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { SenaLogo } from './SenaLogo';

interface ApprenticeRegistrationProps {
  onComplete: (profile: Partial<ApprenticeProfile>) => void;
}

export const ApprenticeRegistration: React.FC<ApprenticeRegistrationProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    documentId: '',
    ficha: '',
    whatsappNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative transition-colors duration-200">
      
      {/* Top Language Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <LanguageToggle variant="pill" />
      </div>

      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 p-8 space-y-6 transition-colors">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 mb-1">
            <SenaLogo size={48} scale={0.7} color="#39A900" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('reg.title')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('reg.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              {t('reg.fullName')}
            </label>
            <input 
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
              placeholder={t('reg.fullNamePlaceholder')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                {t('reg.docId')}
              </label>
              <input 
                required
                value={formData.documentId}
                onChange={e => setFormData(prev => ({ ...prev, documentId: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] font-mono text-slate-900 dark:text-white transition-colors"
                placeholder={t('reg.docIdPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                {t('reg.ficha')}
              </label>
              <input 
                required
                value={formData.ficha}
                onChange={e => setFormData(prev => ({ ...prev, ficha: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] font-mono font-bold text-slate-900 dark:text-white transition-colors"
                placeholder={t('reg.fichaPlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>{t('reg.whatsapp')}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold lowercase">Alertas & Guías</span>
            </label>
            <div className="relative">
              <input 
                required
                type="tel"
                value={formData.whatsappNumber}
                onChange={e => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] font-mono text-slate-900 dark:text-white transition-colors"
                placeholder="+57 300 123 4567"
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-snug">
              {t('reg.whatsappHelper')}
            </p>
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 bg-[#39A900] hover:bg-[#329600] text-slate-950 py-3 rounded-xl font-black text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t('reg.submit')}</span>
            <Sparkles className="w-4 h-4 text-slate-950" />
          </button>
        </form>
      </div>
    </div>
  );
};
