import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <Link to="/">Users</Link>
      <Link to="logs">Logs</Link>
    </nav>
  );
}
