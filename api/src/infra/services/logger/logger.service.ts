import { LoggerService } from "@nestjs/common";
import { Logger as PinoLogger, LoggerOptions } from "pino";
import * as pino from "pino";
import * as cls from "cls-hooked";
import { v4 as uuidv4 } from "uuid";
import { env } from "../../../core/env";

export interface LogContext {
  requestId?: string;
  userId?: string;
  sessionId?: string;
  method?: string;
  url?: string;
  ip?: string;
  userAgent?: string;
  [key: string]: any;
}

export class Logger implements LoggerService {
  private readonly logger: PinoLogger;
  private readonly contextNamespace = cls.createNamespace("logger-context");

  constructor(options?: LoggerOptions) {
    const developmentConfig = {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss.l",
          ignore: "pid,hostname,name",
          messageFormat: "{levelLabel} | [{requestId}] {msg}",
          customColors:
            "trace:gray,debug:cyan,info:green,warn:yellow,error:red,fatal:inverse",
          levelFirst: false,
          singleLine: false,
          hideObject: false,
          errorLikeObjectKeys: ["err", "error", "trace", "stack"],
        },
      },
    };

    const productionConfig = {
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level: (label: string) => ({ level: label }),
        log: (object: any) => {
          const { msg, ...meta } = object;
          return {
            message: msg,
            ...meta,
            timestamp: new Date().toISOString(),
            service: "api-core-tripay",
            version: process.env.npm_package_version || "1.0.0",
          };
        },
      },
      serializers: {
        req: (req: any) => ({
          method: req.method,
          url: req.url,
          headers: {
            host: req.headers.host,
            userAgent: req.headers["user-agent"],
            contentType: req.headers["content-type"],
          },
          remoteAddress: req.remoteAddress,
          remotePort: req.remotePort,
        }),
        res: (res: any) => ({
          statusCode: res.statusCode,
          headers: {
            contentType: res.headers?.["content-type"],
          },
        }),
        err: pino.stdSerializers.err,
      },
    };

    const defaultOptions: LoggerOptions = {
      level: env.LOG_LEVEL || "info",
      name: "api-core-tripay",
      ...(env.NODE_ENV === "production" ? productionConfig : developmentConfig),
    };

    this.logger = pino({ ...defaultOptions, ...options });
  }

  private getContext(): LogContext {
    return this.contextNamespace.get("context") || {};
  }

  private enrichLogData(data: any = {}): any {
    const context = this.getContext();
    return {
      ...context,
      ...data,
      requestId: context.requestId || data.requestId,
      timestamp: new Date().toISOString(),
    };
  }

  setContext(context: LogContext): void {
    this.contextNamespace.set("context", { ...this.getContext(), ...context });
  }

  generateRequestId(): string {
    return `req_${uuidv4()}`;
  }

  log(message: string, context?: string | LogContext) {
    const logData =
      typeof context === "string"
        ? { context, ...this.enrichLogData() }
        : this.enrichLogData(context);

    this.logger.info(logData, message);
  }

  error(message: string, trace?: string, context?: string | LogContext) {
    const logData =
      typeof context === "string"
        ? { context, trace, ...this.enrichLogData() }
        : this.enrichLogData({ trace, ...context });

    this.logger.error(logData, message);
  }

  warn(message: string, context?: string | LogContext) {
    const logData =
      typeof context === "string"
        ? { context, ...this.enrichLogData() }
        : this.enrichLogData(context);

    this.logger.warn(logData, message);
  }

  debug(message: string, context?: string | LogContext) {
    const logData =
      typeof context === "string"
        ? { context, ...this.enrichLogData() }
        : this.enrichLogData(context);

    this.logger.debug(logData, message);
  }

  verbose(message: string, context?: string | LogContext) {
    const logData =
      typeof context === "string"
        ? { context, ...this.enrichLogData() }
        : this.enrichLogData(context);

    this.logger.trace(logData, message);
  }

  fatal(message: string, context?: string | LogContext) {
    const logData =
      typeof context === "string"
        ? { context, ...this.enrichLogData() }
        : this.enrichLogData(context);

    this.logger.fatal(logData, message);
  }

  child(bindings: Record<string, any>) {
    return this.logger.child(this.enrichLogData(bindings));
  }

  logWithMetadata(
    level: string,
    message: string,
    metadata: Record<string, any>,
  ) {
    const enrichedMetadata = this.enrichLogData({
      ...metadata,
      emoji: this.getContextEmoji(metadata),
    });

    this.logger[level](enrichedMetadata, message);
  }

  logRequest(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    metadata: any = {},
  ) {
    const logData = this.enrichLogData({
      method,
      url,
      statusCode,
      duration: `${duration}ms`,
      type: "http_request",
      ...metadata,
    });

    const emoji = this.getContextEmoji({ method, statusCode });

    if (statusCode >= 400) {
      this.logger.error(
        logData,
        `${emoji} ${method} ${url} - ${statusCode} (${duration}ms)`,
      );
    } else {
      this.logger.info(
        logData,
        `${emoji} ${method} ${url} - ${statusCode} (${duration}ms)`,
      );
    }
  }

  logError(error: Error, context: any = {}) {
    const logData = this.enrichLogData({
      ...context,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      type: "error",
    });

    const emoji = this.getContextEmoji({
      type: "error",
      statusCode: context.statusCode,
    });
    this.logger.error(logData, `${emoji} Error: ${error.message}`);
  }

  logPerformance(operation: string, duration: number, metadata: any = {}) {
    const logData = this.enrichLogData({
      operation,
      duration: `${duration}ms`,
      type: "performance",
      ...metadata,
    });

    const emoji = this.getContextEmoji({ type: "performance" });

    if (duration > 1000) {
      this.logger.warn(
        logData,
        `${emoji} Slow operation: ${operation} took ${duration}ms`,
      );
    } else {
      this.logger.debug(
        logData,
        `${emoji} Operation: ${operation} completed in ${duration}ms`,
      );
    }
  }

  private getContextEmoji(metadata: any): string {
    if (metadata.method) {
      const emojiMap: Record<string, string> = {
        GET: "📥",
        POST: "📤",
        PUT: "🔄",
        PATCH: "🛠️",
        DELETE: "🗑️",
        OPTIONS: "🔍",
        HEAD: "👁️",
      };
      return emojiMap[metadata.method] || "🌐";
    }

    if (metadata.statusCode) {
      if (metadata.statusCode >= 500) return "💥";
      if (metadata.statusCode >= 400) return "⚠️";
      if (metadata.statusCode >= 300) return "↗️";
      if (metadata.statusCode >= 200) return "✅";
    }

    if (metadata.type) {
      const typeEmojiMap: Record<string, string> = {
        error: "❌",
        performance: "⚡",
        database: "🗄️",
        auth: "🔐",
        validation: "✏️",
        cache: "💾",
      };
      return typeEmojiMap[metadata.type] || "📋";
    }

    return "📋";
  }

  runWithContext<T>(context: LogContext, fn: () => T): T {
    return this.contextNamespace.runAndReturn(() => {
      this.setContext(context);
      return fn();
    });
  }
}
