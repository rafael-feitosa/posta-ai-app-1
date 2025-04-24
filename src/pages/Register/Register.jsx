import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import styled from 'styled-components';
import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
// import validator from 'validator';

const RegisterSectionStyle = styled.div`
  padding: 3rem;
  border-radius: 10px;
  width: 450px;
  max-width: 600%;
  background-color: #f5f5f5;
`;

const Register = () => {
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  // const [password, setPassword] = useState('');
  const [criteria, setCriteria] = useState({
    minLength: false,
    minLowercase: false,
    minUppercase: false,
    minNumbers: false,
    minSymbols: false,
  });

  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputDisplayName = useRef();

  const navigate = useNavigate();

  // Olho no campo de senha
  function ShowPassWordEye() {
    var id_pass_field = '#senha';
    var password = document.querySelector(id_pass_field);
    if (password) {
      var label = document.createElement('i');
      label.className = 'showpass fa fa-solid fa-eye';
      password.parentNode.style.position = 'relative';
      password.parentNode.appendChild(label);

      label.style.position = 'absolute';
      label.style.right = '10px';
      label.style.top = '50%';
      label.style.transform = 'translateY(-50%)';
      label.style.cursor = 'pointer';

      label.addEventListener('click', function () {
        if (password.type === 'password') {
          password.type = 'text';
          label.className = 'showpass fa fa-solid fa-eye-slash';
        } else {
          password.type = 'password';
          label.className = 'showpass fa fa-solid fa-eye';
        }
      });
    }
  }

  // Validar a senha digitada
  const validate = (value) => {
    // setPassword(value);

    const newCriteria = {
      minLength: value.length >= 8,
      minLowercase: /[a-z]/.test(value),
      minUppercase: /[A-Z]/.test(value),
      minNumbers: /\d/.test(value),
      minSymbols: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };

    setCriteria(newCriteria);
  };

  const createAccount = async (e) => {
    e.preventDefault();

    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const displayName = inputDisplayName.current.value;

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );
      const user = userCredential.user;

      // Atualiza o nome de exibição do usuário no Firebase Authentication
      await updateProfile(user, { displayName: displayName });

      setSucesso('Cadastro realizado com sucesso!');
      setErro(null);
      setTimeout(() => {
        navigate('/'); // redireciona para login após cadastro
      }, 2000);
    } catch (error) {
      setErro('Erro ao criar conta: ' + error.message);
      setSucesso(null);
    }
  };

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <WrapperMain>
      <div
        className="container d-flex justify-content-center align-items-center py-4"
        style={{ minHeight: '100vh' }}
      >
        <RegisterSectionStyle>
          <h3 className="mb-4">Faça seu cadastro</h3>
          <form onSubmit={createAccount}>
            <div className="mb-3">
              <label htmlFor="displayName" className="form-label">
                <strong>Nome</strong>
              </label>
              <input
                type="text"
                className="form-control p-2"
                id="displayName"
                aria-describedby="nameHelp"
                required
                ref={inputDisplayName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>E-mail</strong>
              </label>
              <input
                type="email"
                className="form-control p-2"
                id="email"
                aria-describedby="emailHelp"
                required
                ref={inputEmail}
              />
            </div>

            <div className="position-relative">
              <label htmlFor="senha" className="form-label">
                <strong>Senha</strong>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control p-2"
                id="senha"
                required
                ref={inputPassword}
                onChange={(e) => validate(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  top: '75%',
                  right: '0',
                  transform: 'translateY(-65%)',
                  position: 'absolute',
                }}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-3">
              <ul>
                <li style={{ color: criteria.minLength ? 'green' : 'red' }}>
                  <small>Mínimo de 8 caracteres</small>
                </li>
                <li style={{ color: criteria.minLowercase ? 'green' : 'red' }}>
                  <small>Mínimo de 1 letra minúscula</small>
                </li>
                <li style={{ color: criteria.minUppercase ? 'green' : 'red' }}>
                  <small>Mínimo de 1 letra maiúscula</small>
                </li>
                <li style={{ color: criteria.minNumbers ? 'green' : 'red' }}>
                  <small>Mínimo de 1 número</small>
                </li>
                <li style={{ color: criteria.minSymbols ? 'green' : 'red' }}>
                  <small>Mínimo de 1 símbolo</small>
                </li>
              </ul>
            </div>
            <button type="submit" className="btn btn-primary w-100 p-2 mt-3">
              Cadastrar
            </button>
            {sucesso && (
              <div className="alert alert-primary mt-3 mb-3" role="alert">
                {sucesso}
              </div>
            )}
            {erro && (
              <div className="alert alert-danger mt-3 mb-3" role="alert">
                {erro}
              </div>
            )}
            <button
              type="button"
              className="btn btn-link w-100 text-center mt-3"
              onClick={goToLogin}
            >
              Já tenho conta (Login)
            </button>
          </form>
        </RegisterSectionStyle>
      </div>
    </WrapperMain>
  );
};

export default Register;
