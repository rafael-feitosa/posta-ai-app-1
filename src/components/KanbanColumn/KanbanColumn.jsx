// src/components/Kanban/Column.jsx
import { useDroppable } from '@dnd-kit/core';
import KanbanCard from '../KanbanCard/KanbanCard';

function KanbanColumn({ id, title, tasks }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: '8px',
        // minHeight: '400px',
        minHeight: '100%',
        // maxHeight: '100%',
        width: '100%',
      }}
    >
      <h4 className="text-left mb-4">{title}</h4>
      <div className="colunaKanbanScroll">
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            id={task.id}
            title={task.title}
            createdAt={task.createdAt}
            deadline={task.deadline}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
