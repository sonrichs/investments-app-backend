import { Expose, Type } from 'class-transformer';
import { InvestmentDto } from '../../investments/dto/investment-dto';

export class ProjectDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  totalStocks: number;

  @Expose()
  stockPrice: number;

  @Expose()
  currency: string;

  @Expose()
  phase: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  @Type(() => InvestmentDto)
  investments: InvestmentDto[];
}
