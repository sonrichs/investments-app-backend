import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsDate, IsNumber, IsString, MinDate } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
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
  @MinDate(new Date())
  endDate: Date;
}
