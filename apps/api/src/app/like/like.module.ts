import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { Like, LikeSchema } from './entities/like.entity';
import { Post, PostSchema } from '../post/entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [LikeService, LikeResolver],
})
export class LikeModule {}
