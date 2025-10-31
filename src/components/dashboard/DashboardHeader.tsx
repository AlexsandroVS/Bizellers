import { motion } from 'framer-motion';
import { LogOut, Download } from 'lucide-react';
import { exportToExcel, exportToCSV } from '@/utils/exportData';
import type { Lead } from '@/types/dashboard';

interface DashboardHeaderProps {
  onLogout: () => void;
  leads: Lead[];
}

export function DashboardHeader({ onLogout, leads }: DashboardHeaderProps) {
  const handleExportExcel = () => {
    const filename = `bizellers_leads_${new Date().toISOString().split('T')[0]}.xlsx`;
    exportToExcel(leads, filename);
  };

  const handleExportCSV = () => {
    const filename = `bizellers_leads_${new Date().toISOString().split('T')[0]}.csv`;
    exportToCSV(leads, filename);
  };

  return (
    <header className="bg-negro border-b-2 border-verde-lima/30 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center gap-4">
            <motion.img
              src="/logo2.png"
              alt="Bizellers"
              className="h-10"
              whileHover={{ scale: 1.05 }}
            />
            <div>
              <h1 className="text-xl font-bold text-blanco">Dashboard de Leads</h1>
              <p className="text-sm text-gray-400">Panel de control</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Export dropdown */}
            <div className="relative group">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-blanco rounded-lg border border-gray-700 hover:border-verde-lima transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar</span>
              </motion.button>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border-2 border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={handleExportExcel}
                  className="w-full px-4 py-2 text-left text-blanco hover:bg-gray-800 rounded-t-lg transition-colors"
                >
                  Exportar como Excel
                </button>
                <button
                  onClick={handleExportCSV}
                  className="w-full px-4 py-2 text-left text-blanco hover:bg-gray-800 rounded-b-lg transition-colors"
                >
                  Exportar como CSV
                </button>
              </div>
            </div>

            {/* Logout button */}
            <motion.button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-blanco rounded-lg hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
