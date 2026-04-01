import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ChevronRight, User, Clock, FileText, CheckCircle, Lock, Sparkles } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MOCK_COURSES } from '../data/mock';
import { useAuth } from '../../../context/AuthContext';

export const CursosPage = () => {
  const { userData } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [activeLesson, setActiveLesson] = useState<any | null>(null);

  const isPremium = userData?.isPremium || false;

  if (!isPremium) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-[40px] flex items-center justify-center text-orange-600 dark:text-orange-400 mb-8 shadow-2xl shadow-orange-500/10">
          <Lock size={48} />
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Conteúdo Premium</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-lg mx-auto leading-relaxed mb-10">
          O catálogo de cursos exclusivos é reservado para membros do plano <span className="text-orange-500 font-black uppercase tracking-widest">Nexus Premium</span>.
        </p>
        <Button size="lg" className="h-16 px-12 text-lg font-black bg-orange-500 hover:bg-orange-600 shadow-2xl shadow-orange-500/20 gap-3">
          <Sparkles size={24} /> Assinar Premium Agora
        </Button>
      </div>
    );
  }

  if (selectedCourse) {
    const currentLesson = activeLesson || selectedCourse.lessons[0];

    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <button 
          onClick={() => { setSelectedCourse(null); setActiveLesson(null); }}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
        >
          <ChevronRight className="rotate-180" size={16} />
          Voltar para Catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Player Area */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="overflow-hidden bg-black aspect-video flex items-center justify-center relative group" hover={false}>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 group-hover:bg-gray-900/30 transition-all cursor-pointer">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition-transform">
                  <Play size={32} fill="currentColor" className="ml-1" />
                </div>
              </div>
              <p className="text-white/50 text-sm font-medium">Player de Vídeo: {currentLesson.title}</p>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentLesson.title}</h1>
                <Button variant="outline" className="gap-2">
                  <CheckCircle size={18} /> Marcar como concluída
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-blue-600 dark:text-blue-400" /> {selectedCourse.professor}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-600 dark:text-blue-400" /> {currentLesson.duration}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-slate-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Sobre o Curso</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedCourse.description}</p>
                
                <div className="mt-8 flex gap-4">
                  <Button variant="outline" className="gap-2">
                    <FileText size={18} /> Material Complementar
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <FileText size={18} /> Slides da Aula
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Conteúdo do Curso</h3>
            <Card className="overflow-hidden" hover={false}>
              <div className="divide-y divide-gray-50 dark:divide-slate-800">
                {selectedCourse.lessons.map((lesson: any, i: number) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full text-left p-4 flex gap-4 transition-all hover:bg-gray-50 dark:hover:bg-slate-800/50 ${
                      currentLesson.id === lesson.id ? 'bg-blue-50/50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-400' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      currentLesson.id === lesson.id ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className={`text-sm font-bold line-clamp-2 ${
                        currentLesson.id === lesson.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {lesson.title}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 font-bold uppercase tracking-wider">{lesson.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Catálogo de Cursos</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Aprenda com os melhores especialistas em cada área da medicina.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COURSES.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedCourse(course)}
          >
            <Card className="overflow-hidden cursor-pointer group">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <Button variant="primary" className="w-full">Acessar Curso</Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{course.title}</h3>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  <div className="flex items-center gap-1">
                    <User size={16} className="text-blue-600 dark:text-blue-400" /> {course.professor}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-blue-600 dark:text-blue-400" /> {course.duration}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{course.lessons.length} Aulas</span>
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold text-sm">
                    Ver Detalhes <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
