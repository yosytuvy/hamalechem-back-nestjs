import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Roles = {
  ADMIN: 'admin',
  CONTRIBUTOR: 'contributor',
  SOLIDER: 'solider',
};

export class RoleGuard implements CanActivate {
  public role: string;

  constructor(role: string) {
    this.role = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { userType } = ctx.user;
    if (userType === this.role) return true;
    return false;
  }
}
