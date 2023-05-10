import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResponseLike {
  @Field(() => String)
  data: string;

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}
