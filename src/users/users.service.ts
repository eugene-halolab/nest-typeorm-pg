import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.save(dto);
    return user;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }
}
