/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Database,
  ShieldCheck,
  ArrowRight,
  Table,
  Layers,
  Sparkles,
  Download,
  AlertTriangle,
  HelpCircle,
  FolderOpen,
  MousePointerClick
} from 'lucide-react';
import { ApprenticeProfile } from '../types';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
  getAccessToken,
  parseAuthError
} from '../services/googleAuth';
import {
  findOrCreateInductionSheet,
  syncApprenticeToSheet,
  getStoredSheetInfo,
  saveStoredSheetInfo,
  StoredSheetInfo,
  APPRENTICE_HEADERS,
  TRIBUNAL_HEADERS,
  AUDIT_LOG_HEADERS,
  buildPreviewRows,
  INDUCTION_SHEET_TITLE,
  CREATE_NEW_SHEET_URL,
  GOOGLE_DRIVE_HOME_URL,
  DEFAULT_TEMPLATE_SHEET_URL,
  downloadApprenticeCsv,
  extractSpreadsheetId
} from '../services/googleSheetsService';
import { sound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface GoogleSheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSyncSuccess?: () => void;
}

export const GoogleSheetsSyncModal: React.FC<GoogleSheetsSyncModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSyncSuccess
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [sheetInfo, setSheetInfo] = useState<StoredSheetInfo | null>(getStoredSheetInfo);
  const [copiedLink, setCopiedLink] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [popupBlockedNotice, setPopupBlockedNotice] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'aprendices' | 'tribunal' | 'bitacora'>('aprendices');
  
  // Custom Sheet ID input
  const [customSheetId, setCustomSheetId] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribe = initAuth(
      (user) => {
        setCurrentUser(user);
      },
      () => {
        setCurrentUser(null);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update sheetInfo from localStorage if available
  useEffect(() => {
    if (isOpen) {
      const stored = getStoredSheetInfo();
      if (stored) {
        setSheetInfo(stored);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSheetUrl = sheetInfo?.webViewLink || (sheetInfo?.spreadsheetId ? `https://docs.google.com/spreadsheets/d/${sheetInfo.spreadsheetId}/edit` : null);

  const displaySheetUrl = currentSheetUrl || DEFAULT_TEMPLATE_SHEET_URL;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(displaySheetUrl);
    sound.playClick();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleGoogleSignInDirect = async () => {
    setPopupBlockedNotice(false);
    setIsSigningIn(true);
    setSyncStatusMsg(null);
    try {
      // Direct call immediately in user interaction stack
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setPopupBlockedNotice(false);
        setSyncStatusMsg({
          type: 'info',
          text: `Conectado como ${result.user.displayName || result.user.email}. Buscando u organizando hoja en Drive...`
        });

        // Automatically find or create the Induction Sheet
        const info = await findOrCreateInductionSheet(result.accessToken);
        setSheetInfo(info);

        // Perform initial sync of current apprentice
        setIsSyncing(true);
        await syncApprenticeToSheet(result.accessToken, info.spreadsheetId, profile);
        sound.playSuccess();
        setSyncStatusMsg({
          type: 'success',
          text: '¡Hoja de cálculo creada y datos del aprendiz sincronizados con éxito en Google Drive!'
        });
        if (onSyncSuccess) onSyncSuccess();
      }
    } catch (err: any) {
      console.error('Error en autenticación o creación de Google Sheets:', err);
      const parsed = parseAuthError(err);
      if (parsed.isPopupBlocked) {
        setPopupBlockedNotice(true);
        setSyncStatusMsg({
          type: 'error',
          text: 'El navegador bloqueó la ventana emergente de inicio de sesión de Google (auth/popup-blocked).'
        });
      } else if (parsed.isUserCancelled) {
        setSyncStatusMsg({
          type: 'info',
          text: 'Se canceló la ventana de autenticación.'
        });
      } else {
        setSyncStatusMsg({
          type: 'error',
          text: err.message || 'Error al conectar con Google Drive / Sheets. Por favor, intenta de nuevo.'
        });
      }
    } finally {
      setIsSigningIn(false);
      setIsSyncing(false);
    }
  };

  const handleManualSync = async () => {
    sound.playClick();
    setIsSyncing(true);
    setSyncStatusMsg(null);

    try {
      let token = await getAccessToken();
      if (!token) {
        const result = await googleSignIn();
        if (!result) return;
        token = result.accessToken;
        setCurrentUser(result.user);
      }

      let activeSheet = sheetInfo;
      if (!activeSheet || !activeSheet.spreadsheetId) {
        activeSheet = await findOrCreateInductionSheet(token);
        setSheetInfo(activeSheet);
      }

      const res = await syncApprenticeToSheet(token, activeSheet.spreadsheetId, profile);
      sound.playSuccess();
      setSheetInfo(prev => prev ? { ...prev, lastSyncedAt: new Date().toISOString() } : prev);
      setSyncStatusMsg({
        type: 'success',
        text: `¡Datos sincronizados correctamente! Fila actualizada #${res.rowNumber} en Google Sheets.`
      });
      if (onSyncSuccess) onSyncSuccess();
    } catch (err: any) {
      console.error('Error sincronizando con Google Sheets:', err);
      const parsed = parseAuthError(err);
      if (parsed.isPopupBlocked) {
        setPopupBlockedNotice(true);
      }
      setSyncStatusMsg({
        type: 'error',
        text: err.message || 'No se pudo sincronizar los datos en este momento.'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogout = async () => {
    sound.playClick();
    await logoutGoogle();
    setCurrentUser(null);
    setPopupBlockedNotice(false);
    setSyncStatusMsg({
      type: 'info',
      text: 'Sesión de Google cerrada.'
    });
  };

  const handleAttachCustomSheet = () => {
    if (!customSheetId.trim()) return;
    sound.playClick();
    const cleanedId = extractSpreadsheetId(customSheetId);
    
    if (!cleanedId) {
      setSyncStatusMsg({
        type: 'error',
        text: 'No se pudo reconocer un ID o URL válida de Google Spreadsheet. Por favor verifica el enlace.'
      });
      return;
    }

    const newInfo: StoredSheetInfo = {
      spreadsheetId: cleanedId,
      webViewLink: `https://docs.google.com/spreadsheets/d/${cleanedId}/edit`,
      title: 'Hoja de Cálculo SENA Vinculada',
      createdAt: new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
      totalSyncedApprentices: 1
    };

    setSheetInfo(newInfo);
    saveStoredSheetInfo(newInfo);
    setShowCustomInput(false);
    setPopupBlockedNotice(false);
    sound.playSuccess();
    setSyncStatusMsg({
      type: 'success',
      text: `¡Hoja de cálculo (${cleanedId}) vinculada con éxito! Puedes abrirla con el botón "Abrir Hoja".`
    });
  };

  const handleDownloadCsv = () => {
    sound.playClick();
    downloadApprenticeCsv(profile);
    setSyncStatusMsg({
      type: 'success',
      text: '¡Archivo CSV descargado con éxito! Puedes importarlo directamente en Google Drive o abrirlo en Google Sheets / Excel.'
    });
  };

  const previewRows = buildPreviewRows(profile);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-[#39A900] to-teal-700 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-inner">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight">
                  {isEn ? 'Google Drive & Sheets Storage' : 'Almacenamiento en Google Drive & Sheets'}
                </h3>
                <span className="bg-white/25 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {isEn ? 'Induction 2024-2026' : 'Inducción 2024-2026'}
                </span>
              </div>
              <p className="text-xs text-emerald-50 text-slate-200">
                {isEn 
                  ? 'Real-time cloud persistence for apprentices, regulations tribunal ratings, and digital certificates.'
                  : 'Estructura de persistencia en tiempo real para aprendices, calificaciones del tribunal y certificados.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Status Message */}
          {syncStatusMsg && !popupBlockedNotice && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed transition-all ${
                syncStatusMsg.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                  : syncStatusMsg.type === 'error'
                  ? 'bg-red-50 dark:bg-red-950/50 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200'
                  : 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200'
              }`}
            >
              {syncStatusMsg.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : syncStatusMsg.type === 'error' ? (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
              ) : (
                <Database className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
              )}
              <div className="flex-1">
                <p className="font-semibold">{syncStatusMsg.text}</p>
              </div>
            </div>
          )}

          {/* DEDICATED POPUP-BLOCKED RESOLUTION CARD */}
          {popupBlockedNotice && (
            <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400/80 dark:border-amber-700/80 rounded-2xl p-5 space-y-4 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-amber-950 dark:text-amber-200 flex items-center gap-2">
                    Solución al error: Ventana emergente bloqueada por el navegador (auth/popup-blocked)
                  </h4>
                  <p className="text-xs text-amber-900/80 dark:text-amber-300/90 leading-relaxed">
                    Tu navegador (Chrome, Edge, Safari, Firefox) bloqueó la ventana emergente de inicio de sesión de Google porque esta aplicación se ejecuta dentro de un marco de vista previa seguro (iframe).
                  </p>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-4 border border-amber-200 dark:border-amber-800/60 space-y-3">
                <p className="font-semibold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MousePointerClick className="w-4 h-4 text-emerald-600" />
                  Elige una de las siguientes soluciones rápidas:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Option A: Allow in address bar */}
                  <div className="bg-amber-50/60 dark:bg-slate-800/60 p-3 rounded-lg border border-amber-200/60 dark:border-slate-700 space-y-2">
                    <span className="font-bold text-amber-900 dark:text-amber-300 block">
                      Opción 1: Habilitar en barra de direcciones
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      <li>Mira arriba a la derecha de la barra de URL de tu navegador.</li>
                      <li>Haz clic en el icono de <strong className="text-red-600">Pop-up bloqueado 🚫</strong>.</li>
                      <li>Selecciona <strong className="text-emerald-600">"Permitir siempre ventanas emergentes"</strong> y haz clic en <strong>Listo</strong>.</li>
                      <li>Haz clic en el botón verde de abajo para reintentar.</li>
                    </ol>
                    <button
                      onClick={handleGoogleSignInDirect}
                      disabled={isSigningIn}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs shadow-sm transition-all"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSigningIn ? 'animate-spin' : ''}`} />
                      {isSigningIn ? 'Abriendo Google...' : 'Reintentar Abrir Ventana de Google'}
                    </button>
                  </div>

                  {/* Option B: Direct Drive Sheet / CSV Fallback */}
                  <div className="bg-emerald-50/60 dark:bg-slate-800/60 p-3 rounded-lg border border-emerald-200/60 dark:border-slate-700 space-y-2">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                      Opción 2: Abrir o Crear Hoja Directamente
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      Puedes crear una hoja en Google Drive con 1 clic, o descargar tus datos en formato CSV listo para importar en Google Sheets:
                    </p>
                    <div className="flex flex-col gap-2 pt-1">
                      <a
                        href={CREATE_NEW_SHEET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#00324D] hover:bg-[#002235] text-white font-semibold rounded-lg text-xs shadow-sm transition-all"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        Crear Nueva Hoja en Drive ↗
                      </a>
                      <button
                        onClick={handleDownloadCsv}
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg text-xs transition-all"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        Descargar Datos en CSV
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dismiss notice */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setPopupBlockedNotice(false)}
                    className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
                  >
                    Ocultar esta advertencia
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Auth & Connection Card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              {currentUser ? (
                <>
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Google User'}
                      className="w-12 h-12 rounded-full border-2 border-emerald-500 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                      {(currentUser.displayName || currentUser.email || 'G')[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {currentUser.displayName || 'Usuario de Google'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Conectado a Drive
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {currentUser.email}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      Conectar con Google Workspace (Drive & Sheets)
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Inicia sesión para sincronizar automáticamente el progreso del aprendiz en tu Google Drive.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              {currentUser ? (
                <>
                  <button
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Sincronizando...' : 'Sincronizar Ahora'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                    title="Cerrar sesión de Google"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleGoogleSignInDirect}
                  disabled={isSigningIn}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-xs rounded-xl shadow-sm transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  {isSigningIn ? 'Conectando con Google...' : 'Acceder con Google'}
                </button>
              )}
            </div>
          </div>

          {/* SPREADSHEET LINK & ACCESS CARD (User Primary Focus!) */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500 text-white">
                    <FileSpreadsheet className="w-4 h-4" />
                  </span>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Enlace de la Hoja de Cálculo en Google Drive
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Documento: <span className="font-semibold text-emerald-600 dark:text-emerald-400">"{sheetInfo?.title || INDUCTION_SHEET_TITLE}"</span>
                </p>
              </div>

              {sheetInfo?.lastSyncedAt && (
                <div className="text-right sm:text-right text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Última sincronización:</span>
                  <p>{new Date(sheetInfo.lastSyncedAt).toLocaleString('es-CO')}</p>
                </div>
              )}
            </div>

            {/* Direct Link Input Box */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center gap-2 shadow-inner">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/60 rounded border border-emerald-200 dark:border-emerald-800 select-none shrink-0">
                  URL
                </span>
                <input
                  type="text"
                  readOnly
                  value={displaySheetUrl}
                  className="w-full bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200 outline-none truncate"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors shrink-0"
                  title="Copiar enlace"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? 'Copiado' : 'Copiar'}
                </button>
                
                {currentSheetUrl ? (
                  <a
                    href={currentSheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Abrir Hoja ↗
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <a
                      href={CREATE_NEW_SHEET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00324D] hover:bg-[#002235] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors shrink-0"
                      title="Crear nueva hoja en Google Drive"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      Crear en Drive ↗
                    </a>
                    <button
                      onClick={handleGoogleSignInDirect}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Conectar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Descargar CSV de Aprendiz
                </button>
                <a
                  href={GOOGLE_DRIVE_HOME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                >
                  <FolderOpen className="w-3 h-3" />
                  Mi Google Drive ↗
                </a>
              </div>

              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="hover:text-emerald-500 underline transition-colors text-slate-500 dark:text-slate-400 text-[11px]"
              >
                {showCustomInput ? 'Ocultar vinculación manual' : '¿Ya tienes una hoja existente? Vincular por ID o URL'}
              </button>
            </div>

            {/* Manual Link Input */}
            {showCustomInput && (
              <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Vincular Hoja de Google Sheets por ID o Enlace:
                  </p>
                  <span className="text-[10px] text-slate-500">
                    Pega el enlace compartido o el ID de tu hoja
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSheetId}
                    onChange={e => setCustomSheetId(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFM... o ID"
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    onClick={handleAttachCustomSheet}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                  >
                    Vincular
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  💡 Tip: Puedes crear una hoja en blanco en <a href={CREATE_NEW_SHEET_URL} target="_blank" rel="noopener noreferrer" className="underline text-emerald-600">Google Sheets</a>, copiar su URL y pegarla aquí para guardar los datos.
                </p>
              </div>
            )}
          </div>

          {/* SPREADSHEET STRUCTURE EXPLANATION & LIVE PREVIEW */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Table className="w-4 h-4 text-emerald-600" />
                  Estructura y Previsualización de Datos Almacenados
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  La hoja incluye 3 pestañas especializadas organizadas bajo el marco del Reglamento 2024-2026:
                </p>
              </div>

              {/* Tabs Switcher for Sheets */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setActivePreviewTab('aprendices')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activePreviewTab === 'aprendices'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  1. Aprendices_Induccion
                </button>
                <button
                  onClick={() => setActivePreviewTab('tribunal')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activePreviewTab === 'tribunal'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  2. Casos_Tribunal
                </button>
                <button
                  onClick={() => setActivePreviewTab('bitacora')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activePreviewTab === 'bitacora'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  3. Bitácora
                </button>
              </div>
            </div>

            {/* Table Viewer with SENA Official Green Headers */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-sm">
              {activePreviewTab === 'aprendices' && (
                <table className="w-full text-left text-[11px] border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-[#39A900] text-white font-bold">
                      {APPRENTICE_HEADERS.map((h, i) => (
                        <th key={i} className="px-3 py-2.5 border-r border-emerald-600/40 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono text-slate-700 dark:text-slate-300">
                    {previewRows.map((row, rowIdx) => (
                      <tr key={rowIdx} className={rowIdx === 0 ? 'bg-emerald-50/40 dark:bg-emerald-950/20 font-medium' : ''}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3 py-2 border-r border-slate-100 dark:border-slate-800/80 whitespace-nowrap">
                            {cIdx === 15 ? (
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans ${
                                cell === 'CERTIFICADO APROBADO'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}>
                                {cell}
                              </span>
                            ) : cIdx === 8 ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold font-sans">
                                {cell} XP
                              </span>
                            ) : (
                              String(cell)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activePreviewTab === 'tribunal' && (
                <table className="w-full text-left text-[11px] border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#00324D] text-white font-bold">
                      {TRIBUNAL_HEADERS.map((h, i) => (
                        <th key={i} className="px-3 py-2.5 border-r border-slate-700 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono text-slate-700 dark:text-slate-300">
                    <tr className="bg-slate-50/70 dark:bg-slate-800/30">
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">21/10/2026, 09:15</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.documentId}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.name}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.ficha}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">CASO-GRAVE-01</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">Uso de IA generativa no autorizada en entrega</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800 text-amber-600 font-bold">GRAVE</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800 text-emerald-600">SÍ</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800 text-emerald-600">SÍ</td>
                      <td className="px-3 py-2 font-bold text-emerald-600">+50 XP</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">20/10/2026, 16:40</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.documentId}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.name}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.ficha}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">CASO-LEVE-02</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">Porte inadecuado del uniforme institucional</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800 text-blue-600 font-bold">LEVE</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800 text-emerald-600">SÍ</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800 text-emerald-600">SÍ</td>
                      <td className="px-3 py-2 font-bold text-emerald-600">+50 XP</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activePreviewTab === 'bitacora' && (
                <table className="w-full text-left text-[11px] border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-slate-800 text-white font-bold">
                      {AUDIT_LOG_HEADERS.map((h, i) => (
                        <th key={i} className="px-3 py-2.5 border-r border-slate-700 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">21/10/2026, 08:30</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.documentId}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.name}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.ficha}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800 text-emerald-600 font-bold">Inicio de Inducción</td>
                      <td className="px-3 py-2">Completó Módulo 1 (Identidad Institucional e Himno)</td>
                    </tr>
                    <tr className="bg-slate-50/70 dark:bg-slate-800/30">
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">21/10/2026, 09:12</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.documentId}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.name}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800">{profile.ficha}</td>
                      <td className="px-3 py-2 border-r border-slate-100 dark:border-slate-800 text-blue-600 font-bold">Sincronización a Drive</td>
                      <td className="px-3 py-2">Registro actualizado en hoja oficial de Google Sheets</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                🔒 Autenticación Segura
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Tokens gestionados exclusivamente en memoria según estándares de seguridad de Google Cloud.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                ⚡ Sincronización Automática
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Actualiza automáticamente las filas al avanzar en la inducción o en el tribunal disciplinario.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                📊 Reportes de Instructor
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Los instructores pueden filtrar por ficha, calcular porcentaje de aprobación y exportar a Zajuna.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Almacenamiento habilitado en Google Drive</span>
          </div>

          <div className="flex items-center gap-3">
            {currentSheetUrl ? (
              <a
                href={currentSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Abrir en Google Drive
              </a>
            ) : (
              <button
                onClick={handleDownloadCsv}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Descargar CSV
              </button>
            )}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
