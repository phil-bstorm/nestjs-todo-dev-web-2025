import { TodoDto, TodoListingDto } from 'src/dtos/todo.dto';
import { TodoCreateDto } from 'src/dtos/todo.form.dto';
import { TodoEntity } from 'src/entities/todo.entity';

// TodoEntity -> TodoListing
export function todoEntityToListingDto(entity: TodoEntity): TodoListingDto {
  return new TodoListingDto(entity);
}

// TodoEntity -> Todo (details)
export function todoEntityToTodoDto(entity: TodoEntity): TodoDto {
  return new TodoDto(entity);
}

// form -> TodoEnty
export function createDtoToEntity(dto: TodoCreateDto): Partial<TodoEntity> {
  const todo = new TodoEntity();

  todo.title = dto.title;
  todo.description = dto.description;
  todo.completed = !!dto.completed;

  return todo;
}
