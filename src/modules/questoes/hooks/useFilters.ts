import { useState, useCallback } from 'react';
import { QuestionDifficulty, QuestionType } from '../data/questionsMock';

export interface FilterState {
  module: string[];
  problem: string[];
  subject: string[];
  theme: string[];
  difficulty: QuestionDifficulty[];
  type: QuestionType[];
  quantity: number;
}

const INITIAL_FILTERS: FilterState = {
  module: [],
  problem: [],
  subject: [],
  theme: [],
  difficulty: [],
  type: [],
  quantity: 10,
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => {
      const newState = { ...prev, [key]: value };
      
      // Reset dependent filters if parent changes
      if (key === 'module') {
        newState.problem = [];
        newState.subject = [];
      }
      if (key === 'problem') {
        newState.subject = [];
      }
      
      return newState;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const isFilterActive = useCallback((key: keyof FilterState) => {
    const value = filters[key];
    if (Array.isArray(value)) return value.length > 0;
    return value !== INITIAL_FILTERS[key];
  }, [filters]);

  const activeFiltersCount = Object.keys(filters).reduce((acc, key) => {
    return acc + (isFilterActive(key as keyof FilterState) ? 1 : 0);
  }, 0);

  return {
    filters,
    updateFilter,
    resetFilters,
    isFilterActive,
    activeFiltersCount,
  };
};
