import { Form } from "react-router-dom";
import Button from "../global/Button";

export default function NewUser() {
  return (
    <Form
      method="POST"
      className="p-2 space-y-2 w-full md:w-3/5 sticky top-16 bg-slate-50/90"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="form-input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="form-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="form-input"
      />
      <Button type="submit">Create</Button>
    </Form>
  );
}
