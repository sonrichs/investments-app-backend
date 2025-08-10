import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateInvestmentDto {
  @IsNumber()
  @IsPositive()
  stocksAmount: number;

  @IsDate()
  @IsOptional()
  investedAt: Date;

  @IsDate()
  @IsOptional()
  exitedAt: Date;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  projectId: string;

  @IsString()
  userId: string;
}
