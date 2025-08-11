import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 32)
  password: string;

  @IsString()
  name: string;

  @IsBoolean()
  isAdmin: boolean;
}
