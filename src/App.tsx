import { createBrowserRouter } from "react-router-dom";
import { Todas } from "./pages/todas";
import { Pendentes } from "./pages/pendentes";
import { Concluidas } from "./pages/concluidas";
import { Login } from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todas />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/pendentes",
    element: <Pendentes />,
  },
  {
    path: "/concluidas",
    element: <Concluidas />,
  },
]);

export { router };
