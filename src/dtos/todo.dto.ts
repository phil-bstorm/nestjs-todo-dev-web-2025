import { ApiProperty } from '@nestjs/swagger';
import { TodoEntity } from 'src/entities/todo.entity';

export class TodoDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
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
