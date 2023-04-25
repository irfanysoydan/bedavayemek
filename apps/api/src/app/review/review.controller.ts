import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';
import { ApiResponse } from '../_core/response/api-response.dto';

@Controller('review')
@UseGuards(AuthGuard('jwt'))
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('post/:postId')
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() auth: Auth,
    @Param('postId') postId: string
  ): Promise<ApiResponse<Review>> {
    return await this.reviewService.createReview(createReviewDto, auth, postId);
  }

  @Get()
  async getAllReviews(@GetUser() auth: Auth): Promise<ApiResponse<Review[]>> {
    return await this.reviewService.getOwnReviews(auth);
  }

  @Get(':id')
  async getReviewById(
    @Param('id') id: string,
    @GetUser() auth: Auth
  ): Promise<ApiResponse<Review>> {
    return await this.reviewService.getReviewById(id, auth);
  }

  @Get('post/:postId')
  async getReviewsByPostId(
    @Param('postId') postId: string
  ): Promise<ApiResponse<Review[]>> {
    return await this.reviewService.getReviewsByPostId(postId);
  }

  @Put(':id')
  async updateReviewById(
    @Param('id') id: string,
    @Body() updateReviewDto: CreateReviewDto,
    @GetUser() auth: Auth
  ): Promise<ApiResponse<Review>> {
    return await this.reviewService.updateReviewById(id, updateReviewDto, auth);
  }

  @Delete(':id')
  async deleteReviewById(
    @Param('id') id: string,
    @GetUser() auth: Auth
  ): Promise<string> {
    return await this.reviewService.deleteReviewById(id, auth);
  }
}
