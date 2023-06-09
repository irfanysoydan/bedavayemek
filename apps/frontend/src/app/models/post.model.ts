import { Auth } from './auth.model';

export class Post {
  id!: string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  location?: string | null;
  expireDate?: string | null;
  likeCount!: number;
  reviewCount!: number;
  isActive?: boolean;
  auth?: Auth;
  createdAt?: Date;
  updateAt?: Date;
}
