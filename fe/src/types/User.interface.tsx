export interface User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export type UserBasic = Pick<User, "id" | "name" | "email">;
