import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { PostsResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({ imports: [PrismaModule], providers: [PostsResolver, PostService] })
export class PostModule {}
