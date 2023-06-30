import { LoaderFunctionArgs } from "react-router-dom";
import { getUser } from "../api/user.api";

export default async function loader(props: LoaderFunctionArgs) {
  const { request, params } = props;
  return getUser(params.userId, request.signal);
}
