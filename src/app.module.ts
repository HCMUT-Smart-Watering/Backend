import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  NotificationModule,
  UserModule,
  ScheduleModule,
  StatisticModule,
} from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from './modules/auth/auth.module';
import { DbModule } from './modules/db/db.module';
import { AdafruitModule } from './modules/adafruit/adafruit.module';
import DatabaseConfig from './config/postgre/database.config';

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
    DbModule,
    AdafruitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
