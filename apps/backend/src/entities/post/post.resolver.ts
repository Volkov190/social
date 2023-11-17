import { Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.model';
import { PostService } from './post.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postService: PostService) {}

  @Query((returns) => [Post])
  async posts() {
    return this.postService.findAll();
  }
}
