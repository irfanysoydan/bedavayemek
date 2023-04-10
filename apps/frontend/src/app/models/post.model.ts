import { Auth } from './auth.model';

export class Post {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  location?: string;
  expireDate?: Date;
  rating?: number;
  isActive?: boolean;
  auth?: Auth;
  createdAt?: Date;
  updateAt?: Date;
}
