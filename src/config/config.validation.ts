import { z } from 'zod';

export const validationSchema = z.object({
  DB_TYPE: z.enum(['postgres']).default('postgres'),
  DB_NAME: z.string(),
  CORS_ORIGIN: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default('1h'),
});

// Infer the type from the schema - no need for manual interface!
export type Config = z.infer<typeof validationSchema>;

// Custom validation function for NestJS ConfigModule
export function validate(config: Record<string, unknown>) {
  const result = validationSchema.safeParse(config);

  if (!result.success) {
    throw new Error(`Configuration validation error: ${result.error.message}`);
  }

  return result.data;
}
