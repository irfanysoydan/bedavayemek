import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { RecaptchaGuard } from '../_core/helpers/mail/guards/recaptcha.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto): Promise<Auth> {
    return this.authService.create(createAuthDto);
  }

  @Post('sign-in')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}
