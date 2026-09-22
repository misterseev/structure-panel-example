// Shared API infrastructure
import { createApiClient } from '../create-api-client'

// Configuration
import { env } from '@/shared/config/env'

export const reportingApi = createApiClient({
  baseURL: env.VITE_REPORTING_API_URL,
  timeoutMs: 30_000,
  withCredentials: true,
})
