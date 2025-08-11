import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signinDto: SignInDto) {
    return this.authService.signIn(signinDto);
  }
}
