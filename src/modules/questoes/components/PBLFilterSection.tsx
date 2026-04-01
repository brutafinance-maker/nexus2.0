import React, { useMemo } from 'react';
import { FilterState } from '../hooks/useFilters';
import { MOCK_PBL_DATA } from '../data/questionsMock';
import { motion, AnimatePresence } from 'framer-motion';

interface PBLFilterSectionProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

export const PBLFilterSection = ({ filters, updateFilter }: PBLFilterSectionProps) => {
  const handleMultiSelect = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    if (current.includes(value)) {
      updateFilter(key, current.filter((v) => v !== value) as any);
    } else {
      updateFilter(key, [...current, value] as any);
    }
  };

  // Get available problems based on selected modules
  const availableProblems = useMemo(() => {
    const problems = new Set<string>();
    filters.module.forEach(mod => {
      if (MOCK_PBL_DATA[mod]) {
        Object.keys(MOCK_PBL_DATA[mod]).forEach(prob => problems.add(prob));
      }
    });
    return Array.from(problems).sort();
  }, [filters.module]);

  // Get available subjects based on selected problems
  const availableSubjects = useMemo(() => {
    const subjects = new Set<string>();
    filters.module.forEach(mod => {
      if (MOCK_PBL_DATA[mod]) {
        filters.problem.forEach(prob => {
          if (MOCK_PBL_DATA[mod][prob]) {
            MOCK_PBL_DATA[mod][prob].forEach(sub => subjects.add(sub));
          }
        });
      }
    });
    return Array.from(subjects).sort();
  }, [filters.module, filters.problem]);

  const isModuleSelected = filters.module.length > 0;
  const isProblemSelected = filters.problem.length > 0;

  const FilterSection = ({ title, children, disabled }: { title: string; children: React.ReactNode; disabled?: boolean }) => (
    <div className={`space-y-3 transition-opacity duration-300 ${disabled ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{title}</h4>
      {children}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Problemas */}
      <FilterSection title="Problemas" disabled={!isModuleSelected}>
        <div className="flex flex-wrap gap-2">
          {availableProblems.length > 0 ? (
            availableProblems.map((prob) => (
              <button
                key={prob}
                onClick={() => handleMultiSelect('problem', prob)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  filters.problem.includes(prob)
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-blue-200 dark:hover:border-blue-800'
                }`}
              >
                {prob}
              </button>
            ))
          ) : (
            <p className="text-xs text-gray-400 italic">Selecione um módulo para ver os problemas</p>
          )}
        </div>
      </FilterSection>

      {/* Assuntos (Subjects) */}
      <AnimatePresence>
        {isProblemSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <FilterSection title="Assuntos do Problema">
              <div className="flex flex-wrap gap-2">
                {availableSubjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleMultiSelect('subject', subject)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      filters.subject.includes(subject)
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-indigo-800'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </FilterSection>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
