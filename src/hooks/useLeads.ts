import { useState, useCallback } from 'react';
import type { Lead, LeadStatus, DashboardKPIs } from '../types/dashboard';

export function useLeads(token: string | null) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Default to false
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async (filters?: { startDate?: string, endDate?: string }) => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    const queryString = params.toString();

    try {
      const response = await fetch(`/api/leads-dashboard?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setLeads(data.leads);
      } else {
        setError(data.message || 'Error al cargar los leads');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const updateLeadStatus = async (id: number, newStatus: LeadStatus) => {
    if (!token) return false;

    try {
      const response = await fetch(`/api/update-lead`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === id ? data.lead : lead
          )
        );
        return true;
      } else {
        setError(data.message || 'Error al actualizar el lead');
        return false;
      }
    } catch (err) {
      setError('Error de conexión al actualizar');
      console.error('Error updating lead status:', err);
      return false;
    }
  };

  const updateLeadNotes = async (id: number, notes: string) => {
    if (!token) return false;

    try {
      const response = await fetch(`/api/update-lead`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, notes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === id ? data.lead : lead
          )
        );
        return true;
      } else {
        setError(data.message || 'Error al actualizar notas del lead');
        return false;
      }
    } catch (err) {
      setError('Error de conexión al actualizar notas');
      console.error('Error updating lead notes:', err);
      return false;
    }
  };

  const deleteLead = async (id: number) => {
    if (!token) return false;

    try {
      const response = await fetch(`/api/delete-lead?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
        return true;
      } else {
        setError(data.message || 'Error al eliminar el lead');
        return false;
      }
    } catch (err) {
      setError('Error de conexión al eliminar lead');
      console.error('Error deleting lead:', err);
      return false;
    }
  };

  const calculateKPIs = useCallback((): DashboardKPIs => {
    const totalLeads = leads.length;
    const contacted = leads.filter((l) => l.status !== 'nuevo').length;
    const inNegotiation = leads.filter((l) => l.status === 'negociacion').length;
    const closed = leads.filter((l) => l.status === 'cerrado').length;

    return {
      totalLeads,
      contactRate: totalLeads > 0 ? (contacted / totalLeads) * 100 : 0,
      inNegotiation,
      conversionRate: totalLeads > 0 ? (closed / totalLeads) * 100 : 0,
    };
  }, [leads]);

  return {
    leads,
    isLoading,
    error,
    fetchLeads,
    updateLeadStatus,
    updateLeadNotes,
    deleteLead,
    kpis: calculateKPIs(),
    setLeads, // Exponer setLeads para control externo si es necesario
  };
}
