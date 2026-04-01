import React from 'react';
import { Filter, X, RotateCcw, Play } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { MOCK_MODULES, MOCK_THEMES, QuestionDifficulty, QuestionType } from '../data/questionsMock';
import { FilterState } from '../hooks/useFilters';
import { PBLFilterSection } from './PBLFilterSection';
import { FilterLogicObserver } from './FilterLogicObserver';

interface FilterPanelProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  onGenerate: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export const FilterPanel = ({ filters, updateFilter, resetFilters, onGenerate, isMobile, onClose }: FilterPanelProps) => {
  const handleMultiSelect = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    if (current.includes(value)) {
      updateFilter(key, current.filter((v) => v !== value) as any);
    } else {
      updateFilter(key, [...current, value] as any);
    }
  };

  const difficulties: QuestionDifficulty[] = ['Fácil', 'Médio', 'Difícil'];
  const types: QuestionType[] = ['Múltipla escolha', 'Discursiva'];

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-3">
      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{title}</h4>
      {children}
    </div>
  );

  return (
    <div className={`flex flex-col h-full ${isMobile ? 'bg-white dark:bg-slate-900 p-6' : ''}`}>
      <FilterLogicObserver filters={filters} />
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filtros</h2>
        </div>
        {isMobile && (
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
        {/* Módulos */}
        <FilterSection title="Módulos (PBL)">
          <div className="grid grid-cols-2 gap-2">
            {MOCK_MODULES.map((module) => (
              <button
                key={module}
                onClick={() => handleMultiSelect('module', module)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                  filters.module.includes(module)
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-blue-200 dark:hover:border-blue-800'
                }`}
              >
                {module}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* PBL Specific Filters */}
        <PBLFilterSection filters={filters} updateFilter={updateFilter} />

        {/* Temas */}
        <FilterSection title="Temas">
          <div className="flex flex-wrap gap-2">
            {MOCK_THEMES.map((theme) => (
              <button
                key={theme}
                onClick={() => handleMultiSelect('theme', theme)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  filters.theme.includes(theme)
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-emerald-200 dark:hover:border-emerald-800'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Dificuldade */}
        <FilterSection title="Dificuldade">
          <div className="flex gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => handleMultiSelect('difficulty', diff)}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                  filters.difficulty.includes(diff)
                    ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-orange-200 dark:hover:border-orange-800'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Tipo */}
        <FilterSection title="Tipo de Questão">
          <div className="flex gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => handleMultiSelect('type', type)}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                  filters.type.includes(type)
                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-purple-200 dark:hover:border-purple-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Quantidade */}
        <FilterSection title="Quantidade de Questões">
          <input
            type="number"
            min="1"
            max="100"
            value={filters.quantity}
            onChange={(e) => updateFilter('quantity', parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </FilterSection>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-50 dark:border-slate-800 space-y-3">
        <Button onClick={onGenerate} className="w-full h-12 gap-2 text-base font-bold shadow-xl shadow-blue-500/20">
          <Play size={18} /> Gerar Lista de Questões
        </Button>
        <Button onClick={resetFilters} variant="secondary" className="w-full h-12 gap-2 text-base font-bold">
          <RotateCcw size={18} /> Limpar Filtros
        </Button>
      </div>
    </div>
  );
};
