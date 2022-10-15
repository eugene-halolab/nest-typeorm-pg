import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) { }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersServices.createUser(userDto);
  }

  @UseGuards(JwtAuthuard)
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }
}
