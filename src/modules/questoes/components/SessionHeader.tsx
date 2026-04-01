import React, { useState, useEffect } from 'react';
import { Timer, Save, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface SessionHeaderProps {
  onFinish: () => void;
  onBack: () => void;
  totalQuestions: number;
  answeredCount: number;
  isReviewMode?: boolean;
}

export const SessionHeader = ({ onFinish, onBack, totalQuestions, answeredCount, isReviewMode }: SessionHeaderProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isReviewMode) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isReviewMode]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {isReviewMode ? 'Revisão de Lista' : 'Sessão de Questões'}
            </h1>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              {answeredCount} de {totalQuestions} respondidas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {!isReviewMode && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-mono font-bold">
              <Clock size={18} />
              {formatTime(seconds)}
            </div>
          )}
          
          <Button 
            onClick={onFinish} 
            className="gap-2 font-bold shadow-lg shadow-blue-500/20"
          >
            <Save size={18} /> {isReviewMode ? 'Sair da Revisão' : 'Finalizar e Salvar'}
          </Button>
        </div>
      </div>
    </header>
  );
};
