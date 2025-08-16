import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { Investment } from './entities/investment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Investment]),
    UsersModule,
    ProjectsModule,
  ],
  controllers: [InvestmentsController],
  providers: [InvestmentsService, JwtService],
})
export class InvestmentsModule {}
