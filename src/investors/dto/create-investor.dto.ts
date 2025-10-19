import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { InvestorType } from '../investor-type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvestorDto {
  @ApiProperty({
    description: 'Investor email address',
    example: 'investor@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Investor national identification number',
    example: '123456789',
  })
  @IsString()
  @Length(5, 20)
  nationalId: string;

  @ApiProperty({
    description: 'Type of investor within the platform',
    example: 'INVESTOR',
    enum: InvestorType,
  })
  @IsEnum(InvestorType)
  type: InvestorType;

  @ApiProperty({
    description: 'Password used to authenticate the investor',
    example: 'SecureP@ss123',
    required: false,
  })
  @IsString()
  @Length(8, 32)
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'Full name of the investor',
    example: 'Jane Doe',
  })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    description: 'Indicates if the investor account is active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Determines if the investor has administrative privileges',
    example: false,
  })
  @IsBoolean()
  isAdmin: boolean;
}