import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { Investor } from './entities/investor.entity';
import { DataSource, FindManyOptions, ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListInvestorsQueryDto } from './dto/list-investors-query.dto';

@Injectable()
export class InvestorsService {
  constructor(
    @InjectRepository(Investor) private investorRepository: Repository<Investor>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createInvestorDto: CreateInvestorDto) {
    const existingInvestor = await this.investorRepository.findOneBy({
      email: createInvestorDto.email,
    });
    if (existingInvestor) {
      throw new BadRequestException(
        `Investor with email '${createInvestorDto.email}' already exists`,
      );
    }
    const newInvestor = this.investorRepository.create(createInvestorDto);
    return this.investorRepository.save(newInvestor);
  }

  findAll(query?: ListInvestorsQueryDto) {
    const where: Record<string, any> = {};
    if (query?.emailPrefix || query?.email) {
      const pattern = query.emailPrefix
        ? `${query.emailPrefix}%`
        : `%${query.email}%`;
      const isPostgres = this.dataSource.options.type === 'postgres';
      where.email = isPostgres ? ILike(pattern) : Like(pattern);
    }
    if (query?.isActive) {
      where.isActive = query.isActive;
    }

    const hasPagination =
      query?.page !== undefined || query?.limit !== undefined;
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 20;

    const options: FindManyOptions = { where };
    if (hasPagination) {
      options.skip = (page - 1) * limit;
      options.take = limit;
    }

    return this.investorRepository.find(options);
  }

  findOne(id: string) {
    return this.investorRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.investorRepository.findOneBy({ email });
  }

  async update(id: string, updateInvestorDto: UpdateInvestorDto) {
    const investor = await this.investorRepository.findOneBy({ id });
    if (!investor) {
      throw new NotFoundException(`Investor with id ${id} not found`);
    }
    const updatedInvestor = Object.assign(investor, updateInvestorDto);
    return await this.investorRepository.save(updatedInvestor);
  }

  async remove(id: string) {
    const investor = await this.investorRepository.findOneBy({ id });
    if (!investor) {
      throw new NotFoundException(`Investor with id ${id} not found`);
    }
    return await this.investorRepository.remove(investor);
  }
}