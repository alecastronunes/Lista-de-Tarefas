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
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface TodoProps {
  id: string;
  name: string;
}

export function Todas() {
  const [inputTask, setInputTask] = useState("");
  const [editedText, setEditedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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
      toast.warn("Por favor, insira uma tarefa!");
      return;
    }

    addDoc(collection(db, "tasks"), {
      name: inputTask.trim(),
      created: new Date(),
    })
      .then(() => {
        toast.success("Tarefa criada com sucesso!!!");
        setInputTask("");
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao cadastrar no banco " + error);
      });
  }

  async function handleDelete(id: string) {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
    toast.success("Tarefa excluída com sucesso!!!");
  }

  function handleEdit(task: TodoProps) {
    setEditingId(task.id);
    setEditedText(task.name);
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
    setEditingId(null);
    setEditedText("");
  }

  async function handleSave(id: string) {
    if (editedText.trim() === "") {
      toast.warn("O texto da tarefa não pode ficar vazio!");
      return;
    }

    const docRef = doc(db, "tasks", id);

    try {
      await updateDoc(docRef, { name: editedText.trim() });
      handleCancel();
      toast.success("Tarefa editada com sucesso!!!");
    } catch (error) {
      console.error("Erro ao atualizar a tarefa: " + error);
      toast.error("Não foi possível editar a tarefa.");
    }
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
                  <li className="flex flex-col gap-3 w-full border border-darkgray p-4 rounded-md bg-white sm:flex-row sm:items-center">
                    <label className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer">
                      <input type="checkbox" className="mt-1 shrink-0" />
                      <span className="break-words whitespace-normal">
                        {task.name}
                      </span>
                    </label>

                    <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto sm:ml-4">
                      {isModalOpen && editingId === task.id && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                          <div className="bg-white p-4 rounded w-[90%] max-w-80">
                            <input
                              className="border p-2 w-full mb-3 rounded-md bg-light-gray"
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                            />

                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                className="cursor-pointer bg-button-cancel p-1 rounded-md font-medium"
                                onClick={handleCancel}
                              >
                                Cancelar
                              </button>

                              <button
                                type="button"
                                className="cursor-pointer bg-blue p-1 rounded-md font-medium"
                                onClick={() => handleSave(task.id)}
                              >
                                Salvar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleEdit(task)}
                        className="flex items-center gap-1.5 text-sm cursor-pointer"
                      >
                        <FaPen />
                        <span>Editar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(task.id)}
                        className="flex items-center gap-1.5 text-sm cursor-pointer"
                      >
                        <FaTrash />
                        <span>Excluir</span>
                      </button>
                    </div>
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
