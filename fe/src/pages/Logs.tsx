import { useLoaderData } from "react-router-dom";

import { Log } from "../types/Log.interface";

interface LoaderDataLogs {
  logs: Log[];
}

function Logs() {
  const data = useLoaderData() as LoaderDataLogs;
  return (
    <>
      <h1>Logs</h1>
      <ul>
        {data.logs.map((log) => (
          <li key={log.id}>
            {log.event} : {log.user.name} - {log.data}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Logs;
