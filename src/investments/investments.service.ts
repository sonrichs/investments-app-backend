import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { Investment } from './entities/investment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
  ) {}

  create(createInvestmentDto: CreateInvestmentDto) {
    const investment = this.investmentsRepository.create(createInvestmentDto);
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
