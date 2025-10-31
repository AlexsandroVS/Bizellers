import { useState, useMemo, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLeads } from '@/hooks/useLeads';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardKPIsComponent } from '@/components/dashboard/DashboardKPIs';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { LeadBoard } from '@/components/dashboard/LeadBoard';
import { LeadModal } from '@/components/dashboard/LeadModal';
import type { Lead } from '@/types/dashboard';

export function Dashboard() {
  const { isAuthenticated, isLoading: authLoading, logout, getToken } = useAuth();
  const token = getToken();
  const { leads, isLoading, error, updateLeadStatus, updateLeadNotes, deleteLead, kpis } = useLeads(token);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar y ordenar leads
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = [...leads];

    // Aplicar búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.nombre.toLowerCase().includes(term) ||
          lead.empresa.toLowerCase().includes(term) ||
          lead.correo.toLowerCase().includes(term)
      );
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'name':
          return a.nombre.localeCompare(b.nombre);
        default:
          return 0;
      }
    });

    return filtered;
  }, [leads, searchTerm, sortBy]);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLead(null), 300);
  };

  const handleNotesUpdate = async (notes: string) => {
    if (!selectedLead) return false;
    const success = await updateLeadNotes(selectedLead.id, notes);
    if (success) {
      // Actualizar el lead seleccionado
      setSelectedLead({ ...selectedLead, notes });
    }
    return success;
  };

  const handleDeleteLead = async () => {
    if (!selectedLead) return false;
    return await deleteLead(selectedLead.id);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
  };

  // Redirigir si no está autenticado
  if (authLoading) {
    return (
      <div className="min-h-screen bg-negro flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-verde-lima animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-negro">
      {/* Header */}
      <DashboardHeader onLogout={logout} leads={leads} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* KPIs */}
        <DashboardKPIsComponent kpis={kpis} />

        {/* Filters */}
        <DashboardFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleResetFilters}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-verde-lima animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Drag & Drop Board */}
        {!isLoading && !error && (
          <LeadBoard
            leads={filteredAndSortedLeads}
            onLeadClick={handleLeadClick}
            onStatusChange={updateLeadStatus}
          />
        )}

        {/* Empty State */}
        {!isLoading && !error && leads.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-500 text-lg mb-4">No hay leads aún</div>
            <div className="text-gray-600 text-sm">
              Los leads aparecerán aquí cuando se completen formularios en la landing
            </div>
          </motion.div>
        )}

        {/* No Results State */}
        {!isLoading && !error && leads.length > 0 && filteredAndSortedLeads.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-500 text-lg mb-4">No se encontraron resultados</div>
            <div className="text-gray-600 text-sm mb-4">
              Intenta con otros términos de búsqueda
            </div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-verde-lima text-negro rounded-lg font-semibold hover:bg-verde-lima-dark transition-colors"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </main>

      {/* Lead Modal */}
      <LeadModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNotesUpdate={handleNotesUpdate}
        onDelete={handleDeleteLead}
      />
    </div>
  );
}
