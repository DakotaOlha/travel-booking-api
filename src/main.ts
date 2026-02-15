import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальна валідація
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'], // Додайте свої домени
    credentials: true,
  });

  // Swagger документація
  const config = new DocumentBuilder()
    .setTitle('Travel Booking API')
    .setDescription('API для управління подорожами та бронюванням готелів')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Автентифікація та реєстрація')
    .addTag('Users', 'Управління користувачами')
    .addTag('Hotels', 'Управління готелями')
    .addTag('Rooms', 'Управління кімнатами')
    .addTag('Travels', 'Управління подорожами')
    .addTag('Bookings', 'Управління бронюваннями')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`\n🚀 Сервер запущено на http://localhost:${port}`);
  console.log(`📚 Swagger документація: http://localhost:${port}/api/docs\n`);
}

bootstrap();