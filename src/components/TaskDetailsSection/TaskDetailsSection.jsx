import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import BtnPrimary from '../BtnPrimary/BtnPrimary';
import { WrapperOverview } from '../Wrapper/WrapperStyles';

const TaskDetailsSection = () => {
  const { id } = useParams(); // Pegamos o ID da URL
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchTask() {
      try {
        const taskRef = doc(db, 'tasks', id);
        const taskSnap = await getDoc(taskRef);
        if (taskSnap.exists()) {
          setTask(taskSnap.data());
        } else {
          alert('Tarefa não encontrada.');
          navigate('/tasks'); // Redireciona se não encontrar
        }
      } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, {
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
      });
      setSuccessMessage('Tarefa atualizada com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      // console.error('Erro ao salvar alterações:', error);
      setSuccessMessage('Erro ao salvar alterações.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteDoc(doc(db, 'tasks', id));
        alert('Tarefa excluída com sucesso!');
        navigate('/tasks'); // Redireciona para a lista de tarefas
      } catch (error) {
        // console.error('Erro ao excluir tarefa:', error);
        alert('Erro ao excluir tarefa.');
      }
    }
  };

  if (loading) {
    return <p>Carregando detalhes da tarefa...</p>;
  }

  if (!task) {
    return <p>Tarefa não encontrada.</p>;
  }

  // Trazer a data de criação da tarefa
  const creationDate = task.createdAt
    ? new Date(task.createdAt.toDate()).toLocaleDateString('pt-BR')
    : 'Data não disponível';

  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto">
        <div className="d-flex justify-content-between w-100 mb-3">
          <h2>Editar tarefa</h2>
          <BtnPrimary toPage={'/tasks'} BtnLabel={'Minhas tarefas'} />
        </div>
        <div className="w-100">
          {creationDate && (
            <p className="text-muted mb-3">Criado em: {creationDate}</p>
          )}
        </div>
        <form className="d-flex flex-column gap-3" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="4"
              value={task.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Prazo</label>
            <input
              type="date"
              className="form-control"
              id="deadline"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              required
            >
              <option value="solicitacoes">Solicitações</option>
              <option value="andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
              <option value="arquivado">Arquivado</option>
            </select>
          </div>

          <div className="d-flex gap-3 mt-4">
            <button type="submit" className="btn btn-primary">
              Salvar alterações
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Excluir tarefa
            </button>
          </div>

          {/* Mensagem de sucesso */}
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </WrapperOverview>
  );
};

export default TaskDetailsSection;
