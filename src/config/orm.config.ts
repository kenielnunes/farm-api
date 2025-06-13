import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'farm_db',
  entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
  synchronize: true,
});