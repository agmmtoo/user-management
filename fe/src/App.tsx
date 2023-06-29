import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from "./contexts/auth.context";

import Home from "./pages/Home";
import AuthLayout from "./pages/AuthLayout";
import Users from "./pages/Users";
import Logs from "./pages/Logs";
import Login from "./pages/Login";

import logLoader from "./helpers/userlogRouteLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Home />}>
      <Route path="/" element={<AuthLayout />}>
        <Route path="users" element={<Users />}>
          <Route path=":id" element={<div>user</div>} />
        </Route>
        <Route index element={<Logs />} loader={logLoader} />
      </Route>
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
