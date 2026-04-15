import { Body, Controller, Post } from '@nestjs/common';
import { LoginFormDto, RegisterFormDto } from 'src/dtos/auth.form.dto';
import { registerFormDtoToUserEntity } from 'src/mappers/auth.mapper';
import { UserService } from 'src/services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterFormDto): Promise<void> {
    const user = await this._userService.create(
      registerFormDtoToUserEntity(body),
    );
    console.log(user);

    // TODO envoyer un mail de confirmation
  }

  @Post('login')
  async login(@Body() body: LoginFormDto): Promise<{ token: string }> {
    const user = await this._userService.login(body);

    // TODO générer le token

    return { token: '' };
  }
}
