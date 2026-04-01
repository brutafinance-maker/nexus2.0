/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { NavTab } from './types';
import { Layout } from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { Loader2 } from 'lucide-react';

// Modules
import { DashboardPage } from './modules/dashboard/pages/DashboardPage';
import { PBLPage } from './modules/pbl/pages/PBLPage';
import { QuestoesPage } from './modules/questoes/pages/QuestoesPage';
import { MorfoPage } from './modules/morfo/pages/MorfoPage';
import { FocoPage } from './modules/foco/pages/FocoPage';
import { BibliotecaPage } from './modules/biblioteca/pages/BibliotecaPage';
import { HabilidadesPage } from './modules/habilidades/pages/HabilidadesPage';
import { CursosPage } from './modules/cursos/pages/CursosPage';
import { ProfilePage } from './modules/profile/pages/ProfilePage';
import { RankingPage } from './modules/ranking/pages/RankingPage';

const AppContent = () => {
  const { user, userData, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Carregando NexusBQ...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage setActiveTab={setActiveTab} />;
      case 'pbl':
        return <PBLPage />;
      case 'questoes':
        return <QuestoesPage />;
      case 'morfo':
        return <MorfoPage />;
      case 'foco':
        return <FocoPage />;
      case 'biblioteca':
        return <BibliotecaPage />;
      case 'habilidades':
        return <HabilidadesPage />;
      case 'cursos':
        return <CursosPage />;
      case 'profile':
        return <ProfilePage setActiveTab={setActiveTab} />;
      case 'ranking':
        return <RankingPage />;
      default:
        return <DashboardPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      <Toaster position="top-center" richColors />
    </Layout>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
