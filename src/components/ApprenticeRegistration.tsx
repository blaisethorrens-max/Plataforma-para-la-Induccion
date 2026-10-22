import React, { useState } from 'react';
import { User, BookOpen, MapPin } from 'lucide-react';
import { ApprenticeProfile } from '../types';

interface ApprenticeRegistrationProps {
  onComplete: (profile: Partial<ApprenticeProfile>) => void;
}

export const ApprenticeRegistration: React.FC<ApprenticeRegistrationProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    documentId: '',
    ficha: '',
    whatsappNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Caracterización del Aprendiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nombre Completo</label>
            <input 
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                className="w-full p-2 mt-1 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Documento de Identidad</label>
            <input 
                required
                value={formData.documentId}
                onChange={e => setFormData(prev => ({...prev, documentId: e.target.value}))}
                className="w-full p-2 mt-1 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Ficha</label>
            <input 
                required
                value={formData.ficha}
                onChange={e => setFormData(prev => ({...prev, ficha: e.target.value}))}
                className="w-full p-2 mt-1 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Número de WhatsApp</label>
            <input 
                required
                type="tel"
                value={formData.whatsappNumber}
                onChange={e => setFormData(prev => ({...prev, whatsappNumber: e.target.value}))}
                className="w-full p-2 mt-1 border border-slate-300 rounded-lg"
                placeholder="+57..."
            />
          </div>
          <button type="submit" className="w-full bg-[#39A900] text-white py-3 rounded-xl font-bold hover:bg-[#329600]">
            Comenzar Inducción
          </button>
        </form>
      </div>
    </div>
  );
};
