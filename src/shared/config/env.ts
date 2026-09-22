// Third-party libraries
import { z } from 'zod/v4'

const envSchema = z.object({
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']),
  VITE_CORE_API_URL: z.url(),
  VITE_REPORTING_API_URL: z.url(),
})

export const env = envSchema.parse(import.meta.env)
