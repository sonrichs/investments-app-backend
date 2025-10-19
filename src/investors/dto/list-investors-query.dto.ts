import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class ListInvestorsQueryDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  emailPrefix?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const v = value.toLowerCase();
      if (v === 'true') return true;
      if (v === 'false') return false;
    }
    return Boolean(value);
  })
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}