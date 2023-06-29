import { Link, Outlet } from "react-router-dom";

function Users() {
  return (
    <div>
      <ul>
        <li>
          <Link to="2">User 2</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Users;
