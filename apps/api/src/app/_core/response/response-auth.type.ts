import { Field, ObjectType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';

@ObjectType()
export class ResponseAuth {
  @Field(() => Auth)
  data: Auth;

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}

@ObjectType()
export class ResponseAuthLogin {
  @Field()
  data: string;

  @Field()
  message: string;

  @Field()
  statusCode: number;

  @Field()
  isSuccessful: boolean;
}

