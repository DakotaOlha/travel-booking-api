import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5173'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Travel Booking API')
    .setDescription('API for managing travel and hotel bookings')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication and registration')
    .addTag('Users', 'User management')
    .addTag('Hotels', 'Hotel management')
    .addTag('Rooms', 'Room management')
    .addTag('Travels', 'Travel management')
    .addTag('Bookings', 'Booking management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`\nServer started on http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api/docs\n`);
}

bootstrap();