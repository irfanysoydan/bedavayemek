/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from '../../auth/entities/auth.entity';
import { Post } from '../../post/entities/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';

export type LikeDocument = Like & Document;

@ObjectType()
@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Like {
  @Field({ nullable: true })
  id: string;

  @Field((type) => Post, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Field((type) => Auth, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  auth: Auth;

  @Field({ nullable: true })
  createdAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
