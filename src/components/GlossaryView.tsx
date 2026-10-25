import React, { useState, useMemo } from 'react';
import { Search, BookMarked, Sparkles } from 'lucide-react';
import { getGlossaryTerms } from '../data/glossaryData';
import { sound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface GlossaryViewProps {
  onAskMentorAboutTerm?: (term: string) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onAskMentorAboutTerm }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');

  const terms = getGlossaryTerms(language);

  const categoryFilters = [
    { key: 'all', label: language === 'en' ? 'All' : 'Todos' },
    { key: 'Académico', label: language === 'en' ? 'Academic' : 'Académico' },
    { key: 'Disciplinario', label: language === 'en' ? 'Disciplinary' : 'Disciplinario' },
    { key: 'Institucional', label: language === 'en' ? 'Institutional' : 'Institucional' },
    { key: 'Plataformas', label: language === 'en' ? 'Platforms' : 'Plataformas' }
  ];

  const filteredTerms = useMemo(() => {
    return terms.filter(item => {
      const matchesCategory = selectedCategoryKey === 'all' || item.category === selectedCategoryKey;
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (item.example && item.example.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [terms, searchTerm, selectedCategoryKey]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Search Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs mb-8 transition-colors">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <BookMarked className="w-4 h-4 text-[#39A900]" />
            {language === 'en' 
              ? 'Official SENA Dictionary & Terminology (2024-2026)' 
              : 'Diccionario y Terminología Oficial SENA (2024-2026)'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'en' ? 'Apprentice Regulatory Glossary' : 'Glosario Normativo del Aprendiz'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {language === 'en'
              ? 'Find immediate clarity on acronyms, pedagogical concepts (FPI, RAPs), ethical AI usage, and disciplinary terms from the 2024 Regulations and 2026 Agreement.'
              : 'Resuelve dudas inmediatas sobre abreviaturas, conceptos pedagógicos (FPI, RAPs), uso ético de IA y términos disciplinarios del Reglamento 2024 con Acuerdo Complementario 2026.'}
          </p>
        </div>

        {/* Search input */}
        <div className="relative mt-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Search by term (e.g., Dropout, RAP, Artificial Intelligence, SofiaPlus)...'
                : 'Buscar por término (ej. Deserción, RAP, Inteligencia Artificial, SofiaPlus)...'
            }
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 cursor-pointer"
            >
              {language === 'en' ? 'Clear' : 'Limpiar'}
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1">
          {categoryFilters.map((cat) => {
            const isActive = selectedCategoryKey === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => { sound.playClick(); setSelectedCategoryKey(cat.key); }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#00324D] dark:bg-slate-700 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.term}</h3>
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  {item.definition}
                </p>

                {item.example && (
                  <div className="mt-3 bg-slate-50 dark:bg-slate-800/70 border-l-2 border-emerald-500 pl-3 py-1.5 rounded-r text-[11px] text-slate-600 dark:text-slate-300 italic">
                    <strong>{language === 'en' ? 'Practical example: ' : 'Ejemplo práctico: '}</strong>
                    {item.example}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-4 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span className="truncate max-w-[240px]">
                  {item.regulationReference || (language === 'en' ? 'Regulations 2024 · 2026 Agreement' : 'Reglamento 2024 · Acuerdo 2026')}
                </span>

                {onAskMentorAboutTerm && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onAskMentorAboutTerm(
                        language === 'en'
                          ? `Explain what "${item.term}" means at SENA and how it affects me under the 2024-2026 regulations`
                          : `Explícame qué significa "${item.term}" en el SENA y cómo me afecta como aprendiz bajo el reglamento 2024-2026`
                      );
                    }}
                    className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-[#39A900]" />
                    <span>{language === 'en' ? 'Ask AI Tutor' : 'Preguntar al Tutor'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400 text-xs">
          {language === 'en'
            ? `No terms found matching "${searchTerm}". Try another keyword or ask the SENA AI Tutor.`
            : `No se encontraron términos para "${searchTerm}". Prueba buscando por otra palabra clave o consulta al Tutor Virtual del SENA.`}
        </div>
      )}

    </div>
  );
};
