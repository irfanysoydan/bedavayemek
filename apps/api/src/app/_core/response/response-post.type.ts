import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class ResponsePost {
  @Field(() => [Post])
  data: Post[];

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}
