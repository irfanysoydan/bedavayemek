import { IsString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  rating: number;

  @IsString()
  comment: string;

  @IsString({ each: true }) //each kelimesi ile array içindeki her bir elemanın string olması gerektiğini belirtiyoruz.
  images: string[];
}
