import { createBrowserRouter } from "react-router-dom";
import { Todas } from "./pages/todas";
import { Pendentes } from "./pages/pendentes";
import { Concluidas } from "./pages/concluidas";
import { Login } from "./pages/login";
import { Private } from "./routes/private";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Private>
        <Todas />
      </Private>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/pendentes",
    element: (
      <Private>
        <Pendentes />
      </Private>
    ),
  },
  {
    path: "/concluidas",
    element: (
      <Private>
        <Concluidas />
      </Private>
    ),
  },
]);

export { router };
