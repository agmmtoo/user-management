import { Form, useLoaderData } from "react-router-dom";

import Button from "../global/Button";

import { User } from "../../types/User.interface";

export default function EditUser() {
  const { user } = useLoaderData() as { user: User };
  return (
    <div>
      <Form method="PATCH">
        <div className="space-y-2 w-full md:w-3/5">
          <input
            type="text"
            name="name"
            placeholder={user.name}
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder={user.email}
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
          />
          <div>
          <input
            type="checkbox"
            name="status"
            id="status"
            defaultChecked={user.status}
            className="checked:ring-4 checked:ring-green-200 checked:ring-offset-1 00 mr-4 accent-blue-800"
          />
          <label htmlFor="status">Active</label>
          </div>

          <Button type="submit" className="mx-auto block">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
