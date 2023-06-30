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
import NewUser from "./components/users/NewUser";
import ErrorPage from "./pages/ErrorPage";

import logsLoader from "./helpers/userlogsRouteLoader";
import usersLoader from "./helpers/usersRouteLoader";
import userLoader from "./helpers/userRouterLoader";

import usersAction from "./helpers/actions/usersRouteAction";
import userAction from "./helpers/actions/userRouteAction";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Home />} errorElement={<ErrorPage />}>
      <Route path="/" element={<AuthLayout />}>
        <Route path="users" element={<Users />} loader={usersLoader}>
          <Route path=":userId" element={<UserInfo />} loader={userLoader} action={userAction} />
          <Route path="new" element={<NewUser />} action={usersAction} />
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
