import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { AuthDto } from '../auth/dto/auth.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Resolver()
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Mutation(() => Review)
  async createReview(
    @Args('createReviewDto') createReviewDto: CreateReviewDto,
    @Args('auth') authDto: AuthDto,
    @Args('postId') postId: string
  ) {
    const review = await this.reviewService.createReview(
      createReviewDto,
      authDto,
      postId
    );
    return review.data;
  }

  @Query(() => [Review])
  async getReviewsByPostId(@Args('postId') postId: string) {
    const reviews = await this.reviewService.getReviewsByPostId(postId);
    return reviews.data;
  }

  @Query(() => [Review])
  async getOwnReviews(@Args('auth') authDto: AuthDto) {
    const reviews = await this.reviewService.getOwnReviews(authDto);
    return reviews.data;
  }

  @Query(() => Review)
  async getReviewById(@Args('id') id: string, @Args('auth') authDto: AuthDto) {
    const review = await this.reviewService.getReviewById(id, authDto);
    return review.data;
  }

  @Mutation(() => String)
  async deleteReviewById(
    @Args('id') id: string,
    @Args('auth') authDto: AuthDto
  ) {
    const review = await this.reviewService.deleteReviewById(id, authDto);
    return review.message;
  }

  @Mutation(() => String)
  async updateReviewById(
    @Args('id') id: string,
    @Args('createReviewDto') createReviewDto: CreateReviewDto,
    @Args('auth') authDto: AuthDto
  ) {
    const review = await this.reviewService.updateReviewById(
      id,
      createReviewDto,
      authDto
    );
    return review.data;
  }
}
