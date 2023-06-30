import { UserBasic } from "./User.interface";

export type LogEvent = "delete" | "update" | "create";

export interface Log {
  id: number;
  event: LogEvent;
  created_at: string;
  data: string;
  user: UserBasic;
}
