import { describe, it, expect, beforeEach, vi } from "vitest";
import { ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { AdminGuard } from "./admin-guard";
import { JsonWebTokenService } from "src/infra/services/jwt/implementation/jsonwebtoken.service";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";

describe("AdminGuard", () => {
  let guard: AdminGuard;
  let jwtService: JsonWebTokenService;

  const mockJwtService = {
    verify: vi.fn(),
  };

  const createExecutionContext = (token?: string): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: token ? { authorization: `Bearer ${token}` } : {},
        }),
      }),
    }) as any;

  beforeEach(() => {
    vi.clearAllMocks();
    guard = new AdminGuard(mockJwtService as any);
  });

  it("deve lançar UnauthorizedException se o token estiver ausente", () => {
    const context = createExecutionContext();

    expect(() => guard.canActivate(context)).toThrowError(
      UnauthorizedException,
    );
  });

  it("deve lançar UnauthorizedException se o token for inválido", () => {
    const context = createExecutionContext("invalid-token");
    mockJwtService.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    expect(() => guard.canActivate(context)).toThrowError(
      UnauthorizedException,
    );
  });

  it("deve lançar ForbiddenException se o usuário não for ADMIN", () => {
    const context = createExecutionContext("valid-token");
    mockJwtService.verify.mockReturnValue({ role: "USER" });

    expect(() => guard.canActivate(context)).toThrowError(ForbiddenException);
  });

  it("deve permitir acesso se o usuário for ADMIN", () => {
    const context = createExecutionContext("valid-token");
    mockJwtService.verify.mockReturnValue({ role: "ADMIN" });

    expect(guard.canActivate(context)).toBe(true);
  });
});
