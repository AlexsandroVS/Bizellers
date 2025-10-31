import { useState, useEffect, useCallback } from 'react';
import type { Lead, LeadStatus, DashboardKPIs } from '../types/dashboard';

export function useLeads(token: string | null) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar leads desde la API
  const fetchLeads = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leads-dashboard', {
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

  // Actualizar el status de un lead
  const updateLeadStatus = async (id: number, newStatus: LeadStatus) => {
    if (!token) return;

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
        // Actualizar el lead en el estado local
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
      setError('Error de conexión');
      console.error('Error updating lead status:', err);
      return false;
    }
  };

  // Actualizar las notas de un lead
  const updateLeadNotes = async (id: number, notes: string) => {
    if (!token) return;

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
        setError(data.message || 'Error al actualizar las notas');
        return false;
      }
    } catch (err) {
      setError('Error de conexión');
      console.error('Error updating lead notes:', err);
      return false;
    }
  };

  // Eliminar un lead
  const deleteLead = async (id: number) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/delete-lead?id=${id}`, {
        method: 'DELETE',
        headers: {
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
      setError('Error de conexión');
      console.error('Error deleting lead:', err);
      return false;
    }
  };

  // Calcular KPIs
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

  // Cargar leads al montar el componente
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return {
    leads,
    isLoading,
    error,
    fetchLeads,
    updateLeadStatus,
    updateLeadNotes,
    deleteLead,
    kpis: calculateKPIs(),
  };
}
