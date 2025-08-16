import { DataSource, DataSourceOptions } from 'typeorm';

// export const sqliteDataSource = new DataSource({
//   type: 'sqlite',
//   database: 'local.sqlite',
//   entities: ['**/*.entity*{.js,.ts}'],
//   migrations: [__dirname + '/migrations/*{.js,.ts}'],
// } as DataSourceOptions);

// export const postgresDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: Number(process.env.DATABASE_PORT),
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   entities: ['**/*.entity*{.js,.ts}'],
//   migrations: [__dirname + '/migrations/*{.js,.ts}'],
// } as DataSourceOptions);

export default new DataSource({
  type: 'sqlite',
  database: 'local.sqlite',
  entities: ['**/*.entity*{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
} as DataSourceOptions);
