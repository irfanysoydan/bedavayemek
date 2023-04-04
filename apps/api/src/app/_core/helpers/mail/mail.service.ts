import { CreateAuthDto } from '../../../auth/dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {}

  async sendUserConfirmation(user: CreateAuthDto, token: string) {
    const url = await `${this.configService.get('WEB_SITE')}/confirm-email/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'bedavayemek.com\'a Hoşgeldiniz',
      template: './confirmation',
      context: {
        name: user.firstName,
        url,
      },
    });
  }

  async sendUserResetPass(user: CreateAuthDto, token: string) {
    const url = await `${this.configService.get('WEB_SITE')}/reset-password/${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Çömlek Festivali Yönetim - Parola Sıfırlama Linki',
      template: './resetpass',
      context: {
        name: user.firstName,
        url,
      },
    });
  }
}
