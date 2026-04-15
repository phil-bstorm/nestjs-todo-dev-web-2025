import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { LoginFormDto } from 'src/dtos/auth.form.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async create(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const existing = await this._userRepo.findOne({
      where: { username: user.username },
    });

    if (existing) {
      throw new Error('Username déjà utilisé');
    }

    user.password = bcrypt.hashSync(user.password, 10);

    const newU = await this._userRepo.save(user);
    return newU;
  }

  async login(credentials: LoginFormDto) {
    const user = await this._userRepo.findOne({
      where: {
        username: credentials.username,
      },
    });

    if (!user) {
      throw new Error('Credentials invalide');
    }

    if (!bcrypt.compareSync(credentials.password, user.password)) {
      throw new Error('Credentials invalide');
    }

    return user;
  }
}
