export type Stack = "backend" | "frontend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";
export type Pkg =
  | "cache" | "controller" | "cron_job" | "db" | "domain" | "handler" | "repository" | "route" | "service"
  | "api"
  | "auth" | "config" | "middleware" | "utils" | "component" | "hook" | "page" | "state" | "style";

export type LogFn = (stack: Stack, level: Level, pkg: Pkg, message: string) => void;

export interface LoggerOptions {
  baseUrl?: string; // defaults to http://20.244.56.144/evaluation-service
  getToken: () => string | null;
}

/** Initialize a logger that posts to the Affordmed Test Server /logs endpoint. */
export function initLogger(opts: LoggerOptions): LogFn;