import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoDto, TodoListingDto } from 'src/dtos/todo.dto';
import { TodoCreateDto } from 'src/dtos/todo.form.dto';
import { RequireRole } from 'src/guards/require-role/require-role.decorator';
import {
  createDtoToEntity,
  todoEntityToListingDto,
  todoEntityToTodoDto,
} from 'src/mappers/todo.mapper';
import { TodoService } from 'src/services/todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Get()
  async getAll(): Promise<{ data: TodoListingDto[] }> {
    const todos = await this._todoService.getAll();
    const todosDto = todos.map(todoEntityToListingDto);
    return { data: todosDto };
  }

  @Post()
  //   @UseGuards(AdminGuard)
  @RequireRole()
  async create(@Body() body: TodoCreateDto): Promise<{ data: TodoDto }> {
    const e = createDtoToEntity(body);
    const newTodo = await this._todoService.create(e);
    const todoDto = todoEntityToTodoDto(newTodo);
    return { data: todoDto };
  }
}
