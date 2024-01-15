import { MongooseModule } from '@nestjs/mongoose';

const MongoModule = MongooseModule.forRoot(process.env.MONGODB_URI, {
  connectionFactory: (connection) => {
    connection.on('connected', () => {
      console.log('connected to mongoDB! 🥳');
    });
    connection._events.connected();
    return connection;
  },
});

export default MongoModule;
