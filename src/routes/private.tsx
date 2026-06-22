/* eslint-disable @typescript-eslint/no-unused-vars */
// Faz a proteção das rotas
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };

        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    // Cancelar o olheiro assim que o componente é desmontado(clean up)
    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return (
      <div className="text-2xl flex justify-center text-blue font-semibold">
        Carregando...
      </div>
    );
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }
  return children;
}
