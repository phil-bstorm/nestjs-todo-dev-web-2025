import { TodoEntity } from 'src/entities/todo.entity';

export class TodoDto {
  id: number;
  title: string;
  description?: string;
  completed: boolean;

  constructor(entity: TodoEntity) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.completed = entity.completed;
  }
}

export class TodoListingDto {
  id: number;
  title: string;
  completed: boolean;

  constructor(entity: TodoEntity) {
    this.id = entity.id;
    this.title = entity.title;
    this.completed = entity.completed;
  }
}
