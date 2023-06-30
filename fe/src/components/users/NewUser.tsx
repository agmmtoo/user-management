import { Form } from "react-router-dom"

export default function NewUser() {
    return (
        <div>
            <h1>New User</h1>
            <Form method="POST">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Create</button>
            </Form>
        </div>
    )
}