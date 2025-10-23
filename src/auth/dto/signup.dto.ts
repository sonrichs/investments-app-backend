import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'Email used for account registration',
    example: 'investor@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the new account',
    example: 'SecureP@ss123',
  })
  @IsString()
  @Length(8, 32)
  password: string;

  @ApiProperty({
    description: 'Full Name of the user',
    example: 'Jane Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Defines if the user has administrator privileges',
    example: false,
  })
  @IsBoolean()
  isAdmin: boolean;
}
