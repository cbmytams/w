import { useState } from "react";
import { useAdminData } from "../../context/AdminContext";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { LeadCard } from "./LeadCard";
import type { Lead } from "../../types";
import { getLeadInterestScore } from "../../lib/leadInsights";

// MOCK DATA (Extended)

const COLUMNS: Array<{ id: Lead["status"]; title: string; color: string }> = [
  { id: "new", title: "À traiter", color: "bg-blue-500" },
  { id: "contacted", title: "En cours", color: "bg-yellow-500" },
  { id: "qualified", title: "Qualifiés", color: "bg-violet-500" },
  { id: "signed", title: "Entretien", color: "bg-emerald-500" },
  { id: "archived", title: "Archivé", color: "bg-zinc-500" },
];

interface KanbanBoardProps {
  onOpenLead?: (lead: Lead) => void;
  sortBy?: "interest" | "score" | "recent";
}

export function KanbanBoard({
  onOpenLead,
  sortBy = "interest",
}: KanbanBoardProps) {
  const { leads, updateLeadStatus } = useAdminData();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sortLeads = (list: Lead[]) => {
    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.score - a.score;
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "interest":
        default:
          return getLeadInterestScore(b) - getLeadInterestScore(a);
      }
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const containerId = over.id;
      // Use Context Action
      void updateLeadStatus(active.id as string, containerId as string);
    }
    setActiveId(null);
  };

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full overflow-x-auto custom-scrollbar p-6">
        <div className="flex gap-4 h-full min-w-max">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              count={leads.filter((l) => l.status === col.id).length}
              leads={sortLeads(leads.filter((l) => l.status === col.id))}
              color={col.color}
              onOpenLead={onOpenLead}
            />
          ))}
        </div>
      </div>

      {activeLead ? (
        <DragOverlay
          dropAnimation={{
            duration: 250,
            easing: "ease",
          }}
        >
          <LeadCard lead={activeLead} />
        </DragOverlay>
      ) : null}
    </DndContext>
  );
}
