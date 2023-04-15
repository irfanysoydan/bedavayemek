import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from '../../auth/entities/auth.entity';

export type PostDocument = Post & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  location: string;

  @Prop({ nullable: true })
  expireDate: string;

  @Prop({ default: 0.0 })
  rating: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  auth: Auth;
}

export const PostSchema = SchemaFactory.createForClass(Post);
