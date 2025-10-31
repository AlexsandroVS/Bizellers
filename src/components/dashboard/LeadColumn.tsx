import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { LeadCard } from './LeadCard';
import type { Lead, LeadStatus } from '@/types/dashboard';

interface LeadColumnProps {
  id: LeadStatus;
  title: string;
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  color: string;
}

export function LeadColumn({ id, title, leads, onLeadClick, color }: LeadColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'border-blue-500/50 bg-blue-500/5';
      case 'green':
        return 'border-verde-lima/50 bg-verde-lima/5';
      case 'orange':
        return 'border-orange-500/50 bg-orange-500/5';
      case 'purple':
        return 'border-purple-500/50 bg-purple-500/5';
      default:
        return 'border-gray-700 bg-gray-800/30';
    }
  };

  const getHeaderColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500/20 border-blue-500/50';
      case 'green':
        return 'bg-verde-lima/20 border-verde-lima/50';
      case 'orange':
        return 'bg-orange-500/20 border-orange-500/50';
      case 'purple':
        return 'bg-purple-500/20 border-purple-500/50';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };

  return (
    <div
      className={`flex flex-col min-w-[300px] lg:min-w-0 lg:flex-1 border-2 rounded-xl overflow-hidden ${getColorClasses()}`}
    >
      {/* Column header */}
      <div className={`border-b-2 p-4 ${getHeaderColorClasses()}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-blanco">{title}</h3>
          <span className="inline-flex items-center justify-center w-7 h-7 bg-negro/50 rounded-full text-sm font-bold text-blanco">
            {leads.length}
          </span>
        </div>
      </div>

      {/* Droppable area */}
      <div
        ref={setNodeRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[500px] max-h-[calc(100vh-400px)]"
      >
        <SortableContext
          items={leads.map((lead) => lead.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
              No hay leads en esta columna
            </div>
          ) : (
            leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onClick={() => onLeadClick(lead)}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
