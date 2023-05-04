import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsString()
  @IsEmail()
  readonly email: string;

  @Field()
  @MinLength(8)
  @MaxLength(32)
  readonly password: string;
}
