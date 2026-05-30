import "./header.css";
import { FaUserCircle } from "react-icons/fa";

export function Header() {
  return (
    <header className="w-full h-16 bg-white flex items-center justify-evenly border-b border-b-darkgray">
      <h1 className="md:text-4xl text-blue text-2xl font-bold">
        Minhas Tarefas
      </h1>
      <div>
        <FaUserCircle className="w-8 h-8 " />
      </div>
    </header>
  );
}
