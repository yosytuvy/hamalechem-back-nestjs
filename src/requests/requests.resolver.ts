import { RequestsService } from './requests.service';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { GraphQlInterceptor } from 'src/common/interceptors/graphQL.interceptor';
import { GraphQlCecheKey } from 'src/common/decorators/graphQLCecheKey.decorator';
import { GraphQLError } from 'graphql';
import { Request } from './models/request.model';

@Resolver((of) => Request)
export class RequestsResolver {
  constructor(private requestsService: RequestsService) {}

  @Query((returns) => [Request])
  @UseInterceptors(CacheInterceptor)
  @CacheKey('requests')
  async requests() {
    return this.requestsService.findAll();
  }

  @Query((returns) => Request)
  @UseInterceptors(GraphQlInterceptor)
  @GraphQlCecheKey('request')
  async request(@Args('_id', { type: () => ID }) _id: string) {
    try {
      const request = await this.requestsService.findOne(_id);
      return request;
    } catch (error) {
      throw new GraphQLError(error.response.message, {
        extensions: {
          code: error.response.statusCode,
        },
      });
    }
  }
}
