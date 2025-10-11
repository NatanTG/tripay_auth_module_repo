import { Logger } from "@nestjs/common";
import { env } from "src/core/env";
import {
  BucketAccessDeniedException,
  BucketConfigurationException,
  BucketConnectionException,
  BucketNotFoundException,
  BucketOperationException,
} from "./bucket.exceptions";

export class BucketErrorHandler {
  static handle(error: any, operation: string, logger: Logger): never {
    this.logBucketError(error, operation, logger);

    const networkException = this.mapNetworkError(error, operation);
    if (networkException) throw networkException;

    const s3Exception = this.mapS3Error(error, operation);
    if (s3Exception) throw s3Exception;

    throw new BucketOperationException(
      operation,
      error.message || "Unknown error",
    );
  }

  private static logBucketError(
    error: any,
    operation: string,
    logger: Logger,
  ): void {
    logger.error(`Bucket operation failed (${operation}):`, error);
  }

  private static extractErrorCode(error: any): string | undefined {
    return error?.Code || error?.name || error?.code;
  }

  private static mapNetworkError(
    error: any,
    operation: string,
  ): BucketConnectionException | null {
    const networkErrorCodes = [
      "EPROTO",
      "ENOTFOUND",
      "ETIMEDOUT",
      "ECONNREFUSED",
      "ECONNRESET",
    ];

    if (error?.code && networkErrorCodes.includes(error.code)) {
      return new BucketConnectionException(error.code, operation);
    }

    return null;
  }

  private static mapS3Error(
    error: any,
    operation: string,
  ):
    | BucketNotFoundException
    | BucketAccessDeniedException
    | BucketConfigurationException
    | null {
    const errorCode = this.extractErrorCode(error);
    const errorMessage = error?.message || "Unknown error";

    switch (errorCode) {
      case "NoSuchBucket":
        return new BucketNotFoundException(env.CLOUDFLARE_R2_BUCKET_NAME);

      case "AccessDenied":
      case "InvalidAccessKeyId":
      case "SignatureDoesNotMatch":
        return new BucketAccessDeniedException(operation);

      case "InvalidBucketName":
      case "BucketAlreadyExists":
        return new BucketConfigurationException(errorMessage);

      default:
        return null;
    }
  }
}
