import { IsEmail, Matches } from 'class-validator'

export class SignInDto {
  @IsEmail()
  email: string;

  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {message:"password must be at least 8 characters, one upper letter, one lower letter and number"})
  password: string;
}
