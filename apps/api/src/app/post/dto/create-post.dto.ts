import { IsString, IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  rating: number;

  @IsString()
  location: string;

  @IsString()
  expireDate: string;
}
