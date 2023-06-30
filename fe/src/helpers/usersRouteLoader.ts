import { LoaderFunctionArgs } from "react-router-dom";
import { getUserList } from "../api/user.api";

export default async function loader(props: LoaderFunctionArgs) {
  try {
    return getUserList(props.request.signal);
  } catch (error) {
    console.log('sshhh')
  }
}
