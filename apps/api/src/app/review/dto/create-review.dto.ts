import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateReviewDto {
  @Field({ nullable: true })
  @IsNumber()
  rating: number;

  @Field({ nullable: true })
  @IsString()
  comment: string;

  @Field({ nullable: true })
  @IsString() //each kelimesi ile array içindeki her bir elemanın string olması gerektiğini belirtiyoruz.
  image: string;
}
