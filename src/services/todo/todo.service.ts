import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly _todoRepo: Repository<TodoEntity>,
  ) {}

  getAll(): Promise<TodoEntity[]> {
    return this._todoRepo.find();
  }

  create(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this._todoRepo.save(todo);
  }
}
