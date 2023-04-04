import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @MinLength(8)
  @MaxLength(32)
  readonly password: string;
}
