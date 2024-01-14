import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

const REDIS_PORT = 6379;
export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      ttl: 3600,
      socket: {
        host: configService.get<string>('127.0.0.1'),
        port: configService.get<number>(`${REDIS_PORT}`)!,
      },
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};

// import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { redisStore } from 'cache-manager-redis-store';
// import 'dotenv/config';

// export const RedisOptions: CacheModuleAsyncOptions = {
//   isGlobal: true,
//   imports: [ConfigModule],

//   useFactory: async (configService: ConfigService) => {
//     const store = await redisStore({
//       URL: process.env.REDIS_CONNECTION_STRING
//     });
//     return {
//       store: () => store,
//     };
//   },
//   inject: [ConfigService],
// };
