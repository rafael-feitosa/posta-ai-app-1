import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import BtnPrimary from '../BtnPrimary/BtnPrimary';
import { WrapperOverview } from '../Wrapper/WrapperStyles';
import TasksListCard from '../TasksListCard/TasksListCard';
import ModalSearchedResults from '../Modals/ModalSearchedResults';
// import { sortTasksByDeadline } from '../../utils/sortTasks'; // Importa a função de ordenação

const TasksSection = () => {
  const [tasksLists, setTasksList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateOrder, setDateOrder] = useState('recent');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasksList(tasks);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar tarefas: ', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Primeiro filtro por status
  const filteredTasks = tasksLists.filter((task) => {
    return statusFilter === 'all' || task.status === statusFilter;
  });

  // Depois ordena por data de criação
  const orderedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = a.createdAt?.toDate
      ? a.createdAt.toDate()
      : new Date(a.createdAt);
    const dateB = b.createdAt?.toDate
      ? b.createdAt.toDate()
      : new Date(b.createdAt);

    if (dateOrder === 'recent') {
      return dateB - dateA; // Mais recente primeiro
    } else {
      return dateA - dateB; // Mais antigo primeiro
    }
  });

  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto">
        <div className="d-flex justify-content-between w-100 mb-3">
          <h2>Listagem de tarefas</h2>
          <div className="d-flex w-60 gap-2 justify-content-end">
            <ModalSearchedResults />
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="all">Todos os status</option>
              <option value="solicitacoes">Pendente</option>
              <option value="andamento">Em andamento</option>
              <option value="aprovacao">Em aprovação</option>
              <option value="concluido">Concluído</option>
            </select>
            <select
              className="form-select"
              value={dateOrder}
              onChange={(e) => setDateOrder(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="recent">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
            </select>
            <BtnPrimary toPage={'/kanban/'} BtnLabel={'Kanban'} />
          </div>
        </div>

        <div className="g-3">
          {loading ? (
            <p>Carregando suas tarefas...</p>
          ) : orderedTasks.length > 0 ? (
            orderedTasks.map((task) => (
              <TasksListCard
                key={task.id}
                id={task.id}
                title={task.title}
                createdAt={task.createdAt}
                deadline={task.deadline}
              />
            ))
          ) : (
            <p>Você não tem tarefas ainda.</p>
          )}
        </div>
      </div>
    </WrapperOverview>
  );
};

export default TasksSection;
