import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Sparkles, Copy, Check } from 'lucide-react';
import { askSenaAiMentor } from '../services/aiMentor';
import { sound } from '../utils/audio';
import { SenaLogo } from './SenaLogo';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const MentorModal: React.FC<MentorModalProps> = ({
  isOpen,
  onClose,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola, aprendiz! Soy tu **Tutor Virtual SENA**. Estoy aquí para orientarte en cualquier duda sobre el **Reglamento del Aprendiz (Versión 2024 con su Acuerdo Complementario de 2026)**, uso ético de Inteligencia Artificial en evidencias, novedades en SofiaPlus/Zajuna, faltas disciplinarias o tu etapa productiva. ¿En qué te puedo asesorar hoy?'
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggested prompts
  const suggestions = [
    '¿Cómo regula el Acuerdo 2026 el uso de IA en evidencias?',
    '¿Qué pasa si falto 3 días seguidos sin justificar?',
    '¿Cuáles conductas son consideradas faltas gravísimas?',
    '¿Qué modalidades tengo para la Etapa Productiva (remota/presencial)?',
    '¿Cómo me defiendo en un Comité disciplinario?'
  ];

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendQuery(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendQuery = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isLoading) return;

    sound.playClick();
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputQuery('');
    setIsLoading(true);

    try {
      const reply = await askSenaAiMentor(text, newMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      sound.playSuccess();
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Ocurrió un error al consultar el reglamento. Recuerda que ante cualquier eventualidad, tu Coordinación Académica o Vocero de Ficha te brindarán atención presencial.'
        }
      ]);
      sound.playError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl h-[88vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden my-auto transition-colors">
        
        {/* Header with Official SENA Logo at 70% scale */}
        <div className="bg-gradient-to-r from-[#00324D] to-[#002235] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-md">
              <SenaLogo size={38} scale={0.7} color="#59C31C" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Tutor SENA · Asesor del Reglamento</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                  Norma 2024-2026
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Reglamento del Aprendiz 2024 con Acuerdo Complementario 2026
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((msg, i) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={i}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-[#00324D] dark:bg-slate-800 text-[#59C31C] border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-2xs relative group ${
                    isUser
                      ? 'bg-[#00324D] text-white rounded-tr-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.content}
                  </div>

                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.content, i)}
                      title="Copiar respuesta"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded bg-slate-100 dark:bg-slate-700 transition-opacity"
                    >
                      {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    Tú
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-2">
              <div className="w-2 h-2 rounded-full bg-[#39A900] animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-[#39A900] animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-[#39A900] animate-bounce [animation-delay:0.4s]"></div>
              <span>Consultando Reglamento 2024 y Acuerdo Complementario 2026...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions Bar */}
        <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#39A900]" />
            Consultas 2024-2026:
          </span>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(s)}
              className="text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-700 hover:bg-slate-200/60 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors shrink-0"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Pregunta sobre deberes, IA en evidencias o normas del SENA 2024-2026..."
              className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className={`p-2.5 rounded-xl font-bold transition-all ${
                inputQuery.trim() && !isLoading
                  ? 'bg-[#39A900] hover:bg-[#329600] text-slate-950 shadow-xs cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
