import { get } from "./base.api";

import { Log } from "../types/Log.interface";

export async function getUserLogList(
    signal: AbortSignal
  ): Promise<{ logs: Log[] }> {
    return get("/userlogs", signal);
  }