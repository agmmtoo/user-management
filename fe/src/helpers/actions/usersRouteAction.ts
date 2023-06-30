import { ActionFunction, redirect } from "react-router-dom";

import { createUser, PostBodyUser } from "../../api/user.api";

const action: ActionFunction = async (props) => {
  const formData = await props.request.formData();

  const body: PostBodyUser = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { user } = await createUser(body);
  return redirect(`/users/${user.id}`);
};

export default action;
