import { Expose, Transform, Type } from 'class-transformer';
import { Investment } from '../entities/investment.entity';
import { ProjectDto } from '../../projects/dto/project-dto';
import { UserDto } from '../../users/dto/user.dto';

export class InvestmentDto {
  @Expose()
  id: string;

  @Expose()
  stocksAmount: number;

  @Expose()
  investedAt: string;

  @Expose()
  exitedAt: string;

  @Expose()
  isActive: boolean;

  @Transform(({ obj }: { obj: Investment }) => obj.project?.id)
  @Expose()
  projectId: string;

  @Transform(({ obj }: { obj: Investment }) => obj.user?.id)
  @Expose()
  userId: string;

  @Expose()
  @Type(() => ProjectDto)
  project: ProjectDto;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
