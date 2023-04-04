import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from '../../auth/entities/auth.entity';
import { Post } from '../../post/entities/post.entity';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Review {
  @Prop()
  rating: number;

  @Prop()
  comment: string;

  @Prop()
  images: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  auth: Auth;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
