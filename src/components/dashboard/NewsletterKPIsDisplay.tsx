import { motion } from 'framer-motion';
import { Users, UserPlus } from 'lucide-react';
import type { NewsletterKPIs } from '@/types/dashboard';

interface NewsletterKPIsDisplayProps {
  kpis: NewsletterKPIs;
  isLoading: boolean;
  error: string | null;
}

export function NewsletterKPIsDisplay({ kpis, isLoading, error }: NewsletterKPIsDisplayProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(2)].map((_, index) => ( // Only 2 KPIs for newsletter
          <div key={index} className="bg-gray-800/10 border-2 border-gray-800/30 rounded-xl p-6 relative overflow-hidden animate-pulse h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6">
        Error al cargar KPIs de Newsletter: {error}
      </motion.div>
    );
  }

  if (!kpis) {
    return null;
  }

  const kpiCards = [
    {
      title: 'Total Suscriptores',
      value: kpis.totalSubscribers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      title: 'Nuevos Suscriptores (Periodo)',
      value: kpis.newSubscribersInPeriod,
      icon: UserPlus,
      color: 'from-verde-lima to-green-600',
      bgColor: 'bg-verde-lima/10',
      borderColor: 'border-verde-lima/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiCards.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className={`${kpi.bgColor} border-2 ${kpi.borderColor} rounded-xl p-6 relative overflow-hidden`}
        >
          {/* Background gradient */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${kpi.color} opacity-10 rounded-full blur-2xl`} />

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <kpi.icon className={`w-8 h-8 bg-gradient-to-br ${kpi.color} text-transparent bg-clip-text`} />
            </div>

            <div className="text-3xl font-bold text-blanco mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-400">{kpi.title}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
