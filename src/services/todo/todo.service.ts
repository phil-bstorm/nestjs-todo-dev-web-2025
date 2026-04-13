import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entities/todo.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly _todoRepo: Repository<TodoEntity>,

    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  getAll(): Promise<TodoEntity[]> {
    return this._todoRepo.find();
  }

  create(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this._todoRepo.save(todo);
  }
}
