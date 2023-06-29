import { useLoaderData } from "react-router-dom";

import { User } from "../../types/User.interface";
import { classNames } from "../../utils/classNames";
import Button from "../global/Button";
import Badge from "../global/Badge";

function UserInfo() {
  const { user } = useLoaderData() as { user: User };

  return (
    <div className="w-full border rounded-sm flex flex-col md:h-full justify-between bg-white/95 md:max-h-56">
      <div className="flex justify-between border-b items-center p-4">
        <div className="inline-flex flex-col md:space-x-2 md:flex-row">
          <span>#{user.id}</span>
          <h4>{user.name}</h4>
          <span>{user.email}</span>
        </div>

        <Badge type={user.status ? "success" : "danger"}>
          {user.status ? "ACTIVE" : "DEACTIVE"}
        </Badge>
      </div>
      <div className="flex justify-between border-t p-2 items-center">
        <time>{new Date(user.created_at).toDateString()}</time>
        <div className="inline-flex gap-2">
          <Button onClick={console.log} variant="secondary">
            Delete
          </Button>
          <Button onClick={console.log} variant="primary">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
