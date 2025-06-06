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
  const mode = configService.get('env', { infer: true })!;
  const port = configService.get('port', { infer: true })!;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        /* 
        as of now the class-validator package is unmaintained, this has been broken for a while
        but i will leave this here to remind myself in future projects
        */
        exposeUnsetFields: false,
      },
    }),
  );

  app.useGlobalFilters(
    ...[
      new CustomExceptionFilter(),
      new DatabaseExceptionFilter(),
      new HttpExceptionFilter(),
    ],
  );

  if (mode == 'development')
    app.enableCors({
      credentials: true,
    });

  await app.listen(port);
}

bootstrap().catch(console.error);
