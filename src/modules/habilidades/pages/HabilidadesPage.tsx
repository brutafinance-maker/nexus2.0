import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Play, AlertTriangle, CheckSquare, Lightbulb, List } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MOCK_SKILLS, Skill } from '../data/mock';

export const HabilidadesPage = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  if (selectedSkill) {
    return (
      <div className="space-y-8 animate-in slide-in-from-right duration-300">
        <button 
          onClick={() => setSelectedSkill(null)}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
        >
          <ChevronRight className="rotate-180" size={16} />
          Voltar para Habilidades
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video and Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden bg-black aspect-video flex items-center justify-center group relative" hover={false}>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 group-hover:bg-gray-900/30 transition-all cursor-pointer">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition-transform">
                  <Play size={32} fill="currentColor" className="ml-1" />
                </div>
              </div>
              <p className="text-white/50 text-sm font-medium">Player de Vídeo (Mock)</p>
            </Card>

            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedSkill.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{selectedSkill.description}</p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <List className="text-blue-600 dark:text-blue-400" size={24} /> Passo a Passo
                </h3>
                <div className="space-y-3">
                  {selectedSkill.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                      <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="p-6 border-amber-100 dark:border-amber-900/30 bg-amber-50/30 dark:bg-amber-900/10" hover={false}>
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 flex items-center gap-2 mb-4">
                <AlertTriangle size={20} /> Cuidados Importantes
              </h3>
              <ul className="space-y-3">
                {selectedSkill.warnings.map((warning, i) => (
                  <li key={i} className="flex gap-2 text-sm text-amber-800 dark:text-amber-300 font-medium">
                    <span className="text-amber-400">•</span> {warning}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 border-green-100 dark:border-green-900/30 bg-green-50/30 dark:bg-green-900/10" hover={false}>
              <h3 className="text-lg font-bold text-green-900 dark:text-green-400 flex items-center gap-2 mb-4">
                <CheckSquare size={20} /> Checklist OSCE
              </h3>
              <div className="space-y-3">
                {selectedSkill.checklist.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 border-2 border-green-200 dark:border-green-900/50 rounded-md bg-white dark:bg-slate-800 group-hover:border-green-500 transition-colors flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm text-green-800 dark:text-green-300 font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10" hover={false}>
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 flex items-center gap-2 mb-4">
                <Lightbulb size={20} /> Dicas Clínicas
              </h3>
              <ul className="space-y-3">
                {selectedSkill.clinicalTips.map((tip, i) => (
                  <li key={i} className="text-sm text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
                    "{tip}"
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Habilidades Médicas</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Treinamento prático e checklists para procedimentos médicos essenciais.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SKILLS.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedSkill(skill)}
          >
            <Card className="overflow-hidden cursor-pointer group">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={skill.thumbnail} 
                  alt={skill.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{skill.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{skill.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full uppercase tracking-wider">
                    {skill.checklist.length} itens checklist
                  </span>
                  <ChevronRight className="text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={20} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
