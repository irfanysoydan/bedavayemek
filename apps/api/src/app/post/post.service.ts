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
      const { title, description, rating, image, location, expireDate } =
        createPostDto;
      const post = await this.postModel.create({
        title,
        description,
        rating,
        image,
        location,
        expireDate: new Date(expireDate),
        auth,
      });

      return {
        data: post,
        message: 'Paylaşım oluşturma başarılı',
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

  async deletePostById(id: string): Promise<ApiResponse<string>> {
    try {
      const post = await this.postModel
        .findByIdAndUpdate(id, { isActive: false }, { new: true })
        .exec();
      return {
        data: `${post.title} is deleted`,
        message: 'Paylaşımı silme işlemi başarılı',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updatePostById(
    id: string,
    createPostDto: CreatePostDto
  ): Promise<ApiResponse<string>> {
    try {
      const { title, description, rating, image, location, expireDate } =
        createPostDto;
      const post = await this.postModel
        .findByIdAndUpdate(
          id,
          {
            title,
            description,
            rating,
            image,
            location,
            expireDate: new Date(expireDate),
          },
          { new: true }
        )
        .exec();
      console.log(post);
      return {
        data: `${post.title} is updated`,
        message: 'Paylaşım güncelleme işlemi başarılı',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
