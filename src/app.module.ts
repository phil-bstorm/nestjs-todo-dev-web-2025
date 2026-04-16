import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodoController } from './controllers/todo/todo.controller';
import { TodoService } from './services/todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserEntity } from './entities/user.entity';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT!,
      database: process.env.PG_DATABASE,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      synchronize: true,
      logging: true,
      entities: [TodoEntity, UserEntity],
    }),
    TypeOrmModule.forFeature([TodoEntity, UserEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, TodoController, AuthController],
  providers: [TodoService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // si on veut l'appliquer sur des routes spécifiques
    // ['auth/login', 'auth/register']

    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
