import { useState, useCallback, useMemo } from 'react';
import { MOCK_QUESTIONS, Question } from '../data/questionsMock';
import { FilterState } from './useFilters';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

  const generateQuestions = useCallback((filters: FilterState) => {
    let filtered = MOCK_QUESTIONS.filter((q) => {
      const moduleMatch = filters.module.length === 0 || filters.module.includes(q.module);
      const problemMatch = filters.problem.length === 0 || (q.problem && filters.problem.includes(q.problem));
      const subjectMatch = filters.subject.length === 0 || filters.subject.includes(q.theme);
      const themeMatch = filters.theme.length === 0 || filters.theme.includes(q.theme);
      const difficultyMatch = filters.difficulty.length === 0 || filters.difficulty.includes(q.difficulty);
      const typeMatch = filters.type.length === 0 || filters.type.includes(q.type);
      return moduleMatch && problemMatch && subjectMatch && themeMatch && difficultyMatch && typeMatch;
    });

    // Shuffle and limit
    filtered = filtered
      .sort(() => Math.random() - 0.5)
      .slice(0, filters.quantity);

    setQuestions(filtered);
    setIsGenerated(true);
    setCurrentQuestionId(null);
  }, []);

  const clearQuestions = useCallback(() => {
    setQuestions([]);
    setIsGenerated(false);
    setCurrentQuestionId(null);
  }, []);

  const selectQuestion = useCallback((id: string) => {
    setCurrentQuestionId(id);
  }, []);

  const currentQuestion = useMemo(() => {
    return questions.find((q) => q.id === currentQuestionId) || null;
  }, [questions, currentQuestionId]);

  const nextQuestion = useCallback(() => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    if (currentIndex !== -1 && currentIndex < questions.length - 1) {
      setCurrentQuestionId(questions[currentIndex + 1].id);
    }
  }, [questions, currentQuestionId]);

  const prevQuestion = useCallback(() => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    if (currentIndex > 0) {
      setCurrentQuestionId(questions[currentIndex - 1].id);
    }
  }, [questions, currentQuestionId]);

  return {
    questions,
    isGenerated,
    currentQuestionId,
    currentQuestion,
    generateQuestions,
    clearQuestions,
    selectQuestion,
    nextQuestion,
    prevQuestion,
  };
};
