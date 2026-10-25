import React, { useState, useEffect } from 'react';
import { ApprenticeProfile } from './types';
import { Navbar } from './components/Navbar';
import { ApprenticeHeader } from './components/ApprenticeHeader';
import { ModulesView } from './components/ModulesView';
import { CasesSimulatorView } from './components/CasesSimulatorView';
import { SpeedQuizView } from './components/SpeedQuizView';
import { GlossaryView } from './components/GlossaryView';
import { CertificateView } from './components/CertificateView';
import { CarnetModal } from './components/CarnetModal';
import { MentorModal } from './components/MentorModal';
import { EditProfileModal } from './components/EditProfileModal';
import { GoogleSheetsSyncModal } from './components/GoogleSheetsSyncModal';
import { InstructorDashboard } from './components/InstructorDashboard';
import { InstructorAccessModal } from './components/InstructorAccessModal';
import { getLevelForXp } from './data/badgesData';
import { sound } from './utils/audio';
import { SenaLogo } from './components/SenaLogo';
import { getAccessToken } from './services/googleAuth';
import { syncApprenticeToSheet, getStoredSheetInfo, StoredSheetInfo } from './services/googleSheetsService';
import { sendWhatsAppNotification } from './services/whatsappService';
import { INSTRUCTOR_DEFAULT, INITIAL_COHORT_STUDENTS, CohortApprentice } from './data/cohortData';
import { ShieldCheck, Lock } from 'lucide-react';
import { RoleSelection } from './components/RoleSelection';
import { ApprenticeRegistration } from './components/ApprenticeRegistration';
import { useLanguage } from './context/LanguageContext';

const STORAGE_KEY = 'sena_induction_apprentice_v3';
const THEME_KEY = 'sena_induction_theme';
const ROLE_KEY = 'sena_active_user_role';
const COHORT_STORAGE_KEY = 'sena_cohort_students_v1';

const DEFAULT_PROFILE: ApprenticeProfile = {
  name: '',
  documentId: '',
  documentType: 'CC',
  ficha: '',
  program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  regional: 'Regional Distrito Capital',
  centro: 'Centro de Gestión de Mercados, Logística y TIC',
  avatarSeed: 'sena-user-1',
  xp: 0,
  streakDays: 0,
  completedModuleIds: [],
  completedCaseIds: [],
  caseDecisions: {},
  unlockedBadgeIds: [],
  quizHighScore: 0,
  whatsappNumber: ''
};

export default function App() {
  const { t } = useLanguage();
  const [roleSelected, setRoleSelected] = useState<boolean>(() => !!localStorage.getItem(ROLE_KEY));
  const [isRegistered, setIsRegistered] = useState<boolean>(() => !!localStorage.getItem(STORAGE_KEY));
  const [userRole, setUserRole] = useState<'instructor' | 'aprendiz'>(() => (localStorage.getItem(ROLE_KEY) as 'instructor' | 'aprendiz') || 'aprendiz');
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {}
      return DEFAULT_PROFILE;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [isBlurActive, setIsBlurActive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(() => userRole === 'instructor' ? 'instructor_dashboard' : 'modules');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.enabled);
  const [cohort, setCohort] = useState<CohortApprentice[]>(() => {
    try {
      const saved = localStorage.getItem(COHORT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_COHORT_STUDENTS;
  });

  const [sheetInfo, setSheetInfo] = useState<StoredSheetInfo | null>(getStoredSheetInfo);

  // Modals state
  const [isCarnetOpen, setIsCarnetOpen] = useState<boolean>(false);
  const [isMentorOpen, setIsMentorOpen] = useState<boolean>(false);
  const [mentorInitialPrompt, setMentorInitialPrompt] = useState<string>('');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isGoogleSheetsOpen, setIsGoogleSheetsOpen] = useState<boolean>(false);
  const [isInstructorLoginOpen, setIsInstructorLoginOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(ROLE_KEY, userRole);
    localStorage.setItem(COHORT_STORAGE_KEY, JSON.stringify(cohort));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [userRole, cohort, profile]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [darkMode]);

  const autoSyncToSheets = async (targetProfile: ApprenticeProfile) => {
    try {
      const token = await getAccessToken();
      const sheet = getStoredSheetInfo();
      if (token && sheet?.spreadsheetId) {
        await syncApprenticeToSheet(token, sheet.spreadsheetId, targetProfile);
      }
    } catch (syncErr) {
      console.warn('Google Sheets background sync notice:', syncErr);
    }
  };

  const handleToggleDarkMode = () => {
    sound.playClick();
    setIsBlurActive(true);
    setDarkMode(prev => !prev);
    setTimeout(() => setIsBlurActive(false), 400);
  };

  const addXpAndCheck = (prevProfile: ApprenticeProfile, addedXp: number): ApprenticeProfile => {
    const oldLevel = getLevelForXp(prevProfile.xp);
    const newXp = prevProfile.xp + addedXp;
    const newLevel = getLevelForXp(newXp);
    if (newLevel.level > oldLevel.level) sound.playLevelUp();
    return { ...prevProfile, xp: newXp };
  };

  const handleCompleteModule = (moduleId: string, earnedXp: number) => {
    setProfile(prev => {
      if (prev.completedModuleIds.includes(moduleId)) return prev;
      const updatedModules = [...prev.completedModuleIds, moduleId];
      const withXp = addXpAndCheck(prev, earnedXp);
      const next = { ...withXp, completedModuleIds: updatedModules };
      autoSyncToSheets(next);
      sendWhatsAppNotification(next.whatsappNumber, `¡Felicitaciones ${next.name}! Has completado el módulo ${moduleId}. Sigue adelante.`);
      return next;
    });
  };

  const handleRecordCaseDecision = (caseId: string, severityCorrect: boolean, sanctionCorrect: boolean, earnedXp: number) => {
    setProfile(prev => {
      const isNewCompletion = !prev.completedCaseIds.includes(caseId);
      const updatedCaseIds = isNewCompletion ? [...prev.completedCaseIds, caseId] : prev.completedCaseIds;
      const withXp = addXpAndCheck(prev, isNewCompletion ? earnedXp : 15);
      const updatedDecisions = { ...prev.caseDecisions, [caseId]: { severityCorrect, sanctionCorrect, timestamp: new Date().toISOString() } };
      const next = { ...withXp, completedCaseIds: updatedCaseIds, caseDecisions: updatedDecisions };
      autoSyncToSheets(next);
      return next;
    });
  };

  const handleRecordQuizScore = (score: number, earnedXp: number) => {
    setProfile(prev => {
      const withXp = addXpAndCheck(prev, earnedXp);
      const next = { ...withXp, quizHighScore: Math.max(prev.quizHighScore, score) };
      autoSyncToSheets(next);
      return next;
    });
  };

  const handleSaveProfile = (updated: Partial<ApprenticeProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updated };
      autoSyncToSheets(next);
      return next;
    });
  };

  const handleOpenMentorWithPrompt = (prompt: string) => {
    setMentorInitialPrompt(prompt);
    setIsMentorOpen(true);
  };

  const handleRoleSelection = (role: 'instructor' | 'aprendiz') => {
    setUserRole(role);
    localStorage.setItem(ROLE_KEY, role);
    setRoleSelected(true);
    if (role === 'instructor') {
      setIsInstructorLoginOpen(true);
    }
  };

  const handleRegistration = (data: Partial<ApprenticeProfile>) => {
    const updated = { ...profile, ...data };
    setProfile(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsRegistered(true);
  };

  if (!roleSelected) {
    return <RoleSelection onSelectRole={handleRoleSelection} />;
  }

  if (userRole === 'aprendiz' && !isRegistered) {
    return <ApprenticeRegistration onComplete={handleRegistration} />;
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased transition-colors duration-300 ${isBlurActive ? 'screen-blur-effect' : ''}`}>
      {userRole === 'instructor' && (
        <div className="bg-slate-950 text-slate-200 border-b border-emerald-900/60 px-4 py-2 text-xs flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#39A900] text-slate-950 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-white tracking-wide">
              {t('bar.instructor')}: <strong className="text-emerald-400">{INSTRUCTOR_DEFAULT.name}</strong>
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 font-mono hidden sm:inline">{INSTRUCTOR_DEFAULT.email}</span>
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="text-xs text-slate-400 hover:text-white underline transition-colors cursor-pointer"
          >
            {t('bar.logout')}
          </button>
        </div>
      )}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenMentor={() => { setMentorInitialPrompt(''); setIsMentorOpen(true); }}
        onOpenCarnet={() => setIsCarnetOpen(true)}
        onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)}
        userRole={userRole}
        onSwitchRole={() => {}}
        onOpenInstructorLogin={() => setIsInstructorLoginOpen(true)}
      />
      <main className="flex-1 pb-16">
        {activeTab === 'instructor_dashboard' && userRole === 'instructor' && (
          <InstructorDashboard instructor={INSTRUCTOR_DEFAULT} cohort={cohort} activeLearnerProfile={profile} sheetInfo={sheetInfo} onOpenGoogleSheetsModal={() => setIsGoogleSheetsOpen(true)} onSwitchToApprenticeView={() => setActiveTab('modules')} />
        )}
        {activeTab !== 'instructor_dashboard' && (
          <>
            <ApprenticeHeader profile={profile} onEditProfile={() => setIsEditProfileOpen(true)} onOpenCarnet={() => setIsCarnetOpen(true)} onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)} userRole={userRole} instructorName={INSTRUCTOR_DEFAULT.name} onReturnToInstructor={() => {setUserRole('instructor'); setActiveTab('instructor_dashboard');}} />
            {activeTab === 'modules' && <ModulesView profile={profile} onCompleteModule={handleCompleteModule} onGoToCases={() => setActiveTab('cases')} />}
            {activeTab === 'cases' && <CasesSimulatorView profile={profile} onRecordCaseDecision={handleRecordCaseDecision} onOpenMentorWithPrompt={handleOpenMentorWithPrompt} />}
            {activeTab === 'quiz' && <SpeedQuizView profile={profile} onRecordQuizScore={handleRecordQuizScore} />}
            {activeTab === 'glossary' && <GlossaryView onAskMentorAboutTerm={handleOpenMentorWithPrompt} />}
            {activeTab === 'certificate' && <CertificateView profile={profile} onEditProfile={() => setIsEditProfileOpen(true)} onOpenCarnet={() => setIsCarnetOpen(true)} onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)} userRole={userRole} instructorName={INSTRUCTOR_DEFAULT.name} />}
          </>
        )}
      </main>

      {/* Footer with institutional credits */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-6 border-t border-slate-800 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
              <SenaLogo size={36} scale={0.7} color="#39A900" />
            </div>
            <div>
              <p className="font-bold text-white">{t('footer.institution')}</p>
              <p className="text-[11px] text-slate-400">
                {t('footer.description')} · {t('bar.instructor')}: <strong>{INSTRUCTOR_DEFAULT.name}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center">
            {userRole === 'instructor' && (
              <button
                onClick={() => {
                  if (window.confirm('¿Deseas reiniciar el progreso del prototipo? / Do you want to reset prototype progress?')) {
                    sound.playClick();
                    setProfile(DEFAULT_PROFILE);
                    localStorage.removeItem(STORAGE_KEY);
                  }
                }}
                className="text-slate-500 hover:text-red-400 transition-colors underline cursor-pointer"
              >
                {t('footer.resetPrototype')}
              </button>
            )}
          </div>
        </div>
      </footer>
      <CarnetModal isOpen={isCarnetOpen} onClose={() => setIsCarnetOpen(false)} profile={profile} onEditProfile={() => { setIsCarnetOpen(false); setIsEditProfileOpen(true); }} />
      <MentorModal isOpen={isMentorOpen} onClose={() => setIsMentorOpen(false)} initialPrompt={mentorInitialPrompt} />
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} profile={profile} onSaveProfile={handleSaveProfile} />
      <GoogleSheetsSyncModal isOpen={isGoogleSheetsOpen} onClose={() => { setIsGoogleSheetsOpen(false); setSheetInfo(getStoredSheetInfo()); }} profile={profile} />
      <InstructorAccessModal isOpen={isInstructorLoginOpen} onClose={() => { if (userRole === 'instructor' && !localStorage.getItem(ROLE_KEY)) setRoleSelected(false); setIsInstructorLoginOpen(false); }} onSuccess={() => { setIsInstructorLoginOpen(false); setUserRole('instructor'); setActiveTab('instructor_dashboard'); }} />
    </div>
  );
}
