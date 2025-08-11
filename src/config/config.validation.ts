import * as Joi from 'joi';

interface Config {
  PORT: number;
  DB_TYPE: string;
  DB_NAME: string;
  CORS_ORIGIN: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASS: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
}

export const validationSchema: Joi.ObjectSchema<Config> = Joi.object({
  PORT: Joi.number().default(3000),
  DB_TYPE: Joi.string()
    .valid('sqlite', 'postgres')
    .default('sqlite')
    .required(),
  DB_NAME: Joi.string().required(),
  CORS_ORIGIN: Joi.string().required(),
  DATABASE_HOST: Joi.string(),
  DATABASE_PORT: Joi.number(),
  DATABASE_USER: Joi.string(),
  DATABASE_PASS: Joi.string(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('1h'),
});
