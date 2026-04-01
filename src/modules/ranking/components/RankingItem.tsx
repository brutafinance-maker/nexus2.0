import React from 'react';
import { Card } from '../../../components/ui/Card';

interface RankingItemProps {
  user: any;
  position: number;
  isCurrentUser: boolean;
}

export const RankingItem = ({ user, position, isCurrentUser }: RankingItemProps) => {
  return (
    <Card 
      className={`p-4 flex items-center justify-between transition-all ${
        isCurrentUser 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 scale-[1.02] shadow-xl' 
          : 'hover:bg-gray-50 dark:hover:bg-slate-800/30'
      }`}
      hover={false}
    >
      <div className="flex items-center gap-4">
        <span className={`w-8 text-center font-black text-lg ${
          position <= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'
        }`}>
          {position}º
        </span>
        
        <div className="relative">
          <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
            isCurrentUser ? 'border-blue-500' : 'border-gray-100 dark:border-slate-700'
          }`}>
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black">
                {user.displayName?.charAt(0)}
              </div>
            )}
          </div>
          {isCurrentUser && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white dark:border-slate-900 rounded-full" />
          )}
        </div>
        
        <div>
          <p className={`font-bold text-gray-900 dark:text-white ${isCurrentUser ? 'text-blue-600 dark:text-blue-400' : ''}`}>
            {user.displayName}
            {isCurrentUser && <span className="ml-2 text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase">Você</span>}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {user.totalAnswered || 0} questões respondidas
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-black text-gray-900 dark:text-white">{user.weeklyPoints.toLocaleString()}</p>
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Pontos Nexus</p>
      </div>
    </Card>
  );
};
