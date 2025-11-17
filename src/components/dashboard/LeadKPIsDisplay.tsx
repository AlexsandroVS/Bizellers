import { motion } from 'framer-motion';
import { Users, PhoneCall, Handshake, TrendingUp, UserPlus } from 'lucide-react';
import type { LeadKPIs } from '@/types/dashboard';

interface LeadKPIsDisplayProps {
  kpis: LeadKPIs;
  isLoading: boolean;
  error: string | null;
}

export function LeadKPIsDisplay({ kpis, isLoading, error }: LeadKPIsDisplayProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-800/10 border-2 border-gray-800/30 rounded-xl p-6 relative overflow-hidden animate-pulse h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6">
        Error al cargar KPIs de Leads: {error}
      </motion.div>
    );
  }

  if (!kpis) {
    return null;
  }

  const kpiCards = [
    {
      title: 'Total de Leads',
      value: kpis.totalLeads,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      title: 'Nuevos Leads (Periodo)',
      value: kpis.leadsByStatus.find(s => s.status === 'nuevo')?.count || 0,
      icon: UserPlus,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
    },
    {
      title: 'En Negociación',
      value: kpis.leadsByStatus.find(s => s.status === 'negociacion')?.count || 0,
      icon: Handshake,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
    {
      title: 'Leads Cerrados',
      value: kpis.leadsByStatus.find(s => s.status === 'cerrado')?.count || 0,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
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
