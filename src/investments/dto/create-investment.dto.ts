import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateInvestmentDto {
  @IsNumber()
  @IsPositive()
  stocksAmount: number;

  @IsString()
  projectId: string;

  @IsString()
  userId: string;
}
