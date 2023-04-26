import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthDto {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  rating: number;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  isActive: boolean;
}
