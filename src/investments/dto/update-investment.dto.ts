import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentDto } from './create-investment.dto';
import { IsBoolean, IsDate, IsNumber, IsPositive } from 'class-validator';

export class UpdateInvestmentDto extends PartialType(CreateInvestmentDto) {
  @ApiProperty({
    description: 'Updated number of stocks the user holds',
    example: 15,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  stocksAmount: number;

  @ApiProperty({
    description: 'Timestamp when the investment was made',
    example: '2024-01-15T12:00:00.000Z',
    required: false,
  })
  @IsDate()
  investedAt: Date;

  @ApiProperty({
    description: 'Timestamp when the investor exited the project',
    example: '2024-06-01T09:30:00.000Z',
    required: false,
  })
  @IsDate()
  exitedAt: Date;

  @ApiProperty({
    description: 'Indicates if the investment is currently active',
    example: true,
    required: false,
  })
  @IsBoolean()
  isActive: boolean;
}
