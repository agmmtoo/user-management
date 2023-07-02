import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";

import { useAuth } from "../contexts/auth.context";
import Button from "../components/global/Button";
import { createUser } from "../api/user.api";
import { useState } from "react";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const from = location?.state?.from?.pathname ?? "/";

  const { user } = useAuth();

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    createUser({ name, email, password })
      .then(() => {
        navigate("/login");
      })
      .catch(setError);
  };

  return (
    <>
      {error && (
        <p className="text-sm text-red-600 font-medium">{error.message}</p>
      )}
      <form className="space-y-2 w-full md:w-3/5" onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="form-input"
        />
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
          <Button type="submit">Signup</Button>
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </>
  );
}

export default Signup;
