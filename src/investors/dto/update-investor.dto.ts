import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, Length } from 'class-validator';
import { CreateInvestorDto } from './create-investor.dto';

export class UpdateInvestorDto extends PartialType(CreateInvestorDto) {
  @ApiProperty({
    description: 'Updated full name of the investor',
    example: 'Jane Doe',
    required: false,
  })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    description: 'Indicates if the investor account remains active',
    example: true,
    required: false,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Indicates if the investor retains administrative rights',
    example: false,
    required: false,
  })
  @IsBoolean()
  isAdmin: boolean;
}