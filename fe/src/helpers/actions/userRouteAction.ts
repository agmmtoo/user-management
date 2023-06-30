import { ActionFunction, redirect } from "react-router-dom";

import { deleteUser } from "../../api/user.api";

const action: ActionFunction = async (props) => {
  try {
    const method = props.request.method;
    if (method === "PATCH") {
      console.log("PATCH");
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
