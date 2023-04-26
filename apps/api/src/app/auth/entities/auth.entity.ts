import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type AuthDocument = Auth & Document;

@ObjectType()
@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Auth {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  @Prop()
  firstName: string;

  @Field({ nullable: true })
  @Prop()
  lastName: string;

  @Field({ nullable: true })
  @Prop({ unique: true })
  username: string;

  @Field({ nullable: true })
  @Prop({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Prop()
  password: string;

  @Field({ nullable: true })
  @Prop({ default: 0.0 })
  rating: number;

  @Field({ nullable: true })
  @Prop()
  avatar: string;

  @Field({ nullable: true })
  @Prop({ default: true })
  isActive: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
