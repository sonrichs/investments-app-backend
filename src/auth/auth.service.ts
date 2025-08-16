import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signupDto: SignupDto) {
    const existingUser = await this.usersService.findByEmail(signupDto.email);
    if (existingUser) {
      throw new BadRequestException(
        `User with email '${signupDto.email}' already exists`,
      );
    }
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = new UserDto();
    user.email = signupDto.email;
    user.name = signupDto.name;
    user.password = hashedPassword;
    user.isActive = true; // Default value
    user.isAdmin = signupDto.isAdmin;
    const createdUser = await this.usersService.create(user);
    return createdUser;
  }

  async signIn(
    signinDto: SignInDto,
  ): Promise<{ access_token: string; expires_in?: number }> {
    const { email, password } = signinDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }
    const response = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(response),
      expires_in: this.configService.get<number>('JWT_EXPIRATION'),
    };
  }
}
