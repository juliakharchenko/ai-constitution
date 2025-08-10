export type LogDetails =
  | { buttonId: string }
  | { inputValue: string }
  | { [key: string]: unknown }; // fallback for flexible logging

export interface LogEntry {
    event: string;
    details: LogDetails;
    timestamp: string;
    session_id: string;
    user_agent?: string;
  }