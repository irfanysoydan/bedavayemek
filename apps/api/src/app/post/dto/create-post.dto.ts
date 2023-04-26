import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field({ nullable: true })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsString()
  image: string;

  @Field({ nullable: true })
  @IsNumber()
  rating: number;

  @Field({ nullable: true })
  @IsString()
  location: string;

  @Field({ nullable: true })
  @IsString()
  expireDate: string;
}
