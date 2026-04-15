import { IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterFormDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(2)
  password: string;
}

export class LoginFormDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
