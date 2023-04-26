import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from '../../auth/entities/auth.entity';
import { Post } from '../../post/entities/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';

export type ReviewDocument = Review & Document;

@ObjectType()
@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Review {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  @Prop()
  rating: number;

  @Field({ nullable: true })
  @Prop({ required: true })
  comment: string;

  @Field({ nullable: true })
  @Prop()
  image: string;

  @Field({ nullable: true })
  @Prop({ default: true })
  isActive: boolean;

  @Field((type) => Post, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Field((type) => Auth, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  auth: Auth;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
