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
import UserInfo from "./components/users/UserInfo";

import logsLoader from "./helpers/userlogsRouteLoader";
import usersLoader from "./helpers/usersRouteLoader";
import userLoader from "./helpers/userRouterLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Home />}>
      <Route path="/" element={<AuthLayout />}>
        <Route path="users" element={<Users />} loader={usersLoader}>
          <Route path=":userId" element={<UserInfo />} loader={userLoader} />
        </Route>
        <Route index element={<Logs />} loader={logsLoader} />
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
