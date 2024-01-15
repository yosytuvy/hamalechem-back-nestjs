import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GraphQlInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const itemId = ctx.req.body.variables.id;

    const key = this.reflector.get('graphQLCecheKey', context.getHandler());

    const cached = await this.cacheManager.get(`${key}:${itemId}`);
    if (cached) {
      return of(cached);
    }
    return next.handle().pipe(
      tap((response) => {
        this.cacheManager.set(`${key}:${itemId}`, response);
      }),
    );
  }
}
