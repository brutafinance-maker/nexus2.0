import { useState, useCallback, useEffect } from 'react';
import { QuestionSession } from '../data/questionsMock';

export const useHistory = () => {
  const [history, setHistory] = useState<QuestionSession[]>([]);

  const loadHistory = useCallback(() => {
    const savedHistory = JSON.parse(localStorage.getItem('nexusbq_questions_history') || '[]');
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem('nexusbq_questions_history');
    setHistory([]);
  }, []);

  const deleteSession = useCallback((id: string) => {
    const newHistory = history.filter((s) => s.id !== id);
    localStorage.setItem('nexusbq_questions_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  }, [history]);

  return {
    history,
    loadHistory,
    clearHistory,
    deleteSession,
  };
};
