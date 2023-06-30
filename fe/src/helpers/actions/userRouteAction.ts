import { ActionFunction, redirect } from "react-router-dom";

import { PatchBodyUser, deleteUser, updateUser } from "../../api/user.api";

const action: ActionFunction = async (props) => {
  try {
    const method = props.request.method;
    if (method === "PATCH") {
      const formData = await props.request.formData();
      const name = formData.get("name")?.toString();
      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();
      const status = formData.get("status") === "on";

      const body: PatchBodyUser = { status };
      if (name && name.length > 0) body.name = name;
      if (email && email.length > 0) body.email = email;
      if (password && password.length > 0) body.password = password;

      const { user } = await updateUser(props.params?.userId, body);
      return redirect(`/users/${user.id}`);

      return redirect("..");
    } else if (method === "DELETE") {
      await deleteUser(props.params?.userId);
      return redirect(`/users`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default action;
