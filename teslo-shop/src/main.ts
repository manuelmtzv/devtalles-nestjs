import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { transformValidationErrors } from './shared/utils/transformValidationErrors';

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

  await app.listen(config.getOrThrow('API_PORT'));
}
bootstrap();
