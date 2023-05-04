import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

@InputType()
export class CreateAuthDto {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(60)
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Şifre sekiz karakterden kısa olamaz' })
  @MaxLength(32)
  // // eslint-disable-next-line no-useless-escape
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!\.@#\$%\^&\*]).*$/, {
  //   message: 'Şifreniz en az 1 Büyük Harf 1 Küçük Harf 1 Rakam ve 1 Özel Karakter (!.@#$%^&*) İçermelidir',
  // })
  password: string;
}
