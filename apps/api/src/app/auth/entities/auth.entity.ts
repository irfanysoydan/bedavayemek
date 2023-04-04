import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from '../../post/entities/post.entity';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Auth {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 0.0 })
  rating: number;

  @Prop()
  avatar: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
