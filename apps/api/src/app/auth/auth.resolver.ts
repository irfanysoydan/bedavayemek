import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '../_core/response/api-response.dto';
import { Auth } from './entities/auth.entity';
import {
  ResponseAuth,
  ResponseAuthLogin,
} from '../_core/response/response-auth.type';
import { CreateAuthDto } from './dto/create-auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ResponseAuth)
  async register(
    @Args('createAuthDto') createAuthDto: CreateAuthDto
  ): Promise<ApiResponse<Auth>> {
    const auth = await this.authService.register(createAuthDto);
    return auth;
  }

  @Mutation(() => ResponseAuthLogin)
  async login(
    @Args('loginDto') loginDto: LoginDto
  ): Promise<ApiResponse<string>> {
    const auth = await this.authService.login(loginDto);
    return auth;
  }
}
