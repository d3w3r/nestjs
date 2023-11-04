import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://root:123456@localhost:5432/my_db',
  synchronize: true,
  logging: false,
  entities: ['src/**/*.entity'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations_registry',
});
