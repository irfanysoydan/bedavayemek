import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostService, PostResolver],
})
export class PostModule {}
