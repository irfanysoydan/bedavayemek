import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from '../auth/entities/auth.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(createPostDto: CreatePostDto, auth: Auth): Promise<Post> {
    try {
      const { title, description, image, location, expireDate } = createPostDto;
      const post = await this.postModel.create({
        title,
        description,
        image,
        location,
        expireDate: new Date(expireDate),
        auth,
      });

      return post;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPosts(): Promise<Post[]> {
    try {
      const posts = await this.postModel.find({ isActive: true }).exec();

      return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOwnPosts(auth: any): Promise<Post[]> {
    try {
      const posts = await this.postModel.find({ auth: auth._id }).exec();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPostById(id: string): Promise<Post> {
    try {
      const post = await this.postModel.findById(id).exec();

      return post;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deletePostById(id: string): Promise<string> {
    try {
      const post = await this.postModel.findByIdAndDelete(id).exec();

      return `${post.title} is deleted`;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updatePostById(
    id: string,
    createPostDto: CreatePostDto
  ): Promise<string> {
    try {
      const { title, description, image, location, expireDate } = createPostDto;
      const post = await this.postModel
        .findByIdAndUpdate(
          id,
          {
            title,
            description,
            image,
            location,
            expireDate: new Date(expireDate),
          },
          { new: true }
        )
        .exec();

      return `${post.title} is updated`;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
