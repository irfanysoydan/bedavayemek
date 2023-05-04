import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../auth/entities/auth.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './entities/review.entity';
import { ApiResponse } from '../_core/response/api-response.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    auth: Auth,
    postId: string
  ): Promise<ApiResponse<Review>> {
    try {
      const { rating, comment, image } = createReviewDto;
      let review = await this.reviewModel.create({
        rating,
        comment,
        image,
        auth,
        post: postId,
      });

      review = await (await review.populate('post')).populate('post.auth');
      review = await review.populate('auth');

      return {
        data: review,
        message: 'Yorum ekleme işlemi başarılı.',
        statusCode: 201,
        isSuccessful: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
        statusCode: 500,
        isSuccessful: false,
      };
    }
  }

  async getReviewsByPostId(postId: string): Promise<ApiResponse<Review[]>> {
    try {
      const reviews = await this.reviewModel
        .find({ post: postId })
        .populate({ path: 'post', populate: { path: 'auth' } })
        .populate('auth')
        .sort({ createdAt: -1 })
        .exec();

      if (!reviews) throw new NotFoundException('Reviews not found!');

      return {
        data: reviews,
        message: 'Yorumlar başarıyla getirildi.',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOwnReviews(auth: Auth): Promise<ApiResponse<Review[]>> {
    try {
      const reviews = await this.reviewModel
        .find({ auth: auth.id })
        .populate({ path: 'post', populate: { path: 'auth' } })
        .populate('auth')
        .sort({ createdAt: -1 })
        .exec();

      if (!reviews) throw new NotFoundException('Reviews not found!');
      return {
        data: reviews,
        message: 'Yorumlar başarıyla getirildi.',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getReviewById(id: string, auth: Auth): Promise<ApiResponse<Review>> {
    try {
      const review = await this.reviewModel
        .findOne({ _id: id, auth: auth.id }, {})
        .populate({ path: 'post', populate: { path: 'auth' } })
        .populate('auth')
        .exec();

      return {
        data: review,
        message: 'Yorum başarıyla getirildi.',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteReviewById(id: string, auth: Auth): Promise<ApiResponse<string>> {
    try {
      const review = await this.reviewModel
        .findOneAndUpdate(
          { _id: id, auth: auth.id, isActive: true },
          { isActive: false },
          { new: true }
        )
        .exec();

      return {
        data: `${review.comment} is deleted`,
        message: 'Yorum başarıyla silindi.',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateReviewById(
    id: string,
    updateReviewDto: CreateReviewDto,
    auth: Auth
  ): Promise<ApiResponse<string>> {
    try {
      const { rating, comment, image } = updateReviewDto;
      const review = await this.reviewModel
        .findOneAndUpdate(
          { _id: id, auth: auth.id },
          { rating, comment, image },
          { new: true }
        )
        .exec();

      if (!review) throw new NotFoundException('Review not found!');

      return {
        data: `${review.comment} is updated`,
        message: 'Yorum başarıyla güncellendi.',
        statusCode: 200,
        isSuccessful: true,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
