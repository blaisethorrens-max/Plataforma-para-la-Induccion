/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApprenticeProfile } from '../types';

export interface CohortApprentice {
  id: string;
  name: string;
  documentId: string;
  documentType: 'CC' | 'TI' | 'PPT' | 'CE';
  ficha: string;
  program: string;
  regional: string;
  centro: string;
  xp: number;
  completedModulesCount: number;
  totalModulesCount: number;
  completedCasesCount: number;
  totalCasesCount: number;
  quizHighScore: number;
  badgesCount: number;
  status: 'CERTIFICADO APROBADO' | 'EN PROCESO';
  lastActive: string;
  isOnline?: boolean;
  whatsappNumber: string;
}

export const INITIAL_COHORT_STUDENTS: CohortApprentice[] = [
  {
    id: 'app-01',
    name: 'Alejandro Morales Ríos',
    documentId: '1020304050',
    documentType: 'CC',
    ficha: '2874102',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    centro: 'Centro de Gestión de Mercados, Logística y TIC',
    xp: 450,
    completedModulesCount: 6,
    totalModulesCount: 6,
    completedCasesCount: 9,
    totalCasesCount: 9,
    quizHighScore: 5,
    badgesCount: 7,
    status: 'CERTIFICADO APROBADO',
    lastActive: 'Hace 5 minutos',
    isOnline: true,
    whatsappNumber: '+573001234567'
  },
  {
    id: 'app-02',
    name: 'Mariana Gómez Valencia',
    documentId: '1098765432',
    documentType: 'CC',
    ficha: '2874102',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Antioquia',
    centro: 'Centro de Formación en Diseño, Confección y Moda',
    xp: 420,
    completedModulesCount: 6,
    totalModulesCount: 6,
    completedCasesCount: 8,
    totalCasesCount: 9,
    quizHighScore: 5,
    badgesCount: 6,
    status: 'CERTIFICADO APROBADO',
    lastActive: 'Hace 25 minutos',
    isOnline: true,
    whatsappNumber: '+573007654321'
  },
  {
    id: 'app-03',
    name: 'Carlos Eduardo Peña',
    documentId: '1032456789',
    documentType: 'TI',
    ficha: '2874102',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    centro: 'Centro de Gestión de Mercados, Logística y TIC',
    xp: 280,
    completedModulesCount: 4,
    totalModulesCount: 6,
    completedCasesCount: 5,
    totalCasesCount: 9,
    quizHighScore: 4,
    badgesCount: 4,
    status: 'EN PROCESO',
    lastActive: 'Hace 1 hora',
    isOnline: false,
    whatsappNumber: '+573109876543'
  },
  {
    id: 'app-04',
    name: 'Valentina Restrepo Meza',
    documentId: '1017894561',
    documentType: 'CC',
    ficha: '2981240',
    program: 'Técnico en Programación de Software (TPS)',
    regional: 'Regional Valle',
    centro: 'Centro de Electricidad y Automatización Industrial',
    xp: 380,
    completedModulesCount: 5,
    totalModulesCount: 6,
    completedCasesCount: 7,
    totalCasesCount: 9,
    quizHighScore: 4,
    badgesCount: 5,
    status: 'EN PROCESO',
    lastActive: 'Hace 2 horas',
    isOnline: false,
    whatsappNumber: '+573112345678'
  },
  {
    id: 'app-05',
    name: 'Julián David Castro',
    documentId: '1045678912',
    documentType: 'CC',
    ficha: '2981240',
    program: 'Técnico en Programación de Software (TPS)',
    regional: 'Regional Santander',
    centro: 'Centro de Servicios Empresariales y Turísticos',
    xp: 150,
    completedModulesCount: 2,
    totalModulesCount: 6,
    completedCasesCount: 2,
    totalCasesCount: 9,
    quizHighScore: 3,
    badgesCount: 2,
    status: 'EN PROCESO',
    lastActive: 'Hace 4 horas',
    isOnline: false,
    whatsappNumber: '+573123456789'
  },
  {
    id: 'app-06',
    name: 'Daniela Sofía Herrera',
    documentId: '1088765431',
    documentType: 'CC',
    ficha: '3012984',
    program: 'Tecnólogo en Animación Digital y 3D',
    regional: 'Regional Bolívar',
    centro: 'Centro para el Desarrollo Agroecológico y Agroindustrial',
    xp: 490,
    completedModulesCount: 6,
    totalModulesCount: 6,
    completedCasesCount: 9,
    totalCasesCount: 9,
    quizHighScore: 5,
    badgesCount: 8,
    status: 'CERTIFICADO APROBADO',
    lastActive: 'Hace 10 minutos',
    isOnline: true,
    whatsappNumber: '+573134567890'
  },
  {
    id: 'app-07',
    name: 'Mateo Andrés Rincón',
    documentId: '1005123456',
    documentType: 'TI',
    ficha: '3012984',
    program: 'Tecnólogo en Animación Digital y 3D',
    regional: 'Regional Caldas',
    centro: 'Centro de Automatización Industrial',
    xp: 90,
    completedModulesCount: 1,
    totalModulesCount: 6,
    completedCasesCount: 1,
    totalCasesCount: 9,
    quizHighScore: 2,
    badgesCount: 1,
    status: 'EN PROCESO',
    lastActive: 'Ayer',
    isOnline: false,
    whatsappNumber: '+573145678901'
  }
];

export interface InstructorConfig {
  name: string;
  email: string;
  role: string;
  center: string;
  regional: string;
  fichas: string[];
  activeFicha: string;
}

export const INSTRUCTOR_DEFAULT: InstructorConfig = {
  name: 'Blas Thorrens',
  email: 'blaisethorrens@gmail.com',
  role: 'Instructor Líder de Inducción & Administrador',
  center: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
  regional: 'Regional SENA',
  fichas: ['2874102', '2981240', '3012984'],
  activeFicha: '2874102'
};
