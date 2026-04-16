import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterFormDto {
  @ApiProperty({
    description: 'The username of the user!',
    example: 'John Doe',
    minLength: 2,
    maxLength: 50,
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    description: 'The password of the user!',
    example: 'password',
    minLength: 8,
    required: true,
  })
  @IsString()
  @MinLength(2)
  password: string;
}

export class LoginFormDto {
  @ApiProperty({
    description: 'The username of the user!',
    required: true,
    example: 'John Doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the user!',
    required: true,
    example: 'password',
  })
  @IsString()
  password: string;
}
