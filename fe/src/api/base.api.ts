const user = JSON.parse(localStorage.getItem("user") || "{}")
const token = user.token

const BASE_URL = "http://localhost:4000/v1";
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
}

export async function create<T>(url: string, data: T) {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function remove(url: string) {
    return await fetch(`${BASE_URL}${url}`, {
        method: "DELETE",
        headers,
    });
}

export async function update<T>(url: string, data: T) {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
    });
    return response.json();
}
