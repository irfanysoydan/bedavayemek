/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from '../../auth/entities/auth.entity';
import { Field, ObjectType } from '@nestjs/graphql';

export type PostDocument = Post & Document;

@ObjectType()
@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Post {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  @Prop()
  title: string;

  @Field({ nullable: true })
  @Prop()
  description: string;

  @Field({ nullable: true })
  @Prop()
  image: string;

  @Field({ nullable: true })
  @Prop()
  location: string;

  @Field({ nullable: true })
  @Prop({ nullable: true })
  expireDate: string;

  @Field({ nullable: true })
  @Prop({ default: 0.0 })
  rating: number;

  @Field({ nullable: true })
  @Prop({ default: true })
  isActive: boolean;

  @Field((type) => Auth, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  auth: Auth;

  @Field({ nullable: true })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
