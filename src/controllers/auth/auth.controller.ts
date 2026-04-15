import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginFormDto, RegisterFormDto } from 'src/dtos/auth.form.dto';
import { registerFormDtoToUserEntity } from 'src/mappers/auth.mapper';
import { UserService } from 'src/services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

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

    // générer le token
    const token = this._jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { token: token };
  }
}
