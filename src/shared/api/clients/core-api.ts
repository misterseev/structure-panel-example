// Shared API infrastructure
import { createApiClient } from '../create-api-client'

// Configuration
import { env } from '@/shared/config/env'

export const coreApi = createApiClient({
  baseURL: env.VITE_CORE_API_URL,
  timeoutMs: 15_000,
  withCredentials: true,
})
