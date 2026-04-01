import React from 'react';
import { Play, Pause, RotateCcw, Clock, Timer, Sparkles } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { useStudyTracker } from '../hooks/useStudyTracker';
import { StudyCalendar } from '../components/StudyCalendar';

export const FocoPage = () => {
  const { 
    isActive, 
    sessionTime, 
    totalTimeToday, 
    startSession, 
    pauseSession, 
    resetSession, 
    formatTime 
  } = useStudyTracker();

  const toggleTimer = () => {
    if (isActive) pauseSession();
    else startSession();
  };

  const progress = (sessionTime / (25 * 60)) * 100;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      <Card className="rounded-[40px] p-12 sm:p-20 text-center space-y-12 shadow-2xl dark:shadow-none relative overflow-hidden" hover={false}>
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

        <header className="relative z-10">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Modo Foco</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Elimine distrações e maximize sua produtividade.</p>
        </header>

        <div className="relative inline-block z-10">
          <svg className="w-64 h-64 sm:w-80 sm:h-80 transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              className="stroke-gray-100 dark:stroke-slate-800 fill-none"
              strokeWidth="10"
            />
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              className="stroke-blue-600 dark:stroke-blue-500 fill-none transition-all duration-1000"
              strokeWidth="10"
              strokeDasharray="1000"
              strokeDashoffset={1000 - (progress / 100) * 1000}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl sm:text-8xl font-black text-gray-900 dark:text-white tabular-nums tracking-tighter">
              {formatTime(sessionTime)}
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-2 flex items-center gap-2">
              {isActive ? <><Sparkles size={14} className="animate-pulse" /> Focando...</> : 'Pronto?'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 relative z-10">
          <button
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
              isActive 
                ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 dark:shadow-none'
            }`}
          >
            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>
          <button
            onClick={resetSession}
            className="w-14 h-14 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center hover:border-gray-200 dark:hover:border-slate-600 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
          >
            <RotateCcw size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-12 border-t border-gray-50 dark:border-slate-800/50 relative z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Tempo Hoje</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatTime(totalTimeToday)}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
              <Timer size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Sessão Atual</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatTime(sessionTime)}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 rounded-[32px]">
        <StudyCalendar />
      </Card>
    </div>
  );
};
