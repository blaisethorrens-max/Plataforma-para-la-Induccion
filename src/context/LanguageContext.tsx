import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sound } from '../utils/audio';

export type Language = 'es' | 'en';

export interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Common & Branding
  'app.title': {
    es: 'SENA · Plataforma de Inducción',
    en: 'SENA · Induction Platform'
  },
  'app.regulation': {
    es: 'Reglamento 2024 · Acuerdo 2026',
    en: 'Regulations 2024 · 2026 Agreement'
  },
  'app.inductionYear': {
    es: 'Inducción 2026',
    en: 'Induction 2026'
  },
  'common.loading': {
    es: 'Cargando...',
    en: 'Loading...'
  },
  'common.cancel': {
    es: 'Cancelar',
    en: 'Cancel'
  },
  'common.save': {
    es: 'Guardar Cambios',
    en: 'Save Changes'
  },
  'common.close': {
    es: 'Cerrar',
    en: 'Close'
  },
  'common.back': {
    es: 'Volver',
    en: 'Back'
  },
  'common.continue': {
    es: 'Continuar',
    en: 'Continue'
  },
  'common.start': {
    es: 'Comenzar',
    en: 'Start'
  },
  'common.completed': {
    es: 'Completado',
    en: 'Completed'
  },
  'common.inProgress': {
    es: 'En Proceso',
    en: 'In Progress'
  },
  'common.approved': {
    es: 'Aprobado',
    en: 'Approved'
  },
  'common.xp': {
    es: 'XP',
    en: 'XP'
  },
  'common.level': {
    es: 'Nvl',
    en: 'Lvl'
  },
  'common.streak': {
    es: 'd racha',
    en: 'd streak'
  },

  // Language Toggle
  'lang.toggleTitle': {
    es: 'Cambiar idioma a Inglés (EN)',
    en: 'Switch language to Spanish (ES)'
  },
  'lang.current': {
    es: 'Español',
    en: 'English'
  },

  // Navbar
  'nav.modules': {
    es: 'Ruta de Inducción',
    en: 'Induction Path'
  },
  'nav.cases': {
    es: 'Tribunal del Reglamento',
    en: 'Regulation Tribunal'
  },
  'nav.casesBadge': {
    es: 'Casos 2024-2026',
    en: 'Cases 2024-2026'
  },
  'nav.quiz': {
    es: 'Desafíos por Niveles',
    en: 'Level Challenges'
  },
  'nav.glossary': {
    es: 'Glosario SENA',
    en: 'SENA Glossary'
  },
  'nav.certificate': {
    es: 'Carnet & Certificado',
    en: 'ID & Certificate'
  },
  'nav.instructorDashboard': {
    es: 'Panel Instructor',
    en: 'Instructor Panel'
  },
  'nav.googleDrive': {
    es: 'Google Drive',
    en: 'Google Drive'
  },
  'nav.imInstructor': {
    es: 'Soy Instructor',
    en: "I'm Instructor"
  },
  'nav.tutorSena': {
    es: 'Tutor SENA',
    en: 'SENA Tutor'
  },
  'nav.viewCarnetTooltip': {
    es: 'Ver tu carnet y estado de nivel',
    en: 'View your digital ID card and level status'
  },
  'nav.carnetDigital': {
    es: 'Carnet Digital',
    en: 'Digital ID'
  },
  'nav.youtubeTooltip': {
    es: 'Visita mi canal de YouTube para ver vídeos de inducción',
    en: 'Visit my YouTube channel to watch induction videos'
  },
  'nav.darkModeToggle': {
    es: 'Alternar Modo Oscuro',
    en: 'Toggle Dark Mode'
  },
  'nav.soundToggle': {
    es: 'Sonido',
    en: 'Sound'
  },

  // Role Selection
  'role.welcome': {
    es: 'Bienvenido al Sistema de Inducción SENA',
    en: 'Welcome to the SENA Induction System'
  },
  'role.selectPrompt': {
    es: 'Por favor, selecciona tu rol para comenzar:',
    en: 'Please select your role to get started:'
  },
  'role.instructorTitle': {
    es: 'Instructor',
    en: 'Instructor'
  },
  'role.instructorDesc': {
    es: 'Acceso al panel de gestión, sincronización y seguimiento de aprendices.',
    en: 'Access to management, synchronization, and apprentice monitoring dashboard.'
  },
  'role.apprenticeTitle': {
    es: 'Aprendiz',
    en: 'Apprentice'
  },
  'role.apprenticeDesc': {
    es: 'Acceso a la ruta de inducción, tribunal de casos, módulos y certificación.',
    en: 'Access to the induction path, case tribunal, learning modules, and certification.'
  },

  // Apprentice Registration
  'reg.title': {
    es: 'Caracterización del Aprendiz',
    en: 'Apprentice Profiling'
  },
  'reg.subtitle': {
    es: 'Completa tus datos personales para personalizar tu proceso de inducción institucional.',
    en: 'Complete your personal data to customize your institutional induction process.'
  },
  'reg.fullName': {
    es: 'Nombre Completo',
    en: 'Full Name'
  },
  'reg.fullNamePlaceholder': {
    es: 'Ej. Juan Pérez Gómez',
    en: 'e.g. Juan Pérez Gómez'
  },
  'reg.docId': {
    es: 'Documento de Identidad',
    en: 'ID Document Number'
  },
  'reg.docIdPlaceholder': {
    es: 'Ej. 1020304050',
    en: 'e.g. 1020304050'
  },
  'reg.ficha': {
    es: 'Número de Ficha de Caracterización',
    en: 'Cohort Number (Ficha)'
  },
  'reg.fichaPlaceholder': {
    es: 'Ej. 2874102',
    en: 'e.g. 2874102'
  },
  'reg.whatsapp': {
    es: 'Número de WhatsApp (Alertas y Guías)',
    en: 'WhatsApp Number (Alerts & Guides)'
  },
  'reg.whatsappHelper': {
    es: 'Recibirás recordatorios automáticos de cumplimiento y guías oficiales de cada módulo.',
    en: 'You will receive automatic compliance reminders and official guides for each module.'
  },
  'reg.submit': {
    es: 'Comenzar Inducción',
    en: 'Start Induction'
  },

  // Instructor Privilege Bar
  'bar.instructor': {
    es: 'Instructor',
    en: 'Instructor'
  },
  'bar.logout': {
    es: 'Cerrar Sesión de Instructor',
    en: 'Sign Out as Instructor'
  },
  'bar.viewAsApprentice': {
    es: 'Ver como Aprendiz ↗',
    en: 'Preview as Apprentice ↗'
  },
  'bar.returnToDashboard': {
    es: '← Volver al Panel de Instructor',
    en: '← Back to Instructor Dashboard'
  },

  // Apprentice Header
  'header.trainingPath': {
    es: 'Ruta Formativa de Inducción',
    en: 'Induction Training Path'
  },
  'header.instructorResponsible': {
    es: 'Instructor Responsable',
    en: 'Lead Instructor'
  },
  'header.editProfile': {
    es: 'Editar datos',
    en: 'Edit profile'
  },
  'header.viewCarnet': {
    es: 'Ver Carnet',
    en: 'View Digital ID'
  },
  'header.globalProgress': {
    es: 'Progreso Global de Inducción',
    en: 'Global Induction Progress'
  },
  'header.modulesProgress': {
    es: 'Módulos completados',
    en: 'Modules completed'
  },
  'header.casesProgress': {
    es: 'Casos resueltos',
    en: 'Cases resolved'
  },
  'header.whatsappAlerts': {
    es: 'Alertas WhatsApp activas',
    en: 'WhatsApp alerts active'
  },
  'header.levelProgress': {
    es: 'Avance al siguiente nivel',
    en: 'Progress to next level'
  },

  // Instructor Access Modal
  'modal.accessTitle': {
    es: 'Acceso Exclusivo de Instructor',
    en: 'Exclusive Instructor Access'
  },
  'modal.accessPrompt': {
    es: 'Ingresa tu clave de acceso para gestionar el panel de control del instructor, la sincronización de Google Drive y el seguimiento de aprendices:',
    en: 'Enter your access key to manage the instructor dashboard, Google Drive sync, and apprentice tracking:'
  },
  'modal.pinLabel': {
    es: 'PIN / Clave de Acceso:',
    en: 'PIN / Access Key:'
  },
  'modal.pinPlaceholder': {
    es: 'Ingresa PIN (ej: Sena 1234)',
    en: 'Enter PIN (e.g., Sena 1234)'
  },
  'modal.pinError': {
    es: 'Clave incorrecta. Verifica e intenta nuevamente.',
    en: 'Incorrect key. Please check and try again.'
  },
  'modal.enterInstructor': {
    es: 'Ingresar como Instructor',
    en: 'Sign In as Instructor'
  },

  // Edit Profile Modal
  'edit.title': {
    es: 'Editar Datos del Aprendiz',
    en: 'Edit Apprentice Profile'
  },
  'edit.docType': {
    es: 'Tipo Doc.',
    en: 'Doc. Type'
  },
  'edit.program': {
    es: 'Programa de Formación',
    en: 'Training Program'
  },
  'edit.regional': {
    es: 'Regional SENA',
    en: 'SENA Regional'
  },
  'edit.center': {
    es: 'Centro de Formación',
    en: 'Training Center'
  },
  'edit.defaults': {
    es: 'Valores por defecto',
    en: 'Reset Defaults'
  },

  // Modules Section
  'modules.sectionTitle': {
    es: 'Módulos de Formación Institucional',
    en: 'Institutional Training Modules'
  },
  'modules.sectionSubtitle': {
    es: 'Completa los 6 módulos interactivos para dominar la cultura, pedagogía y el Reglamento del Aprendiz.',
    en: 'Complete the 6 interactive modules to master SENA culture, pedagogy, and Apprentice Regulations.'
  },
  'modules.startModule': {
    es: 'Iniciar Módulo',
    en: 'Start Module'
  },
  'modules.reviewModule': {
    es: 'Repasar Módulo',
    en: 'Review Module'
  },
  'modules.getWhatsappGuide': {
    es: 'Recibir Guía por WhatsApp',
    en: 'Get Guide via WhatsApp'
  },
  'modules.durationMinutes': {
    es: 'minutos',
    en: 'minutes'
  },
  'modules.goToCases': {
    es: 'Ir al Tribunal del Reglamento →',
    en: 'Go to Regulation Tribunal →'
  },
  'modules.topic': {
    es: 'Tema',
    en: 'Topic'
  },
  'modules.quickQuiz': {
    es: 'Prueba Rápida',
    en: 'Quick Quiz'
  },
  'modules.proTip': {
    es: 'Consejo Clave SENA',
    en: 'Key SENA Tip'
  },
  'modules.checklist': {
    es: 'Lista de Verificación Práctica',
    en: 'Practical Checklist'
  },
  'modules.takeQuiz': {
    es: 'Tomar Evaluación del Módulo',
    en: 'Take Module Assessment'
  },
  'modules.gradeQuiz': {
    es: 'Calificar Evaluación',
    en: 'Submit Assessment'
  },
  'modules.retryQuiz': {
    es: 'Reintentar Quiz',
    en: 'Retry Quiz'
  },
  'modules.continueRoute': {
    es: 'Continuar Ruta',
    en: 'Continue Path'
  },

  // Cases / Tribunal Section
  'cases.sectionTitle': {
    es: 'Tribunal Ético del Aprendiz',
    en: "Apprentice's Ethical Tribunal"
  },
  'cases.sectionSubtitle': {
    es: 'Aplica el Reglamento del Aprendiz 2024 y Acuerdo 2026 resolviendo casos reales con criterio pedagógico.',
    en: 'Apply the 2024 Regulations and 2026 Agreement by solving real-life dilemmas with pedagogical insight.'
  },
  'cases.all': {
    es: 'Todos los Casos',
    en: 'All Cases'
  },
  'cases.leve': {
    es: 'Faltas Leves',
    en: 'Minor Infractions'
  },
  'cases.grave': {
    es: 'Faltas Graves',
    en: 'Serious Infractions'
  },
  'cases.gravisima': {
    es: 'Faltas Gravísimas',
    en: 'Very Serious Infractions'
  },
  'cases.resolved': {
    es: 'Resueltos',
    en: 'Resolved'
  },
  'cases.factsTab': {
    es: '1. Hechos del Caso',
    en: '1. Case Facts'
  },
  'cases.evidenceTab': {
    es: '2. Pruebas y Factores',
    en: '2. Evidence & Factors'
  },
  'cases.deliberationTab': {
    es: '3. Deliberación y Fallo',
    en: '3. Deliberation & Ruling'
  },
  'cases.classifySeverity': {
    es: 'Paso 1: Clasifica la Gravedad de la Falta',
    en: 'Step 1: Classify Infraction Severity'
  },
  'cases.selectSanction': {
    es: 'Paso 2: Dicta la Medida Sancionatoria o Formativa',
    en: 'Step 2: Impose Corrective or Disciplinary Measure'
  },
  'cases.confirmRuling': {
    es: 'Emitir Fallo del Tribunal',
    en: 'Issue Tribunal Ruling'
  },
  'cases.consultMentor': {
    es: 'Consultar con Tutor SENA',
    en: 'Consult with SENA Tutor'
  },
  'cases.viewExpedient': {
    es: 'Ver Expediente',
    en: 'View Case File'
  },
  'cases.verdictIssued': {
    es: 'Fallo Emitido',
    en: 'Ruling Issued'
  },

  // Speed Quiz Section
  'quiz.sectionTitle': {
    es: 'Desafíos de Velocidad y Conocimiento',
    en: 'Speed and Knowledge Challenges'
  },
  'quiz.sectionSubtitle': {
    es: 'Responde correctamente antes de que se agote el tiempo y gana puntos XP para desbloquear insignias.',
    en: 'Answer correctly before time runs out and earn XP points to unlock exclusive badges.'
  },
  'quiz.startChallenge': {
    es: 'Iniciar Desafío',
    en: 'Start Challenge'
  },
  'quiz.lockedChallenge': {
    es: 'Requiere Nivel',
    en: 'Requires Level'
  },
  'quiz.timeLeft': {
    es: 'Tiempo restante',
    en: 'Time left'
  },
  'quiz.score': {
    es: 'Puntaje',
    en: 'Score'
  },
  'quiz.streak': {
    es: 'Racha',
    en: 'Streak'
  },
  'quiz.next': {
    es: 'Siguiente Pregunta',
    en: 'Next Question'
  },
  'quiz.finished': {
    es: '¡Desafío Finalizado!',
    en: 'Challenge Completed!'
  },
  'quiz.playAgain': {
    es: 'Jugar de Nuevo',
    en: 'Play Again'
  },

  // Glossary Section
  'glossary.sectionTitle': {
    es: 'Glosario Institucional y Terminológico',
    en: 'Institutional and Terminology Glossary'
  },
  'glossary.sectionSubtitle': {
    es: 'Consulta conceptos clave del SENA, normatividad, plataformas y términos técnicos.',
    en: 'Look up key SENA concepts, regulations, digital platforms, and technical terms.'
  },
  'glossary.searchPlaceholder': {
    es: 'Buscar por término (ej. Deserción, RAP, Inteligencia Artificial, SofiaPlus)...',
    en: 'Search by term (e.g., Dropout, RAP, Artificial Intelligence, SofiaPlus)...'
  },
  'glossary.all': {
    es: 'Todos',
    en: 'All'
  },
  'glossary.academic': {
    es: 'Académico',
    en: 'Academic'
  },
  'glossary.disciplinary': {
    es: 'Disciplinario',
    en: 'Disciplinary'
  },
  'glossary.institutional': {
    es: 'Institucional',
    en: 'Institutional'
  },
  'glossary.platforms': {
    es: 'Plataformas',
    en: 'Platforms'
  },
  'glossary.clear': {
    es: 'Limpiar',
    en: 'Clear'
  },
  'glossary.regulationRef': {
    es: 'Sustento Reglamentario:',
    en: 'Regulatory Basis:'
  },
  'glossary.example': {
    es: 'Ejemplo Práctico:',
    en: 'Practical Example:'
  },
  'glossary.askMentor': {
    es: 'Consultar al Tutor SENA sobre este término',
    en: 'Ask SENA Tutor about this term'
  },

  // Certificate Section
  'cert.sectionTitle': {
    es: 'Certificado de Inducción SENA 2026',
    en: 'SENA 2026 Induction Certificate'
  },
  'cert.sectionSubtitle': {
    es: 'Documento oficial con código de verificación QR, avalado por tu Instructor Líder.',
    en: 'Official document with QR verification code, endorsed by your Lead Instructor.'
  },
  'cert.downloadBtn': {
    es: 'Descargar Certificado (PDF)',
    en: 'Download Certificate (PDF)'
  },
  'cert.printBtn': {
    es: 'Imprimir Certificado',
    en: 'Print Certificate'
  },
  'cert.republic': {
    es: 'República de Colombia · Ministerio del Trabajo',
    en: 'Republic of Colombia · Ministry of Labor'
  },
  'cert.institutionName': {
    es: 'SERVICIO NACIONAL DE APRENDIZAJE - SENA',
    en: 'NATIONAL LEARNING SERVICE - SENA'
  },
  'cert.direction': {
    es: 'Dirección de Formación Profesional Integral · Sistema de Gestión de Calidad',
    en: 'Integral Vocational Training Directorate · Quality Management System'
  },
  'cert.certifiesThat': {
    es: 'Hace constar que el aprendiz',
    en: 'Hereby certifies that the apprentice'
  },
  'cert.identifiedWith': {
    es: 'Identificado(a) con',
    en: 'Identified with'
  },
  'cert.bodyText': {
    es: 'Ha cursado y aprobado satisfactoriamente el programa integral de Inducción y Adaptación al Entorno Educativo SENA, habiendo demostrado idoneidad en la comprensión de la cultura institucional, valores éticos, el modelo de Formación Profesional Integral (FPI), y el régimen disciplinario del Reglamento del Aprendiz SENA (Versión 2024 con Acuerdo Complementario de 2026).',
    en: 'Has satisfactorily completed and approved the comprehensive SENA Educational Environment Induction and Adaptation Program, having demonstrated proficiency in understanding institutional culture, ethical values, the Integral Vocational Training (FPI) model, and the disciplinary regulations under the SENA Apprentice Regulations (Version 2024 with 2026 Agreement).'
  },
  'cert.programLabel': {
    es: 'Programa de Formación',
    en: 'Training Program'
  },
  'cert.fichaLabel': {
    es: 'Ficha de Caracterización',
    en: 'Cohort Number (Ficha)'
  },
  'cert.regionalLabel': {
    es: 'Regional SENA',
    en: 'SENA Regional'
  },
  'cert.centerLabel': {
    es: 'Centro de Formación',
    en: 'Training Center'
  },
  'cert.issuedDate': {
    es: 'Fecha de Expedición',
    en: 'Date of Issue'
  },
  'cert.instructorSignature': {
    es: 'Instructor Líder de Formación',
    en: 'Lead Training Instructor'
  },
  'cert.subdirectorSignature': {
    es: 'Subdirección de Centro',
    en: 'Center Directorate'
  },
  'cert.verified': {
    es: 'VERIFICADO Y AUTÉNTICO',
    en: 'VERIFIED & AUTHENTIC'
  },
  'cert.eligibleHonor': {
    es: '¡Aprobación con Honores de Excelencia SENA!',
    en: 'Approved with SENA Academic Honors of Excellence!'
  },
  'cert.eligibleStandard': {
    es: 'Requisitos mínimos alcanzados: Certificado habilitado.',
    en: 'Minimum requirements met: Certificate enabled.'
  },
  'cert.updateData': {
    es: 'Actualizar nombre o ficha',
    en: 'Update name or cohort'
  },

  // Carnet Modal
  'carnet.title': {
    es: 'Carnet Digital del Aprendiz SENA (2026)',
    en: 'SENA Apprentice Digital ID Card (2026)'
  },
  'carnet.print': {
    es: 'Imprimir Carnet',
    en: 'Print ID Card'
  },
  'carnet.activeStudent': {
    es: 'Aprendiz Activo',
    en: 'Active Apprentice'
  },
  'carnet.validity': {
    es: 'Vigencia: Etapa Lectiva 2026',
    en: 'Validity: 2026 Academic Stage'
  },

  // Mentor Modal
  'mentor.title': {
    es: 'Tutor Virtual SENA (Orientador Pedagógico)',
    en: 'SENA Virtual Tutor (Pedagogical Advisor)'
  },
  'mentor.welcome': {
    es: '¡Hola, aprendiz! Soy tu Tutor Virtual SENA. Estoy aquí para orientarte en cualquier duda sobre el Reglamento del Aprendiz (Versión 2024 con Acuerdo 2026), uso ético de IA, novedades en SofiaPlus/Zajuna o tu etapa productiva. ¿En qué te puedo asesorar hoy?',
    en: 'Hello, apprentice! I am your SENA Virtual Tutor. I am here to guide you through any questions regarding the Apprentice Regulations (2024 Version with 2026 Agreement), ethical use of AI, SofiaPlus/Zajuna platform updates, or your productive stage. How can I assist you today?'
  },
  'mentor.placeholder': {
    es: 'Escribe tu consulta sobre el reglamento o inducción SENA...',
    en: 'Type your question about SENA regulations or induction...'
  },
  'mentor.send': {
    es: 'Enviar',
    en: 'Send'
  },
  'mentor.thinking': {
    es: 'El Tutor SENA está redactando una orientación...',
    en: 'SENA Tutor is generating guidance...'
  },
  'mentor.suggested': {
    es: 'Preguntas Frecuentes Sugeridas:',
    en: 'Suggested Frequent Questions:'
  },

  // Instructor Dashboard
  'dash.title': {
    es: 'Panel de Control del Instructor',
    en: 'Instructor Control Dashboard'
  },
  'dash.leadInstructor': {
    es: 'Instructor Líder & Administrador',
    en: 'Lead Instructor & Administrator'
  },
  'dash.adminInduction': {
    es: 'Administrador de Inducción',
    en: 'Induction Administrator'
  },
  'dash.assignedCohorts': {
    es: 'Fichas a cargo:',
    en: 'Assigned Cohorts:'
  },
  'dash.heroDescription': {
    es: 'Panel con privilegios completos: sincronización de Google Drive & Sheets, monitoreo de la cohorte y generador de enlaces para aprendices.',
    en: 'Full privilege dashboard: Google Drive & Sheets synchronization, cohort monitoring, and apprentice link generator.'
  },
  'dash.manageDrive': {
    es: 'Gestionar Google Drive',
    en: 'Manage Google Drive'
  },
  'dash.connect': {
    es: 'Conectar',
    en: 'Connect'
  },
  'dash.shareLink': {
    es: 'Compartir Enlace',
    en: 'Share Link'
  },
  'dash.viewAsApprentice': {
    es: 'Ver como Aprendiz',
    en: 'Preview as Apprentice'
  },
  'dash.totalApprentices': {
    es: 'Total Aprendices',
    en: 'Total Apprentices'
  },
  'dash.threeCohorts': {
    es: '3 Fichas',
    en: '3 Cohorts'
  },
  'dash.certified': {
    es: 'Certificados Aprobados',
    en: 'Approved Certificates'
  },
  'dash.inProgress': {
    es: 'En Proceso',
    en: 'In Progress'
  },
  'dash.active': {
    es: 'activos',
    en: 'active'
  },
  'dash.averageXp': {
    es: 'Promedio XP',
    en: 'Average XP'
  },
  'dash.xpPerApprentice': {
    es: 'XP / aprendiz',
    en: 'XP / apprentice'
  },
  'dash.casesResolved': {
    es: 'Casos Resueltos',
    en: 'Resolved Cases'
  },
  'dash.ethicalTribunal': {
    es: 'Tribunal Ético',
    en: 'Ethical Tribunal'
  },
  'dash.monitoringTab': {
    es: 'Seguimiento de Aprendices',
    en: 'Apprentice Monitoring'
  },
  'dash.driveTab': {
    es: 'Google Drive & Sheets',
    en: 'Google Drive & Sheets'
  },
  'dash.shareTab': {
    es: 'Compartir con Aprendices',
    en: 'Share with Apprentices'
  },
  'dash.settingsTab': {
    es: 'Configuración',
    en: 'Settings'
  },
  'dash.online': {
    es: 'Conectados Ahora',
    en: 'Online Right Now'
  },
  'dash.searchCohortPlaceholder': {
    es: 'Buscar aprendiz por nombre, documento o programa...',
    en: 'Search apprentice by name, ID or program...'
  },
  'dash.allFichas': {
    es: 'Todas las Fichas',
    en: 'All Cohorts (Fichas)'
  },
  'dash.allStatuses': {
    es: 'Todos los Estados',
    en: 'All Statuses'
  },
  'dash.approvedOnly': {
    es: 'Certificados Aprobados',
    en: 'Approved Certificates'
  },
  'dash.inProgressOnly': {
    es: 'En Proceso',
    en: 'In Progress'
  },
  'dash.syncAllSheets': {
    es: 'Sincronizar a Drive',
    en: 'Sync to Drive'
  },
  'dash.syncing': {
    es: 'Sincronizando...',
    en: 'Syncing...'
  },
  'dash.exportCsv': {
    es: 'Exportar CSV',
    en: 'Export CSV'
  },
  'dash.colApprentice': {
    es: 'Aprendiz',
    en: 'Apprentice'
  },
  'dash.colFichaProgram': {
    es: 'Ficha & Programa',
    en: 'Cohort & Program'
  },
  'dash.colModules': {
    es: 'Módulos (6)',
    en: 'Modules (6)'
  },
  'dash.colTribunal': {
    es: 'Tribunal (9)',
    en: 'Tribunal (9)'
  },
  'dash.colXpLevel': {
    es: 'XP & Insignias',
    en: 'XP & Badges'
  },
  'dash.colStatus': {
    es: 'Estado',
    en: 'Status'
  },
  'dash.colLastActive': {
    es: 'Última Actividad',
    en: 'Last Activity'
  },
  'dash.colDetail': {
    es: 'Detalle',
    en: 'Details'
  },
  'dash.noApprentices': {
    es: 'No se encontraron aprendices con los filtros seleccionados.',
    en: 'No apprentices found with selected filters.'
  },
  'dash.currentSession': {
    es: 'Sesión Actual',
    en: 'Current Session'
  },
  'dash.onlineNow': {
    es: 'En línea ahora',
    en: 'Online now'
  },
  'dash.onlineBadge': {
    es: 'En línea',
    en: 'Online'
  },
  'dash.badgesCountLabel': {
    es: 'insignias',
    en: 'badges'
  },
  'dash.driveSheetTitle': {
    es: 'Hoja de Cálculo Centralizada de Inducción',
    en: 'Centralized Induction Spreadsheet'
  },
  'dash.driveOfficialFile': {
    es: 'Archivo oficial en Google Drive:',
    en: 'Official file in Google Drive:'
  },
  'dash.configConnection': {
    es: 'Configurar Conexión',
    en: 'Configure Connection'
  },
  'dash.openInDrive': {
    es: 'Abrir en Google Drive ↗',
    en: 'Open in Google Drive ↗'
  },
  'dash.instructorAccount': {
    es: 'Cuenta del Instructor',
    en: 'Instructor Account'
  },
  'dash.sheetStructure': {
    es: 'Estructura de la Hoja',
    en: 'Sheet Structure'
  },
  'dash.threeAutoSheets': {
    es: '3 Hojas Automáticas',
    en: '3 Automated Sheets'
  },
  'dash.threeAutoSheetsDesc': {
    es: 'Aprendices (19 cols), Tribunal Casos y Bitácora',
    en: 'Apprentices (19 cols), Tribunal Cases, and Log'
  },
  'dash.apprenticeAccess': {
    es: 'Acceso de los Aprendices',
    en: 'Apprentice Access'
  },
  'dash.protected': {
    es: 'Protegido',
    en: 'Protected'
  },
  'dash.protectedDesc': {
    es: 'Los aprendices NO tienen acceso de edición al archivo maestro',
    en: 'Apprentices DO NOT have edit permissions on the master file'
  },
  'dash.syncAllNow': {
    es: 'Sincronizar Todos los Aprendices Ahora',
    en: 'Sync All Apprentices Now'
  },
  'dash.downloadBackupCsv': {
    es: 'Descargar Backup CSV',
    en: 'Download Backup CSV'
  },
  'dash.goToMyDrive': {
    es: 'Ir a mi Google Drive ↗',
    en: 'Go to my Google Drive ↗'
  },
  'dash.shareWithApprenticesTitle': {
    es: 'Compartir Plataforma con los Aprendices',
    en: 'Share Platform with Apprentices'
  },
  'dash.shareWithApprenticesDesc': {
    es: 'Comparte este enlace a tus aprendices para que inicien la inducción. Al entrar por este enlace, la plataforma iniciará directamente en Modo Aprendiz (sin acceso a Google Drive ni controles de instructor).',
    en: 'Share this link with your apprentices so they can begin induction. Through this link, the platform opens directly in Apprentice Mode (without Google Drive access or instructor controls).'
  },
  'dash.preassignFicha': {
    es: 'Pre-asignar Ficha en el enlace:',
    en: 'Pre-assign Cohort in link:'
  },
  'dash.withoutFicha': {
    es: 'Sin Ficha',
    en: 'Without Cohort'
  },
  'dash.officialLink': {
    es: 'Enlace Oficial para Aprendices:',
    en: 'Official Apprentice Link:'
  },
  'dash.linkCopied': {
    es: '¡Enlace Copiado!',
    en: 'Link Copied!'
  },
  'dash.copyLink': {
    es: 'Copiar Enlace',
    en: 'Copy Link'
  },
  'dash.sendWhatsApp': {
    es: 'Enviar por WhatsApp a los Aprendices',
    en: 'Send via WhatsApp to Apprentices'
  },
  'dash.messageCopied': {
    es: '¡Mensaje Copiado!',
    en: 'Message Copied!'
  },
  'dash.copyTemplate': {
    es: 'Copiar Plantilla para Correo / Zajuna / Teams',
    en: 'Copy Template for Email / Zajuna / Teams'
  },
  'dash.previewMessage': {
    es: 'Vista Previa del Mensaje para Aprendices:',
    en: 'Apprentice Message Preview:'
  },
  'dash.courseSettingsTitle': {
    es: 'Configuración del Curso de Inducción',
    en: 'Induction Course Settings'
  },
  'dash.courseSettingsDesc': {
    es: 'Ajustes institucionales según el Reglamento del Aprendiz (Versión 2024 con Acuerdo 2026).',
    en: 'Institutional settings according to Apprentice Regulations (2024 Version with 2026 Agreement).'
  },
  'dash.certReqs': {
    es: 'Requisitos de Certificación',
    en: 'Certification Requirements'
  },
  'dash.certReq1': {
    es: 'Mínimo de Módulos: 4 de 6 (Recomendado 6/6)',
    en: 'Minimum Modules: 4 of 6 (Recommended 6/6)'
  },
  'dash.certReq2': {
    es: 'Casos del Tribunal Ético: Mínimo 3 de 9',
    en: 'Ethical Tribunal Cases: Minimum 3 of 9'
  },
  'dash.certReq3': {
    es: 'Puntaje Mínimo XP: 100 XP',
    en: 'Minimum XP Score: 100 XP'
  },
  'dash.certReq4': {
    es: 'Emisión de Constancia: Digital con código QR y validación',
    en: 'Certificate Issuance: Digital with QR code and verification'
  },
  'dash.securityRoles': {
    es: 'Seguridad y Roles',
    en: 'Security and Roles'
  },
  'dash.securityRolesDesc': {
    es: 'El rol de instructor está autenticado bajo el nombre Blas Thorrens. Los enlaces compartidos con ?role=aprendiz inhabilitan las opciones de sincronización y configuración en el navegador del aprendiz.',
    en: 'The instructor role is authenticated under Blas Thorrens. Links shared with ?role=aprendiz disable synchronization and configuration options on the apprentice browser.'
  },
  'dash.viewApprenticeReport': {
    es: 'Ver informe del aprendiz',
    en: 'View apprentice report'
  },
  'dash.close': {
    es: 'Cerrar',
    en: 'Close'
  },

  // Footer
  'footer.institution': {
    es: 'SENA · Servicio Nacional de Aprendizaje',
    en: 'SENA · National Learning Service'
  },
  'footer.description': {
    es: 'Plataforma de Inducción Interactiva (Reglamento 2024 · Acuerdo 2026)',
    en: 'Interactive Induction Platform (Regulations 2024 · 2026 Agreement)'
  },
  'footer.resetPrototype': {
    es: 'Reiniciar Prototipo',
    en: 'Reset Prototype'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LANGUAGE_KEY = 'sena_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === 'es' || saved === 'en') return saved;
      // Default to browser preference if english, else spanish
      if (typeof navigator !== 'undefined' && navigator.language?.startsWith('en')) {
        return 'en';
      }
    } catch {
      // fallback
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    sound.playClick();
    const nextLang = language === 'es' ? 'en' : 'es';
    setLanguage(nextLang);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const entry = TRANSLATIONS[key];
    if (entry && entry[language]) {
      return entry[language];
    }
    return fallback || entry?.es || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
