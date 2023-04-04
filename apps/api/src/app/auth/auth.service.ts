import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    try {
      const {  firstName, lastName ,email, password} = createAuthDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.authModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.authModel.findOne({ email, isActive: true }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userId: user._id };
      const accessToken: string = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '1d',
      });

      return { accessToken };
    } else {
      throw new ConflictException('Kullanıcı Bilgileri Hatalı');
    }
  }
}
