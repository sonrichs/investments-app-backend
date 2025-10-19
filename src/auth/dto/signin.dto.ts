import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email associated with the account',
    example: 'investor@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password used to access the account',
    example: 'SecureP@ss123',
  })
  @IsString()
  password: string;
}
