import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { Model } from 'mongoose';
import { ApiResponse } from '../_core/response/api-response.dto';
import { Post, PostDocument } from '../post/entities/post.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private LikeModel: Model<LikeDocument>,
    @InjectModel(Post.name) private PostModel: Model<PostDocument>
  ) {}

  async likePost(post: string, auth: string): Promise<ApiResponse<string>> {
    try {
      const isLiked = await this.LikeModel.findOne({ post: post, auth: auth });

      if (isLiked) {
        await this.LikeModel.findOneAndDelete({ post, auth });
        await this.PostModel.findOneAndUpdate(
          { _id: post },
          { $inc: { likeCount: -1 } }
        );

        return {
          data: '',
          message: 'Beğenmeyi kaldırma başarılı',
          statusCode: 201,
          isSuccessful: true,
        };
      }

      await this.LikeModel.create({
        post,
        auth,
      });

      await this.PostModel.findOneAndUpdate(
        { _id: post },
        { $inc: { likeCount: 1 } }
      );

      return {
        data: '',
        message: 'Beğenme başarılı',
        statusCode: 201,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
