import { Form, useLoaderData } from "react-router-dom"

import { User } from "../../types/User.interface";



export default function EditUser() {
    const { user } = useLoaderData() as { user: User };
    return (
        <div>
            <h1>Edit {user.name}</h1>
            <Form method="PATCH">
                <input type="text" name="name" placeholder={user.name} />
                <input type="email" name="email" placeholder={user.email} />
                <input type="password" name="password" placeholder="Password" />
                <input type="checkbox" name="status" defaultChecked={user.status} />

                <button type="submit">Create</button>
            </Form>
        </div>
    )
}