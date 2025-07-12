import {z} from 'zod/v4';

const envSchema = z.object({
  VITE_API_COUNTRY: z.string().url(),
  VITE_WEATHER_TWO_URL: z.string().url(),
  VITE_WEATHER_TWO_KEY: z.string(),
  VITE_REVERSE_GEO_KEY: z.string(),
  VITE_REVERSE_GEO_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);