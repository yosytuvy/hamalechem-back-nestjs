import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorizationHeader = ctx.req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const user = this.jwtService.verify(token);
        ctx.user = user;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      // throw new UnauthorizedException('No token provided');
      return false;
    }
  }
}
