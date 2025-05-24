import { Module } from '@nestjs/common';
import {
  NotificationModule,
  UserModule,
  ScheduleModule,
  StatisticModule,
  AuthModule,
  AdafruitModule,
} from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import DatabaseConfig from './config/database.config';
import {
  CustomExceptionFilter,
  DatabaseExceptionFilter,
} from './common/filters';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      cache: true,
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: DatabaseConfig,
      inject: [ConfigService],
    }),
    // BullModule.forRoot({
    //   connection: {
    //     host: 'http://khoakomlem-internal.ddns.net/',
    //     port: 6379,
    //   },
    // }),
    UserModule,
    NotificationModule,
    ScheduleModule,
    StatisticModule,
    AuthModule,
    AdafruitModule,
  ],
  providers: [
    {
      provide: 'CUSTOM_ERR_FILTER',
      useClass: CustomExceptionFilter,
    },
    {
      provide: 'DB_ERR_FILTER',
      useClass: DatabaseExceptionFilter,
    },
  ],
})
export class AppModule {}
