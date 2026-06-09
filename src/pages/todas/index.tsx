import { Header } from "../../components/header";

export function Todas() {
  return (
    <div className="flex w-full flex-col items-center min-h-screen">
      <Header />

      <main className="w-full max-w-2xl mt-8 px-2">
        <form className="w-full border border-darkgray bg-white p-4 rounded-lg">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              className="w-full px-5 py-2.5 bg-light-gray rounded-lg outline-none"
              type="text"
              placeholder="O que precisa ser feito?"
            />

            <button className="bg-blue py-2.5 px-4 rounded-md text-white hover:bg-hover-blue-button cursor-pointer">
              Adicionar
            </button>
          </div>
        </form>

        <section className="w-full">
          <div className="flex gap-4 mt-5 border-b border-b-darkgray pb-2 overflow-x-auto">
            <button>Todas</button>
            <button>Pendentes</button>
            <button>Concluídas</button>
          </div>

          <ul className="flex flex-col mt-3">
            <li className="flex items-center w-full border border-darkgray p-4 rounded-md bg-white">
              <label className="flex items-center gap-3 w-full cursor-pointer">
                <input type="checkbox" />
                <span>Estudar React JS</span>
              </label>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
