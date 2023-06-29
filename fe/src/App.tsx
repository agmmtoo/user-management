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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Home />}>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Users />} />
        <Route path="logs" element={<Logs />} />
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
