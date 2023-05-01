import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');

  //validacioens globales para el DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // transforme los DTO
      transformOptions: {
        enableImplicitConversion: true, // transforme los DTO
      },
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
