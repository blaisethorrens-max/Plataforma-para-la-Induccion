import React from 'react';
import { UserCheck, GraduationCap } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface RoleSelectionProps {
  onSelectRole: (role: 'instructor' | 'aprendiz') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8 text-center">
        <div className="flex justify-center">
            <SenaLogo size={80} color="#39A900" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Bienvenido al Sistema de Inducción SENA</h1>
        <p className="text-slate-600">Por favor, selecciona tu rol para comenzar:</p>

        <div className="grid gap-4">
          <button
            onClick={() => onSelectRole('instructor')}
            className="flex items-center gap-4 p-6 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all text-left"
          >
            <UserCheck className="w-8 h-8 text-emerald-400" />
            <div>
              <h3 className="font-bold">Instructor</h3>
              <p className="text-xs text-slate-400">Acceso al panel de gestión y seguimiento.</p>
            </div>
          </button>

          <button
            onClick={() => onSelectRole('aprendiz')}
            className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
          >
            <GraduationCap className="w-8 h-8 text-[#39A900]" />
            <div>
              <h3 className="font-bold text-slate-900">Aprendiz</h3>
              <p className="text-xs text-slate-600">Acceso a la ruta de inducción y módulos.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
