import React from 'react';
import { FILTERS } from '../constants/filters';

interface FilterSelectorProps {
  selectedFilter: string;
  onSelectFilter: (filterId: string) => void;
  disabled: boolean;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({ selectedFilter, onSelectFilter, disabled }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2">2. Apply a filter (optional)</label>
      <div className={`grid grid-cols-3 sm:grid-cols-6 gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => !disabled && onSelectFilter(filter.id)}
            disabled={disabled}
            className={`
              px-2 py-2 text-xs font-semibold rounded-md transition-all duration-200 border
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-400
              ${
                selectedFilter === filter.id
                  ? 'bg-amber-500 border-amber-400 text-slate-900 font-bold'
                  : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'
              }
              ${disabled ? 'cursor-not-allowed' : ''}
            `}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;