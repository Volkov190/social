import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.post.findMany({ include: { author: true } });
  }
}
