import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  HelpCircle, 
  Brain, 
  Library, 
  Stethoscope 
} from 'lucide-react';
import { NavTab } from '../../types';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const navItems = [
    { id: 'pbl', icon: BookOpen, label: 'PBL' },
    { id: 'questoes', icon: HelpCircle, label: 'Questões' },
    { id: 'morfo', icon: Brain, label: 'Morfo' },
    { id: 'habilidades', icon: Stethoscope, label: 'Habil' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50 h-[70px] px-2">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavTab)}
              className="relative flex flex-col items-center justify-center flex-1 py-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`p-1.5 rounded-xl transition-colors duration-200 ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              
              <span className={`text-[10px] font-medium mt-0.5 transition-colors duration-200 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
              }`}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
