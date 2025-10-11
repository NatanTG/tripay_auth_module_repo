import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JsonWebTokenService } from "src/infra/services/jwt/implementation/jsonwebtoken.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @Inject("JwtService")
    private readonly jwtService: JsonWebTokenService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found!");
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;

      if (!payload || payload.role !== "ADMIN") {
        throw new ForbiddenException(
          "You do not have permission to access this resource",
        );
      }

      return true;
    } catch (err) {
      if (err instanceof ForbiddenException) throw err;
      throw new UnauthorizedException("Invalid or expired token!");
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers["authorization"];
    if (!authHeader) return null;

    const [type, token] = authHeader.split(" ");
    return type === "Bearer" ? token : null;
  }
}
