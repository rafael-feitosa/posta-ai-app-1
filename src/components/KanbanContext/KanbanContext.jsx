// Description: This component represents o Kanban board.
import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import { WrapperOverview } from '../Wrapper/WrapperStyles';
import BtnPrimary from '../BtnPrimary/BtnPrimary';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const KanbanContext = () => {
  const [columns, setColumns] = useState({
    solicitacoes: [],
    andamento: [],
    aprovacao: [],
    concluido: [],
  });

  // Função para buscar as tarefas no Firebase
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const newColums = {
        solicitacoes: [],
        andamento: [],
        aprovacao: [],
        concluido: [],
      };
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const task = {
          id: doc.id,
          title: data.title || '',
          description: data.description || '',
          deadline: data.deadline || null,
          createdAt: data.createdAt || null,
          status: data.status || 'solicitacoes', // fallback default
        };

        if (newColums[data.status]) {
          newColums[data.status].push(task);
        } else {
          newColums.solicitacoes.push(task); // fallback
        }
      });

      setColumns(newColums);
    } catch (error) {
      // console.error('Erro ao buscar tarefas:', error);
    }
  };

  // useEffect para carregar as tarefas no carregamento
  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para atualizar o status da tarefa no Firebase
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        status: newStatus,
      });
      // console.log(`Status da tarefa ${taskId} atualizado para ${newStatus}`);
    } catch (error) {
      // console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Encontra em qual coluna o card estava
    let sourceColumn, targetColumn;
    for (const key in columns) {
      if (columns[key].some((task) => task.id === activeId)) {
        sourceColumn = key;
      }
      if (key === overId) {
        targetColumn = key;
      }
    }

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn !== targetColumn) {
      const movingTask = columns[sourceColumn].find(
        (task) => task.id === activeId
      );

      setColumns((prev) => {
        const newColumns = { ...prev };
        newColumns[sourceColumn] = newColumns[sourceColumn].filter(
          (task) => task.id !== activeId
        );
        newColumns[targetColumn] = [...newColumns[targetColumn], movingTask];
        return newColumns;
      });

      // Atualiza o status da tarefa no Firebase
      updateTaskStatus(activeId, targetColumn);
    }
  };

  // Função para filtras as tarefas por data de criação
  const sortTasksByCreatedAt = (columnId) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      newColumns[columnId] = [...newColumns[columnId]].sort((a, b) => {
        const dateA = a.createdAt?.toDate
          ? a.createdAt.toDate()
          : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate
          ? b.createdAt.toDate()
          : new Date(b.createdAt);
        return dateB - dateA; // Mais novos primeiro
      });
      return newColumns;
    });
  };

  return (
    <WrapperOverview className="container KanbanContent">
      <div className="bg-light rounded-3 px-4 py-4 mx-auto w-100">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Gerenciador de tarefas</h2>
            <BtnPrimary
              toPage={'/tasks/add-task'}
              BtnLabel={'Adicionar tarefa'}
            />
          </div>
          <div className="row w-100 flex-nowrap overflow-x-auto md:overflow-x-hidden m-auto g-2">
            <div
              className="col position-relative align-self-stretch"
              style={{ minWidth: '300px' }}
            >
              <KanbanColumn
                id="solicitacoes"
                title="Solicitações"
                tasks={columns.solicitacoes}
              />
              <span className="taskQtd badge bg-warning">
                {columns.solicitacoes.length}
              </span>
              <span
                className="filterIconTasks"
                onClick={() => sortTasksByCreatedAt('solicitacoes')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-filter-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                </svg>
              </span>
            </div>
            <div
              className="col position-relative align-self-stretch"
              style={{ minWidth: '300px' }}
            >
              <KanbanColumn
                id="andamento"
                title="Em andamento"
                tasks={columns.andamento}
              />
              <span className="taskQtd badge bg-primary">
                {columns.andamento.length}
              </span>
              <span
                className="filterIconTasks"
                onClick={() => sortTasksByCreatedAt('andamento')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-filter-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                </svg>
              </span>
            </div>
            <div
              className="col position-relative align-self-stretch"
              style={{ minWidth: '300px' }}
            >
              <KanbanColumn
                id="aprovacao"
                title="Em aprovação"
                tasks={columns.aprovacao}
              />
              <span className="taskQtd badge bg-black">
                {columns.aprovacao.length}
              </span>
              <span
                className="filterIconTasks"
                onClick={() => sortTasksByCreatedAt('aprovacao')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-filter-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                </svg>
              </span>
            </div>
            <div
              className="col position-relative align-self-stretch"
              style={{ minWidth: '300px' }}
            >
              <KanbanColumn
                id="concluido"
                title="Concluído"
                tasks={columns.concluido}
              />
              <span
                className="filterIconTasks"
                onClick={() => sortTasksByCreatedAt('concluido')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-filter-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                </svg>
              </span>
              <span className="taskQtd badge bg-success">
                {columns.concluido.length}
              </span>
            </div>
          </div>
        </DndContext>
      </div>
    </WrapperOverview>
  );
};

export default KanbanContext;
