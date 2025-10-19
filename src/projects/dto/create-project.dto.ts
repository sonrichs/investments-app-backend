import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';
import { EndDateAfterStartDate } from '../validators/endDateAfterStartDate';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Title shown to investors',
    example: 'Green Energy Plant',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Brief summary of the project',
    example: 'Solar farm expansion to increase renewable capacity.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Total number of stocks available for the project',
    example: 1000,
  })
  @IsNumber()
  @IsPositive()
  totalStocks: number;

  @ApiProperty({
    description: 'Price of a single project stock',
    example: 50,
  })
  @IsNumber()
  @IsPositive()
  stockPrice: number;

  @ApiProperty({
    description: 'Currency in which the stocks are priced',
    example: 'USD',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Current execution phase of the project',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  phase: number;

  @ApiProperty({
    description: 'Date when the project starts accepting investments',
    example: '2024-03-01T00:00:00.000Z',
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'Date when the project completes',
    example: '2025-03-01T00:00:00.000Z',
  })
  @IsDate()
  @Validate(EndDateAfterStartDate)
  endDate: Date;
}
