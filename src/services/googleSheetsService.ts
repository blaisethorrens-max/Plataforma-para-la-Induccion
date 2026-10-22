/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApprenticeProfile } from '../types';
import { getLevelForXp } from '../data/badgesData';
import { REGULATION_CASES } from '../data/casesData';

export const INDUCTION_SHEET_TITLE = 'SENA - Registro de Inducción de Aprendices (2024-2026)';
export const SHEET_STORAGE_KEY = 'sena_google_sheet_info_v1';

export interface StoredSheetInfo {
  spreadsheetId: string;
  webViewLink: string;
  title: string;
  createdAt: string;
  lastSyncedAt?: string;
  totalSyncedApprentices: number;
}

export interface SheetRowData {
  timestamp: string;
  documentId: string;
  documentType: string;
  fullName: string;
  ficha: string;
  program: string;
  regional: string;
  centro: string;
  xp: number;
  streak: number;
  level: string;
  modulesCompleted: string;
  casesCompleted: string;
  quizHighScore: number;
  badgesCount: number;
  status: string;
  verificationHash: string;
  reglamentoVersion: string;
  lastSync: string;
}

// Headers for the main apprentice registration sheet
export const APPRENTICE_HEADERS = [
  'Marca Temporal',
  'ID Documento',
  'Tipo Documento',
  'Nombre Completo Aprendiz',
  'Número de Ficha',
  'Programa de Formación',
  'Regional SENA',
  'Centro de Formación',
  'Puntos XP',
  'Racha (Días)',
  'Nivel',
  'Módulos Completados',
  'Casos Tribunal Resueltos',
  'Puntaje Desafío Rápido',
  'Insignias Ganadas',
  'Estado de Inducción',
  'Hash Verificación Certificado',
  'Versión Reglamento',
  'Fecha Última Sincronización'
];

export const TRIBUNAL_HEADERS = [
  'Fecha Registro',
  'ID Documento',
  'Nombre Aprendiz',
  'Ficha',
  'Código Caso',
  'Título del Caso',
  'Gravedad Clasificada',
  'Sanción Acertada',
  'Gravedad Acertada',
  'Puntos XP Obtenidos'
];

export const AUDIT_LOG_HEADERS = [
  'Fecha y Hora',
  'ID Documento',
  'Nombre Aprendiz',
  'Ficha',
  'Tipo de Evento',
  'Detalle / Observación'
];

// Helper to get local stored sheet reference
export const getStoredSheetInfo = (): StoredSheetInfo | null => {
  try {
    const raw = localStorage.getItem(SHEET_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Helper to save local stored sheet reference
export const saveStoredSheetInfo = (info: StoredSheetInfo): void => {
  try {
    localStorage.setItem(SHEET_STORAGE_KEY, JSON.stringify(info));
  } catch {
    // ignore
  }
};

/**
 * Searches user's Google Drive for the existing Induction Spreadsheet
 */
export const findExistingInductionSheet = async (accessToken: string): Promise<StoredSheetInfo | null> => {
  try {
    const q = `name = '${INDUCTION_SHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,webViewLink,createdTime)&spaces=drive`;
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      console.warn('Could not query Drive files:', await response.text());
      return null;
    }

    const data = await response.json();
    if (data.files && data.files.length > 0) {
      const file = data.files[0];
      return {
        spreadsheetId: file.id,
        webViewLink: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
        title: file.name,
        createdAt: file.createdTime || new Date().toISOString(),
        totalSyncedApprentices: 1,
      };
    }
    return null;
  } catch (err) {
    console.error('Error finding sheet in Google Drive:', err);
    return null;
  }
};

/**
 * Creates a brand new, formatted Google Sheet in the user's Drive with the official SENA styling
 */
export const createInductionSheet = async (accessToken: string): Promise<StoredSheetInfo> => {
  // 1. Create Spreadsheet with 3 tabs
  const createPayload = {
    properties: {
      title: INDUCTION_SHEET_TITLE,
    },
    sheets: [
      {
        properties: {
          title: 'Aprendices_Induccion',
          gridProperties: { frozenRowCount: 1, columnCount: 22, rowCount: 100 }
        }
      },
      {
        properties: {
          title: 'Tribunal_Casos_Disciplinarios',
          gridProperties: { frozenRowCount: 1, columnCount: 12, rowCount: 100 }
        }
      },
      {
        properties: {
          title: 'Bitacora_Induccion',
          gridProperties: { frozenRowCount: 1, columnCount: 8, rowCount: 100 }
        }
      }
    ]
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createPayload)
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Error al crear la hoja en Google Sheets: ${errorText}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const webViewLink = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Initialize Headers for all sheets with values.batchUpdate
  const headerUpdatePayload = {
    valueInputOption: 'USER_ENTERED',
    data: [
      {
        range: 'Aprendices_Induccion!A1:S1',
        values: [APPRENTICE_HEADERS]
      },
      {
        range: 'Tribunal_Casos_Disciplinarios!A1:J1',
        values: [TRIBUNAL_HEADERS]
      },
      {
        range: 'Bitacora_Induccion!A1:F1',
        values: [AUDIT_LOG_HEADERS]
      }
    ]
  };

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(headerUpdatePayload)
  });

  // 3. Format header rows with SENA Green (#39A900 -> RGB 0.223, 0.662, 0.0) and bold white text
  try {
    const sheetIds = sheetData.sheets?.map((s: any) => s.properties?.sheetId) || [0, 1, 2];
    const formattingRequests = sheetIds.map((id: number) => ({
      repeatCell: {
        range: {
          sheetId: id,
          startRowIndex: 0,
          endRowIndex: 1
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.223, green: 0.662, blue: 0.0 }, // #39A900
            textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 }, fontSize: 10 },
            horizontalAlignment: 'CENTER'
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
      }
    }));

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requests: formattingRequests })
    });
  } catch (formatErr) {
    console.warn('Could not apply formatting to headers (non-blocking):', formatErr);
  }

  const info: StoredSheetInfo = {
    spreadsheetId,
    webViewLink,
    title: INDUCTION_SHEET_TITLE,
    createdAt: new Date().toISOString(),
    lastSyncedAt: new Date().toISOString(),
    totalSyncedApprentices: 0
  };

  saveStoredSheetInfo(info);
  return info;
};

/**
 * Finds or automatically provisions the Induction Spreadsheet in Google Drive
 */
export const findOrCreateInductionSheet = async (accessToken: string): Promise<StoredSheetInfo> => {
  // Check local cache first
  const existingLocal = getStoredSheetInfo();
  if (existingLocal?.spreadsheetId) {
    // Verify file still accessible
    try {
      const checkRes = await fetch(`https://www.googleapis.com/drive/v3/files/${existingLocal.spreadsheetId}?fields=id,name,webViewLink,trashed`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (checkRes.ok) {
        const fileInfo = await checkRes.json();
        if (!fileInfo.trashed) {
          return existingLocal;
        }
      }
    } catch {
      // ignore check error
    }
  }

  // Search Drive for file by name
  const inDrive = await findExistingInductionSheet(accessToken);
  if (inDrive) {
    saveStoredSheetInfo(inDrive);
    return inDrive;
  }

  // Create new sheet
  return await createInductionSheet(accessToken);
};

/**
 * Transforms an apprentice profile into a spreadsheet row
 */
export const formatApprenticeRow = (profile: ApprenticeProfile): (string | number)[] => {
  const levelObj = getLevelForXp(profile.xp);
  const isInductionComplete = profile.completedModuleIds.length >= 6;
  const status = isInductionComplete ? 'CERTIFICADO APROBADO' : 'EN PROCESO';
  const verificationHash = `SENA-${profile.ficha}-${profile.documentId}-${profile.xp.toString(16).toUpperCase()}`;
  const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  return [
    now,
    profile.documentId,
    profile.documentType,
    profile.name,
    profile.ficha,
    profile.program,
    profile.regional,
    profile.centro,
    profile.xp,
    profile.streakDays,
    `Nivel ${levelObj.level}: ${levelObj.title}`,
    `${profile.completedModuleIds.length} / 6 (${Math.round((profile.completedModuleIds.length / 6) * 100)}%)`,
    `${profile.completedCaseIds.length} / 9`,
    profile.quizHighScore,
    profile.unlockedBadgeIds.length,
    status,
    verificationHash,
    'Reglamento 2024 con Acuerdo 2026',
    now
  ];
};

/**
 * Saves/Updates apprentice induction data in Google Sheets
 */
export const syncApprenticeToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  profile: ApprenticeProfile
): Promise<{ success: boolean; rowNumber: number; webViewLink: string }> => {
  const webViewLink = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  const rowData = formatApprenticeRow(profile);

  // 1. Check if apprentice documentId already exists in sheet
  const fetchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Induccion!A2:B1000`;
  const getRes = await fetch(fetchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  let targetRowNumber = -1;

  if (getRes.ok) {
    const existing = await getRes.json();
    const rows = existing.values || [];
    const index = rows.findIndex((r: string[]) => r[1] === profile.documentId);
    if (index !== -1) {
      targetRowNumber = index + 2; // +2 for 1-based index and header row
    }
  }

  if (targetRowNumber !== -1) {
    // UPDATE existing row
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Induccion!A${targetRowNumber}:S${targetRowNumber}?valueInputOption=USER_ENTERED`;
    const updateRes = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `Aprendices_Induccion!A${targetRowNumber}:S${targetRowNumber}`,
        values: [rowData]
      })
    });

    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`Error actualizando registro en Google Sheets: ${err}`);
    }
  } else {
    // APPEND new row
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Induccion!A:S:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const appendRes = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowData]
      })
    });

    if (!appendRes.ok) {
      const err = await appendRes.text();
      throw new Error(`Error insertando aprendiz en Google Sheets: ${err}`);
    }
    targetRowNumber = 2; // default
  }

  // 2. Also append case records if any completed cases exist
  if (profile.completedCaseIds.length > 0) {
    try {
      const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
      const caseRows = profile.completedCaseIds.map(caseId => {
        const caseObj = REGULATION_CASES.find(c => c.id === caseId);
        const decision = profile.caseDecisions[caseId];
        return [
          decision?.timestamp || now,
          profile.documentId,
          profile.name,
          profile.ficha,
          caseObj?.code || caseId,
          caseObj?.title || 'Caso Disciplinario',
          caseObj?.severity.toUpperCase() || 'GRAVE',
          decision?.sanctionCorrect ? 'SÍ' : 'NO',
          decision?.severityCorrect ? 'SÍ' : 'NO',
          50
        ];
      });

      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Tribunal_Casos_Disciplinarios!A:J:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: caseRows })
      });
    } catch (caseErr) {
      console.warn('Non-blocking tribunal log sync error:', caseErr);
    }
  }

  // 3. Append Audit Log Entry
  try {
    const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    const logRow = [
      now,
      profile.documentId,
      profile.name,
      profile.ficha,
      profile.completedModuleIds.length >= 6 ? 'Certificación de Inducción Generada' : 'Progreso Sincronizado',
      `Módulos: ${profile.completedModuleIds.length}/6, Casos: ${profile.completedCaseIds.length}/9, XP: ${profile.xp}`
    ];

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Bitacora_Induccion!A:F:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: [logRow] })
    });
  } catch (logErr) {
    console.warn('Non-blocking audit log error:', logErr);
  }

  // Update stored metadata
  const currentInfo = getStoredSheetInfo();
  if (currentInfo) {
    saveStoredSheetInfo({
      ...currentInfo,
      lastSyncedAt: new Date().toISOString(),
      totalSyncedApprentices: Math.max(currentInfo.totalSyncedApprentices || 1, 1)
    });
  }

  return {
    success: true,
    rowNumber: targetRowNumber,
    webViewLink
  };
};

/**
 * Builds demo/preview data table for the UI so users can immediately view the structure
 */
export const buildPreviewRows = (profile: ApprenticeProfile) => {
  const currentRow = formatApprenticeRow(profile);
  
  // Sample extra mock apprentice row to demonstrate multiple learners
  const sampleLearnerRow: (string | number)[] = [
    '20/10/2026, 14:32:10',
    '1098765432',
    'CC',
    'Mariana Gómez Valencia',
    '2874102',
    'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    'Regional Antioquia',
    'Centro de Formación en Diseño, Confección y Moda',
    420,
    5,
    'Nivel 3: Aprendiz Ejemplar',
    '6 / 6 (100%)',
    '9 / 9',
    5,
    6,
    'CERTIFICADO APROBADO',
    'SENA-2874102-1098765432-1A4',
    'Reglamento 2024 con Acuerdo 2026',
    '20/10/2026, 14:32:10'
  ];

  return [currentRow, sampleLearnerRow];
};

export const CREATE_NEW_SHEET_URL = 'https://docs.google.com/spreadsheets/create';
export const GOOGLE_DRIVE_HOME_URL = 'https://drive.google.com/drive/my-drive';
export const DEFAULT_TEMPLATE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1SENA_INDUCTION_APPRENTICES_2024_2026/edit';

/**
 * Robustly parses and extracts Google Spreadsheet ID from either:
 * - A full Google Sheets URL (e.g., https://docs.google.com/spreadsheets/d/1BxiMVs.../edit#gid=0)
 * - An export URL
 * - A raw Spreadsheet ID string
 */
export const extractSpreadsheetId = (input: string): string | null => {
  if (!input) return null;
  const trimmed = input.trim();
  const urlMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  // If it's a bare ID (alphanumeric, dashes, underscores, length typically 20-60)
  if (/^[a-zA-Z0-9-_]{20,80}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
};

/**
 * Generates and triggers download of a standardized CSV file matching the exact
 * SENA Apprentice Induction Google Sheet specification.
 */
export const downloadApprenticeCsv = (profile: ApprenticeProfile): void => {
  const previewRows = buildPreviewRows(profile);
  
  // Format as CSV with UTF-8 BOM so Excel and Google Sheets properly display accents
  const formatCell = (val: string | number) => {
    const str = String(val ?? '');
    return `"${str.replace(/"/g, '""')}"`;
  };

  const lines = [
    APPRENTICE_HEADERS.map(formatCell).join(','),
    ...previewRows.map(row => row.map(formatCell).join(','))
  ];

  const csvContent = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = `SENA_Registro_Induccion_${profile.ficha || 'Ficha'}_${profile.documentId || 'Aprendiz'}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
};

