import React, { useState } from 'react';
import { X, User, Save, RotateCcw } from 'lucide-react';
import { ApprenticeProfile } from '../types';
import { sound } from '../utils/audio';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSaveProfile: (updated: Partial<ApprenticeProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: profile.name,
    documentId: profile.documentId,
    documentType: profile.documentType,
    ficha: profile.ficha,
    program: profile.program,
    regional: profile.regional,
    centro: profile.centro,
    whatsappNumber: profile.whatsappNumber
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    onSaveProfile(formData);
    onClose();
  };

  const handleResetDefaults = () => {
    sound.playClick();
    setFormData({
      name: 'Alejandro Morales Ríos',
      documentId: '1020304050',
      documentType: 'CC',
      ficha: '2874102',
      program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      regional: 'Regional Distrito Capital',
      centro: 'Centro de Gestión de Mercados, Logística y TIC'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto transition-colors">
        
        {/* Header */}
        <div className="bg-[#00324D] dark:bg-[#002235] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#59C31C]" />
            <h3 className="text-base font-bold text-white">Editar Datos del Aprendiz</h3>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Nombre Completo del Aprendiz
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-colors"
              placeholder="Ej. Juan Pérez Gómez"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Tipo Doc.
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value as ApprenticeProfile['documentType'] })}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white font-semibold transition-colors"
              >
                <option value="CC">CC (Cédula)</option>
                <option value="TI">TI (Tarjeta)</option>
                <option value="PPT">PPT (Permiso)</option>
                <option value="CE">CE (Extranjería)</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Número de Documento
              </label>
              <input
                type="text"
                required
                value={formData.documentId}
                onChange={(e) => setFormData({ ...formData, documentId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] font-mono text-slate-900 dark:text-white transition-colors"
                placeholder="1020304050"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                N° de Ficha
              </label>
              <input
                type="text"
                required
                value={formData.ficha}
                onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] font-mono text-slate-900 dark:text-white font-bold transition-colors"
                placeholder="2874102"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Programa de Formación
              </label>
              <input
                type="text"
                required
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
                placeholder="Tecnólogo en ADSO"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Regional SENA
            </label>
            <input
              type="text"
              required
              value={formData.regional}
              onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
              placeholder="Regional Distrito Capital"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Centro de Formación
            </label>
            <input
              type="text"
              required
              value={formData.centro}
              onChange={(e) => setFormData({ ...formData, centro: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
              placeholder="Centro de Servicios Financieros"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Número de WhatsApp
            </label>
            <input
              type="tel"
              required
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
              placeholder="+57..."
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-6">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Valores por defecto
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { sound.playClick(); onClose(); }}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-[#39A900] hover:bg-[#329600] text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-102"
              >
                <Save className="w-4 h-4" />
                Guardar Cambios
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
