import { Auth } from './auth.model';
import { Post } from './post.model';

export class Like {
  id!: string;
  post?: Post | null;
  auth?: Auth | null;
  createdAt?: Date;
  updateAt?: Date;
}
