import { UserBasic } from "./User.interface";

export type LogEvent = "delete" | "update" | "create";

export interface Log {
  id: number;
  event: LogEvent;
  createAt: string;
  data: string;
  user: UserBasic;
}
