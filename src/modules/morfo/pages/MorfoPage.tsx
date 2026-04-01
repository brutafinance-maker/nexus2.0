import React from 'react';
import { FileText } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MORFO_CATEGORIES } from '../data/mock';

export const MorfoPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Morfologia</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Explore o corpo humano através de atlas, lâminas e modelos 3D.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MORFO_CATEGORIES.map((cat) => (
          <Card key={cat.id} className="p-8 group">
            <div className={`w-16 h-16 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <cat.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{cat.label}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Acesse materiais exclusivos de {cat.label.toLowerCase()} com imagens de alta resolução.</p>
            <div className="mt-8 space-y-3">
              {[1, 2, 3].map((i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900/50 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                  <span>Material de Apoio {i}</span>
                  <FileText size={16} />
                </button>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              Ver Tudo
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
