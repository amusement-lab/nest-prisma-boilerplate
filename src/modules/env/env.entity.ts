import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),

  DATABASE_URL: z.string(),

  APP_CORS: z.string(),
  APP_OPEN_API_HOST: z.string(),
});
export type Env = z.infer<typeof EnvSchema>;
