import {
  Controller,
  Get,
  Query,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { InvestorDto } from './dto/investor.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { ListInvestorsQueryDto } from './dto/list-investors-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('investors')
@Serialize(InvestorDto)
@UseGuards(AuthGuard)
export class InvestorsController {
  constructor(private readonly investorsService: InvestorsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createInvestorDto: CreateInvestorDto) {
    return this.investorsService.create(createInvestorDto);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: ListInvestorsQueryDto,
  ) {
    return this.investorsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvestorDto: UpdateInvestorDto,
  ) {
    return this.investorsService.update(id, updateInvestorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorsService.remove(id);
  }
}