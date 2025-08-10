import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 32)
  @IsOptional()
  password: string;

  @IsString()
  @Length(2, 100)
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isAdmin: boolean;
}
