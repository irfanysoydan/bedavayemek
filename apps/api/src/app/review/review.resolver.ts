import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { AuthDto } from '../auth/dto/auth.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiResponse } from '../_core/response/api-response.dto';
import {
  ResponseReview,
  ResponseReviewArray,
  ResponseReviewString,
} from '../_core/response/response-review.type';
import { GqlAuthGuard } from '../auth/jwt/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Mutation(() => ResponseReview)
  async createReview(
    @Args('createReviewDto') createReviewDto: CreateReviewDto,
    @Args('postId') postId: string,
    @GetUser('auth') authDto: AuthDto
  ): Promise<ApiResponse<Review>> {
    const review = await this.reviewService.createReview(
      createReviewDto,
      authDto,
      postId
    );
    return review;
  }

  @Query(() => ResponseReviewArray)
  async getReviewsByPostId(
    @Args('postId') postId: string
  ): Promise<ApiResponse<Review[]>> {
    const reviews = await this.reviewService.getReviewsByPostId(postId);
    console.log("resolverdan dönen", reviews);
    return reviews;
  }

  @Query(() => ResponseReviewArray)
  async getOwnReviews(
    @GetUser('auth') authDto: AuthDto
  ): Promise<ApiResponse<Review[]>> {
    const reviews = await this.reviewService.getOwnReviews(authDto);
    return reviews;
  }

  @Query(() => ResponseReview)
  async getReviewById(
    @Args('id') id: string,
    @GetUser('auth') authDto: AuthDto
  ): Promise<ApiResponse<Review>> {
    const review = await this.reviewService.getReviewById(id, authDto);
    return review;
  }

  @Mutation(() => ResponseReviewString)
  async deleteReviewById(
    @Args('id') id: string,
    @GetUser('auth') authDto: AuthDto
  ): Promise<ApiResponse<string>> {
    const review = await this.reviewService.deleteReviewById(id, authDto);
    return review;
  }

  @Mutation(() => ResponseReviewString)
  async updateReviewById(
    @Args('id') id: string,
    @Args('createReviewDto') createReviewDto: CreateReviewDto,
    @GetUser('auth') authDto: AuthDto
  ): Promise<ApiResponse<string>> {
    const review = await this.reviewService.updateReviewById(
      id,
      createReviewDto,
      authDto
    );
    return review;
  }
}
