import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentDto } from './create-investment.dto';
import { IsBoolean, IsDate, IsNumber, IsPositive } from 'class-validator';

export class UpdateInvestmentDto extends PartialType(CreateInvestmentDto) {
  @IsNumber()
  @IsPositive()
  stocksAmount: number;

  @IsDate()
  investedAt: Date;

  @IsDate()
  exitedAt: Date;

  @IsBoolean()
  isActive: boolean;
}
