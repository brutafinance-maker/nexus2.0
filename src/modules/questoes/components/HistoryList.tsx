import React from 'react';
import { Calendar, Clock, CheckCircle2, ChevronRight, FileText, Trash2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { QuestionSession } from '../data/questionsMock';
import { motion } from 'framer-motion';

interface HistoryListProps {
  history: QuestionSession[];
  onReview: (session: QuestionSession) => void;
  onDelete: (id: string) => void;
  onExport: (session: QuestionSession) => void;
}

export const HistoryList = ({ history, onReview, onDelete, onExport }: HistoryListProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-gray-100 dark:border-slate-800">
        <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <FileText size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Nenhuma lista resolvida</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm font-medium">
          Suas listas de questões aparecerão aqui após você finalizá-las.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((session, index) => (
        <motion.div
          key={session.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="p-6 border-none shadow-xl dark:shadow-none bg-white dark:bg-slate-900/50 backdrop-blur-xl group" hover={false}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                  <Calendar size={16} />
                  <span className="text-sm font-bold">{formatDate(session.createdAt)}</span>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Questões</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-gray-900 dark:text-white">{session.stats.totalQuestions}</span>
                      <span className="text-xs font-bold text-gray-400">({session.stats.correctCount} corretas)</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Tempo Total</span>
                    <div className="flex items-center gap-2 text-xl font-black text-gray-900 dark:text-white">
                      <Clock size={18} className="text-blue-500" />
                      {formatTime(session.stats.totalTime)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Aproveitamento</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500" 
                          style={{ width: `${(session.stats.correctCount / session.stats.totalQuestions) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-black text-emerald-500">
                        {Math.round((session.stats.correctCount / session.stats.totalQuestions) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button 
                  variant="secondary" 
                  onClick={() => onExport(session)}
                  className="gap-2 font-bold"
                >
                  <FileText size={18} /> Exportar
                </Button>
                <Button 
                  onClick={() => onReview(session)}
                  className="gap-2 font-bold shadow-lg shadow-blue-500/20"
                >
                  Revisar <ChevronRight size={18} />
                </Button>
                <button 
                  onClick={() => onDelete(session.id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
