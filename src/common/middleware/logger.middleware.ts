import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Filter the ApolloServer connections requests
    if (req.body.operationName !== 'IntrospectionQuery') {
      console.log('----------------------------------------------');

      // Request logging
      console.log(`${req.method} ${req.originalUrl}`);

      // Log headers
      console.log('Headers:', req.headers);

      // Log request body
      console.log('Body:', req.body);

      // Log timestamp
      console.log('Timestamp:', new Date().toISOString());

      next();

      res.on('finish', () => {
        // Response logging
        console.log(`Status: ${res.statusCode}`);
        console.log('----------------------------------------------');
      });
    } else {
      next();
    }
  }
}
