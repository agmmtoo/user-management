import { LoaderFunctionArgs } from "react-router-dom";
import { getUserLogList } from "../api/userlog.api";

export default async function loader(props: LoaderFunctionArgs) {
  const request = props.request;

  return getUserLogList(request.signal);
}
