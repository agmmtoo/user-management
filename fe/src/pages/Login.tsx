import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";

import { useAuth } from "../contexts/auth.context";
import Button from "../components/global/Button";
import { authUser } from "../api/user.api";
import { useState } from "react";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<Error>();

  const from = location?.state?.from?.pathname ?? "/";

  const { user, setUser } = useAuth();

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    authUser(email, password)
      .then((response) => {
        setUser(response);
        const auth = JSON.stringify(response);
        localStorage.setItem("user", auth);
        navigate(from, { replace: true });
      })
      .catch(setError);
  };

  return (
    <>
      {error && (
        <p className="text-sm text-red-600 font-medium">{error.message}</p>
      )}
      <form className="space-y-2 w-full md:w-3/5" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="form-input"
        />
        <div className="flex gap-4 items-center">
          <Button type="submit">Login</Button>
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </div>
      </form>
    </>
  );
}

export default Login;
