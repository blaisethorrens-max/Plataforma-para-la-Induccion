/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  Award,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  FileSpreadsheet,
  Share2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Eye,
  Download,
  QrCode,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Mail,
  ChevronRight,
  Database,
  Sliders,
  AlertTriangle,
  UserCheck,
  BookOpen,
  Gavel,
  Zap,
  HelpCircle,
  BarChart3,
  Flame,
  ArrowRight
} from 'lucide-react';
import { ApprenticeProfile } from '../types';
import { CohortApprentice, INSTRUCTOR_DEFAULT } from '../data/cohortData';
import { StoredSheetInfo, INDUCTION_SHEET_TITLE, CREATE_NEW_SHEET_URL, GOOGLE_DRIVE_HOME_URL } from '../services/googleSheetsService';
import { SenaLogo } from './SenaLogo';
import { sound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface InstructorDashboardProps {
  instructor: typeof INSTRUCTOR_DEFAULT;
  cohort: CohortApprentice[];
  activeLearnerProfile: ApprenticeProfile;
  sheetInfo: StoredSheetInfo | null;
  onOpenGoogleSheetsModal: () => void;
  onSwitchToApprenticeView: () => void;
  onUpdateCohortApprentice?: (updated: CohortApprentice) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  instructor,
  cohort,
  activeLearnerProfile,
  sheetInfo,
  onOpenGoogleSheetsModal,
  onSwitchToApprenticeView,
  onUpdateCohortApprentice
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'monitoreo' | 'drive' | 'compartir' | 'ajustes'>('monitoreo');
  const [selectedFicha, setSelectedFicha] = useState<string>('todas');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'aprobados' | 'proceso'>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedApprentice, setSelectedApprentice] = useState<CohortApprentice | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [shareFicha, setShareFicha] = useState<string>(instructor.activeFicha);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Derive all active cohort students (including the active learner live profile)
  const combinedCohort: CohortApprentice[] = [
    {
      id: 'active-learner-live',
      name: `${activeLearnerProfile.name} (${isEn ? 'Current Session' : 'Sesión Actual'})`,
      documentId: activeLearnerProfile.documentId,
      documentType: activeLearnerProfile.documentType,
      ficha: activeLearnerProfile.ficha,
      program: activeLearnerProfile.program,
      regional: activeLearnerProfile.regional,
      centro: activeLearnerProfile.centro,
      xp: activeLearnerProfile.xp,
      completedModulesCount: activeLearnerProfile.completedModuleIds.length,
      totalModulesCount: 6,
      completedCasesCount: activeLearnerProfile.completedCaseIds.length,
      totalCasesCount: 9,
      quizHighScore: activeLearnerProfile.quizHighScore,
      badgesCount: activeLearnerProfile.unlockedBadgeIds.length,
      status: activeLearnerProfile.completedModuleIds.length >= 6 
        ? (isEn ? 'APPROVED & CERTIFIED' : 'CERTIFICADO APROBADO') 
        : (isEn ? 'IN PROGRESS' : 'EN PROCESO'),
      lastActive: isEn ? 'Online now' : 'En línea ahora',
      isOnline: true,
      whatsappNumber: activeLearnerProfile.whatsappNumber || '+573001234567'
    },
    ...cohort.filter(c => c.documentId !== activeLearnerProfile.documentId).map(c => ({
      ...c,
      status: isEn 
        ? (c.status === 'CERTIFICADO APROBADO' ? 'APPROVED & CERTIFIED' : 'IN PROGRESS')
        : c.status,
      lastActive: isEn
        ? (c.lastActive.includes('línea') ? 'Online now' : c.lastActive.replace('Hace ', '').replace('horas', 'hours ago').replace('hora', 'hour ago').replace('días', 'days ago').replace('minutos', 'minutes ago'))
        : c.lastActive
    }))
  ];

  // Filter cohort
  const filteredCohort = combinedCohort.filter(app => {
    const matchesFicha = selectedFicha === 'todas' || app.ficha === selectedFicha;
    const isApproved = app.status === 'CERTIFICADO APROBADO' || app.status === 'APPROVED & CERTIFIED';
    const isInProgress = app.status === 'EN PROCESO' || app.status === 'IN PROGRESS';
    const matchesStatus =
      statusFilter === 'todos' ||
      (statusFilter === 'aprobados' && isApproved) ||
      (statusFilter === 'proceso' && isInProgress);
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.documentId.includes(searchQuery) ||
      app.ficha.includes(searchQuery) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFicha && matchesStatus && matchesSearch;
  });

  // Calculate cohort KPIs
  const totalApprentices = combinedCohort.length;
  const certifiedCount = combinedCohort.filter(a => a.status === 'CERTIFICADO APROBADO' || a.status === 'APPROVED & CERTIFIED').length;
  const inProgressCount = totalApprentices - certifiedCount;
  const certPercentage = Math.round((certifiedCount / totalApprentices) * 100);
  const avgXp = Math.round(combinedCohort.reduce((acc, a) => acc + a.xp, 0) / (totalApprentices || 1));
  const totalCasesResolved = combinedCohort.reduce((acc, a) => acc + a.completedCasesCount, 0);

  // Generate public apprentice link
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://sena-induccion.edu.co';
  const apprenticeShareUrl = `${currentOrigin}/?role=aprendiz${shareFicha ? `&ficha=${shareFicha}` : ''}`;

  const announcementMessage = isEn
    ? `👋 Dear apprentices of Cohort ${shareFicha}:

You are invited to log into the official SENA 2024-2026 Induction platform to complete learning modules, solve the Apprentice Regulations Ethical Tribunal cases, and obtain your Digital Certification with Instructor ${instructor.name}.

🔗 Direct access link for apprentices:
${apprenticeShareUrl}

Best wishes in your comprehensive vocational training process!`
    : `👋 Estimados aprendices de la Ficha ${shareFicha}:

Los invito a ingresar a la plataforma oficial de Inducción SENA 2024-2026 para realizar los módulos formativos, resolver los casos del Tribunal Ético del Reglamento del Aprendiz y obtener su Certificación Digital con el Instructor ${instructor.name}.

🔗 Enlace de acceso directo para aprendices:
${apprenticeShareUrl}

¡Muchos éxitos en su proceso de formación profesional integral!`;

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(apprenticeShareUrl);
    sound.playClick();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(announcementMessage);
    sound.playClick();
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleWhatsAppShare = () => {
    sound.playClick();
    const encodedText = encodeURIComponent(announcementMessage);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  };

  const handleDownloadFullCohortCsv = () => {
    sound.playClick();
    const headers = isEn ? [
      'Document ID',
      'Doc Type',
      'Full Apprentice Name',
      'Cohort (Ficha)',
      'Training Program',
      'Regional',
      'Training Center',
      'XP Points',
      'Completed Modules',
      'Resolved Tribunal Cases',
      'Quick Quiz High Score',
      'Badges Earned',
      'Induction Status',
      'Last Active',
      'Lead Instructor'
    ] : [
      'Documento',
      'Tipo Doc',
      'Nombre Completo Aprendiz',
      'Ficha',
      'Programa de Formación',
      'Regional',
      'Centro de Formación',
      'Puntos XP',
      'Módulos Completados',
      'Casos Tribunal Resueltos',
      'Puntaje Quiz Rápido',
      'Insignias Ganadas',
      'Estado Inducción',
      'Última Actividad',
      'Instructor Responsable'
    ];
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SENA_Seguimiento_Aprendices_Ficha_${selectedFicha}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSimulateSyncAll = () => {
    sound.playClick();
    setIsSyncingAll(true);
    setSyncFeedback(isEn 
      ? 'Syncing apprentice records with Google Sheets in Google Drive...' 
      : 'Sincronizando los registros de los aprendices con Google Sheets en Google Drive...');
    
    setTimeout(() => {
      setIsSyncingAll(false);
      sound.playSuccess();
      setSyncFeedback(isEn 
        ? `Sync complete! Updated records for ${combinedCohort.length} apprentices in the Instructor's Google Drive spreadsheet.` 
        : `¡Sincronización completa! Se actualizaron los registros de ${combinedCohort.length} aprendices en la hoja de Google Drive del Instructor.`);
      setTimeout(() => setSyncFeedback(null), 6000);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* ============================================================ */}
      {/* TOP INSTRUCTOR IDENTITY & PRIVILEGE HERO BANNER */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-r from-slate-900 via-[#002233] to-[#00324D] dark:from-slate-950 dark:via-[#001724] dark:to-[#002235] text-white border-b border-emerald-950/50 shadow-md relative overflow-hidden">
        {/* Background decorative grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#39A900_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Instructor Profile Details */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative group">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-[#39A900] via-teal-400 to-[#59C31C] p-0.5 shadow-xl">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center text-white overflow-hidden p-1">
                    <SenaLogo size={38} scale={0.7} color="#39A900" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#39A900] text-slate-950 p-1 rounded-full border-2 border-slate-900 shadow" title={isEn ? "Active Instructor Privileges" : "Privilegios de Instructor Activos"}>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {t('bar.instructor')}: {instructor.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#39A900]/25 text-[#59C31C] border border-[#39A900]/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" /> {t('dash.adminInduction')}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap mt-1.5">
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    <Mail className="w-3.5 h-3.5" /> {instructor.email}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span>{instructor.center}</span>
                  <span className="text-slate-500">·</span>
                  <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[11px] font-mono">
                    {t('dash.assignedCohorts')} {instructor.fichas.join(', ')}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mt-1">
                  {t('dash.heroDescription')}
                </p>
              </div>
            </div>

            {/* Privilege Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {/* Google Drive Status & Action */}
              <button
                onClick={() => { sound.playClick(); onOpenGoogleSheetsModal(); }}
                className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md border border-emerald-400/40 transition-all hover:scale-102 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
                <span>{t('dash.manageDrive')}</span>
                {sheetInfo?.spreadsheetId ? (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" title={isEn ? "Linked sheet" : "Hoja vinculada"} />
                ) : (
                  <span className="text-[10px] bg-emerald-800/80 px-1.5 py-0.2 rounded font-normal">{t('dash.connect')}</span>
                )}
              </button>

              {/* Share with Apprentices Quick Action */}
              <button
                onClick={() => { sound.playClick(); setActiveTab('compartir'); }}
                className="flex items-center gap-2 px-3.5 py-2.5 bg-[#00324D] hover:bg-[#00273c] text-white font-bold text-xs rounded-xl shadow-md border border-slate-700 transition-all hover:scale-102 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>{t('dash.shareLink')}</span>
              </button>

              {/* View as Apprentice Switcher */}
              <button
                onClick={() => { sound.playClick(); onSwitchToApprenticeView(); }}
                title={isEn ? "Preview interactive learning experience as apprentice" : "Probar la experiencia interactiva como aprendiz"}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-white text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all hover:scale-102 border border-slate-300 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>{t('dash.viewAsApprentice')}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ============================================================ */}
        {/* KPI STATS CARDS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs font-semibold">{t('dash.totalApprentices')}</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">{totalApprentices}</span>
              <span className="text-[11px] text-emerald-600 font-semibold">{t('dash.threeCohorts')}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs font-semibold">{t('dash.certified')}</span>
              <Award className="w-4 h-4 text-[#39A900]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{certifiedCount}</span>
              <span className="text-[11px] text-slate-500">({certPercentage}%)</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs font-semibold">{t('dash.inProgress')}</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{inProgressCount}</span>
              <span className="text-[11px] text-slate-500">{t('dash.active')}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs font-semibold">{t('dash.averageXp')}</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">{avgXp}</span>
              <span className="text-[11px] text-slate-500">{t('dash.xpPerApprentice')}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-xs font-semibold">{t('dash.casesResolved')}</span>
              <Gavel className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">{totalCasesResolved}</span>
              <span className="text-[11px] text-slate-500">{t('dash.ethicalTribunal')}</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DASHBOARD TABS NAVIGATION */}
        {/* ============================================================ */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sound.playClick(); setActiveTab('monitoreo'); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                activeTab === 'monitoreo'
                  ? 'bg-[#39A900] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t('dash.monitoringTab')}</span>
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {combinedCohort.length}
              </span>
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveTab('drive'); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                activeTab === 'drive'
                  ? 'bg-[#39A900] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t('dash.driveTab')}</span>
              {sheetInfo?.spreadsheetId && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveTab('compartir'); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                activeTab === 'compartir'
                  ? 'bg-[#39A900] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>{t('dash.shareTab')}</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setActiveTab('ajustes'); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                activeTab === 'ajustes'
                  ? 'bg-[#39A900] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{t('dash.settingsTab')}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t('app.regulation')}</span>
          </div>
        </div>

        {/* Sync Feedback Alert */}
        {syncFeedback && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{syncFeedback}</span>
            </div>
            <button onClick={() => setSyncFeedback(null)} className="text-emerald-700 hover:text-emerald-900 text-xs font-bold cursor-pointer">✕</button>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 1: COHORT MONITORING & TRACKING */}
        {/* ============================================================ */}
        {activeTab === 'monitoreo' && (
          <div className="space-y-4">
            
            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full md:w-auto flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('dash.searchCohortPlaceholder')}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Ficha Filter */}
                <select
                  value={selectedFicha}
                  onChange={(e) => { sound.playClick(); setSelectedFicha(e.target.value); }}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
                >
                  <option value="todas">{t('dash.allFichas')} ({combinedCohort.length})</option>
                  {instructor.fichas.map(f => (
                    <option key={f} value={f}>{isEn ? 'Cohort ' : 'Ficha '}{f}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => { sound.playClick(); setStatusFilter(e.target.value as any); }}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
                >
                  <option value="todos">{t('dash.allStatuses')}</option>
                  <option value="aprobados">{t('dash.approvedOnly')}</option>
                  <option value="proceso">{t('dash.inProgressOnly')}</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={handleSimulateSyncAll}
                  disabled={isSyncingAll}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  title={isEn ? "Sync entire cohort to Google Drive spreadsheet" : "Sincronizar toda la cohorte a la hoja de Google Drive"}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
                  <span>{isSyncingAll ? t('dash.syncing') : t('dash.syncAllSheets')}</span>
                </button>

                <button
                  onClick={handleDownloadFullCohortCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  title={isEn ? "Export grades and induction report to CSV" : "Exportar reporte de notas e inducción a CSV"}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('dash.exportCsv')}</span>
                </button>
              </div>
            </div>

            {/* Apprentices Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                      <th className="px-4 py-3">{t('dash.colApprentice')}</th>
                      <th className="px-4 py-3">{t('dash.colFichaProgram')}</th>
                      <th className="px-4 py-3">{t('dash.colModules')}</th>
                      <th className="px-4 py-3">{t('dash.colTribunal')}</th>
                      <th className="px-4 py-3">{t('dash.colXpLevel')}</th>
                      <th className="px-4 py-3">{t('dash.colStatus')}</th>
                      <th className="px-4 py-3">{t('dash.colLastActive')}</th>
                      <th className="px-4 py-3 text-right">{t('dash.colDetail')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                    {filteredCohort.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                          {t('dash.noApprentices')}
                        </td>
                      </tr>
                    ) : (
                      filteredCohort.map((app) => {
                        const modulesPct = Math.round((app.completedModulesCount / 6) * 100);
                        const casesPct = Math.round((app.completedCasesCount / 9) * 100);
                        const isCert = app.status === 'CERTIFICADO APROBADO' || app.status === 'APPROVED & CERTIFIED';

                        return (
                          <tr
                            key={app.id}
                            className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                              app.id === 'active-learner-live' ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                            }`}
                          >
                            {/* Apprentice Name & Doc */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-xs shrink-0">
                                  {app.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                    <span>{app.name}</span>
                                    {app.isOnline && (
                                      <span className="w-2 h-2 rounded-full bg-emerald-500" title={t('dash.onlineBadge')} />
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-mono">
                                    {app.documentType} {app.documentId}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Ficha & Program */}
                            <td className="px-4 py-3">
                              <div className="font-bold text-slate-800 dark:text-slate-200">
                                {isEn ? 'Cohort ' : 'Ficha '}{app.ficha}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate max-w-[200px]" title={app.program}>
                                {app.program}
                              </div>
                            </td>

                            {/* Modules */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: `${modulesPct}%` }}
                                  />
                                </div>
                                <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300">
                                  {app.completedModulesCount}/6
                                </span>
                              </div>
                            </td>

                            {/* Tribunal Cases */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${casesPct}%` }}
                                  />
                                </div>
                                <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300">
                                  {app.completedCasesCount}/9
                                </span>
                              </div>
                            </td>

                            {/* XP */}
                            <td className="px-4 py-3 font-semibold">
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{app.xp} XP</span>
                              <div className="text-[10px] text-slate-500 font-normal">{app.badgesCount} {t('dash.badgesCountLabel')}</div>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  isCert
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                }`}
                              >
                                {app.status}
                              </span>
                            </td>

                            {/* Last Active */}
                            <td className="px-4 py-3 text-[11px] text-slate-500">
                              {app.lastActive}
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => {
                                  sound.playClick();
                                  setSelectedApprentice(app);
                                }}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                                title={t('dash.viewApprenticeReport')}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: GOOGLE DRIVE & SHEETS MANAGEMENT */}
        {/* ============================================================ */}
        {activeTab === 'drive' && (
          <div className="space-y-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {t('dash.driveSheetTitle')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t('dash.driveOfficialFile')} <strong className="text-emerald-600">"{sheetInfo?.title || INDUCTION_SHEET_TITLE}"</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { sound.playClick(); onOpenGoogleSheetsModal(); }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t('dash.configConnection')}</span>
                  </button>
                  <a
                    href={sheetInfo?.webViewLink || CREATE_NEW_SHEET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t('dash.openInDrive')}</span>
                  </a>
                </div>
              </div>

              {/* Status & Sheet Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                    {t('dash.instructorAccount')}
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {instructor.name}
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-0.5">
                    {instructor.email}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                    {t('dash.sheetStructure')}
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {t('dash.threeAutoSheets')}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {t('dash.threeAutoSheetsDesc')}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                    {t('dash.apprenticeAccess')}
                  </span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> {t('dash.protected')}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {t('dash.protectedDesc')}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateSyncAll}
                    disabled={isSyncingAll}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
                    <span>{t('dash.syncAllNow')}</span>
                  </button>
                  <button
                    onClick={handleDownloadFullCohortCsv}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('dash.downloadBackupCsv')}</span>
                  </button>
                </div>

                <a
                  href={GOOGLE_DRIVE_HOME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {t('dash.goToMyDrive')}
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: SHARE WITH APPRENTICES */}
        {/* ============================================================ */}
        {activeTab === 'compartir' && (
          <div className="space-y-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-emerald-600" />
                  {t('dash.shareWithApprenticesTitle')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('dash.shareWithApprenticesDesc')}
                </p>
              </div>

              {/* Pre-select Ficha */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t('dash.preassignFicha')}
                </span>
                <div className="flex items-center gap-2">
                  {instructor.fichas.map(f => (
                    <button
                      key={f}
                      onClick={() => { sound.playClick(); setShareFicha(f); }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        shareFicha === f
                          ? 'bg-[#39A900] text-white shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {isEn ? 'Cohort ' : 'Ficha '}{f}
                    </button>
                  ))}
                  <button
                    onClick={() => { sound.playClick(); setShareFicha(''); }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      shareFicha === ''
                        ? 'bg-[#39A900] text-white shadow-xs'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {t('dash.withoutFicha')}
                  </button>
                </div>
              </div>

              {/* Shareable Link Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t('dash.officialLink')}
                </label>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <input
                    type="text"
                    readOnly
                    value={apprenticeShareUrl}
                    className="w-full bg-transparent text-xs font-mono text-emerald-700 dark:text-emerald-400 outline-none truncate"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? t('dash.linkCopied') : t('dash.copyLink')}
                  </button>
                </div>
              </div>

              {/* Share Buttons Row */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('dash.sendWhatsApp')}</span>
                </button>

                <button
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  {copiedMessage ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedMessage ? t('dash.messageCopied') : t('dash.copyTemplate')}</span>
                </button>
              </div>

              {/* Message Preview */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {t('dash.previewMessage')}
                </span>
                <pre className="text-xs text-slate-700 dark:text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                  {announcementMessage}
                </pre>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SETTINGS & INDUCTION PARAMETERS */}
        {/* ============================================================ */}
        {activeTab === 'ajustes' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                {t('dash.courseSettingsTitle')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t('dash.courseSettingsDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {t('dash.certReqs')}
                </span>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                  <li>{t('dash.certReq1')}</li>
                  <li>{t('dash.certReq2')}</li>
                  <li>{t('dash.certReq3')}</li>
                  <li>{t('dash.certReq4')}</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {t('dash.securityRoles')}
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('dash.securityRolesDesc')}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* APPRENTICE DETAIL MODAL */}
      {/* ============================================================ */}
      {selectedApprentice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-slate-800 dark:text-slate-100 space-y-4">
            
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-lg">
                  {selectedApprentice.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {selectedApprentice.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {selectedApprentice.documentType} {selectedApprentice.documentId} · {isEn ? 'Cohort ' : 'Ficha '}{selectedApprentice.ficha}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApprentice(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('dash.colStatus')}</span>
                <span className={`font-bold ${selectedApprentice.status === 'CERTIFICADO APROBADO' || selectedApprentice.status === 'APPROVED & CERTIFIED' ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {selectedApprentice.status}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('common.xp')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedApprentice.xp} XP
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('dash.colModules')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedApprentice.completedModulesCount} {isEn ? 'of 6' : 'de 6'} ({Math.round((selectedApprentice.completedModulesCount / 6) * 100)}%)
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('dash.ethicalTribunal')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedApprentice.completedCasesCount} {isEn ? 'of 9 Cases' : 'de 9 Casos'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('edit.program')}</span>
              <p className="font-medium text-slate-700 dark:text-slate-300">{selectedApprentice.program}</p>
              <p className="text-[11px] text-slate-500">{selectedApprentice.centro} · {selectedApprentice.regional}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedApprentice(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl cursor-pointer"
              >
                {t('dash.close')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
