import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { InputUser } from './models/inputUser.model';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    return this.prismaService.user.findMany();
  }

  async create(user: InputUser) {
    return this.prismaService.user.create({ data: user });
  }

  async edit(id: User['id'], data: InputUser) {
    return this.prismaService.user.update({ data, where: { id } });
  }

  async getFriends(userId: User['id']) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
      include: {
        friendUsers: true,
        userFriends: true,
      },
    });

    return [...user.friendUsers, ...user.userFriends];
  }

  async addFriend(userId: User['id'], friendId: User['friends'][number]['id']) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { userFriends: { connect: { id: friendId } } },
    });
  }

  async deleteFriend(
    userId: User['id'],
    friendId: User['friends'][number]['id'],
  ) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        userFriends: { disconnect: { id: friendId } },
        friendUsers: { disconnect: { id: friendId } },
      },
    });
  }

  async deleteUser(id: User['id']) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
