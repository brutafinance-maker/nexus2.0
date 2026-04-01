import React from 'react';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { NavTab } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Layout = ({ children, activeTab, setActiveTab }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {children}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-12 mt-20 mb-20 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">NexusBQ</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">© 2026 NexusBQ. Todos os direitos reservados. Feito para futuros médicos.</p>
          <div className="flex gap-6">
            <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Suporte</button>
            <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacidade</button>
            <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Termos</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
