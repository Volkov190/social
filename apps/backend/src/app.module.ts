import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as cookie from 'cookie-parse';
import { join } from 'path';
import { createClient } from 'redis';
import { PrismaService } from './db/prisma/prisma.service';
import { RedisModule } from './db/redis/redis.module';
import { AuthModule } from './entities/auth/auth.module';
import { MessageModule } from './entities/message/message.module';
import { PostModule } from './entities/post/post.module';
import { UserModule } from './entities/user/user.module';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: (context) => {
            const { extra } = context;
            const uuid = cookie.parse((extra as any).request.headers.cookie)
              .session as string | undefined;
            (extra as any).session = { uuid };
          },
        },
      },
      context: async ({ extra }) => {
        try {
          if (!extra?.session?.uuid) return;
          const connection = await createClient().connect();
          const user = await connection.get(extra.session.uuid);
          if (!user) return;
          await connection.disconnect();
          return { user: JSON.parse(user) };
        } catch (err) {
          console.error(err);
        }
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
    }),
    UserModule,
    PostModule,
    AuthModule,
    RedisModule,
    MessageModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).exclude('auth(.*)').forRoutes('*');
  }
}
