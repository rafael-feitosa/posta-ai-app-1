import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      // console.error('Erro ao fazer logout:', error);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger btn-lg"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? 'Saindo...' : 'Sair'}
    </button>
  );
};

export default LogoutButton;
