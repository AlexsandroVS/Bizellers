import { Search, X, Calendar, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'newest' | 'oldest' | 'name';
  onSortChange: (value: 'newest' | 'oldest' | 'name') => void;
  onReset: () => void;
}

export function DashboardFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onReset,
}: DashboardFiltersProps) {
  return (
    <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre o empresa..."
            className="w-full pl-10 pr-4 py-2.5 bg-negro border-2 border-gray-700 rounded-lg text-blanco placeholder-gray-500 focus:outline-none focus:border-verde-lima transition-colors"
          />
        </div>

        {/* Sort select */}
        <div className="sm:w-48 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ArrowUpDown className="h-5 w-5 text-gray-500" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest' | 'name')}
            className="w-full pl-10 pr-4 py-2.5 bg-negro border-2 border-gray-700 rounded-lg text-blanco focus:outline-none focus:border-verde-lima transition-colors appearance-none cursor-pointer"
          >
            <option value="newest">Más reciente</option>
            <option value="oldest">Más antiguo</option>
            <option value="name">Por nombre</option>
          </select>
        </div>

        {/* Reset button */}
        {(searchTerm || sortBy !== 'newest') && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 text-blanco rounded-lg border border-gray-700 hover:border-red-500 hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Limpiar</span>
          </motion.button>
        )}
      </div>

      {/* Active filters indicator */}
      {(searchTerm || sortBy !== 'newest') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 flex flex-wrap gap-2"
        >
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-verde-lima/10 border border-verde-lima/30 rounded-full text-sm text-verde-lima">
              <Search className="w-3 h-3" />
              {searchTerm}
            </span>
          )}
          {sortBy !== 'newest' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-400">
              <ArrowUpDown className="w-3 h-3" />
              {sortBy === 'oldest' ? 'Más antiguo' : 'Por nombre'}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}
