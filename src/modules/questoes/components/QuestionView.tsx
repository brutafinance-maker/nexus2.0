import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeft, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Question } from '../data/questionsMock';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionViewProps {
  question: Question;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const QuestionView = ({ question, onBack, onNext, onPrev, hasNext, hasPrev }: QuestionViewProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [discursiveAnswer, setDiscursiveAnswer] = useState('');

  const handleAnswer = () => {
    if (question.type === 'Múltipla escolha' && selectedOption !== null) {
      setShowResult(true);
    } else if (question.type === 'Discursiva') {
      setShowResult(true);
    }
  };

  const resetState = () => {
    setSelectedOption(null);
    setShowResult(false);
    setDiscursiveAnswer('');
  };

  const handleNext = () => {
    resetState();
    onNext?.();
  };

  const handlePrev = () => {
    resetState();
    onPrev?.();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Voltar para a lista
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrev}
            disabled={!hasPrev}
            className="rounded-full w-10 h-10 p-0"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleNext}
            disabled={!hasNext}
            className="rounded-full w-10 h-10 p-0"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden shadow-2xl dark:shadow-none border-none bg-white dark:bg-slate-900/50 backdrop-blur-xl" hover={false}>
        <div className="p-4 bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700/50 flex flex-wrap gap-3 items-center px-8">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-black rounded-full uppercase tracking-wider">
            {question.module}
          </span>
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black rounded-full uppercase tracking-wider">
            {question.theme}
          </span>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-[10px] font-black rounded-full uppercase tracking-wider">
            {question.difficulty}
          </span>
          <div className="ml-auto text-xs font-bold text-gray-400 dark:text-gray-500">
            ID: {question.id}
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-relaxed mb-12">
              {question.statement}
            </h2>
          </div>

          <div className="space-y-4">
            {question.type === 'Múltipla escolha' ? (
              question.options?.map((option, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === question.correctOption;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={i}
                    disabled={showResult}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-4 group ${
                      showCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-900 dark:text-green-300'
                        : showWrong
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-300'
                        : isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-900 dark:text-blue-300'
                        : 'bg-white dark:bg-slate-800/50 border-gray-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                      showCorrect ? 'bg-green-500 text-white' : showWrong ? 'bg-red-500 text-white' : isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-bold pt-1 leading-relaxed">{option}</span>
                    {showCorrect && <CheckCircle2 className="ml-auto text-green-500 shrink-0" size={24} />}
                    {showWrong && <XCircle className="ml-auto text-red-500 shrink-0" size={24} />}
                  </button>
                );
              })
            ) : (
              <div className="space-y-4">
                <textarea
                  value={discursiveAnswer}
                  onChange={(e) => setDiscursiveAnswer(e.target.value)}
                  disabled={showResult}
                  placeholder="Escreva sua resposta aqui..."
                  className="w-full h-48 p-6 rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-gray-100 dark:border-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-medium"
                />
              </div>
            )}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
            {!showResult ? (
              <Button
                disabled={question.type === 'Múltipla escolha' ? selectedOption === null : !discursiveAnswer.trim()}
                onClick={handleAnswer}
                size="lg"
                className="w-full sm:w-auto h-14 px-12 text-lg font-bold shadow-xl shadow-blue-500/20"
              >
                Responder
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  onClick={handleNext}
                  disabled={!hasNext}
                  size="lg"
                  className="h-14 px-12 text-lg font-bold"
                >
                  Próxima Questão
                </Button>
                <Button
                  variant="secondary"
                  onClick={resetState}
                  size="lg"
                  className="h-14 px-12 text-lg font-bold"
                >
                  Tentar Novamente
                </Button>
              </div>
            )}
            
            <button className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors underline underline-offset-4">
              Reportar Erro na Questão
            </button>
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20"
              >
                <div className="flex items-center gap-3 mb-6 text-blue-600 dark:text-blue-400">
                  <MessageCircle size={24} />
                  <h4 className="text-xl font-black uppercase tracking-tight">Comentário do Professor</h4>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  {question.comment}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};
