import { Search, X, Calendar, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Define a type for the preset date ranges
type DateRangePreset = 'all' | '7d' | '15d' | '1m' | '3m' | '6m' | '12m';

interface DashboardFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  // These will be replaced by date filters
  // sortBy: 'newest' | 'oldest' | 'name';
  // onSortChange: (value: 'newest' | 'oldest' | 'name') => void;
  onDateFilterApply: (filters: {
    startDate?: string;
    endDate?: string;
  }) => void;
  onReset: () => void;
}

export function DashboardFilters({
  searchTerm,
  onSearchChange,
  onDateFilterApply,
  onReset,
}: DashboardFiltersProps) {
  const [preset, setPreset] = useState<DateRangePreset>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    // If a preset is selected, calculate dates
    if (preset !== 'all') {
      const end = new Date();
      const start = new Date();
      switch (preset) {
        case '7d': start.setDate(end.getDate() - 7); break;
        case '15d': start.setDate(end.getDate() - 15); break;
        case '1m': start.setMonth(end.getMonth() - 1); break;
        case '3m': start.setMonth(end.getMonth() - 3); break;
        case '6m': start.setMonth(end.getMonth() - 6); break;
        case '12m': start.setMonth(end.getMonth() - 12); break;
      }
      onDateFilterApply({ startDate: start.toISOString().split('T')[0], endDate: end.toISOString().split('T')[0] });
    } else {
      // Otherwise, use the custom dates if they exist
      onDateFilterApply({ startDate, endDate });
    }
  };

  const handlePresetChange = (p: DateRangePreset) => {
    setPreset(p);
    // When preset changes, clear custom dates
    setStartDate('');
    setEndDate('');
  };

  const handleDateChange = () => {
    // When a custom date is selected, clear the preset
    setPreset('all');
  }

  const hasActiveFilters = preset !== 'all' || startDate || endDate || searchTerm;

  return (
    <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-xl p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Search input (takes more space) */}
        <div className="md:col-span-3 relative">
          <label className="text-xs text-gray-400 mb-1 block">Buscar</label>
          <div className="absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Nombre, empresa..."
            className="w-full pl-10 pr-4 py-2.5 bg-negro border-2 border-gray-700 rounded-lg text-blanco placeholder-gray-500 focus:outline-none focus:border-verde-lima transition-colors"
          />
        </div>

        {/* Preset date range select */}
        <div className="md:col-span-2 relative">
           <label className="text-xs text-gray-400 mb-1 block">Rango Predefinido</label>
          <div className="absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-500" />
          </div>
          <select
            value={preset}
            onChange={(e) => handlePresetChange(e.target.value as DateRangePreset)}
            className="w-full pl-10 pr-4 py-2.5 bg-negro border-2 border-gray-700 rounded-lg text-blanco focus:outline-none focus:border-verde-lima transition-colors appearance-none cursor-pointer"
          >
            <option value="all">Siempre</option>
            <option value="7d">Últimos 7 días</option>
            <option value="15d">Últimos 15 días</option>
            <option value="1m">Último mes</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="12m">Último año</option>
          </select>
        </div>
        
        {/* Custom date range */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs text-gray-400 mb-1 block">Fecha de Inicio</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); handleDateChange(); }}
                    className="w-full px-3 py-2.5 bg-negro border-2 border-gray-700 rounded-lg text-blanco focus:outline-none focus:border-verde-lima transition-colors"
                />
            </div>
            <div>
                <label className="text-xs text-gray-400 mb-1 block">Fecha de Fin</label>
                 <input
                    type="date"
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); handleDateChange();}}
                    className="w-full px-3 py-2.5 bg-negro border-2 border-gray-700 rounded-lg text-blanco focus:outline-none focus:border-verde-lima transition-colors"
                />
            </div>
        </div>

        {/* Action buttons */}
        <div className="md:col-span-3 flex items-end gap-2">
           <button
            onClick={handleApply}
            className="flex-1 text-center w-full px-4 py-2.5 bg-verde-lima text-negro font-bold rounded-lg hover:bg-verde-lima/80 transition-colors"
          >
            Aplicar
          </button>
            
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onReset}
              className="px-4 py-2.5 bg-gray-800 text-blanco rounded-lg border border-gray-700 hover:border-red-500 hover:text-red-500 transition-colors"
              title="Limpiar filtros"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
