import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRole } from 'src/enums/user-role.enum';
import bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  // Creation des mocks
  const mockUserRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          // On remplace l'injection du userRepo (qui utilise TypeORM)
          // par notre mock
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('login works', async () => {
    const credentials = {
      username: 'admin',
      password: '1234',
    };
    const mockResult = {
      id: '0000',
      password: '1234',
      username: 'admin',
      role: UserRole.Admin,
    };

    mockUserRepo.findOne.mockReturnValue(mockResult);
    jest.spyOn(bcrypt, 'compareSync').mockImplementation((a, b) => a === b);

    const result = await service.login(credentials);

    expect(result).toEqual(mockResult);
    expect(mockUserRepo.findOne).toHaveBeenCalled();
    expect(bcrypt.compareSync).toHaveBeenCalled();
  });

  it('login bad password', async () => {
    const credentials = {
      username: 'admin',
      password: '9876',
    };
    const mockResult = {
      id: '0000',
      password: '1234',
      username: 'admin',
      role: UserRole.Admin,
    };

    mockUserRepo.findOne.mockReturnValue(mockResult);
    jest.spyOn(bcrypt, 'compareSync').mockImplementation((a, b) => a === b);

    await expect(service.login(credentials)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(mockUserRepo.findOne).toHaveBeenCalled();
    expect(bcrypt.compareSync).toHaveBeenCalled();
  });

  it('username doesnt exist', async () => {
    const credentials = {
      username: 'admin',
      password: '9876',
    };
    const mockResult = null;

    mockUserRepo.findOne.mockReturnValue(mockResult);
    jest.spyOn(bcrypt, 'compareSync').mockImplementation((a, b) => a === b);

    await expect(service.login(credentials)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(mockUserRepo.findOne).toHaveBeenCalled();
    expect(bcrypt.compareSync).not.toHaveBeenCalled();
  });
});
