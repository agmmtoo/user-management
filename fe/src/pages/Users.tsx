import { Link, Outlet, useLoaderData, useMatch } from "react-router-dom";

import { ListItemUser } from "../components/users/ListItemUser";

import { UserBasic } from "../types/User.interface";
import Button from "../components/global/Button";
interface LoaderDataUsers {
  users: UserBasic[];
}

function Users() {
  const data = useLoaderData() as LoaderDataUsers;
  const match = useMatch("/users/:id");
  const isSelected = (id: number) => String(id) === match?.params?.id;

  return (
    <div className="flex gap-4 flex-col-reverse md:flex-row">
      <ul className="w-full md:w-1/3 space-y-4">
        <li>
          <Button to="new" className="block text-center">Create new user</Button>
        </li>
        {data.users.map((user) => (
          <li key={user.id}>
            <Link to={`${user.id}`}>
              <ListItemUser selected={isSelected(user.id)} user={user} />
            </Link>
          </li>
        ))}
      </ul>
      <div className="sticky top-16 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Users;
