import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { UsersResolver } from './user.resolver';
import { UsersService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
})
export class UserModule {}
