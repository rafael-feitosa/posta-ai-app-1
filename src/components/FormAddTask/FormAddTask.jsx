import { useState, useRef } from 'react';
import BtnPrimary from '../BtnPrimary/BtnPrimary';
import { WrapperOverview } from '../Wrapper/WrapperStyles';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Ajuste o caminho se necessário
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Toast } from 'bootstrap';

const FormAddTask = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // success ou error

  const toastRef = useRef(null);

  const showToast = () => {
    if (toastRef.current) {
      const toast = new Toast(toastRef.current);
      toast.show();
    }
  };

  const adicionarTarefa = async (e) => {
    e.preventDefault(); // impede recarregar a página ao enviar o formulário
    if (!confirmado) {
      alert('Você precisa confirmar a solicitação.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        title: titulo,
        description: descricao,
        deadline: prazo,
        status: 'solicitacoes',
        createdAt: new Date(),
      });
      // console.log('Tarefa criada com ID:', docRef.id);

      // Limpar formulário depois de adicionar
      setTitulo('');
      setDescricao('');
      setPrazo('');
      setConfirmado(false);

      setSuccessMessage('Tarefa adicionada com sucesso!');
      setToastType('success');
      showToast();
    } catch (e) {
      console.error('Erro ao adicionar tarefa: ', e);
      setSuccessMessage('Erro ao adicionar tarefa.');
      setToastType('error');
      showToast();
    }
  };

  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto">
        <div className="d-flex justify-content-between w-100">
          <h2>Criar nova tarefa</h2>
          <BtnPrimary toPage={'/kanban'} BtnLabel={'Minhas tarefas'} />
        </div>
        <div className="g-3">
          <form className="d-flex flex-column gap-3" onSubmit={adicionarTarefa}>
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Digite o título da tarefa"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                maxLength={65}
              />
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição da tarefa</label>
              <textarea
                className="form-control"
                id="descricao"
                rows="3"
                placeholder="Descreva a tarefa"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="prazo">Prazo</label>
              <input
                type="date"
                className="form-control"
                id="prazo"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
                required
              />
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="confirmarSolicitacao"
                checked={confirmado}
                onChange={(e) => setConfirmado(e.target.checked)}
              />
              <label
                className="form-check-label"
                htmlFor="confirmarSolicitacao"
              >
                Confirmo a solicitação
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-25">
              Solicitar
            </button>

            {/* Toast */}
            <div
              ref={toastRef}
              className={`toast align-items-center text-white ${
                toastType === 'success' ? 'bg-success' : 'bg-danger'
              } position-fixed bottom-0 end-0 m-3`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-bs-delay="3000"
            >
              <div className="d-flex">
                <div className="toast-body">{successMessage}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            {/* Tost End */}
          </form>
        </div>
      </div>
    </WrapperOverview>
  );
};

export default FormAddTask;
