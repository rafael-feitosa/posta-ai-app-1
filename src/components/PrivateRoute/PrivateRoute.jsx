// src/components/ProtectedLayout.jsx
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const PrivateRoute = () => {
  const [user, setUser] = useState(undefined); // undefined = carregando
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  if (user === undefined) {
    return <LoadingSpinner />; // Ou coloque um Spinner animado aqui
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
