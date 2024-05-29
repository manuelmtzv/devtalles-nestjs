import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { transformValidationErrors } from './shared/utils/transformValidationErrors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(config.getOrThrow('API_PREFIX'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: transformValidationErrors,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Teslo Shop REST API')
    .setDescription('The Teslo Shop API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.getOrThrow('API_PORT'));
}
bootstrap();
