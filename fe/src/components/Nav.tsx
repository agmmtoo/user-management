import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <Link to="/users">Users</Link>
      <Link to="/">Logs</Link>
    </nav>
  );
}
