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
        selected ? "bg-blue-00 border-l-2 border-blue-700 text-blue-800 bg-blue-50 shadow-sm" : "bg-none",
        "px-2 rounded-sm"
      )}
    >
      <div className="text-lg">{user.name}</div>
      <div className="text-xs font-medium text-gray-600">{user.email}</div>
    </div>
  );
}
