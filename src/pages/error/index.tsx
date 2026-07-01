import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="flex w-full justify-center items-center flex-col min-h-screen bg-light-gray text-button-cancel">
      <h1 className="text-4xl font-medium mb-4">Página não encontrada!</h1>
      <h2 className="italic text-3xl font-medium mb-4">404</h2>

      <Link className="bg-blue py-1 px-3 rounded-md font-medium" to={"/"}>
        Voltar
      </Link>
    </div>
  );
}
