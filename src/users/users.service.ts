import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, FindManyOptions, ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUsersQueryDto } from './dto/list-users.query';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        `User with email '${createUserDto.email}' already exists`,
      );
    }
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll(query?: ListUsersQueryDto) {
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

    return this.userRepository.find(options);
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return await this.userRepository.remove(user);
  }
}
