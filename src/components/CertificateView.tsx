import React from 'react';
import { 
  Award, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  QrCode, 
  AlertCircle,
  IdCard,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApprenticeProfile } from '../types';
import { getInductionModules } from '../data/modulesData';
import { getRegulationCases } from '../data/casesData';
import { getBadges, getLevelForXp } from '../data/badgesData';
import { sound } from '../utils/audio';
import { SenaLogo } from './SenaLogo';
import { useLanguage } from '../context/LanguageContext';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  onEditProfile: () => void;
  onOpenCarnet: () => void;
  onOpenGoogleSheets?: () => void;
  userRole?: 'instructor' | 'aprendiz';
  instructorName?: string;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  onEditProfile,
  onOpenCarnet,
  onOpenGoogleSheets,
  userRole = 'aprendiz',
  instructorName = 'Blas Thorrens'
}) => {
  const { t, language } = useLanguage();
  const currentLevel = getLevelForXp(profile.xp, language);
  const modules = getInductionModules(language);
  const cases = getRegulationCases(language);
  const badges = getBadges(language);

  const totalModules = modules.length;
  const completedModules = profile.completedModuleIds.length;
  const totalCases = cases.length;
  const completedCases = profile.completedCaseIds.length;

  const isEligible = completedModules >= 4 && completedCases >= 3;
  const isCompleteHonor = completedModules === totalModules && completedCases === totalCases;

  const handlePrintCertificate = () => {
    sound.playSuccess();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const todayFormatted = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const verificationHash = `SENA-IND-${profile.ficha}-${(profile.documentId || '9999').slice(-4)}-VERIFIED`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs no-print transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-[#39A900]" />
              {language === 'en' ? 'Institutional Accreditation' : 'Acreditación Institucional'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'en' ? 'Induction Certification & Digital ID Card' : 'Certificación de Inducción & Carnet Digital'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {language === 'en'
                ? 'Upon completing interactive modules and resolving Disciplinary Tribunal cases, you obtain your official induction credentials certified by SENA.'
                : 'Al completar los módulos interactivos y superar los casos del Tribunal Disciplinario, obtienes tu constancia oficial de inducción validada por el SENA.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            {/* Google Drive Sheet Button is EXCLUSIVELY for the instructor */}
            {userRole === 'instructor' && onOpenGoogleSheets && (
              <button
                onClick={() => { sound.playClick(); onOpenGoogleSheets(); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
                title="Gestión de Hoja en Google Drive (Exclusivo Instructor)"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'en' ? 'Sheet on Drive' : 'Hoja en Drive'}</span>
              </button>
            )}

            <button
              onClick={() => { sound.playClick(); onOpenCarnet(); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <IdCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'en' ? 'View Digital ID' : 'Ver Carnet Virtual'}</span>
            </button>

            <button
              onClick={handlePrintCertificate}
              disabled={!isEligible}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isEligible
                  ? 'bg-[#39A900] hover:bg-[#329600] text-slate-950 shadow-md hover:scale-102 cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'en' ? 'Print / Save PDF' : 'Imprimir / Guardar PDF'}</span>
            </button>
          </div>
        </div>

        {/* Eligibility Status Alert */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {isEligible ? (
              <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            )}
            <span className={isEligible ? 'text-emerald-900 dark:text-emerald-300 font-bold' : 'text-slate-600 dark:text-slate-400'}>
              {isEligible 
                ? (isCompleteHonor 
                    ? (language === 'en' ? 'Approval with SENA Honors of Excellence!' : '¡Aprobación con Honores de Excelencia SENA!')
                    : (language === 'en' ? 'Minimum requirements reached: Certificate enabled.' : 'Requisitos mínimos alcanzados: Certificado habilitado.'))
                : (language === 'en'
                    ? `Complete at least 4 modules (${completedModules}/${totalModules}) and 3 Tribunal cases (${completedCases}/${totalCases}) to issue your certificate.`
                    : `Completa al menos 4 módulos (${completedModules}/${totalModules}) y 3 casos del Tribunal (${completedCases}/${totalCases}) para emitir tu certificado.`
                  )
              }
            </span>
          </div>

          <button
            onClick={() => { sound.playClick(); onEditProfile(); }}
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 underline font-semibold self-start sm:self-auto cursor-pointer"
          >
            {language === 'en' ? 'Update name or cohort' : 'Actualizar nombre o ficha'}
          </button>
        </div>
      </div>

      {/* Official SENA Induction Certificate Template */}
      <div 
        id="sena-certificate"
        className="bg-white border-8 border-double border-emerald-900/30 rounded-3xl p-8 sm:p-14 shadow-lg relative overflow-hidden"
      >
        {/* Subtle Watermark background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none select-none">
          <svg className="w-96 h-96 fill-current text-slate-900" viewBox="0 0 24 24">
            <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm-1 16l-4-4 1.41-1.41L11 15.17l6.59-6.59L19 10l-8 8z"/>
          </svg>
        </div>

        {/* Certificate Header */}
        <div className="text-center space-y-2 border-b-2 border-emerald-800/20 pb-8 relative z-10">
          <div className="flex items-center justify-center gap-3">
            {/* SENA Official Logo at 70% scale */}
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
              <SenaLogo size={52} scale={0.7} color="#39A900" />
            </div>
          </div>

          <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#00324D] mt-2">
            {language === 'en' ? 'Republic of Colombia · Ministry of Labor' : 'República de Colombia · Ministerio del Trabajo'}
          </p>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            SERVICIO NACIONAL DE APRENDIZAJE - SENA
          </h1>
          <p className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            {language === 'en'
              ? 'Integral Professional Training Directorate · Quality Management System'
              : 'Dirección de Formación Profesional Integral · Sistema de Gestión de Calidad'}
          </p>
        </div>

        {/* Certificate Body Text */}
        <div className="py-10 text-center space-y-6 relative z-10">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            {language === 'en' ? 'Certifies that apprentice' : 'Hace constar que el aprendiz'}
          </p>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#00324D] tracking-tight font-display">
              {profile.name || (language === 'en' ? 'APPRENTICE NAME' : 'NOMBRE DEL APRENDIZ')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {language === 'en' ? 'Identified with' : 'Identificado(a) con'} {profile.documentType} N° <strong className="text-slate-900">{profile.documentId || 'XXXXXXXX'}</strong>
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
            {language === 'en'
              ? <>Has satisfactorily completed and passed the comprehensive program of <strong>Induction and Adaptation to the SENA Educational Environment</strong>, having demonstrated competence in understanding institutional culture, ethical values, the Integral Vocational Training (FPI) model, and the disciplinary regime under the <strong>SENA Apprentice Regulations (2024 Version with 2026 Agreement)</strong>.</>
              : <>Ha cursado y aprobado satisfactoriamente el programa integral de <strong>Inducción y Adaptación al Entorno Educativo SENA</strong>, habiendo demostrado idoneidad en la comprensión de la cultura institucional, valores éticos, el modelo de Formación Profesional Integral (FPI), y el régimen disciplinario del <strong>Reglamento del Aprendiz SENA (Versión 2024 con Acuerdo Complementario de 2026)</strong>.</>
            }
          </p>

          {/* Program and Campus Details */}
          <div className="max-w-xl mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'en' ? 'Training Program' : 'Programa de Formación'}
              </span>
              <span className="font-bold text-slate-900">{profile.program}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'en' ? 'Cohort Number' : 'Ficha de Caracterización'}
              </span>
              <span className="font-mono font-bold text-emerald-800">{profile.ficha}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'en' ? 'SENA Regional' : 'Regional SENA'}
              </span>
              <span className="font-semibold text-slate-800">{profile.regional}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'en' ? 'Training Center' : 'Centro de Formación'}
              </span>
              <span className="font-semibold text-slate-800">{profile.centro}</span>
            </div>
          </div>
        </div>

        {/* Certificate Signatures & Verification */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center relative z-10">
          
          {/* Instructor Signature */}
          <div className="space-y-1">
            <div className="w-36 h-10 border-b border-slate-400 mx-auto flex items-end justify-center pb-1 text-[#00324D] italic text-xs font-serif font-bold">
              {instructorName}
            </div>
            <p className="text-xs font-bold text-slate-900">{instructorName}</p>
            <p className="text-[10px] text-slate-500">
              {language === 'en' ? 'Lead Induction Instructor' : 'Instructor Líder de Inducción'}
            </p>
          </div>

          {/* QR Code Validation Stamp */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200">
            <QrCode className="w-12 h-12 text-slate-800" />
            <span className="text-[9px] font-mono text-slate-500 mt-1 break-all">
              {verificationHash}
            </span>
            <span className="text-[9px] font-bold text-emerald-700 mt-0.5">
              {language === 'en' ? 'Verified Digital Signature' : 'Firma Digital Verificada'}
            </span>
          </div>

          {/* Issue Date */}
          <div className="space-y-1">
            <div className="w-36 h-10 border-b border-slate-400 mx-auto flex items-end justify-center pb-1 text-slate-400 italic text-xs font-serif">
              Certificado Digital SENA
            </div>
            <p className="text-xs font-bold text-slate-900">
              {language === 'en' ? `Issued on ${todayFormatted}` : `Expedido el ${todayFormatted}`}
            </p>
            <p className="text-[10px] text-slate-500">
              {language === 'en' ? 'National Validity in SofiaPlus' : 'Validez Nacional en SofiaPlus'}
            </p>
          </div>

        </div>

      </div>

      {/* Badges and Honors Showcase */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs no-print transition-colors">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#39A900]" />
          {language === 'en' ? 'Achievement Badges & Apprentice Medal Stand' : 'Insignias de Logro & Medallero del Aprendiz'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          {language === 'en'
            ? 'Honors and recognitions earned across induction modules and tribunal dockets.'
            : 'Reconocimientos ganados a lo largo de los módulos y expedientes del tribunal.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b) => {
            const isUnlocked = profile.unlockedBadgeIds.includes(b.id) || 
                               (b.id === 'badge-bienvenida') ||
                               (b.id === 'badge-identidad' && profile.completedModuleIds.includes('mod-1')) ||
                               (b.id === 'badge-fpi' && profile.completedModuleIds.includes('mod-2')) ||
                               (b.id === 'badge-digital' && profile.completedModuleIds.includes('mod-3')) ||
                               (b.id === 'badge-juez-novato' && profile.completedCaseIds.length >= 1) ||
                               (b.id === 'badge-juez-experto' && profile.completedCaseIds.length >= 6) ||
                               (b.id === 'badge-guardian-etico' && profile.completedCaseIds.length >= 8) ||
                               (b.id === 'badge-induccion-master' && isEligible);

            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200/90 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isUnlocked ? 'bg-[#39A900] text-slate-950 font-bold' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{b.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{b.description}</p>
                  {isUnlocked && (
                    <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/60 px-1.5 py-0.2 rounded mt-1.5 inline-block">
                      {language === 'en' ? 'Unlocked' : 'Desbloqueada'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
