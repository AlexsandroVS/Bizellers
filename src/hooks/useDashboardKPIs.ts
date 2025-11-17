import { useState, useEffect, useCallback } from 'react';
import type { LeadKPIs, NewsletterKPIs } from '@/types/dashboard';

type KPIResponse = LeadKPIs | NewsletterKPIs;

interface UseDashboardKPIsProps {
  token: string | null;
  type: 'leads' | 'newsletter';
  startDate?: string;
  endDate?: string;
}

export function useDashboardKPIs({ token, type, startDate, endDate }: UseDashboardKPIsProps) {
  const [kpis, setKpis] = useState<KPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKPIs = useCallback(async () => {
    if (!token || !type) return;

    setIsLoading(true);
    setError(null);
    setKpis(null);

    const params = new URLSearchParams();
    params.append('type', type);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const queryString = params.toString();

    try {
      const response = await fetch(`/api/kpis?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log raw response text for debugging
      const responseText = await response.text();
      console.log('Raw API response:', responseText);

      const data = JSON.parse(responseText); // Manually parse after logging

      if (data.success) {
        setKpis(data.data);
      } else {
        setError(data.message || 'Error al cargar los KPIs');
      }
    } catch (err) {
      setError('Error de conexión al cargar KPIs');
      console.error('Error fetching KPIs:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token, type, startDate, endDate]);

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  return { kpis, isLoading, error, fetchKPIs };
}
