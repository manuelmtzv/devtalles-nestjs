import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as argon from 'argon2';
import { JwtPayload } from './interfaces/JwtPayload';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return {
      user,
      token: await this.generateJwtToken({ id: user.id }),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findOne(email);

    if (!(await argon.verify(user.hashedPassword, password))) {
      throw new UnauthorizedException(
        'The provided user credentials are not valid.',
      );
    }

    delete user.hashedPassword;

    return {
      user,
      token: await this.generateJwtToken({ id: user.id }),
    };
  }

  async validate(user: User) {
    return {
      message: 'Validated',
      user,
    };
  }

  private async generateJwtToken(payload: JwtPayload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
