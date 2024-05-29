import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { handleDbException } from '@/shared/utils';
import * as argon from 'argon2';
import { isUUID } from 'class-validator';
import { deleteAllRows } from '@/shared/utils/deleteAllRows';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(term: string) {
    const whereClause = isUUID(term) ? { id: term } : { email: term };

    const user = await this.userRepository.findOne({
      where: whereClause,
    });

    if (!user) throw new NotFoundException(`The user was not found.`);

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await argon.hash(createUserDto.password);

      const user = this.userRepository.create({
        ...createUserDto,
        hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (err) {
      return handleDbException(err, this.logger);
    }
  }

  async deleteAllUsers() {
    return deleteAllRows(this.userRepository);
  }
}
