const user = JSON.parse(localStorage.getItem("token") || "{}")
const token = user.token

export async function create<T> (url: string, data: T) {
    const response = await fetch(`http://localhost:4000/v1${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    return response.json();
}