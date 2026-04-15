import { RegisterFormDto } from 'src/dtos/auth.form.dto';
import { UserEntity } from 'src/entities/user.entity';

export function registerFormDtoToUserEntity(dto: RegisterFormDto): UserEntity {
  const user = new UserEntity();

  user.username = dto.username;
  user.password = dto.password;

  return user;
}
