import React from 'react';
import { Search } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MOCK_LIBRARY } from '../data/mock';

export const BibliotecaPage = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Biblioteca Digital</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Milhares de materiais organizados para facilitar sua busca.</p>
        </div>
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por título, autor ou tema..." 
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm dark:text-white dark:placeholder-gray-500"
          />
        </div>
      </header>

      {['Recentes', 'Mais Acessados', 'Anatomia', 'Fisiologia'].map((category) => (
        <section key={category} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h2>
            <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Ver todos</button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {MOCK_LIBRARY.slice(0, 5).map((item) => (
              <div key={item.id} className="min-w-[200px] sm:min-w-[240px] group cursor-pointer">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-md group-hover:shadow-xl transition-all group-hover:-translate-y-2">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <Button variant="primary" className="w-full">
                      Abrir Material
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-wider shadow-sm">
                    {item.type}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-gray-900 dark:text-gray-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
