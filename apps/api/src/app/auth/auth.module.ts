import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth, AuthSchema } from './entities/auth.entity';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    HttpModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
