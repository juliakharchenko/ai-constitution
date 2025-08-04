export interface LogEntry {
    event: string;
    details: any;
    timestamp: string;
    session_id: string;
    user_agent?: string;
  }