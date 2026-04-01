import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Moon, Sun, ChevronRight, Save, LogOut, Award, BookOpen, GraduationCap, Timer, Trophy, Library } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { NavTab } from '../../../types';

interface ProfilePageProps {
  setActiveTab: (tab: NavTab) => void;
}

export const ProfilePage = ({ setActiveTab }: ProfilePageProps) => {
  const { theme, toggleTheme } = useTheme();
  const { userData, logout, updateUserTheme } = useAuth();
  const [name, setName] = useState(userData?.displayName || '');

  useEffect(() => {
    if (userData?.displayName) {
      setName(userData.displayName);
    }
  }, [userData]);

  const handleThemeToggle = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme();
    await updateUserTheme(newTheme);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Meu Perfil</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Gerencie suas informações e preferências da conta.</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={logout}
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-100 dark:border-red-900/30 gap-2 font-bold"
        >
          <LogOut size={18} /> Sair da Conta
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 flex flex-col items-center text-center border-none shadow-xl dark:shadow-none bg-white dark:bg-slate-900/50 backdrop-blur-xl" hover={false}>
            <div className="relative group">
              <div className="w-32 h-32 bg-blue-600 rounded-[40px] flex items-center justify-center text-white mb-6 border-8 border-white dark:border-slate-800 shadow-2xl overflow-hidden">
                {userData?.photoURL ? (
                  <img src={userData.photoURL} alt={userData.displayName} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Award size={20} />
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{userData?.displayName}</h2>
            <p className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-widest mt-1">{userData?.role || 'Estudante'}</p>
            
            <div className="mt-8 w-full space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-blue-500" />
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Pontos</span>
                </div>
                <span className="text-lg font-black text-blue-600 dark:text-blue-400">{userData?.points || 0}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-orange-500" />
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Plano</span>
                </div>
                <span className={`text-sm font-black uppercase tracking-widest ${userData?.isPremium ? 'text-orange-500' : 'text-gray-400'}`}>
                  {userData?.plan || 'Free'}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-xl dark:shadow-none bg-white dark:bg-slate-900/50 backdrop-blur-xl" hover={false}>
            <h3 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Acadêmico</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Curso</p>
                  <p className="text-sm font-black text-gray-900 dark:text-white">{userData?.medCourse || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Ciclo</p>
                  <p className="text-sm font-black text-gray-900 dark:text-white">{userData?.ciclo || 'Não informado'}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Settings Card */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-none shadow-xl dark:shadow-none bg-white dark:bg-slate-900/50 backdrop-blur-xl" hover={false}>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Nome Completo</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">E-mail</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    disabled
                    value={userData?.email || ''}
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-gray-500 dark:text-gray-400 font-bold cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-end">
              <Button className="h-14 px-10 text-lg font-bold shadow-xl shadow-blue-600/20 gap-2">
                <Save size={20} /> Salvar Alterações
              </Button>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-xl dark:shadow-none bg-white dark:bg-slate-900/50 backdrop-blur-xl" hover={false}>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Ferramentas de Estudo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('foco')}
                className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-900/50 rounded-[32px] border border-gray-100 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Timer size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-black text-gray-900 dark:text-white">Foco</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Cronômetro de estudo</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </button>

              <button 
                onClick={() => setActiveTab('ranking')}
                className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-900/50 rounded-[32px] border border-gray-100 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Trophy size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-black text-gray-900 dark:text-white">Ranking</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Elite Nexus semanal</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </button>

              <button 
                onClick={() => setActiveTab('biblioteca')}
                className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-900/50 rounded-[32px] border border-gray-100 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Library size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-black text-gray-900 dark:text-white">Biblioteca</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Acervo de materiais</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </button>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-xl dark:shadow-none bg-white dark:bg-slate-900/50 backdrop-blur-xl" hover={false}>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Preferências do Sistema</h3>
            <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-900/50 rounded-[32px] border border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400 shadow-lg shadow-blue-500/10' : 'bg-orange-100 text-orange-600 shadow-lg shadow-orange-500/10'}`}>
                  {theme === 'dark' ? <Moon size={32} /> : <Sun size={32} />}
                </div>
                <div>
                  <p className="text-xl font-black text-gray-900 dark:text-white">Modo Escuro</p>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Alternar entre tema claro e escuro</p>
                </div>
              </div>
              <button 
                onClick={handleThemeToggle}
                className={`relative w-20 h-10 rounded-full transition-all duration-500 focus:outline-none p-1 ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-500 flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-10' : 'translate-x-0'
                }`}>
                  {theme === 'dark' ? <Moon size={14} className="text-blue-600" /> : <Sun size={14} className="text-orange-500" />}
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
