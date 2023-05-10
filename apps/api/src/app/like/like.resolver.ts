import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/jwt/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ResponseLike } from '../_core/response/response-like.type';

@Resolver()
@UseGuards(GqlAuthGuard)
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  @Mutation(() => ResponseLike)
  async likePost(
    @Args('postId') postId: string,
    @GetUser('auth') auth: string
  ) {
    return this.likeService.likePost(postId, auth);
  }
}
