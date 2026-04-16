import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from 'src/dtos/auth.dto';
import { LoginFormDto, RegisterFormDto } from 'src/dtos/auth.form.dto';
import { registerFormDtoToUserEntity } from 'src/mappers/auth.mapper';
import { UserService } from 'src/services/user/user.service';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '',
  })
  async register(@Body() body: RegisterFormDto): Promise<void> {
    const user = await this._userService.create(
      registerFormDtoToUserEntity(body),
    );
    console.log(user);

    // TODO envoyer un mail de confirmation
  }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
    type: LoginResponse,
  })
  async login(@Body() body: LoginFormDto): Promise<LoginResponse> {
    const user = await this._userService.login(body);

    // générer le token
    const token = this._jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { token: token };
  }
}
