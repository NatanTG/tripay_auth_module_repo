import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ZodSchema } from "zod";

export interface FileFieldConfig {
  name: string;
  maxCount: number;
}

@Injectable()
export class ValidatedMultipartInterceptor implements NestInterceptor {
  private fileInterceptor: NestInterceptor;

  constructor(
    private schema: ZodSchema,
    private fileFields: FileFieldConfig[],
  ) {
    this.fileInterceptor = new (FileFieldsInterceptor(fileFields))();
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    await this.fileInterceptor.intercept(context, {
      handle: () => new Observable((subscriber) => subscriber.complete()),
    });

    const request = context.switchToHttp().getRequest();
    const body = request.body;

    const validationResult = this.schema.safeParse(body);
    if (!validationResult.success) {
      throw new BadRequestException({
        message: validationResult.error.issues,
        error: "Bad Request",
        statusCode: 400,
      });
    }

    request.body = validationResult.data;

    return next.handle();
  }
}
