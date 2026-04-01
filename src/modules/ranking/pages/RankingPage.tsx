import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../context/AuthContext';
import { TopThree } from '../components/TopThree';
import { RankingItem } from '../components/RankingItem';
import { Trophy, Info, Flame, Sparkles } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

export const RankingPage = () => {
  const { user } = useAuth();
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      orderBy('weeklyPoints', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      setRanking(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching ranking:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const currentUserPosition = ranking.findIndex(r => r.uid === user?.uid) + 1;
  const topThree = ranking.slice(0, 3);
  const restOfRanking = ranking.slice(3);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-8 animate-pulse">
        <div className="h-48 bg-gray-100 dark:bg-slate-800 rounded-[40px]" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12 animate-in fade-in duration-500">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
          <Trophy size={14} />
          Ranking Semanal
        </div>
        <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Elite Nexus
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-lg mx-auto">
          A cada domingo o ranking reseta. Mostre sua dedicação e conquiste o topo da elite médica.
        </p>
      </header>

      {/* Top Three Section */}
      {topThree.length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 dark:from-blue-900/10 to-transparent rounded-[40px] -z-10" />
          <TopThree users={topThree} />
        </div>
      )}

      {/* User Status Card */}
      {user && currentUserPosition > 0 && (
        <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none shadow-xl shadow-blue-500/20" hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-black text-xl">
                {currentUserPosition}º
              </div>
              <div>
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Sua Posição</p>
                <p className="text-xl font-black">Você está no Top {Math.ceil((currentUserPosition / ranking.length) * 100)}%</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Pontos</p>
                <p className="text-xl font-black">{ranking[currentUserPosition - 1]?.weeklyPoints.toLocaleString()}</p>
              </div>
              <Flame className="text-orange-400 animate-pulse" size={32} />
            </div>
          </div>
        </Card>
      )}

      {/* Ranking List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Classificação</h2>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <Info size={14} />
            Atualizado em tempo real
          </div>
        </div>
        
        <div className="space-y-3">
          {restOfRanking.map((item, index) => (
            <motion.div
              key={item.uid}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RankingItem 
                user={item} 
                position={index + 4} 
                isCurrentUser={item.uid === user?.uid} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {ranking.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Sparkles size={40} />
          </div>
          <p className="text-gray-500 font-bold">O ranking ainda está vazio. Seja o primeiro a pontuar!</p>
        </div>
      )}
    </div>
  );
};
