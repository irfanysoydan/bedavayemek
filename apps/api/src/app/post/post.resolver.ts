import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { ApiResponse } from '../_core/response/api-response.dto';
import { ResponsePost } from '../_core/response/response-post.type';
import { UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/graphql-ctx.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(
    @Args('createPostDto') createPostDto: CreatePostDto,
    @Args('auth') authDto: AuthDto
  ) {
    const post = await this.postService.createPost(createPostDto, authDto);
    console.log(post);
    return post.data;
  }

  @Query(() => ResponsePost)
  async getPosts(): Promise<ApiResponse<Post[]>> {
    const posts = await this.postService.getPosts();
    return posts;
  }

  @Query(() => ResponsePost)
  async getOwnPosts(@GetUser() authDto: AuthDto): Promise<ApiResponse<Post[]>> {
    const posts = await this.postService.getOwnPosts(authDto);
    return posts;
  }

  @Query(() => ResponsePost)
  async getPostById(@Args('id') id: string): Promise<ApiResponse<Post>> {
    const post = await this.postService.getPostById(id);
    return post;
  }

  @Mutation(() => String)
  async deletePostById(@Args('id') id: string) {
    const post = await this.postService.deletePostById(id);
    console.log(post);
    return post.data;
  }

  @Mutation(() => String)
  async updatePostById(
    @Args('id') id: string,
    @Args('createPostDto') createPostDto: CreatePostDto
  ) {
    const post = await this.postService.updatePostById(id, createPostDto);
    console.log(post);
    return post.data;
  }

  @Query(() => [Post])
  async getPaginatedPosts(
    @Args('page') page: number,
    @Args('limit') limit: number
  ) {
    const posts = await this.postService.getPaginatedPosts(page, limit);
    return posts.data;
  }
}
