import { useState, useCallback, useEffect, useMemo } from 'react';
import { Question, QuestionSession, MOCK_QUESTIONS } from '../data/questionsMock';
import { FilterState } from './useFilters';
import { toast } from 'sonner';
import { useAuth } from '../../../context/AuthContext';
import { useGamification } from '../../../hooks/useGamification';

export const useQuestionSession = () => {
  const { handleQuestionAnswered } = useGamification();
  const [session, setSession] = useState<QuestionSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const startSession = useCallback((filters: FilterState) => {
    let filtered = MOCK_QUESTIONS.filter((q) => {
      const moduleMatch = filters.module.length === 0 || filters.module.includes(q.module);
      const problemMatch = filters.problem.length === 0 || (q.problem && filters.problem.includes(q.problem));
      const subjectMatch = filters.subject.length === 0 || filters.subject.includes(q.theme);
      const themeMatch = filters.theme.length === 0 || filters.theme.includes(q.theme);
      const difficultyMatch = filters.difficulty.length === 0 || filters.difficulty.includes(q.difficulty);
      const typeMatch = filters.type.length === 0 || filters.type.includes(q.type);
      return moduleMatch && problemMatch && subjectMatch && themeMatch && difficultyMatch && typeMatch;
    });

    filtered = filtered.sort(() => Math.random() - 0.5).slice(0, filters.quantity);

    const newSession: QuestionSession = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      filters,
      questions: filtered.map((q) => ({
        questionId: q.id,
        userAnswer: null,
        isCorrect: null,
        timeSpent: 0,
      })),
      stats: {
        totalQuestions: filtered.length,
        answeredCount: 0,
        correctCount: 0,
        totalTime: 0,
      },
      isFinished: false,
    };

    setSession(newSession);
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
  }, []);

  const currentQuestionData = useMemo(() => {
    if (!session) return null;
    const qId = session.questions[currentQuestionIndex]?.questionId;
    return MOCK_QUESTIONS.find((q) => q.id === qId) || null;
  }, [session, currentQuestionIndex]);

  const answerQuestion = useCallback((answer: number | string) => {
    if (!session || !currentQuestionData) return;

    const now = Date.now();
    const timeSpentOnThis = Math.floor((now - startTime) / 1000);

    const isCorrect = currentQuestionData.type === 'Múltipla escolha' 
      ? answer === currentQuestionData.correctOption 
      : true; // Mock correct for discursive

    // Update Firebase Stats
    handleQuestionAnswered({
      questionId: currentQuestionData.id,
      isCorrect,
      difficulty: currentQuestionData.difficulty,
      timeSpent: timeSpentOnThis
    }).then((result) => {
      if (result && isCorrect) {
        toast.success(`Parabéns! +${result.pointsEarned} pontos`, {
          description: `Streak atual: ${result.newStreak} 🔥`,
          duration: 3000,
        });
      } else if (result && !isCorrect) {
        toast.error("Resposta incorreta", {
          description: "Não desista! Continue estudando. 🔥",
          duration: 3000,
        });
      }
    });

    setSession((prev) => {
      if (!prev) return null;
      const newQuestions = [...prev.questions];

      newQuestions[currentQuestionIndex] = {
        ...newQuestions[currentQuestionIndex],
        userAnswer: answer,
        isCorrect,
        timeSpent: newQuestions[currentQuestionIndex].timeSpent + timeSpentOnThis,
      };

      const answeredCount = newQuestions.filter((q) => q.userAnswer !== null).length;
      const correctCount = newQuestions.filter((q) => q.isCorrect === true).length;

      return {
        ...prev,
        questions: newQuestions,
        stats: {
          ...prev.stats,
          answeredCount,
          correctCount,
        },
      };
    });
    
    setStartTime(Date.now()); // Reset start time for next question or same question if re-answering
  }, [session, currentQuestionData, currentQuestionIndex, startTime, handleQuestionAnswered]);

  const finishSession = useCallback(() => {
    if (!session) return;
    
    const finalSession = {
      ...session,
      isFinished: true,
      stats: {
        ...session.stats,
        totalTime: session.questions.reduce((acc, q) => acc + q.timeSpent, 0),
      }
    };

    setSession(finalSession);
    
    // Save to localStorage (History)
    const history = JSON.parse(localStorage.getItem('nexusbq_questions_history') || '[]');
    localStorage.setItem('nexusbq_questions_history', JSON.stringify([finalSession, ...history]));
    
    return finalSession;
  }, [session]);

  const nextQuestion = useCallback(() => {
    if (session && currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setStartTime(Date.now());
    }
  }, [session, currentQuestionIndex]);

  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setStartTime(Date.now());
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (session && index >= 0 && index < session.questions.length) {
      setCurrentQuestionIndex(index);
      setStartTime(Date.now());
    }
  }, [session]);

  const loadSession = useCallback((loadedSession: QuestionSession) => {
    setSession(loadedSession);
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
  }, []);

  return {
    session,
    currentQuestionIndex,
    currentQuestionData,
    startSession,
    answerQuestion,
    finishSession,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    loadSession,
  };
};
