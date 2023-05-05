import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { ReviewResolver } from './review.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  providers: [ReviewService, ReviewResolver],
})
export class ReviewModule {}
