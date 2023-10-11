import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InputUser } from './models/inputUser.model';
import { User } from './models/user.model';
import { UsersService } from './user.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  async users() {
    return this.usersService.getAll();
  }

  @ResolveField()
  async friends(@Parent() user: User) {
    return this.usersService.getFriends(user.id);
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: InputUser) {
    return this.usersService.create(user);
  }

  @Mutation(() => User)
  async editUser(@Args('id') id: number, @Args('user') user: InputUser) {
    return this.usersService.edit(id, user);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @Mutation(() => User)
  async addFriend(
    @Args('userId') userId: number,
    @Args('friendId') friendId: number,
  ) {
    return this.usersService.addFriend(userId, friendId);
  }

  @Mutation(() => User)
  async deleteFriend(
    @Args('userId') userId: number,
    @Args('friendId') friendId: number,
  ) {
    return this.usersService.deleteFriend(userId, friendId);
  }
}
