import React from 'react';
import { CheckCircle2, Circle, Clock, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionSession } from '../data/questionsMock';

interface QuestionSidebarProps {
  session: QuestionSession;
  currentIndex: number;
  onSelect: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const QuestionSidebar = ({ session, currentIndex, onSelect, isOpen, onClose }: QuestionSidebarProps) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border-l border-gray-100 dark:border-slate-800 w-80 shadow-2xl lg:shadow-none">
      <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between">
        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Progresso</h2>
        <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
        {session.questions.map((q, idx) => {
          const isActive = idx === currentIndex;
          const isAnswered = q.userAnswer !== null;
          const isCorrect = q.isCorrect;

          return (
            <button
              key={idx}
              onClick={() => {
                onSelect(idx);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border-2 group ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-900 dark:text-blue-300'
                  : 'bg-white dark:bg-slate-800/50 border-gray-50 dark:border-slate-700/50 hover:border-gray-200 dark:hover:border-slate-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
              }`}>
                {idx + 1}
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Status</span>
                  {isAnswered ? (
                    isCorrect !== null ? (
                      isCorrect ? (
                        <CheckCircle2 size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )
                    ) : (
                      <CheckCircle2 size={16} className="text-blue-500" />
                    )
                  ) : (
                    <Circle size={16} className="text-gray-300 dark:text-slate-600" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-gray-400 dark:text-gray-500">
                  <Clock size={12} />
                  {formatTime(q.timeSpent)}
                </div>
              </div>

              <ChevronRight size={18} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-blue-500' : 'text-gray-300'}`} />
            </button>
          );
        })}
      </div>

      <div className="p-6 border-t border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700">
            <span className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Total</span>
            <span className="text-xl font-black text-gray-900 dark:text-white">{session.stats.totalQuestions}</span>
          </div>
          <div className="text-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700">
            <span className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Feitas</span>
            <span className="text-xl font-black text-blue-600 dark:text-blue-400">{session.stats.answeredCount}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
