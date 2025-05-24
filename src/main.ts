import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { IEnvVars } from './config/config';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/filters/cust-exception.filter';
import { DatabaseExceptionFilter, HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<IEnvVars>);
  const port = configService.get('port', { infer: true }) as number;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(
    ...[
      new CustomExceptionFilter(),
      new DatabaseExceptionFilter(),
      new HttpExceptionFilter(),
    ],
  );
  await app.listen(port);
}

bootstrap().catch(console.error);
