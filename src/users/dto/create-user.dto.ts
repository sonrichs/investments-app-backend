import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserType } from '../user-type';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 20)
  nationalId: string;

  @IsEnum(UserType)
  type: UserType;

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
