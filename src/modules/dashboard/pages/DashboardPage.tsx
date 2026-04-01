import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Flame, Target, Trophy, Clock, Sparkles } from 'lucide-react';
import { NavTab } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { QUICK_ACTIONS } from '../data/mock';
import { useAuth } from '../../../context/AuthContext';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../../services/firebase';

interface DashboardPageProps {
  setActiveTab: (tab: NavTab) => void;
}

export const DashboardPage = ({ setActiveTab }: DashboardPageProps) => {
  const { userData, user } = useAuth();
  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      orderBy('weeklyPoints', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      setRanking(data);
    });

    return () => unsubscribe();
  }, []);

  const stats = [
    {
      label: 'Pontos Nexus',
      value: userData?.points?.toLocaleString() || '0',
      icon: Trophy,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      label: 'Streak Atual',
      value: `${userData?.streak || 0} Dias`,
      icon: Flame,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      animate: true
    },
    {
      label: 'Questões Hoje',
      value: userData?.questionsToday || '0',
      icon: Target,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Tempo de Estudo',
      value: userData?.studyTimeToday ? `${Math.floor(userData.studyTimeToday / 3600)}h ${Math.floor((userData.studyTimeToday % 3600) / 60)}m` : '0h 0m',
      icon: Clock,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      tab: 'foco' as NavTab
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Olá, {userData?.displayName || 'Estudante'} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">"O sucesso é a soma de pequenos esforços repetidos dia após dia."</p>
        </div>
        {userData?.streak === 0 && (
          <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl">
            <Flame className="text-orange-500 animate-bounce" size={24} />
            <p className="text-sm font-bold text-orange-700 dark:text-orange-400">Não deixe seu foguinho apagar! 🔥</p>
          </div>
        )}
      </header>

      {/* Gamification Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={card.tab ? 'cursor-pointer' : ''}
            onClick={() => card.tab && setActiveTab(card.tab)}
          >
            <Card className={`p-6 relative overflow-hidden group ${card.tab ? 'hover:border-blue-500/50 transition-all' : ''}`}>
              {card.animate && (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-4 -top-4 w-24 h-24 bg-red-500 rounded-full blur-2xl"
                />
              )}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                  <card.icon size={24} className={card.animate ? 'animate-pulse' : ''} />
                </div>
                {card.animate && userData?.streak && userData.streak > 0 && (
                  <Sparkles size={16} className="text-orange-500 animate-spin" />
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium relative z-10">{card.label}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1 relative z-10 tracking-tight">{card.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(action.tab)}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all group text-left"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{action.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{action.sub}</p>
                </div>
                <ChevronRight className="ml-auto text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors" size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* Ranking */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ranking Semanal</h2>
          <Card className="overflow-hidden" hover={false}>
            <div className="p-4 bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estudante</span>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pontos</span>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-slate-700/50">
              {ranking.map((r, i) => (
                <div key={r.uid} className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors ${r.uid === user?.uid ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold w-5 ${i < 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>{i + 1}</span>
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold overflow-hidden">
                      {r.photoURL ? (
                        <img src={r.photoURL} alt={r.displayName} className="w-full h-full object-cover" />
                      ) : (
                        r.displayName?.charAt(0)
                      )}
                    </div>
                    <span className={`text-sm font-medium ${r.uid === user?.uid ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-900 dark:text-gray-200'}`}>
                      {r.displayName}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{r.weeklyPoints.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveTab('ranking')}
              className="w-full p-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors border-t border-gray-100 dark:border-slate-700"
            >
              Ver Ranking Completo
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
