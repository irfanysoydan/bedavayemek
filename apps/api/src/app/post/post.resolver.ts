import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { ApiResponse } from '../_core/response/api-response.dto';
import {
  ResponsePost,
  ResponsePostArray,
  ResponsePostNull,
} from '../_core/response/response-post.type';
import { UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { GqlAuthGuard } from '../auth/jwt/gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => ResponsePost)
  async createPost(
    @Args('createPostDto') createPostDto: CreatePostDto,
    @GetUser('auth') authDto: AuthDto
  ): Promise<ApiResponse<Post>> {
    const post = await this.postService.createPost(createPostDto, authDto);
    return post;
  }

  @Query(() => ResponsePostArray)
  async getPosts(): Promise<ApiResponse<Post[]>> {
    const posts = await this.postService.getPosts();
    return posts;
  }

  @Query(() => ResponsePostArray)
  async getOwnPosts(@GetUser() authDto: AuthDto): Promise<ApiResponse<Post[]>> {
    const posts = await this.postService.getOwnPosts(authDto);
    return posts;
  }

  @Query(() => ResponsePost)
  async getPostById(@Args('id') id: string): Promise<ApiResponse<Post>> {
    const post = await this.postService.getPostById(id);
    return post;
  }

  @Mutation(() => ResponsePostNull)
  async deletePostById(@Args('id') id: string): Promise<ApiResponse<string>> {
    const post = await this.postService.deletePostById(id);
    return post;
  }

  @Mutation(() => ResponsePostNull)
  async updatePostById(
    @Args('id') id: string,
    @Args('createPostDto') createPostDto: CreatePostDto
  ): Promise<ApiResponse<string>> {
    const post = await this.postService.updatePostById(id, createPostDto);
    return post;
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
