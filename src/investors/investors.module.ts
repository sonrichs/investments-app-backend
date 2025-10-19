import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investor } from './entities/investor.entity';
import { InvestorsService } from './investors.service';
import { InvestorsController } from './investors.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Investor])],
  controllers: [InvestorsController],
  providers: [InvestorsService, JwtService],
  exports: [InvestorsService],
})
export class InvestorsModule {}