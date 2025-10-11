import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Logger } from "../../services/logger/logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();

    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;

    this.logger.debug("Request started", {
      controller: controllerName,
      handler: handlerName,
      route: `${request.method} ${request.route?.path || request.url}`,
      body: this.sanitizeRequestBody(request.body),
      query: request.query,
      params: request.params,
      headers: this.sanitizeHeaders(request.headers),
    });

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - startTime;

        this.logger.logRequest(
          request.method,
          request.originalUrl || request.url,
          response.statusCode,
          duration,
          {
            controller: controllerName,
            handler: handlerName,
            responseSize: this.getResponseSize(data),
            userAgent: request.get("User-Agent"),
          },
        );

        if (duration > 500) {
          this.logger.logPerformance(
            `${controllerName}.${handlerName}`,
            duration,
            {
              route: `${request.method} ${request.route?.path || request.url}`,
              statusCode: response.statusCode,
            },
          );
        }
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;

        this.logger.logError(error, {
          controller: controllerName,
          handler: handlerName,
          route: `${request.method} ${request.route?.path || request.url}`,
          duration: `${duration}ms`,
          statusCode: error.status || 500,
          body: this.sanitizeRequestBody(request.body),
          query: request.query,
          params: request.params,
          stack: error.stack,
        });

        return throwError(() => error);
      }),
    );
  }

  private sanitizeRequestBody(body: any): any {
    if (!body) return undefined;

    const sensitiveFields = [
      "password",
      "token",
      "secret",
      "key",
      "authorization",
    ];
    const sanitized = { ...body };

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = "[REDACTED]";
      }
    }

    return sanitized;
  }

  private sanitizeHeaders(headers: any): any {
    const sensitiveHeaders = ["authorization", "cookie", "x-api-key"];
    const sanitized = { ...headers };

    for (const header of sensitiveHeaders) {
      if (sanitized[header]) {
        sanitized[header] = "[REDACTED]";
      }
    }

    return {
      "content-type": sanitized["content-type"],
      "user-agent": sanitized["user-agent"],
      accept: sanitized["accept"],
      host: sanitized["host"],
    };
  }

  private getResponseSize(data: any): string | undefined {
    if (!data) return undefined;

    try {
      const size = JSON.stringify(data).length;
      if (size < 1024) return `${size}B`;
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`;
      return `${(size / (1024 * 1024)).toFixed(1)}MB`;
    } catch {
      return undefined;
    }
  }
}
