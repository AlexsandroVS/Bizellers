import { motion } from 'framer-motion';
import { Users, PhoneCall, Handshake, TrendingUp } from 'lucide-react';
import type { DashboardKPIs } from '@/types/dashboard';

interface DashboardKPIsProps {
  kpis: DashboardKPIs;
}

export function DashboardKPIsComponent({ kpis }: DashboardKPIsProps) {
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
      title: 'Tasa de Contacto',
      value: `${kpis.contactRate.toFixed(1)}%`,
      icon: PhoneCall,
      color: 'from-verde-lima to-green-600',
      bgColor: 'bg-verde-lima/10',
      borderColor: 'border-verde-lima/30',
    },
    {
      title: 'En Negociación',
      value: kpis.inNegotiation,
      icon: Handshake,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
    {
      title: 'Tasa de Conversión',
      value: `${kpis.conversionRate.toFixed(1)}%`,
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
