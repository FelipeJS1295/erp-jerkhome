import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Todas las rutas quedan bajo /api (ej: /api/health)
  app.setGlobalPrefix('api');

  // credentials: true para que el navegador envíe la cookie de sesión
  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? 'http://localhost:3100',
    credentials: true,
  });

  const port = Number(process.env.API_PORT ?? 4100);
  await app.listen(port);
  Logger.log(`API escuchando en http://localhost:${port}/api`, 'Bootstrap');
}

await bootstrap();
