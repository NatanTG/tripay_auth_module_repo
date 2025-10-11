import { HttpException, HttpStatus } from "@nestjs/common";

export class BucketNotFoundException extends HttpException {
  constructor(bucketName: string) {
    super(
      {
        message: `Bucket '${bucketName}' not found. Please check your bucket configuration.`,
        error: "Bucket Not Found",
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

export class BucketAccessDeniedException extends HttpException {
  constructor(operation: string) {
    super(
      {
        message: `Access denied for bucket operation: ${operation}. Please check your credentials and permissions.`,
        error: "Bucket Access Denied",
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class BucketConfigurationException extends HttpException {
  constructor(issue: string) {
    super(
      {
        message: `Bucket service configuration error: ${issue}`,
        error: "Bucket Configuration Error",
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

export class BucketOperationException extends HttpException {
  constructor(operation: string, details: string) {
    super(
      {
        message: `Failed to ${operation}: ${details}`,
        error: "Bucket Operation Failed",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class BucketConnectionException extends HttpException {
  constructor(errorCode: string, operation: string) {
    const messages = {
      EPROTO:
        "SSL/TLS handshake failed. Check Cloudflare R2 endpoint URL and SSL configuration. Verify CLOUDFLARE_R2_URL is correct and accessible.",
      ENOTFOUND:
        "Could not resolve Cloudflare R2 endpoint. Verify the R2 URL in environment variables and check network connectivity.",
      ETIMEDOUT:
        "Connection to Cloudflare R2 timed out. Check network connectivity and firewall settings.",
      ECONNREFUSED:
        "Connection refused by Cloudflare R2. Verify endpoint URL and check if the service is available.",
      ECONNRESET:
        "Connection was reset by Cloudflare R2. This may be a temporary network issue, try again later.",
    };

    const message =
      messages[errorCode as keyof typeof messages] ||
      `Network connection error (${errorCode}) occurred while trying to ${operation}. Check your network and Cloudflare R2 configuration.`;

    super(
      {
        message,
        error: "Storage Connection Error",
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
