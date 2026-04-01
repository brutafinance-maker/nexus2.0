import React, { useState } from 'react';
import { BookOpen, ChevronRight, FileText } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { ASE12_DATA } from '../data/mock';

interface ASE12PageProps {
  onBack: () => void;
}

export const ASE12Page = ({ onBack }: ASE12PageProps) => {
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
        <div className="p-8 bg-blue-600 dark:bg-blue-700 text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">ASE 12</span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">Ciclo Básico</span>
          </div>
          <h2 className="text-3xl font-bold">{ASE12_DATA.title}</h2>
          <p className="text-blue-100 dark:text-blue-200 mt-2">{ASE12_DATA.description}</p>
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
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
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
              {ASE12_DATA.problems.map((prob, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shadow-sm">
                      {i + 1}
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-200">{prob}</span>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500">
                    Abrir Problema
                  </Button>
                </div>
              ))}
            </div>
          )}

          {subTab === 'resumo' && (
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 mb-6">
                <p className="text-blue-800 dark:text-blue-300 leading-relaxed font-medium italic">
                  "Este resumo contém os pontos chave discutidos durante as tutorias e conferências do módulo."
                </p>
              </div>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                {ASE12_DATA.summary.split('\n').map((para, i) => (
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
