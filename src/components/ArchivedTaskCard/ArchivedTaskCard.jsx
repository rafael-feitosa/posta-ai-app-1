import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const ArchivedTaskCard = ({ task }) => {
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteDoc(doc(db, 'tasks', task.id));
        alert('Tarefa excluída com sucesso!');
        onDelete(); // Atualiza a tela
      } catch (error) {
        alert('Erro ao excluir tarefa.');
        // console.error('Erro ao excluir a tarefa: ', error);
      }
    }
  };

  return (
    <div className="card p-3 mb-3 shadow-sm bg-white rounded position-relative">
      <button
        type="button"
        onClick={handleDelete}
        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 btnDelete"
        title="Excluir tarefa"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </button>
      <Link to={`/tasks/details/${task.id}`}>
        <h5>{task.title}</h5>
      </Link>
      {/* <h5 className="mb-2">{task.title}</h5> */}
      <p className="mb-1 text-muted">{task.description}</p>
      {task.deadline && (
        <small className="text-secondary">
          Prazo: {new Date(task.deadline).toLocaleDateString('pt-BR')}
        </small>
      )}
    </div>
  );
};

export default ArchivedTaskCard;
