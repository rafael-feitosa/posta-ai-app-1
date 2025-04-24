import { useState } from 'react';
import BtnPrimary from '../BtnPrimary/BtnPrimary';
import { WrapperOverview } from '../Wrapper/WrapperStyles';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Ajuste o caminho se necessário

const SettingsSection = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');

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
      console.log('Tarefa criada com ID:', docRef.id);

      // Limpar formulário depois de adicionar
      setTitulo('');
      setDescricao('');
      setPrazo('');
      setConfirmado(false);

      // alert('Tarefa adicionada com sucesso!');
      setSuccessMessage('Tarefa adicionada com sucesso!');
      setTimeout(() => {
        setSuccessMessage(''); // Limpa a mensagem após 3 segundos
      }, 3000);
    } catch (e) {
      console.error('Erro ao adicionar tarefa: ', e);
      setSuccessMessage('Erro ao adicionar tarefa.');
      // alert('Erro ao adicionar tarefa.');

      setTimeout(() => {
        setSuccessMessage(''); // Limpa a mensagem após 3 segundos
      }, 3000);
    }
  };

  return (
    <WrapperOverview className="container">
      <div className="row row-cols-1 g-4 container bg-light rounded-3 pb-5 pt-4 mx-auto">
        <div className="d-flex justify-content-between w-100">
          <h2>Meus dados</h2>
          <div className="d-flex justify-content-end" style={{ gap: '1rem' }}>
            <a
              className="link-opacity-100 d-flex align-items-center"
              href="/tasks/archived"
            >
              Arquivados
            </a>
            <BtnPrimary toPage={'/kanban'} BtnLabel={'Minhas tarefas'} />
          </div>
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
            {/* Mensagem de sucesso */}
            {successMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </WrapperOverview>
  );
};

export default SettingsSection;
