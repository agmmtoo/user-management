import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/auth.context";

function Login() {
  const location = useLocation();

  const from = location?.state?.from?.pathname ?? "/";

  const { user, setUser } = useAuth();

  if (user) {
    return <Navigate to={from} replace />;
  }

  const demo = { token: "t", user: "userobj" };

  return (
    <>
      <form>
        <input type="text" placeholder="Username"  className="form-input" />
        <input type="password" placeholder="Password"  className="form-input" />
        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => {
          localStorage.setItem("user", JSON.stringify(demo));
          setUser(demo);
        }}
      >
        Login as demo
      </button>
    </>
  );
}

export default Login;
