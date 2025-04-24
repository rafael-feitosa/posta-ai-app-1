import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import TasksListCard from '../TasksListCard/TasksListCard';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap';

const ModalSearchedResults = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedTasks, setSearchedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null); // Guarda a instância do Modal
  const pendingNavigateId = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksQuery = query(
          collection(db, 'tasks'),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(tasksQuery);
        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllTasks(tasks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalInstanceRef.current = new Modal(modalElement, {
        backdrop: 'static',
        keyboard: false,
      });

      modalElement.addEventListener('hidden.bs.modal', handleModalHidden);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
      }
    };
  }, []);

  const handleModalHidden = () => {
    if (pendingNavigateId.current) {
      navigate(`/tasks/details/${pendingNavigateId.current}`);
      pendingNavigateId.current = null;
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchedTasks([]);
      return;
    }

    const filteredTasks = allTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedTasks(filteredTasks);

    if (modalInstanceRef.current) {
      modalInstanceRef.current.show(); // Agora abre o modal manualmente
    }
  };

  const handleCardClick = (taskId) => {
    if (modalInstanceRef.current) {
      pendingNavigateId.current = taskId;
      modalInstanceRef.current.hide(); // Fecha o modal
    }
  };

  return (
    <>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="buscar por título"
          aria-label="buscar por título"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-describedby="SearchInput"
        />
        <button
          className="btn btn-primary"
          type="button"
          id="SearchInput"
          onClick={handleSearch} // ATENÇÃO: Sem data-bs-toggle/data-bs-target
        >
          Buscar
        </button>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Sua busca: <strong>{searchTerm}</strong>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>{searchedTasks.length}</strong> resultado(s)
                encontrado(s)
              </p>
              {loading ? (
                <p>Carregando resultados...</p>
              ) : searchedTasks.length > 0 ? (
                searchedTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleCardClick(task.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TasksListCard
                      id={task.id}
                      title={task.title}
                      createdAt={task.createdAt}
                      deadline={task.deadline}
                    />
                  </div>
                ))
              ) : (
                <p>Nenhum resultado encontrado.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSearchedResults;
// Nota: O modal é aberto manualmente com modalInstanceRef.current.show() e fechado com modalInstanceRef.current.hide().
// Isso garante que o modal seja controlado corretamente e evita conflitos com o Bootstrap.
