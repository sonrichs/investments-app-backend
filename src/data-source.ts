import { DataSource, DataSourceOptions } from 'typeorm';

import * as env from 'dotenv';

env.config();

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const databaseOptions = process.env.DB_OPTIONS;

const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'local.sqlite',
  entities: ['**/*.entity*{.js,.ts}'],
  migrations: [__dirname + '/migrations/dev/*{.js,.ts}'],
} as DataSourceOptions);

const connectionUrl = `postgresql://${username}:${password}@${host}:${process.env.DB_PORT}/${database}?${databaseOptions}`;

const postgresDataSource = new DataSource({
  type: 'postgres',
  url: connectionUrl,
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
