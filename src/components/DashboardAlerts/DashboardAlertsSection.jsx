import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';

function DashboardAlertsSection() {
  const [tasksTodayCount, setTasksTodayCount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasksToday = async () => {
      try {
        // Formata a data de hoje como 'YYYY-MM-DD'
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // mês começa do 0
        const day = String(today.getDate()).padStart(2, '0');
        const todayString = `${year}-${month}-${day}`;

        const q = query(
          collection(db, 'tasks'),
          where('deadline', '==', todayString)
        );
        const querySnapshot = await getDocs(q);

        setTasksTodayCount(querySnapshot.size);
        console.log('Tarefas para entregar hoje: ', querySnapshot);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar as tarefasde hoje: ', error);
        setLoading(false);
      }
    };

    fetchTasksToday();
  }, []);

  return (
    <>
      <h4 className="mb-4">Mensagens importantes</h4>
      {loading ? (
        <p>Carregando alertas...</p>
      ) : tasksTodayCount > 0 ? (
        <div className="alert alert-primary" role="alert">
          Você tem <strong>{tasksTodayCount}</strong> tarefas para entregar
          hoje!
        </div>
      ) : (
        <div className="alert alert-success" role="alert">
          No momento não há tarefas para entregar hoje. 👏
        </div>
      )}
    </>
  );
}

export default DashboardAlertsSection;
