import { IsDate, IsNumber, IsString, MinDate, Validate } from 'class-validator';
import { EndDateAfterStartDate } from '../validators/endDateAfterStartDate';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  totalStocks: number;

  @IsNumber()
  stockPrice: number;

  @IsString()
  currency: string;

  @IsDate()
  @MinDate(new Date())
  startDate: Date;

  @IsDate()
  @Validate(EndDateAfterStartDate)
  endDate: Date;
}
