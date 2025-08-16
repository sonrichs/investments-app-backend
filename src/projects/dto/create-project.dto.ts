import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  MinDate,
  Validate,
} from 'class-validator';
import { EndDateAfterStartDate } from '../validators/endDateAfterStartDate';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  totalStocks: number;

  @IsNumber()
  @IsPositive()
  stockPrice: number;

  @IsString()
  currency: string;

  @IsNumber()
  @IsPositive()
  phase: number;

  @IsDate()
  @MinDate(new Date())
  startDate: Date;

  @IsDate()
  @Validate(EndDateAfterStartDate)
  endDate: Date;
}
