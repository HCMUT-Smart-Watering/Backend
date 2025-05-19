import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { IEnvVars } from '../config';

export default (
  configService: ConfigService<IEnvVars>,
): PostgresConnectionOptions => {
  const database = configService.get('postgres', { infer: true });

  if (!database) {
    throw new Error('Database configuration is not defined');
  }

  console.log('[TypeORM CONFIG]', database);

  return {
    ...database,
    type: 'postgres',
    synchronize: false,
    migrationsRun: false,
  };
};
