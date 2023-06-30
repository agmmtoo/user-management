import { Link } from "react-router-dom";

import { useAuth } from "../contexts/auth.context";

export function Nav() {
  const auth = useAuth();
  const handleLogout = () => {
    localStorage.clear();
    auth.setUser(null);
  };

  return (
    <nav className="p-4 md:mb-12 border-b border-x-blue-950 sticky top-0 bg-gray-50/95 flex justify-between">
      <div className="text-blue-800 font-medium uppercase flex gap-4">
        <Link to="/users">Users</Link>
        <Link to="/">Logs</Link>
      </div>
      <div className="text-blue-800 font-medium cursor-pointer">
        {auth.user ? (
          <button onClick={handleLogout}>Logout ({auth.user.user.name})</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
