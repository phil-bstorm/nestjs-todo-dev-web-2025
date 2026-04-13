import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class TodoCreateDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
