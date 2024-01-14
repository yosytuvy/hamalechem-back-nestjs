import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationsModule } from './donations/donations.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import 'dotenv/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { User } from './users/user.entity';
import { RedisOptions } from './configs/redis.options';

@Module({
  imports: [
    // Setup Redis connection
    CacheModule.registerAsync(RedisOptions),

    // Setup GraphQL connection
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.graphql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    // .env Variables connection
    ConfigModule.forRoot({ isGlobal: true }),

    // Setup Mongo
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('connected to mongoDB! 🥳');
        });
        connection._events.connected();
        return connection;
      },
    }),

    // Setup Postgres connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRESQL_CONNECTION_STRING,
      entities: [User],
      synchronize: true,
    }),

    // Modules
    DonationsModule,
    AuthModule,
    UsersModule,
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
