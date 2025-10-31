import { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { LeadColumn } from './LeadColumn';
import { LeadCard } from './LeadCard';
import type { Lead, LeadStatus } from '@/types/dashboard';

interface LeadBoardProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onStatusChange: (leadId: number, newStatus: LeadStatus) => Promise<boolean>;
}

export function LeadBoard({ leads, onLeadClick, onStatusChange }: LeadBoardProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Prevenir que el drag se active con un simple click
      activationConstraint: {
        distance: 8, // Mover 8px para activar el drag
      },
    }),
    useSensor(TouchSensor, {
      // Configuración para dispositivos táctiles
      activationConstraint: {
        delay: 100, // Mantener presionado 100ms para activar el drag
        tolerance: 15, // Permitir 15px de movimiento sin cancelar
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Definir las columnas
  const columns: { id: LeadStatus; title: string; color: string }[] = [
    { id: 'nuevo', title: 'Nuevo Lead', color: 'blue' },
    { id: 'contactado', title: 'Contactado', color: 'green' },
    { id: 'negociacion', title: 'En Negociación', color: 'orange' },
    { id: 'cerrado', title: 'Cerrado/Ganado', color: 'purple' },
  ];

  // Organizar leads por columna
  const leadsByStatus = useMemo(() => {
    const organized: Record<LeadStatus, Lead[]> = {
      nuevo: [],
      contactado: [],
      negociacion: [],
      cerrado: [],
    };

    leads.forEach((lead) => {
      organized[lead.status].push(lead);
    });

    return organized;
  }, [leads]);

  const findContainer = (id: number) => {
    if (id in leadsByStatus) {
      return id as LeadStatus;
    }

    return Object.keys(leadsByStatus).find((key) =>
      leadsByStatus[key as LeadStatus].some((lead) => lead.id === id)
    ) as LeadStatus | undefined;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as number);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as number;
    const overId = over.id;

    // Encontrar el contenedor del elemento activo y sobre el que está
    const activeContainer = findContainer(activeId);
    const overContainer = typeof overId === 'string' ? overId as LeadStatus : findContainer(overId as number);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    // Actualizar el status del lead cuando se mueve a otra columna
    onStatusChange(activeId, overContainer);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  const activeLead = activeId ? leads.find((lead) => lead.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 lg:overflow-x-visible">
        {columns.map((column) => (
          <LeadColumn
            key={column.id}
            id={column.id}
            title={column.title}
            leads={leadsByStatus[column.id]}
            onLeadClick={onLeadClick}
            color={column.color}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead ? (
          <div className="rotate-6 scale-105">
            <LeadCard lead={activeLead} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
