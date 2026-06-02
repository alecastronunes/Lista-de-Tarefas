import { Header } from "../../components/header";

export function Todas() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Header />
      <main className="flex items-center flex-col w-full text-center mt-8">
        <form className="min-w-dvh border border-darkgray bg-white py-6 rounded-lg">
          <input
            className="w-md mx-8 pl-5 py-2.5 bg-light-gray rounded-lg outline-none"
            type="text"
            placeholder="O que precisa ser feito?"
          />
          <button className="bg-blue py-2.5 px-4 rounded-md text-white cursor-pointer hover:bg-hover-blue-button">
            Adicionar
          </button>
        </form>

        {/* Filtrar tarefas */}
        <section className="min-w-dvh h-screen">
          <div className="flex mt-5">
            <button className="pr-4 text-darkgray font-medium cursor-pointer hover:font-semibold hover:border-b border-b-blue hover:text-blue">
              Todas
            </button>

            <button className="pr-4 text-darkgray font-medium cursor-pointer hover:font-semibold hover:border-b border-b-blue hover:text-blue">
              Pendentes
            </button>

            <button className="pr-4 text-darkgray font-medium cursor-pointer hover:font-semibold hover:border-b border-b-blue hover:text-blue">
              Concluídas
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
