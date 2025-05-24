import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IEnvVars } from './config';

export default (
  configService: ConfigService<IEnvVars>,
): TypeOrmModuleOptions => {
  const database = configService.get('postgres', { infer: true });
  const env = configService.get('env', { infer: true });

  if (!database) {
    throw new Error('Database configuration is not defined');
  }

  return {
    ...database,
    type: 'postgres',
    synchronize: env == 'development' ? true : false,
    migrationsRun: env == 'development' ? true : false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
  };
};
