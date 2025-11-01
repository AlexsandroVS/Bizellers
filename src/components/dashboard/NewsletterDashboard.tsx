import { useState, useEffect } from 'react';
import { Trash2, Send, CheckCircle, Clock, Download, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { exportToExcel } from '@/utils/exportData';

interface NewsletterDashboardProps {
  token: string | null;
}

interface Subscriber {
  id: number;
  email: string;
  createdAt: string;
  welcomeEmailSentAt: string | null;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function NewsletterDashboard({ token }: NewsletterDashboardProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/newsletter-dashboard?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setSubscribers(data.data);
          setPagination(data.pagination);
        } else {
          setError(data.message || 'Error al cargar suscriptores');
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscribers();
  }, [token, page]);

  const handleDelete = async (id: number) => {
    // ... (código sin cambios)
  };

  const handleSendWelcomeEmail = async (id: number) => {
    if (!token) return;
    setSendingId(id);
    try {
      const response = await fetch('/api/newsletter-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        // Actualizar el suscriptor en la lista
        setSubscribers(subs => subs.map(s => s.id === id ? data.data : s));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert('Error de conexión al enviar el correo.');
    } finally {
      setSendingId(null);
    }
  };
  
  const handleDownload = () => {
    const dataToExport = subscribers.map(({ id, welcomeEmailSentAt, ...rest }) => rest);
    exportToExcel(dataToExport, 'suscriptores_newsletter');
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1a1a1a] border-2 border-gray-800 rounded-xl p-4 sm:p-6">
      {/* ... (header sin cambios) ... */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            {/* ... (thead sin cambios) ... */}
          </thead>
          <tbody>
            {subscribers.map(sub => (
              <tr key={sub.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="p-4 text-white font-medium">{sub.email}</td>
                <td className="p-4 text-gray-300">{new Date(sub.createdAt).toLocaleDateString('es-MX')}</td>
                <td className="p-4">
                  {/* ... (lógica de status sin cambios) ... */}
                </td>
                <td className="p-4 text-right flex items-center justify-end gap-2">
                  <button onClick={() => handleDelete(sub.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Eliminar suscriptor">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                  {!sub.welcomeEmailSentAt && (
                    <button 
                      onClick={() => handleSendWelcomeEmail(sub.id)} 
                      disabled={sendingId === sub.id}
                      className="p-2 text-gray-400 hover:text-verde-lima transition-colors disabled:opacity-50 disabled:cursor-wait"
                      title="Enviar correo de bienvenida"
                    >
                      {sendingId === sub.id ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ... (paginación sin cambios) ... */}
    </motion.div>
  );
}
