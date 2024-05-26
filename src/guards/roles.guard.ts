import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dtos/loginPayload.dto';
import { ROLES_KEY } from 'src/user/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Cabeçalho de autorização não encontrado');
    }

    const token = authorization.replace('Bearer ', '');

    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayload) {
      throw new UnauthorizedException('Token inválido');
    }

    request.user = loginPayload;

    const hasRole = requiredRoles.some((role) => role === loginPayload.typeUser);

    if (!hasRole) {
      throw new ForbiddenException('Você não tem a permissão necessária para acessar este recurso');
    }

    return true;
  }
}
