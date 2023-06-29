import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="p-4 border-b border-x-blue-950 sticky top-0 bg-gray-50/95">
      <div className="text-blue-800 font-medium uppercase md:w-2/3 mx-auto flex gap-4">
        <Link to="/users">Users</Link>
        <Link to="/">Logs</Link>
      </div>
    </nav>
  );
}
