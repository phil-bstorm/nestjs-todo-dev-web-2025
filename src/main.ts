import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './filters/error/error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new ErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('Todo demo')
    .setDescription('Demo pour swager')
    .setVersion('1.0')
    .addBearerAuth() // si l'application utilise un Bearer Token
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  console.log('Server is running on http://localhost:3000');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
