/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/enums/user-role.enum';
import { ErrorFilter } from 'src/filters/error/error.filter';

describe('TodoController (e2e)', () => {
  let app: INestApplication<App>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalFilters(new ErrorFilter());

    jwtService = moduleFixture.get<JwtService>(JwtService);

    await app.init();
  });

  it('Get all todos', () => {
    return request(app.getHttpServer())
      .get('/todo')
      .expect(200)
      .expect((res) => {
        // vérifie que l'on a un objet data
        expect(res.body).toHaveProperty('data');

        // vérifier que la réponse soit un tableau
        // expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data).toBeInstanceOf(Array);

        expect(res.body.data.length).toBeGreaterThan(0);

        const element = res.body.data[0];
        expect(element).toHaveProperty('id');
        expect(element).toHaveProperty('title');
        expect(element).toHaveProperty('completed');
      });
  });

  it('Create new todo (POST)', () => {
    const newTodo = {
      title: 'Acheter du pain',
      description: 'Aller à la boulangerie avant la fermeture',
      completed: false,
    };

    const token = jwtService.sign({
      id: '0000000',
      role: UserRole.Admin,
    });

    return request(app.getHttpServer())
      .post('/todo')
      .set('Authorization', 'bearer ' + token)
      .send(newTodo)
      .expect(201) // NestJS renvoie 201 Created par défaut pour les POST
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        const element = res.body.data;

        expect(element).toHaveProperty('id');
        expect(element.title).toBe(newTodo.title);
        expect(element.description).toBe(newTodo.description);
        expect(element.completed).toBe(newTodo.completed);
      });
  });

  it('Create new todo - Should fail if title is too short (Validation)', () => {
    const invalidTodo = {
      title: 'A', // Trop court (MinLength(2) dans le DTO)
    };

    const token = jwtService.sign({
      id: '0000000',
      role: UserRole.Admin,
    });

    return request(app.getHttpServer())
      .post('/todo')
      .set('Authorization', 'bearer ' + token)
      .send(invalidTodo)
      .expect(400); // Bad Request attendu via ValidationPipe
  });

  it('Create new todo - Should fail if no authorization is provided (403)', () => {
    const newTodo = {
      title: 'Tâche sans auth',
      completed: false,
    };

    return request(app.getHttpServer()).post('/todo').send(newTodo).expect(403); // Forbidden car le token est manquant
  });

  it('Create new todo - Should fail if title is missing (400)', () => {
    const invalidTodo = {
      description: 'Une description sans titre',
      completed: false,
    };

    const token = jwtService.sign({
      id: '0000000',
      role: UserRole.Admin,
    });

    return request(app.getHttpServer())
      .post('/todo')
      .set('Authorization', 'bearer ' + token)
      .send(invalidTodo)
      .expect(400); // Bad Request attendu à cause de l'absence du titre obligatoire
  });

  afterEach(async () => {
    await app.close();
  });
});
