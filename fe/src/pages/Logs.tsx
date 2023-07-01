import { Link, useLoaderData } from "react-router-dom";

import { Log } from "../types/Log.interface";
import Badge from "../components/global/Badge";

interface LoaderDataLogs {
  logs: Log[];
}

function Logs() {
  const data = useLoaderData() as LoaderDataLogs;
  return (
    <div className="overflow-x-scroll p-2 md:overflow-auto max-w-full text-sm">
      <table className="table-auto relative text-left">
        <thead className="">
          <Tr>
            <Th>Id</Th>
            <Th>Date</Th>
            <Th>Event</Th>
            <Th>User</Th>
            <Th>Data</Th>
          </Tr>
        </thead>
        <tbody className="overflow-scroll max-w-full">
          {data.logs.map((log) => (
            <Tr key={log.id} className="odd:bg-white even:bg-slate-100">
              <Td>{log.id}</Td>
              <Td>
                <span className="text-xs text-slate-600 font-medium whitespace-nowrap">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </Td>
              <Td>
                <Badge
                  type={
                    log.event === "create"
                      ? "success"
                      : log.event === "update"
                      ? "warning"
                      : "danger"
                  }
                  className="text-xs uppercase font-medium shadow"
                >
                  {log.event}
                </Badge>
              </Td>
              <Td>
                <Link to={`users/${log.user.id}`} className="underline underline-offset-2 font-medium text-blue-900">{log.user.email}</Link>
              </Td>
              <Td>
                <pre>{log.data}</pre>
              </Td>
            </Tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tr({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tr className={"" + " " + className}>{children}</tr>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-2 py-4 sticky top-0">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-2 py-4 border-x">{children}</td>;
}

export default Logs;
