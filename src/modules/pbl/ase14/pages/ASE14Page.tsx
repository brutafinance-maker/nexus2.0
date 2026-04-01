import React, { useState } from 'react';
import { BookOpen, ChevronRight, FileText } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { ASE14_DATA } from '../data/mock';

interface ASE14PageProps {
  onBack: () => void;
}

export const ASE14Page = ({ onBack }: ASE14PageProps) => {
  const [subTab, setSubTab] = useState<'problemas' | 'resumo'>('problemas');

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <button 
        onClick={onBack}
        className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
      >
        <ChevronRight className="rotate-180" size={16} />
        Voltar para Módulos
      </button>
      
      <Card className="overflow-hidden" hover={false}>
        <div className="p-8 bg-emerald-600 dark:bg-emerald-700 text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">ASE 14</span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">Ciclo Clínico</span>
          </div>
          <h2 className="text-3xl font-bold">{ASE14_DATA.title}</h2>
          <p className="text-emerald-100 dark:text-emerald-200 mt-2">{ASE14_DATA.description}</p>
        </div>
        
        <div className="border-b border-gray-100 dark:border-slate-700 flex px-8 overflow-x-auto scrollbar-hide">
          {[
            { id: 'problemas', label: 'Problemas (PBL)', icon: BookOpen },
            { id: 'resumo', label: 'Resumo do Módulo', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                subTab === tab.id 
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {subTab === 'problemas' && (
            <div className="space-y-4">
              {ASE14_DATA.problems.map((prob, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold shadow-sm">
                      {i + 1}
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-200">{prob}</span>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500">
                    Abrir Problema
                  </Button>
                </div>
              ))}
            </div>
          )}

          {subTab === 'resumo' && (
            <div className="prose prose-emerald dark:prose-invert max-w-none">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 mb-6">
                <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium italic">
                  "Este resumo contém os pontos chave discutidos durante as tutorias e conferências do módulo."
                </p>
              </div>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                {ASE14_DATA.summary.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
