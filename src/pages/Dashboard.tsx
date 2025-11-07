import { useState, useMemo, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, KanbanSquare, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLeads } from '@/hooks/useLeads';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardKPIsComponent } from '@/components/dashboard/DashboardKPIs';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { LeadBoard } from '@/components/dashboard/LeadBoard';
import { LeadModal } from '@/components/dashboard/LeadModal';
import { NewsletterDashboard } from '@/components/dashboard/NewsletterDashboard';
import { NewsletterKPIs } from '@/components/dashboard/NewsletterKPIs';
import type { Lead, DashboardKPIs as NewsletterKPIsType } from '@/types/dashboard';

interface DateFilters {
  startDate?: string;
  endDate?: string;
}

type DashboardView = 'leads' | 'newsletter';

export function Dashboard() {
  const { isAuthenticated, isLoading: authLoading, logout, getToken } = useAuth();
  const token = getToken();
  const { leads, isLoading, error, fetchLeads, updateLeadStatus, updateLeadNotes, deleteLead, kpis, setLeads } = useLeads(token);

  const [currentView, setCurrentView] = useState<DashboardView>('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsletterFilters, setNewsletterFilters] = useState<DateFilters>({});
  const [newsletterSearchTerm, setNewsletterSearchTerm] = useState('');
 

  // Control fetching based on view
  useEffect(() => {
    if (currentView === 'leads') {
      fetchLeads();
    }
    // When switching away, we can clear the leads to save memory if needed
    // else {
    //   setLeads([]);
    // }
  }, [currentView, fetchLeads]);

  const filteredLeads = useMemo(() => {
    if (!searchTerm) return leads;
    const term = searchTerm.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.nombre.toLowerCase().includes(term) ||
        lead.empresa.toLowerCase().includes(term) ||
        lead.correo.toLowerCase().includes(term)
    );
  }, [leads, searchTerm]);

  const handleDateFilterApply = (filters: DateFilters) => {
    if (currentView === 'leads') {
      fetchLeads(filters);
    } else {
      setNewsletterFilters(filters);
    }
  };

  const handleSearchChange = (term: string) => {
    if (currentView === 'leads') {
      setSearchTerm(term);
    } else {
      setNewsletterSearchTerm(term);
    }
  };

  const handleResetFilters = () => {
    if (currentView === 'leads') {
      setSearchTerm('');
      fetchLeads();
    } else {
      setNewsletterFilters({});
      setNewsletterSearchTerm('');
    }
  };

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
      setSelectedLead({ ...selectedLead, notes });
    }
    return success;
  };

  const handleDeleteLead = async () => {
    if (!selectedLead) return false;
    const success = await deleteLead(selectedLead.id);
    if (success) {
      handleCloseModal();
    }
    return success;
  };

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
      <DashboardHeader onLogout={logout} leads={leads} />

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <DashboardKPIsComponent kpis={kpis} />
          <div className="p-1 bg-[#1a1a1a] border-2 border-gray-800 rounded-lg flex gap-2">
            <button onClick={() => setCurrentView('leads')} className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors ${currentView === 'leads' ? 'bg-verde-lima text-negro' : 'text-gray-300 hover:bg-gray-800'}`}>
              <KanbanSquare className="w-4 h-4" /> Leads
            </button>
            <button onClick={() => setCurrentView('newsletter')} className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors ${currentView === 'newsletter' ? 'bg-verde-lima text-negro' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Mail className="w-4 h-4" /> Newsletter
            </button>
          </div>
        </div>

        <DashboardFilters
          searchTerm={currentView === 'leads' ? searchTerm : newsletterSearchTerm}
          onSearchChange={handleSearchChange}
          onDateFilterApply={handleDateFilterApply}
          onReset={handleResetFilters}
        />

        {currentView === 'leads' && (
          <>
            {isLoading && <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 text-verde-lima animate-spin" /></div>}
            {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6">{error}</motion.div>}
            {!isLoading && !error && <LeadBoard leads={filteredLeads} onLeadClick={handleLeadClick} onStatusChange={updateLeadStatus} />}
          </>
        )}

        {currentView === 'newsletter' && <NewsletterDashboard token={token} filters={newsletterFilters} searchTerm={newsletterSearchTerm} />}
      </main>

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
