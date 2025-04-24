// src/components/Kanban/Card.jsx
import { useDraggable } from '@dnd-kit/core';
// import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';

function TasksListCard({ id, title, createdAt, deadline }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const styListCard = {
    // transform: CSS.Translate.toString(transform),
    padding: '12px',
    marginBottom: '0.5rem',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    gap: '5px',
    // cursor: 'grab',
  };

  // const formatDate = (timestamp) => {
  //   if (!timestamp) return 'Data não disponível';
  //   const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  //   return date.toLocaleDateString('pt-BR');
  // };

  const formatDate = (timestamp, type) => {
    if (!timestamp) return 'Não há';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    if (type === 'createdAt') {
      const formattedDate = date.toLocaleDateString('pt-BR'); // ex: 19/04/2025
      const formattedTime = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }); // ex: 15:00
      return `${formattedDate} às ${formattedTime}`;
    }

    // Para outras datas, como 'entrega', só mostramos a data simples
    return date.toLocaleDateString('pt-BR'); // ex: 19/04/2025
  };

  return (
    <div
      ref={setNodeRef}
      style={styListCard}
      {...listeners}
      {...attributes}
      className="d-flex flex-column"
    >
      {/* {title} */}
      <Link
        to={`/tasks/details/${id}`}
        style={{
          textDecoration: 'none',
          color: 'blue',
          maxWidth: 'fit-content',
        }}
        onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
        onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
      >
        <h5
          style={{
            fontSize: '0.9rem',
            fontWeight: '400',
            lineHeight: '1.2rem',
            margin: '0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </h5>
      </Link>
      <div className="d-flex dateIcon" style={{ width: '100%', gap: '1rem' }}>
        <small style={{ fontSize: '0.6rem', color: '#888' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>
          {formatDate(createdAt, 'createdAt')}
        </small>
        <small style={{ fontSize: '0.6rem', color: '#888' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-calendar-check"
            viewBox="0 0 16 16"
          >
            <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>
          {formatDate(deadline, 'deadline')}
        </small>
      </div>
    </div>
  );
}

export default TasksListCard;
