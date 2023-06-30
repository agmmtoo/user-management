import { create, remove } from "./base.api";

import { User } from "../types/User.interface";

export type PostBodyUser = Pick<User, "name" | "email"> & { password: string };

interface ResponseUser {
  user: Pick<User, "id" | "email" | "name" | "created_at">;
}

export async function createUser(user: PostBodyUser): Promise<ResponseUser> {
  return create<PostBodyUser>("/users", user);
}

export async function deleteUser(id: string | undefined) {
  return remove(`/users/${id}`);
}
