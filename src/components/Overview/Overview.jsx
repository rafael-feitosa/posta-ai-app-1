import { WrapperOverview } from '../Wrapper/WrapperStyles';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // (ajusta se o caminho for diferente)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardAlertsSection from '../DashboardAlerts/DashboardAlertsSection';

const Overview = () => {
  const navigate = useNavigate();

  const [taskCounts, setTaskCounts] = useState({
    solicitacoes: 0,
    andamento: 0,
    aprovacao: 0,
    concluido: 0,
  });

  useEffect(() => {
    async function fetchTaskCounts() {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const counts = {
          solicitacoes: 0,
          andamento: 0,
          aprovacao: 0,
          concluido: 0,
        };

        querySnapshot.forEach((doc) => {
          const task = doc.data();
          const status = task.status;

          if (status === 'solicitacoes') counts.solicitacoes++;
          if (status === 'andamento') counts.andamento++;
          if (status === 'aprovacao') counts.aprovacao++;
          if (status === 'concluido') counts.concluido++;
        });

        setTaskCounts(counts);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    }

    fetchTaskCounts();
  }, []);

  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto cardsReport">
        <div className="row w-100">
          <h2>Overview de tarefas</h2>
        </div>

        <div className="col">
          <div className="card h-100 position-relative">
            <div className="card-body">
              <h5 className="card-title">
                <span>{taskCounts.solicitacoes}</span>
              </h5>
              <p className="card-text">Solicitações abertas</p>
            </div>
            <button
              onClick={() => navigate('/tasks')}
              type="button"
              className="btn btn-secondary cardReportIcon bg-warning"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <span>{taskCounts.andamento}</span>
              </h5>
              <p className="card-text">Tarefas em andamento</p>
            </div>
            <button
              onClick={() => navigate('/tasks')}
              type="button"
              className="btn btn-secondary cardReportIcon bg-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <span>{taskCounts.aprovacao}</span>
              </h5>
              <p className="card-text">Tarefas aprovadas</p>
            </div>
            <button
              onClick={() => navigate('/tasks')}
              type="button"
              className="btn btn-secondary cardReportIcon bg-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                <span>{taskCounts.concluido}</span>
              </h5>
              <p className="card-text">Tarefas concluídas</p>
            </div>
            <button
              onClick={() => navigate('/tasks')}
              type="button"
              className="btn btn-secondary cardReportIcon bg-success"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-3 my-5 w-100">
          <DashboardAlertsSection />
        </div>
      </div>
    </WrapperOverview>
  );
};
export default Overview;
