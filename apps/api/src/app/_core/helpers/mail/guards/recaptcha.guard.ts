import { HttpService } from "@nestjs/axios";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();

    const { data } = await this.httpService
      .post(
        `https://www.google.com/recaptcha/api/siteverify?response=${body.recaptcha}&secret=${process.env.RECAPTCHA_SECRET_KEY}`
      )
      .toPromise();

    if (!data.success) {
      throw new ForbiddenException();
    }

    return true;
  }
}
