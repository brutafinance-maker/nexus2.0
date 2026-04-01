import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../context/AuthContext';
import { Card } from '../../../components/ui/Card';

interface DayStat {
  date: string;
  studyTime: number;
}

export const StudyCalendar = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DayStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      
      const statsRef = collection(db, 'users', user.uid, 'dailyStats');
      const q = query(statsRef, orderBy('date', 'desc'), limit(90)); // Last 90 days
      
      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data() as DayStat);
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const getColor = (seconds: number) => {
    const hours = seconds / 3600;
    if (hours === 0) return 'bg-gray-100 dark:bg-slate-800';
    if (hours < 1) return 'bg-blue-200 dark:bg-blue-900/30';
    if (hours < 3) return 'bg-blue-400 dark:bg-blue-700/50';
    if (hours < 5) return 'bg-blue-600 dark:bg-blue-600/70';
    return 'bg-blue-800 dark:bg-blue-500';
  };

  // Generate last 90 days
  const days = Array.from({ length: 90 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    const dateStr = d.toISOString().split('T')[0];
    const stat = stats.find(s => s.date === dateStr);
    return {
      date: dateStr,
      studyTime: stat?.studyTime || 0
    };
  });

  if (loading) return <div className="h-32 animate-pulse bg-gray-100 dark:bg-slate-800 rounded-2xl" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Consistência de Estudo</h3>
        <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400">
          <span>Menos</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-slate-800" />
            <div className="w-3 h-3 rounded-sm bg-blue-200 dark:bg-blue-900/30" />
            <div className="w-3 h-3 rounded-sm bg-blue-400 dark:bg-blue-700/50" />
            <div className="w-3 h-3 rounded-sm bg-blue-600 dark:bg-blue-600/70" />
            <div className="w-3 h-3 rounded-sm bg-blue-800 dark:bg-blue-500" />
          </div>
          <span>Mais</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5">
        {days.map((day, i) => (
          <div 
            key={i}
            title={`${day.date}: ${Math.floor(day.studyTime / 3600)}h ${Math.floor((day.studyTime % 3600) / 60)}m`}
            className={`w-3.5 h-3.5 rounded-sm transition-colors ${getColor(day.studyTime)}`}
          />
        ))}
      </div>
    </div>
  );
};
