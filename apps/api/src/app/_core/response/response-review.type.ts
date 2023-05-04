import { ObjectType, Field } from '@nestjs/graphql';
import { Review } from '../../review/entities/review.entity';

@ObjectType()
export class ResponseReview {
  @Field(() => Review)
  data: Review;

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}

@ObjectType()
export class ResponseReviewArray {
  @Field(() => [Review])
  data: Review[];

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}

@ObjectType()
export class ResponseReviewString {
  @Field()
  data: string;

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}
