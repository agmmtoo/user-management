import { LoaderFunctionArgs } from "react-router-dom";

export default async function loader(props: LoaderFunctionArgs) {
  const { request, params } = props;

  const result = await fetch(`http://localhost:4000/v1/users/${params.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ5bWZsIiwic3ViIjoiMiIsImF1ZCI6WyJ5bWZsIl0sImV4cCI6MTY4ODYxNDgyMi4zOTQ1ODY4LCJuYmYiOjE2ODgwMTAwMjIuMzk0NTg2OCwiaWF0IjoxNjg4MDEwMDIyLjM5NDU4Nn0.Rql8osmpIpYDSZd2m_9eH3K2_9lcDLaraqoyjm9G288`,
    },
    signal: request.signal,
  });

  return result.json();
}
