import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class ResponsePost {
  @Field(() => Post)
  data: Post;

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}

@ObjectType()
export class ResponsePostArray {
  @Field(() => [Post])
  data: Post[];

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}

@ObjectType()
export class ResponsePostString {

  @Field()
  data: string;

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}
