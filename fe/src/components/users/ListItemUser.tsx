import { UserBasic } from "../../types/User.interface";

import { classNames } from "../../utils/classNames";

interface params {
  user: UserBasic;
  selected: boolean;
}

export function ListItemUser({ user, selected }: params) {
  return (
    <div
      className={classNames(
        selected
          ? "bg-blue-00 border-l-2 border-blue-700 text-blue-800 bg-blue-50 shadow-sm"
          : "bg-none",
        "px-2 rounded-sm"
      )}
    >
      <div className="text-lg">{user.name}</div>
      <div className="flex justify-between text-xs font-medium text-gray-600">
        <div className="">{user.email}</div>
        <i>#{String(user.id).padStart(3, "0")}</i>
      </div>
    </div>
  );
}
