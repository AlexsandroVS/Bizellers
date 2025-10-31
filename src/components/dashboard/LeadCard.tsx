import { motion } from 'framer-motion';
import { Building2, Calendar, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Lead } from '@/types/dashboard';

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Calcular hace cuánto tiempo fue creado
  const getDaysAgo = () => {
    const created = new Date(lead.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg hover:border-verde-lima/50 transition-colors group flex gap-2 select-none"
      layout
    >
      {/* Drag handle */}
      <div
        {...listeners}
        className="flex items-center justify-center px-3 cursor-grab active:cursor-grabbing hover:bg-verde-lima/10 transition-colors touch-none touch-target"
        style={{ touchAction: 'none' }}
      >
        <GripVertical className="w-5 h-5 text-gray-600 group-hover:text-verde-lima pointer-events-none" />
      </div>

      {/* Clickable content area */}
      <div
        onClick={onClick}
        className="flex-1 p-4 cursor-pointer select-none"
      >
      {/* Nombre del lead */}
      <h3 className="text-lg font-bold text-blanco mb-1 group-hover:text-verde-lima transition-colors">
        {lead.nombre}
      </h3>

      {/* Empresa */}
      <div className="flex items-center gap-2 text-gray-400 mb-3">
        <Building2 className="w-4 h-4" />
        <span className="text-sm">{lead.empresa}</span>
      </div>

      {/* Tiempo desde creación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{getDaysAgo()}</span>
        </div>

        {/* Indicador de status (badge de color) */}
        <div className={`w-2 h-2 rounded-full ${
          lead.status === 'nuevo' ? 'bg-blue-500' :
          lead.status === 'contactado' ? 'bg-verde-lima' :
          lead.status === 'negociacion' ? 'bg-orange-500' :
          'bg-purple-500'
        }`} />
      </div>
      </div>
    </motion.div>
  );
}
