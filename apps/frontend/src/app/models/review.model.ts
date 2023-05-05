import { Auth } from './auth.model';
import { Post } from './post.model';

export class Review {
  id!: string;
  rating!: number;
  comment?: string | null;
  image?: string | null;
  isActive?: boolean;
  post?: Post | null;
  auth?: Auth | null;
  createdAt?: Date;
  updateAt?: Date;
}
