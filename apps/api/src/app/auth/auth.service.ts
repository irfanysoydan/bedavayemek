import { ConflictException, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '../_core/response/api-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<ApiResponse<Auth>> {
    try {
      const { firstName, lastName, email, password } = createAuthDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.authModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar: "",
      });

      return {
        data: user,
        message: 'Kayıt işlemi başarılı.',
        statusCode: 201,
        isSuccessful: true,
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          data: null,
          message: 'Bu email adresi zaten kullanılmaktadır.',
          statusCode: 409,
          isSuccessful: false,
        };
      } else {
        return {
          data: null,
          message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
          statusCode: 500,
          isSuccessful: false,
        };
      }
    }
  }

  async login(
    loginDto: LoginDto
  ): Promise<ApiResponse<{ accessToken: string }>> {
    const { email, password } = loginDto;
    const user = await this.authModel.findOne({ email, isActive: true }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userId: user._id };
      const accessToken: string = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '1d',
      });

      return {
        data: { accessToken },
        message: 'Giriş Başarılı',
        statusCode: 200,
        isSuccessful: true,
      };
    } else {
      return {
        data: null,
        message: 'Kullanıcı adı veya şifre hatalı.',
        statusCode: 401,
        isSuccessful: false,
      };
    }
  }
}
