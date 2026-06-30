import { Header } from "../../components/header";
import { useState, useEffect, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { FaPen, FaTrash } from "react-icons/fa";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface TaskProps {
  todoText: string;
  id: number;
}

interface TodoProps {
  id: string;
  name: string;
}

export function Todas() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [editedText, setEditedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditingId, setEditingId] = useState<number | null>();

  const [todoList, setTodoList] = useState<TodoProps[]>([]);

  useEffect(() => {
    const tasksRef = collection(db, "tasks");
    const queryRef = query(tasksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const list = [] as TodoProps[];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      setTodoList(list);
    });

    // Cancela o observer
    return () => {
      unsub();
    };
  }, []);

  function handleTodo(e: ChangeEvent) {
    e.preventDefault();

    if (inputTask.trim() === "") {
      toast.error("Por favor, insira uma tarefa!");
      return;
    } else {
      addDoc(collection(db, "tasks"), {
        name: inputTask,
        created: new Date(),
      })
        .then(() => {
          setTasks([
            ...tasks,
            {
              todoText: inputTask,
              id: Date.now(),
            },
          ]);
          toast.success("Tarefa criada com sucesso!!!");
          setInputTask("");
          console.log("Dados cadastrados com sucesso!");
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao cadastrar no banco " + error);
        });
    }
  }

  function handleDelete(id: number) {
    const newTodoList = tasks.filter((todo) => todo.id !== id);
    setTasks(newTodoList);
    return;
  }

  function handleEdit(id: number) {
    const editTask = tasks.find((task) => task.id === id);

    if (!editTask) {
      return;
    }

    setEditingId(id);
    setEditedText(editTask.todoText);
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
    setEditingId(null);
    setEditedText("");
    return;
  }

  function handleSave() {
    const updatedTasks = tasks.map((task) => {
      if (task.id === EditingId) {
        return {
          ...task,
          todoText: editedText,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    handleCancel();
    toast.success("Tarefa editada com sucesso!!!");
    return;
  }

  return (
    <div className="flex w-full flex-col items-center min-h-screen">
      <Header />

      <main className="w-full max-w-2xl mt-8 px-2">
        <form
          onSubmit={handleTodo}
          className="w-full border border-darkgray bg-white p-4 rounded-lg"
        >
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              className="w-full px-5 py-2.5 bg-light-gray rounded-lg outline-none"
              type="text"
              placeholder="O que precisa ser feito?"
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue py-2.5 px-4 rounded-md text-white hover:bg-hover-blue-button cursor-pointer"
            >
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

          {todoList.length > 0 ? (
            <div>
              {todoList.map((task) => (
                <ul key={task.id} className="flex flex-col mt-3">
                  <li className="flex items-center w-full border border-darkgray p-4 rounded-md bg-white">
                    <label className="flex items-center gap-3 w-full cursor-pointer">
                      <input type="checkbox" />
                      <span>{task.name}</span>
                    </label>
                    <span className="flex w-full justify-evenly">
                      {isModalOpen && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                          <div className="bg-white p-4 rounded w-80">
                            <input
                              className="border p-2 w-full mb-3 rounded-md bg-light-gray"
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                            />

                            <div className="flex justify-end gap-2">
                              <button
                                className="cursor-pointer bg-button-cancel p-1 rounded-md font-medium"
                                onClick={handleCancel}
                              >
                                Cancelar
                              </button>

                              <button
                                className="cursor-pointer bg-blue p-1 rounded-md font-medium"
                                onClick={handleSave}
                              >
                                Salvar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      <p
                        onClick={() => handleEdit(task.id)}
                        className="flex justify-center items-center gap-1.5 ml-38 cursor-pointer"
                      >
                        <FaPen />
                        Editar
                      </p>
                      <p
                        onClick={() => handleDelete(task.id)}
                        className="flex justify-center items-center gap-1.5 ml-6 cursor-pointer"
                      >
                        <FaTrash />
                        Excluir
                      </p>
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          ) : (
            <h1 className="flex justify-center text-2xl mt-12 font-bold text-blue italic">
              Nada aqui!!!
            </h1>
          )}
        </section>
      </main>
    </div>
  );
}
