import { DataSource, DataSourceOptions } from 'typeorm';

import * as env from 'dotenv';

env.config();

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const databaseOptions = process.env.DB_OPTIONS;

const connectionUrl = `postgresql://${username}:${password}@${host}:${process.env.DB_PORT}/${database}?${databaseOptions}`;

export default new DataSource({
  type: 'postgres',
  url: connectionUrl,
  entities: ['**/*.entity*{.js,.ts}'],
  migrations: [__dirname + '/migrations/prod/*{.js,.ts}'],
} as DataSourceOptions);
