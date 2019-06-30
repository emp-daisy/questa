import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const server = config.get('server');

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {app.enableCors(); }

  const port = process.env.PORT || server.port;

  await app.listen(port);

  logger.log(`Application started on port ${port}.`);
}
bootstrap();
