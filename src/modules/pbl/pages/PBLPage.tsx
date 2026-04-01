import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ChevronRight, GraduationCap, Stethoscope } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { MOCK_MODULES, Module } from '../data/mock';

// Import isolated ASE pages
import { ASE1Page } from '../ase1/pages/ASE1Page';
import { ASE2Page } from '../ase2/pages/ASE2Page';
import { ASE3Page } from '../ase3/pages/ASE3Page';
import { ASE4Page } from '../ase4/pages/ASE4Page';
import { ASE5Page } from '../ase5/pages/ASE5Page';
import { ASE6Page } from '../ase6/pages/ASE6Page';
import { ASE7Page } from '../ase7/pages/ASE7Page';
import { ASE8Page } from '../ase8/pages/ASE8Page';
import { ASE9Page } from '../ase9/pages/ASE9Page';
import { ASE10Page } from '../ase10/pages/ASE10Page';
import { ASE11Page } from '../ase11/pages/ASE11Page';
import { ASE12Page } from '../ase12/pages/ASE12Page';
import { ASE13Page } from '../ase13/pages/ASE13Page';
import { ASE14Page } from '../ase14/pages/ASE14Page';
import { ASE15Page } from '../ase15/pages/ASE15Page';

export const PBLPage = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const handleBack = () => setSelectedModuleId(null);

  // Mapping of module IDs to their respective components
  const renderASEPage = () => {
    switch (selectedModuleId) {
      case 'ase1': return <ASE1Page onBack={handleBack} />;
      case 'ase2': return <ASE2Page onBack={handleBack} />;
      case 'ase3': return <ASE3Page onBack={handleBack} />;
      case 'ase4': return <ASE4Page onBack={handleBack} />;
      case 'ase5': return <ASE5Page onBack={handleBack} />;
      case 'ase6': return <ASE6Page onBack={handleBack} />;
      case 'ase7': return <ASE7Page onBack={handleBack} />;
      case 'ase8': return <ASE8Page onBack={handleBack} />;
      case 'ase9': return <ASE9Page onBack={handleBack} />;
      case 'ase10': return <ASE10Page onBack={handleBack} />;
      case 'ase11': return <ASE11Page onBack={handleBack} />;
      case 'ase12': return <ASE12Page onBack={handleBack} />;
      case 'ase13': return <ASE13Page onBack={handleBack} />;
      case 'ase14': return <ASE14Page onBack={handleBack} />;
      case 'ase15': return <ASE15Page onBack={handleBack} />;
      default: return null;
    }
  };

  if (selectedModuleId) {
    return renderASEPage();
  }

  const basicoModules = MOCK_MODULES.filter(m => m.cycle === 'basico');
  const clinicoModules = MOCK_MODULES.filter(m => m.cycle === 'clinico');

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Módulos PBL</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Organize seus estudos por ciclos de aprendizagem baseada em problemas.</p>
      </header>

      {/* Ciclo Básico */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
            <GraduationCap size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ciclo Básico</h2>
          <span className="text-xs font-bold bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full uppercase tracking-wider">ASE 1 - 12</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {basicoModules.map((module, i) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              index={i} 
              onClick={() => setSelectedModuleId(module.id)} 
            />
          ))}
        </div>
      </section>

      {/* Ciclo Clínico */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <Stethoscope size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ciclo Clínico</h2>
          <span className="text-xs font-bold bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full uppercase tracking-wider">ASE 13 - 15</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicoModules.map((module, i) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              index={i} 
              onClick={() => setSelectedModuleId(module.id)} 
              variant="clinico"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

interface ModuleCardProps {
  module: Module;
  index: number;
  onClick: () => void;
  variant?: 'basico' | 'clinico';
}

const ModuleCard = ({ module, index, onClick, variant = 'basico' }: ModuleCardProps) => {
  const isClinico = variant === 'clinico';
  
  const styles = {
    basico: {
      badge: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      icon: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500',
      title: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
      footer: 'text-blue-600 dark:text-blue-400',
      border: 'hover:border-blue-200 dark:hover:border-blue-800'
    },
    clinico: {
      badge: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
      icon: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500',
      title: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
      footer: 'text-emerald-600 dark:text-emerald-400',
      border: 'hover:border-emerald-200 dark:hover:border-emerald-800'
    }
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
    >
      <Card className={`p-6 cursor-pointer group hover:shadow-xl transition-all duration-300 border-transparent ${styles.border} relative overflow-hidden`}>
        {/* Badge/Number */}
        <div className={`absolute top-0 right-0 p-3 ${styles.badge} font-black text-2xl opacity-20 group-hover:opacity-40 transition-opacity`}>
          {module.id.replace('ase', '')}
        </div>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${styles.icon}`}>
          <BookOpen size={24} />
        </div>
        
        <h3 className={`text-xl font-bold text-gray-900 dark:text-white transition-colors line-clamp-2 min-h-[3.5rem] ${styles.title}`}>
          {module.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
          {module.description}
        </p>
        
        <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-700/50 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {module.problemsCount} Problemas
          </span>
          <div className={`flex items-center gap-1 font-bold text-sm ${styles.footer}`}>
            Estudar <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
