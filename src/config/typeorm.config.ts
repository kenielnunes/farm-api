import { config } from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

// Carrega as variáveis de ambiente do arquivo .env
config({ path: path.resolve(__dirname, '../../.env') });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false
  },
  extra: {
    family: 4 // Força IPv4
  }
}); 