import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../auth/entities/auth.entity';
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
      const { title, description, likeCount, image, location, expireDate } =
        createPostDto;
      let post = await this.postModel.create({
        title,
        description,
        likeCount,
        image,
        location,
        expireDate: new Date(expireDate),
        auth,
      });
      post = await post.populate('auth');
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
        .sort({ createdAt: -1 })
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

  async getOwnPosts(auth: Auth): Promise<ApiResponse<Post[]>> {
    try {
      const posts = await this.postModel
        .find({ auth: auth.id, isActive: true })
        .populate('auth')
        .sort({ createdAt: -1 })
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

      if (!post) throw new NotFoundException('Post not found!');

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
      await this.postModel
        .findOneAndUpdate(
          { _id: id, isActive: true },
          { isActive: false },
          { new: true }
        )
        .exec();
      return {
        data: '',
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
      const { title, description, likeCount, image, location, expireDate } =
        createPostDto;
      await this.postModel
        .findByIdAndUpdate(
          id,
          {
            title,
            description,
            likeCount,
            image,
            location,
            expireDate: new Date(expireDate),
          },
          { new: true }
        )
        .exec();
      return {
        data: '',
        message: 'Paylaşım güncelleme işlemi başarılı',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPaginatedPosts(
    page: number,
    limit: number
  ): Promise<ApiResponse<Post[]>> {
    try {
      const startIndex = (page - 1) * limit;
      const posts = await this.postModel
        .find({ isActive: true })
        .populate('auth')
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit)
        .exec();

      const total = await this.postModel.countDocuments({ isActive: true });
      console.log('Total post:', total);
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

}
