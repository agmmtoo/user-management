import { useRouteError, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

export default function ErrorPage() {
  const error = useRouteError();
  const auth = useAuth();

  if (error) {
    // clear local storage and set user to null
    // on EVERY FREAKING ERROR
    // localStorage.clear();
    auth.setUser(null);
    return <Navigate to="login" />;
  }

  return (
    <div>
      <h1>Error Page</h1>
      <p>{error?.statusText || error?.message}</p>
    </div>
  );
}
