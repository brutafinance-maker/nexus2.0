import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopThreeProps {
  users: any[];
}

export const TopThree = ({ users }: TopThreeProps) => {
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 1: return 'text-gray-400 bg-gray-50 dark:bg-gray-900/20';
      case 2: return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
      default: return '';
    }
  };

  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy size={24} />;
      case 1: return <Medal size={24} />;
      case 2: return <Medal size={24} />;
      default: return null;
    }
  };

  // Reorder for visual: 2nd, 1st, 3rd
  const displayOrder = [
    users[1] ? { ...users[1], pos: 2 } : null,
    users[0] ? { ...users[0], pos: 1 } : null,
    users[2] ? { ...users[2], pos: 3 } : null,
  ].filter(Boolean);

  return (
    <div className="flex items-end justify-center gap-4 sm:gap-8 py-12">
      {displayOrder.map((user: any, i) => {
        const isFirst = user.pos === 1;
        return (
          <motion.div
            key={user.uid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 overflow-hidden shadow-xl ${
                user.pos === 1 ? 'border-yellow-500 scale-125 z-10' : 
                user.pos === 2 ? 'border-gray-300' : 'border-amber-600'
              }`}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-black">
                    {user.displayName?.charAt(0)}
                  </div>
                )}
              </div>
              <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${getMedalColor(user.pos - 1)}`}>
                <span className="font-black text-sm">{user.pos}º</span>
              </div>
            </div>
            <div className={`mt-8 text-center ${isFirst ? 'scale-110' : ''}`}>
              <p className="font-black text-gray-900 dark:text-white truncate max-w-[120px]">{user.displayName}</p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{user.weeklyPoints.toLocaleString()} pts</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
