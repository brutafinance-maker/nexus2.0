import React from 'react';
import { Bell, User, Home, Timer, PlayCircle, Sparkles } from 'lucide-react';
import { NavTab } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const { userData } = useAuth();
  const navItems: { id: NavTab, label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'pbl', label: 'PBL' },
    { id: 'questoes', label: 'Questões' },
    { id: 'morfo', label: 'Morfo' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'cursos', label: 'Cursos' },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">NexusBQ</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Secondary Menu (Dashboard, Cursos) */}
            <div className="flex md:hidden items-center gap-1 mr-2">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`p-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                title="Dashboard"
              >
                <Home size={20} />
              </button>
              <button 
                onClick={() => setActiveTab('cursos')}
                className={`p-2 rounded-lg transition-colors ${activeTab === 'cursos' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                title="Cursos"
              >
                <PlayCircle size={20} />
              </button>
            </div>

            {/* Desktop/Tablet Menu */}
            <div className="hidden md:flex space-x-1 mr-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:block p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-slate-800 transition-colors ${activeTab === 'profile' ? 'text-blue-600' : ''}`}
              >
                <div className="text-right hidden sm:block">
                  <p className={`text-xs font-bold ${activeTab === 'profile' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    {userData?.displayName || 'Estudante'}
                  </p>
                  <div className="flex items-center justify-end gap-1">
                    {userData?.isPremium && <Sparkles size={10} className="text-orange-500" />}
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                      {userData?.isPremium ? 'Premium' : 'Free'}
                    </p>
                  </div>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border overflow-hidden ${
                  activeTab === 'profile' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-slate-700'
                }`}>
                  {userData?.photoURL ? (
                    <img src={userData.photoURL} alt={userData.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
