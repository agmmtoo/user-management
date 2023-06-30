import { get, create, remove, update } from "./base.api";

import { User, UserBasic } from "../types/User.interface";

export async function getUser(
  id: string | undefined,
  signal?: AbortSignal
): Promise<{ user: User }> {
  return get(`/users/${id}`, signal);
}

export async function getUserList(
  signal: AbortSignal
): Promise<{ users: UserBasic[] }> {
  return get("/users", signal);
}

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

export type PatchBodyUser = Partial<
  Pick<User, "name" | "email"> & { password: string; status: boolean }
>;

export async function updateUser(
  id: string | undefined,
  user: PatchBodyUser
): Promise<{ user: User }> {
  return update<PatchBodyUser>(`/users/${id}`, user);
}

export async function authUser(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  return create<{ email: string; password: string }>("/tokens/authentication", {
    email,
    password,
  });
}
