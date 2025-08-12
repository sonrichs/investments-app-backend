import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { Investment } from './entities/investment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
    private userService: UsersService,
    private projectsService: ProjectsService,
  ) {}

  async create(createInvestmentDto: CreateInvestmentDto) {
    const user = await this.userService.findOne(createInvestmentDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with id ${createInvestmentDto.userId} not found`,
      );
    }
    const project = await this.projectsService.findOne(
      createInvestmentDto.projectId,
    );
    if (!project) {
      throw new NotFoundException(
        `Project with id ${createInvestmentDto.projectId} not found`,
      );
    }
    const investment = this.investmentsRepository.create(createInvestmentDto);
    investment.user = user;
    investment.project = project;
    return this.investmentsRepository.save(investment);
  }

  findAll() {
    return this.investmentsRepository.find();
  }

  findOne(id: string) {
    return this.investmentsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateInvestmentDto: UpdateInvestmentDto) {
    const investment = await this.investmentsRepository.findOne({
      where: { id },
    });
    if (!investment) {
      throw new NotFoundException(`Investment with id ${id} not found`);
    }
    Object.assign(investment, updateInvestmentDto);
    return this.investmentsRepository.save(investment);
  }

  async remove(id: string) {
    const investment = await this.investmentsRepository.findOne({
      where: { id },
    });
    if (!investment) {
      throw new NotFoundException(`Investment with id ${id} not found`);
    }
    return this.investmentsRepository.remove(investment);
  }
}
