import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) throw new ForbiddenException('Credentials incorrect');
    const pwMatches = await argon.verify(user.password, pass);

    if (!pwMatches) throw new UnauthorizedException('Credentials incorrect');
    const payload = { sub: user.id, userType: user.userType };

    return {
      access_token: await this.jwtService.signAsync(payload),
      userDetails: {
        id: user.id,
        fullName: user.fullName,
        userType: user.userType,
      },
    };
  }

  async signUp(signUpDto: SignupDto) {
    signUpDto.password = await argon.hash(signUpDto.password);
    return this.usersService.createUser(signUpDto);
  }
}
