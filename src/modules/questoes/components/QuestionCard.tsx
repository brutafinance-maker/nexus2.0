import React from 'react';
import { ChevronRight, Brain, BarChart2, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Question } from '../data/questionsMock';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  index: number;
  onSelect: () => void;
}

export const QuestionCard = ({ question, index, onSelect }: QuestionCardProps) => {
  const difficultyColor = {
    'Fácil': 'text-green-600 bg-green-50 dark:bg-green-900/20',
    'Médio': 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
    'Difícil': 'text-red-600 bg-red-50 dark:bg-red-900/20',
  }[question.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-6 cursor-pointer group hover:shadow-xl transition-all duration-300 border-transparent hover:border-blue-200 dark:hover:border-blue-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                {question.module}
              </span>
              <span className={`px-3 py-1 ${difficultyColor} text-[10px] font-black rounded-full uppercase tracking-wider`}>
                {question.difficulty}
              </span>
              <span className="px-3 py-1 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                {question.type}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {question.statement}
            </h3>

            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-1.5">
                <Brain size={14} />
                {question.theme}
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart2 size={14} />
                ID: {question.id}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-end">
            <Button onClick={onSelect} className="gap-2 font-bold shadow-lg shadow-blue-500/20">
              Responder <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
