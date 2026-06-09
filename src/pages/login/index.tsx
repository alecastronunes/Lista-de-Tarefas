import { useState, type ChangeEvent } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: ChangeEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Por favor, preencha corretamente todos os campos!");
      return;
    }

    // Faz o login
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/", { replace: true }); // Replace redireciona para página Tarefas.
        toast.success("Login realizado com sucesso!")
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao fazer login" + error);
      });
  }

  return (
    <div className="flex justify-center flex-col items-center px-2">
      <h1 className="text-3xl font-bold text-login-title-blue mt-12">
        Gerenciador de tarefas
      </h1>
      <span className="font-medium placeholder-text-dark-gray mb-7">
        Esqueça papel, anote tudo aqui.
      </span>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-8 bg-white border border-darkgray rounded-md py-8 "
      >
        <label className="text-text-dark-gray font-semibold">Email</label>
        <input
          type="email"
          className="border-0 h-9 rounded-md bg-light-gray outline-none px-2 mb-4"
          placeholder="nome@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-text-dark-gray font-semibold">Senha</label>
        <input
          type="password"
          className="border-0 h-9 rounded-md bg-light-gray outline-none px-2 mb-4"
          placeholder="*****************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-9 border-0 bg-blue rounded-md text-lg text-white font-medium cursor-pointer mt-3"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
