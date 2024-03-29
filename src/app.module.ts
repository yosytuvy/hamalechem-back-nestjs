import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DonationsModule } from './donations/donations.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import 'dotenv/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RequestsModule } from './requests/requests.module';
import RedisModule from './dal/redis.options';
import MongoModule from './dal/mongo.options';
import PostgresModule from './dal/postgres.options';

@Module({
  imports: [
    // Setup Redis connection
    RedisModule,

    // Setup GraphQL connection
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.graphql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

      // formatError:(error) => {
      //   const graphQLFromattedError = {
      //     message:
      //       error.extensions.exception?.response?.message || error.message,
      //     code:
      //       error.extensions?.code || "SERVER_ERROR",
      //     name: error.extensions?.exception?.name || error.name,
      //   };
      //   return graphQLFromattedError;
      // },
    }),

    // Setup Mongo
    MongoModule,

    // Setup Postgres connection
    PostgresModule,

    // .env Variables connection
    ConfigModule.forRoot({ isGlobal: true }),

    // Modules
    DonationsModule,
    AuthModule,
    UsersModule,
    RequestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor() {
    this.initalData();
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  initalData() {
    console.log('hello');
  }
}
