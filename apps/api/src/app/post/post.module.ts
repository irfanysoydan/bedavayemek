import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, PostResolver],
})
export class PostModule {}
