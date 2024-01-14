import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async createUser(user: SignupDto) {
    const isUserExist = await this.findOne(user.email);
    if(isUserExist) throw new ConflictException("User Already exist")
    await this.usersRepository.save(user);
    return 'user created!';
  }
}
