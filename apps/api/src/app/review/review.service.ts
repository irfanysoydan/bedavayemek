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
      const review = await this.reviewModel.create({
        rating,
        comment,
        image,
        auth,
        post: postId,
      });

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

  async getOwnReviews(auth: any): Promise<Review[]> {
    try {
      const reviews = await this.reviewModel.find({ auth: auth._id }).exec();

      if (!reviews) throw new NotFoundException('Reviews not found!');

      return reviews;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getReviewById(id: string, auth: any): Promise<ApiResponse<Review>> {
    try {
      const review = await this.reviewModel
        .findOne({ _id: id, auth: auth._id }, {})
        .populate('auth')
        .populate('post')
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

  async getReviewsByPostId(postId: string): Promise<ApiResponse<Review[]>> {
    try {
      const reviews = await this.reviewModel
        .find({ post: postId })
        .populate('auth')
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

  async updateReviewById(
    id: string,
    updateReviewDto: CreateReviewDto,
    auth: any
  ): Promise<Review> {
    try {
      const { rating, comment, image } = updateReviewDto;
      const review = await this.reviewModel
        .findOneAndUpdate(
          { _id: id, auth: auth._id },
          { rating, comment, image },
          { new: true }
        )
        .exec();

      if (!review) throw new NotFoundException('Review not found!');

      return review;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteReviewById(id: string, auth: any): Promise<string> {
    try {
      await this.reviewModel
        .findOneAndDelete(
          { _id: id, auth: auth._id },
          { useFindAndModify: false }
        )
        .exec();

      return 'Review deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
