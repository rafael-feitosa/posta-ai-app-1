import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ConectedUsersData = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
        });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe(); // Importante para evitar vazamento de memória
  }, []);

  // if (!userData) return null; // Isso significa que se não houver usuário logado, o ConectedUsersData NÃO vai renderizar NADA. Nem o seu <Headings />.

  // Aqui SEMPRE chamamos children para renderizar o que está dentro do ConectedUsersData, mesmo que o usuário não esteja logado. O que muda é o valor de userData.
  return <>{children(userData)}</>;
};

export default ConectedUsersData;
