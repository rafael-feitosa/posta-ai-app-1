import { useNavigate } from 'react-router';
import ShowEmail from '../ConectedUsersData/ShowEmail';

const NavBar = () => {
  const navigate = useNavigate();
  const goToMyAccount = () => {
    navigate('/my-account');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary navbarPainel">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="/">
          <img
            src="https://feitosa.digital/dev-web/img/favicon/favicon-feitosa-digital.jpg"
            alt="Logo"
            width="auto"
            height="40"
            className="d-inline-block align-text-top rounded"
          ></img>
          posta.ai
        </a>
        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/kanban">
                Kanban
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/tasks">
                Tarefas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/calendar">
                Calendário
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/settings">
                Configurações
              </a>
            </li>
          </ul>
          <ShowEmail />
        </div>
        <button
          type="button"
          className="btn btn-light p-2"
          onClick={goToMyAccount}
        >
          Minha conta
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
