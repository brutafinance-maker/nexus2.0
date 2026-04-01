import React, { useState } from 'react';
import { FilterPage } from './FilterPage';
import { SessionPage } from './SessionPage';
import { HistoryPage } from './HistoryPage';
import { QuestionSession } from '../data/questionsMock';
import { useQuestionSession } from '../hooks/useQuestionSession';
import { LayoutGrid, History, Filter } from 'lucide-react';

export const QuestoesPage = () => {
  const [activeView, setActiveView] = useState<'main' | 'session'>('main');
  const [activeTab, setActiveTab] = useState<'filters' | 'history'>('filters');
  const [selectedSession, setSelectedSession] = useState<QuestionSession | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const { startSession, session } = useQuestionSession();

  const handleStartSession = (filters: any) => {
    startSession(filters);
    setIsReviewMode(false);
    setActiveView('session');
  };

  const handleReviewSession = (sessionToReview: QuestionSession) => {
    setSelectedSession(sessionToReview);
    setIsReviewMode(true);
    setActiveView('session');
  };

  const handleFinishSession = () => {
    setActiveView('main');
    setSelectedSession(null);
    setIsReviewMode(false);
  };

  if (activeView === 'session') {
    return (
      <SessionPage
        session={selectedSession || session!}
        onFinish={handleFinishSession}
        onBack={handleFinishSession}
        isReviewMode={isReviewMode}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Banco de Questões</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Pratique com questões selecionadas de provas reais.</p>
          </div>

          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setActiveTab('filters')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'filters'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Filter size={18} /> Criar Lista
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <History size={18} /> Minhas Listas
            </button>
          </div>
        </div>

        {activeTab === 'filters' ? (
          <FilterPage onStart={handleStartSession} />
        ) : (
          <HistoryPage onReview={handleReviewSession} />
        )}
      </div>
    </div>
  );
};
