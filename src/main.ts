import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('🚀 server is up and runing on PORT 3000');
  console.log('🚀 GraphQL is runing on http://localhost:3000/graphql');
  console.log('🚀 REST API is runing on http://localhost:3000');
}
bootstrap();
