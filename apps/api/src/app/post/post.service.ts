import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from '../auth/entities/auth.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './entities/post.entity';
import { ApiResponse } from '../_core/response/api-response.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(
    createPostDto: CreatePostDto,
    auth: Auth
  ): Promise<ApiResponse<Post>> {
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

      return {
        data: post,
        message: 'Post created',
        statusCode: 201,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPosts(): Promise<ApiResponse<Post[]>> {
    try {
      const posts = await this.postModel
        .find({ isActive: true })
        .populate('auth')
        .exec();

      return {
        data: posts,
        message: 'Posts fetched',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOwnPosts(auth: any): Promise<ApiResponse<Post[]>> {
    try {
      const posts = await this.postModel
        .find({ auth: auth._id })
        .populate('auth')
        .exec();
      return {
        data: posts,
        message: 'Posts fetched',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPostById(id: string): Promise<ApiResponse<Post>> {
    try {
      const post = await this.postModel.findById(id).populate('auth').exec();

      return {
        data: post,
        message: 'Post fetched',
        statusCode: 200,
        isSuccessful: true,
      };
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
