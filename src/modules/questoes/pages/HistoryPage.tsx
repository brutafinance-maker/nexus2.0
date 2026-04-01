import React from 'react';
import { HistoryList } from '../components/HistoryList';
import { useHistory } from '../hooks/useHistory';
import { QuestionSession } from '../data/questionsMock';
import { motion } from 'framer-motion';

interface HistoryPageProps {
  onReview: (session: QuestionSession) => void;
}

export const HistoryPage = ({ onReview }: HistoryPageProps) => {
  const { history, deleteSession } = useHistory();

  const handleExport = (session: QuestionSession) => {
    // Mock PDF export
    alert(`Simulando exportação de PDF para a sessão de ${new Date(session.createdAt).toLocaleDateString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
          Minhas Listas
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
          Acompanhe seu progresso e revise questões de sessões anteriores.
        </p>
      </div>

      <HistoryList
        history={history}
        onReview={onReview}
        onDelete={deleteSession}
        onExport={handleExport}
      />
    </div>
  );
};
