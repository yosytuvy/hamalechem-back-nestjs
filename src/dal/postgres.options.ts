import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';


const PostgresModule = TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.POSTGRESQL_URI,
  entities: [User],
  synchronize: true,
});

export default PostgresModule;