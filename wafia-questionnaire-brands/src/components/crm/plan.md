# CRM Kanban Implementation Plan

## Goal

Transform the Admin Leads view from a static table to a dynamic Drag-and-Drop Kanban Board.

## Components

1.  **`src/components/crm/KanbanBoard.tsx`**
    - Container using `@dnd-kit/core`.
    - Columns: `New`, `Contacted`, `Qualified`, `Signed`, `Archived`.
    - Drag overlay support.

2.  **`src/components/crm/KanbanColumn.tsx`**
    - Droppable zone.
    - Header with count badges.

3.  **`src/components/crm/LeadCard.tsx`**
    - Draggable item.
    - Displays Name, Score, Email, and Time.
    - Click to open details (future).

## Data Model

- Mock data will be updated to include `status` compatible with the columns.
- `onDragEnd` handler will update the local state (and eventually Supabase).

## Integration

- Replace `LeadsView` content in `AdminDashboard.tsx` with `KanbanBoard`.
