const BASE_URL = "/v1";

export async function get(url: string, signal?: AbortSignal) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    signal,
  });
  return response.json();
}

export async function create<T>(url: string, data: T) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function remove(url: string) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
}

export async function update<T>(url: string, data: T) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
