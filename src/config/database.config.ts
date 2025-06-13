import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

console.log('process.env.POSTGRES_HOST -> ', process.env.POSTGRES_HOST);
export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const host = configService.get('POSTGRES_HOST');
  console.log('ConfigService POSTGRES_HOST:', host);
  console.log('All env variables:', configService.get('POSTGRES_USER', 'postgres'));

  console.log('Database connection config:', {
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    database: configService.get('POSTGRES_DB'),
    password: configService.get('POSTGRES_PASSWORD'),
  });

  return {
    type: 'postgres',
    host: host || 'localhost',
    port: configService.get('POSTGRES_PORT', 5432),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: configService.get('NODE_ENV') !== 'production',
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