import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const host = configService.get('DB_HOST');
  console.log('All env variables:', configService.get('DB_USER', 'postgres'));

  console.log('Database connection config:', {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    database: configService.get('DB_NAME'),
    password: configService.get('DB_PASSWORD'),
  });

  return {
    type: 'postgres',
    host: host || 'localhost',
    port: configService.get('DB_PORT', 5432),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: configService.get('NODE_ENV') !== 'production',
    migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
    migrationsRun: false,
    logging: configService.get('NODE_ENV') !== 'production',
    retryAttempts: 10,
    retryDelay: 3000,
    connectTimeoutMS: 20000,
    autoLoadEntities: true,
    extra: {
      max: 1,
      min: 0,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000,
    },
  };
}; 