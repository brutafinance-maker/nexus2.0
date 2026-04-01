import React from 'react';
import { FilterPanel } from '../components/FilterPanel';
import { Card } from '../../../components/ui/Card';
import { useFilters } from '../hooks/useFilters';
import { motion } from 'framer-motion';

interface FilterPageProps {
  onStart: (filters: any) => void;
}

export const FilterPage = ({ onStart }: FilterPageProps) => {
  const { filters, updateFilter, resetFilters } = useFilters();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
          Criar Lista de Questões
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto">
          Personalize seu estudo filtrando por módulos, temas e nível de dificuldade.
        </p>
      </div>

      <Card className="p-8 sm:p-12 border-none shadow-2xl dark:shadow-none bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[40px]" hover={false}>
        <FilterPanel
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          onGenerate={() => onStart(filters)}
        />
      </Card>
    </div>
  );
};
