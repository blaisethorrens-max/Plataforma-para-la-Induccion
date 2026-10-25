import React from 'react';
import { X, Award } from 'lucide-react';
import { ApprenticeProfile } from '../types';
import { getLevelForXp } from '../data/badgesData';
import { sound } from '../utils/audio';
import { SenaLogo } from './SenaLogo';
import { useLanguage } from '../context/LanguageContext';

interface CarnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onEditProfile: () => void;
}

export const CarnetModal: React.FC<CarnetModalProps> = ({
  isOpen,
  onClose,
  profile,
  onEditProfile
}) => {
  const { t, language } = useLanguage();
  if (!isOpen) return null;

  const currentLevel = getLevelForXp(profile.xp, language);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto transition-colors">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#39A900] animate-pulse"></div>
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              {language === 'en' ? 'SENA Apprentice Digital ID (2026)' : 'Carnet Digital del Aprendiz SENA (2026)'}
            </span>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Card Itself */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-[#00324D] via-[#002235] to-[#0f172a] text-white rounded-2xl p-6 shadow-xl border border-white/10 relative overflow-hidden">
            
            {/* Hologram / watermark accent */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#39A900]/20 rounded-full blur-2xl pointer-events-none"></div>

            {/* Header: Institutional SENA */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-xs">
                  <SenaLogo size={36} scale={0.7} color="#59C31C" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-widest uppercase text-white">SENA</h4>
                  <p className="text-[9px] text-emerald-300 font-semibold tracking-wider uppercase">Colombia</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300 block">
                  {language === 'en' ? 'Identification' : 'Identificación'}
                </span>
                <span className="text-xs font-extrabold text-[#59C31C]">
                  {language === 'en' ? 'APPRENTICE' : 'APRENDIZ'}
                </span>
              </div>
            </div>

            {/* Mid Section: Photo + Main Info */}
            <div className="flex items-start gap-4">
              
              {/* Photo box */}
              <div className="w-20 h-24 rounded-xl bg-slate-800 border-2 border-[#39A900] flex flex-col items-center justify-center text-center p-1 relative shrink-0 shadow-md">
                <span className="text-2xl font-black text-[#39A900]">
                  {(profile.name || 'A').charAt(0).toUpperCase()}
                </span>
                <span className="text-[8px] font-semibold text-slate-400 mt-1 uppercase">SENA</span>
                <div className="absolute -bottom-2 bg-emerald-500 text-[8px] font-bold text-slate-950 px-1.5 py-0.2 rounded-full">
                  {language === 'en' ? 'ACTIVE' : 'ACTIVO'}
                </div>
              </div>

              {/* Data fields */}
              <div className="flex-1 space-y-2 text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-medium block">
                    {language === 'en' ? 'Full Name' : 'Nombres y Apellidos'}
                  </span>
                  <span className="font-bold text-white text-sm leading-tight block truncate">
                    {profile.name || (language === 'en' ? 'Apprentice Name' : 'Nombre del Aprendiz')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-medium block">
                      {language === 'en' ? 'ID Number' : 'Documento'}
                    </span>
                    <span className="font-mono font-bold text-emerald-300 text-xs">
                      {profile.documentType} {profile.documentId || 'XXXXXXXX'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-medium block">
                      {language === 'en' ? 'Cohort' : 'Ficha'}
                    </span>
                    <span className="font-mono font-bold text-white text-xs">{profile.ficha}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-medium block">
                    {language === 'en' ? 'Program' : 'Programa'}
                  </span>
                  <p className="text-[11px] font-semibold text-slate-200 line-clamp-2 leading-tight">
                    {profile.program}
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Bar: Barcode and Regional */}
            <div className="border-t border-white/15 pt-3 mt-4 flex items-center justify-between text-[10px] text-slate-300">
              <div>
                <span className="block text-[8px] text-slate-400 uppercase">
                  {language === 'en' ? 'Center / Regional' : 'Centro / Regional'}
                </span>
                <span className="font-medium text-white truncate max-w-[170px] block">
                  {profile.regional}
                </span>
              </div>

              {/* Simulated barcode */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-0.5 h-6">
                  {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 1, 4, 2].map((w, i) => (
                    <div 
                      key={i} 
                      className="bg-white h-full" 
                      style={{ width: `${w}px` }}
                    ></div>
                  ))}
                </div>
                <span className="font-mono text-[8px] text-slate-400 tracking-widest mt-0.5">
                  *{profile.ficha}*
                </span>
              </div>
            </div>

          </div>

          {/* Gamification Level Footer */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 mt-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#39A900]" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {language === 'en' ? 'Level' : 'Nivel'} {currentLevel.level}: {currentLevel.title}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {profile.xp} {language === 'en' ? 'Accumulated XP points' : 'Puntos XP acumulados'}
                </span>
              </div>
            </div>
            <button
              onClick={() => { sound.playClick(); onEditProfile(); }}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold underline cursor-pointer"
            >
              {language === 'en' ? 'Edit details' : 'Editar datos'}
            </button>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-2 mt-5">
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Close Digital ID' : 'Cerrar Carnet'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
