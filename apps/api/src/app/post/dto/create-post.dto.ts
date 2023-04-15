import { IsString, IsDate, IsDateString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  location: string;

  @IsString()
  expireDate: string;
}
