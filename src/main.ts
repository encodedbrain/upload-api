import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  await app.listen(port);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
}
bootstrap().then((r) => r);
