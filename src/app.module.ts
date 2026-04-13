import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodoController } from './controllers/todo/todo.controller';
import { TodoService } from './services/todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'tododb',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      logging: true,
      entities: [TodoEntity, UserEntity],
    }),
    TypeOrmModule.forFeature([TodoEntity, UserEntity]),
  ],
  controllers: [AppController, TodoController],
  providers: [TodoService],
})
export class AppModule {}
