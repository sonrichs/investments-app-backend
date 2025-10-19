import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';
import { EndDateAfterStartDate } from '../validators/endDateAfterStartDate';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    description: 'Updated project title',
    example: 'Green Energy Plant Phase II',
    required: false,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Updated project description',
    example: 'Extended solar farm rollout with additional capacity.',
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Adjusted total number of stocks',
    example: 1200,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  totalStocks: number;

  @ApiProperty({
    description: 'Adjusted price per stock',
    example: 55,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  stockPrice: number;

  @ApiProperty({
    description: 'Currency for the updated stock price',
    example: 'USD',
    required: false,
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Updated project start date',
    example: '2024-04-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'Updated project end date',
    example: '2025-04-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @Validate(EndDateAfterStartDate)
  endDate: Date;
}
