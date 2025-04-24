import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import BtnPrimary from '../BtnPrimary/BtnPrimary';
import { WrapperOverview } from '../Wrapper/WrapperStyles';
import ArchivedTaskCard from '../ArchivedTaskCard/ArchivedTaskCard';
import { sortTasksByDeadline } from '../../utils/sortTasks'; // Importa a função de ordenação

const ArchiveSection = () => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchivedTasks = async () => {
      try {
        const q = query(
          collection(db, 'tasks'),
          where('status', '==', 'arquivado')
        );
        const querySnapshot = await getDocs(q);

        const tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });

        const sortedTasks = sortTasksByDeadline(tasks); // chama aqui a função
        setArchivedTasks(sortedTasks);
        // console.log('Tarefas arquivadas: ', sortedTasks);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar tarefas arquivadas: ', error);
        setLoading(false);
      }
    };

    fetchArchivedTasks();
  }, []);

  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto">
        <div className="d-flex justify-content-between w-100">
          <h2>Suas tarefas arquivadas</h2>
          <BtnPrimary toPage={'/tasks/'} BtnLabel={'Minhas tarefas'} />
        </div>

        <div className="g-3">
          {loading ? (
            <p>Carregando tarefas arquivadas...</p>
          ) : archivedTasks.length > 0 ? (
            archivedTasks.map((task) => (
              <ArchivedTaskCard
                key={task.id}
                task={task}
                onDelete={() =>
                  setArchivedTasks((prev) =>
                    prev.filter((t) => t.id !== task.id)
                  )
                }
              />
            ))
          ) : (
            <p>Você não tem tarefas arquivadas ainda.</p>
          )}
        </div>
      </div>
    </WrapperOverview>
  );
};

export default ArchiveSection;
