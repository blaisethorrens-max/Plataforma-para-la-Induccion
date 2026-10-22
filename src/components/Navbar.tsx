import React from 'react';
import { 
  BookOpen, 
  Gavel, 
  Zap, 
  Search, 
  Award, 
  Volume2, 
  VolumeX, 
  Bot, 
  Sparkles,
  Flame,
  IdCard,
  Sun,
  Moon,
  FileSpreadsheet,
  Youtube
} from 'lucide-react';
import { ApprenticeProfile } from '../types';
import { getLevelForXp } from '../data/badgesData';
import { sound } from '../utils/audio';
import { SenaLogo } from './SenaLogo';
import { ShieldCheck, UserCheck, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: ApprenticeProfile;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenMentor: () => void;
  onOpenCarnet: () => void;
  onOpenGoogleSheets: () => void;
  userRole: 'instructor' | 'aprendiz';
  onSwitchRole: () => void;
  onOpenInstructorLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  soundEnabled,
  setSoundEnabled,
  darkMode,
  onToggleDarkMode,
  onOpenMentor,
  onOpenCarnet,
  onOpenGoogleSheets,
  userRole,
  onSwitchRole,
  onOpenInstructorLogin
}) => {
  const currentLevel = getLevelForXp(profile.xp);


  const navItems = [
    { id: 'modules', label: 'Ruta de Inducción', icon: BookOpen },
    { id: 'cases', label: 'Tribunal del Reglamento', icon: Gavel, badge: 'Casos 2024-2026' },
    { id: 'quiz', label: 'Desafíos por Niveles', icon: Zap },
    { id: 'glossary', label: 'Glosario SENA', icon: Search },
    { id: 'certificate', label: 'Carnet & Certificado', icon: Award }
  ];

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Identity with Official SENA Logo at 70% scale */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => { sound.playClick(); setActiveTab('modules'); }}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="SENA - Servicio Nacional de Aprendizaje"
            >
              {/* Official SENA Logo Container at 70% size */}
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <SenaLogo size={42} scale={0.7} color="#39A900" />
              </div>

              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">SENA</span>
                  <span className="text-[10px] font-bold text-[#39A900] tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    Inducción 2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Reglamento 2024 · Acuerdo 2026
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(item.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-600'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#39A900]' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="hidden xl:inline text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-900/40 px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Stats & Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* XP Pill */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/80 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
              <span>{profile.xp} XP</span>
            </div>

            {/* Level Badge */}
            <div 
              onClick={onOpenCarnet}
              title="Ver tu carnet y estado de nivel"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse"></div>
              <span>Nvl {currentLevel.level}: {currentLevel.badgeName}</span>
            </div>

            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-amber-800 dark:text-amber-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{profile.streakDays}d racha</span>
            </div>

            {/* Digital ID Quick Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCarnet();
              }}
              title="Ver Carnet Digital SENA"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#39A900] dark:hover:text-[#59C31C] hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-slate-700"
              aria-label="Carnet Digital"
            >
              <IdCard className="w-4 h-4" />
            </button>

            {/* Role-based actions: Google Drive is EXCLUSIVELY for the Instructor Blas Thorrens */}
            {userRole === 'instructor' ? (
              <>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('instructor_dashboard');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'instructor_dashboard'
                      ? 'bg-[#00324D] text-white shadow-xs'
                      : 'bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200/80'
                  }`}
                  title="Panel de Control y Monitoreo del Instructor"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
                  <span className="hidden sm:inline">Panel Instructor</span>
                  <span className="sm:hidden">Instructor</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenGoogleSheets();
                  }}
                  title="Almacenamiento de Aprendices en Google Drive & Sheets (Exclusivo Instructor)"
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700/80 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-all shadow-2xs group"
                  aria-label="Google Sheets en Drive"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Google Drive</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden md:inline-block" title="Sincronización activa"></span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenInstructorLogin();
                }}
                title="Acceso restringido para el Instructor Blas Thorrens"
                className="flex items-center gap-1.5 px-2.5 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-200 dark:border-slate-700"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Soy Instructor</span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? 'Silenciar efectos sonoros' : 'Activar efectos sonoros'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Sonido"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#39A900]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* DARK MODE TOGGLE (UPPER RIGHT CORNER WITH SCREEN BLUR EFFECT) */}
            <button
              onClick={onToggleDarkMode}
              title={darkMode ? 'Cambiar a modo claro (con efecto blur)' : 'Cambiar a modo oscuro (con efecto blur)'}
              className={`p-2 rounded-xl transition-all duration-300 relative border ${
                darkMode
                  ? 'bg-amber-400/10 text-amber-300 border-amber-400/30 hover:bg-amber-400/20 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 shadow-2xs'
              }`}
              aria-label="Alternar Modo Oscuro"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:text-[#39A900]" />
              )}
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenMentor();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00324D] hover:bg-[#002538] dark:bg-[#002235] dark:hover:bg-[#001724] text-white text-xs font-bold rounded-lg shadow-sm transition-all hover:shadow border border-emerald-500/20"
            >
              <Bot className="w-4 h-4 text-[#59C31C]" />
              <span className="hidden sm:inline">Tutor SENA</span>
            </button>
            <a
              href="https://www.youtube.com/@blasthorrensmendoza3413"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
              title="Visita mi canal de YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(item.id);
                }}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-[#39A900] font-bold' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate max-w-[65px]">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
