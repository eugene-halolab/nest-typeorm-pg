import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from '../users/users.entity';


@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) { }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    const hashPass = await bcrypt.hash(userDto.password, 10);

    const user = await this.userService.createUser({ ...userDto, password: hashPass });

    return this.generateToken(user);
  }

  async generateToken(user: UserEntity) {
    const payload = { email: user.email, id: user.id }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passEquals = await bcrypt.compare(userDto.password, user.password);
    if (user) {
      const passEquals = await bcrypt.compare(userDto.password, user.password);
      if (passEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: 'Email or password entered incorrectly' });
  }
}
