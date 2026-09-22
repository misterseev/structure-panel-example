// Third-party libraries
import axios from 'axios'

// Shared infrastructure
import { normalizeApiError } from './api-error'

// Types
import type { AxiosInstance, CreateAxiosDefaults } from 'axios'

type CreateApiClientOptions = {
  baseURL: string
  timeoutMs?: number
  withCredentials?: boolean
  defaults?: Omit<CreateAxiosDefaults, 'baseURL' | 'timeout' | 'withCredentials'>
}

export function createApiClient({
  baseURL,
  timeoutMs = 15_000,
  withCredentials = true,
  defaults,
}: CreateApiClientOptions): AxiosInstance {
  const client = axios.create({
    ...defaults,
    baseURL,
    timeout: timeoutMs,
    withCredentials,
    headers: {
      Accept: 'application/json',
      ...defaults?.headers,
    },
  })

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  )

  return client
}
