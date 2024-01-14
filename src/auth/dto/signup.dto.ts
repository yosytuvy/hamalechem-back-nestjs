import { IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';

enum UserType {
  SOLDIER = 'solider',
  CONTRIBUTOR = 'contributor',
}

export class SignupDto {
  @IsEmail()
  email: string;

  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {message:"password must be at least 8 characters, one upper letter, one lower letter and number"})
  password: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  fullName: string;

  @IsEnum(UserType)
  userType: UserType;
}
