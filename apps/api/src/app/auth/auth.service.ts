import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '../_core/response/api-response.dto';
import * as fs from 'fs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService
  ) {}

  async register(createAuthDto: CreateAuthDto): Promise<ApiResponse<Auth>> {
    try {
      const { firstName, lastName, username, email, password } = createAuthDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const avatar =
        'data:image/png;base64,' +
        (
          await fs.promises.readFile('./apps/api/src/assets/avatar.png')
        ).toString('base64');
      const user = await this.authModel.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });
      await this.authModel.findOneAndUpdate(
        { _id: user._id },
        { avatar: avatar }
      );

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

  async login(loginDto: LoginDto): Promise<ApiResponse<string>> {
    const { email, password } = loginDto;
    const user = await this.authModel.findOne({ email, isActive: true }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userId: user._id };
      const accessToken: string = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '1d',
      });

      return {
        data: accessToken,
        message: 'Giriş Başarılı',
        statusCode: 200,
        isSuccessful: true,
      };
    } else {
      return {
        data: '',
        message: 'Kullanıcı adı veya şifre hatalı.',
        statusCode: 401,
        isSuccessful: false,
      };
    }
  }

  async getAuth(auth: Auth): Promise<ApiResponse<Auth>> {
    console.log(auth);
    const user = await this.authModel
      .findOne({ _id: auth.id, isActive: true })
      .exec();
    if (!user) {
      return {
        data: null,
        message: 'Kullanıcı bulunamadı.',
        statusCode: 404,
        isSuccessful: false,
      };
    } else {
      return {
        data: user,
        message: 'Kullanıcı bilgileri getirildi.',
        statusCode: 200,
        isSuccessful: true,
      };
    }
  }
}
