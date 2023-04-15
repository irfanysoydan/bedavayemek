import { Post as Postie } from './entities/post.entity';
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
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { ApiResponse } from '../_core/response/api-response.dto';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() auth: Auth
  ): Promise<ApiResponse<Postie>> {
    return await this.postService.createPost(createPostDto, auth);
  }

  @Get()
  async getPosts(): Promise<ApiResponse<Postie[]>> {
    return await this.postService.getPosts();
  }

  @Get('own')
  async getOwnPosts(@GetUser() auth: Auth): Promise<ApiResponse<Postie[]>> {
    return await this.postService.getOwnPosts(auth);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<ApiResponse<Postie>> {
    return await this.postService.getPostById(id);
  }

  @Delete(':id')
  async deletePostById(@Param('id') id: string): Promise<string> {
    return await this.postService.deletePostById(id);
  }

  @Put(':id')
  async updatePostById(
    @Param('id') id: string,
    @Body() createPostDto: CreatePostDto
  ): Promise<string> {
    return await this.postService.updatePostById(id, createPostDto);
  }
}
