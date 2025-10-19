import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateInvestmentDto {
  @ApiProperty({
    description: 'Number of stocks the user is purchasing',
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  stocksAmount: number;

  @ApiProperty({
    description: 'Identifier of the project receiving the investment',
    example: 'proj_123',
  })
  @IsString()
  projectId: string;

  @ApiProperty({
    description: 'Identifier of the investor',
    example: 'user_456',
  })
  @IsString()
  userId: string;
}
