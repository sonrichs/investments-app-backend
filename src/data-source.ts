import { DataSource, DataSourceOptions } from 'typeorm';

import * as env from 'dotenv';

env.config();

const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'local.sqlite',
  entities: ['**/*.entity*{.js,.ts}'],
  migrations: [__dirname + '/migrations/dev/*{.js,.ts}'],
} as DataSourceOptions);

const postgresDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['**/*.entity*{.js,.ts}'],
  migrations: [__dirname + '/migrations/prod/*{.js,.ts}'],
} as DataSourceOptions);

const appDataSource =
  process.env.NODE_ENV === 'production' ? postgresDataSource : sqliteDataSource;

// export default new DataSource({
//   type: 'sqlite',
//   database: 'local.sqlite',
//   entities: ['**/*.entity*{.js,.ts}'],
//   migrations: [__dirname + '/migrations/*{.js,.ts}'],
// } as DataSourceOptions);

export default appDataSource;
