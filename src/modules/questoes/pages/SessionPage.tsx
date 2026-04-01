import React, { useState } from 'react';
import { SessionHeader } from '../components/SessionHeader';
import { QuestionViewer } from '../components/QuestionViewer';
import { QuestionSidebar } from '../components/QuestionSidebar';
import { useQuestionSession } from '../hooks/useQuestionSession';
import { QuestionSession } from '../data/questionsMock';
import { motion, AnimatePresence } from 'framer-motion';

interface SessionPageProps {
  session: QuestionSession;
  onFinish: () => void;
  onBack: () => void;
  isReviewMode?: boolean;
}

export const SessionPage = ({ session: initialSession, onFinish, onBack, isReviewMode }: SessionPageProps) => {
  const {
    session,
    currentQuestionIndex,
    currentQuestionData,
    answerQuestion,
    finishSession,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    loadSession,
  } = useQuestionSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load session if provided
  React.useEffect(() => {
    if (initialSession) {
      loadSession(initialSession);
    }
  }, [initialSession, loadSession]);

  if (!session || !currentQuestionData) return null;

  const handleFinish = () => {
    if (!isReviewMode) {
      finishSession();
    }
    onFinish();
  };

  const currentQuestionState = session.questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-slate-950 flex flex-col overflow-hidden animate-in fade-in duration-300">
      <SessionHeader
        onFinish={handleFinish}
        onBack={onBack}
        totalQuestions={session.stats.totalQuestions}
        answeredCount={session.stats.answeredCount}
        isReviewMode={isReviewMode}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <QuestionViewer
          question={currentQuestionData}
          userAnswer={currentQuestionState.userAnswer}
          isCorrect={currentQuestionState.isCorrect}
          onAnswer={answerQuestion}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          hasNext={currentQuestionIndex < session.questions.length - 1}
          hasPrev={currentQuestionIndex > 0}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <QuestionSidebar
          session={session}
          currentIndex={currentQuestionIndex}
          onSelect={goToQuestion}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
};
