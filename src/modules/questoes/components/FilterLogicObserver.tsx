import React, { useEffect } from 'react';
import { FilterState } from '../hooks/useFilters';

interface FilterLogicObserverProps {
  filters: FilterState;
}

/**
 * Componente modular "invisível" que monitora os filtros e 
 * responde a seleções específicas (ex: ASE 7 - Problema 3).
 */
export const FilterLogicObserver = ({ filters }: FilterLogicObserverProps) => {
  useEffect(() => {
    const isASE7 = filters.module.includes('ASE 7');
    const isProb3 = filters.problem.includes('Problema 3');

    if (isASE7 && isProb3) {
      // Lógica modular que responde aos filtros específicos
      console.log('Monitoramento PBL: Módulo 7 e Problema 3 selecionados.');
    }
  }, [filters.module, filters.problem]);

  return null; // Componente invisível
};
