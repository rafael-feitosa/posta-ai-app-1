import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { WrapperMain } from '../../components/Wrapper/WrapperStyles';
import styled from 'styled-components';

const LoginSectionStyle = styled.div`
  padding: 3rem;
  border-radius: 10px;
  width: 450px;
  max-width: 600%;
  background-color: #f5f5f5;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const inputEmail = useRef();
  const inputPassword = useRef();
  const navigate = useNavigate();

  const makeLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log('Usuário logado:', user);
      navigate('/');
    } catch (error) {
      // console.error('Erro ao logar:', error);
      setErro('E-mail ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <WrapperMain>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <LoginSectionStyle>
          <h3 className="mb-4">Faça seu login</h3>
          <form onSubmit={makeLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>E-mail</strong>
              </label>
              <input
                type="email"
                className="form-control p-2"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={inputEmail}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">
                <strong>Senha</strong>
              </label>
              <input
                type="password"
                className="form-control p-2"
                id="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={inputPassword}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 p-2 mt-3">
              Entrar
            </button>
            {erro && (
              <div className="alert alert-danger mt-3 mb-3" role="alert">
                {erro}
              </div>
            )}
            <button
              type="button"
              className="btn btn-link w-100 text-center mt-3"
              onClick={() => navigate('/register')}
            >
              Cadastre-se
            </button>
          </form>
        </LoginSectionStyle>
      </div>
    </WrapperMain>
  );
};

export default Login;
