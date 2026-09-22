// Third-party libraries
import axios from 'axios'

// Types
import type { ApiError } from './types'

/**
 * Normalizes any Axios or unknown error into the application-owned ApiError
 * contract so that features and UI never branch on raw Axios internals.
 */
export function normalizeApiError(error: unknown): ApiError {
  if (axios.isCancel(error)) {
    return {
      kind: 'cancelled',
      code: 'CANCELLED',
      message: 'Request was cancelled.',
      cause: error,
    }
  }

  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_CANCELED') {
      return {
        kind: 'timeout',
        code: 'TIMEOUT',
        message: 'Request timed out. Please try again.',
        cause: error,
      }
    }

    if (!error.response) {
      return {
        kind: 'network',
        code: 'NETWORK_ERROR',
        message: 'Unable to reach the server. Check your connection.',
        cause: error,
      }
    }

    const status = error.response.status
    const data = error.response.data as Record<string, unknown> | undefined

    return {
      kind: 'http',
      code: typeof data?.['code'] === 'string' ? data['code'] : `HTTP_${String(status)}`,
      message:
        typeof data?.['message'] === 'string'
          ? data['message']
          : `Request failed with status ${String(status)}.`,
      status,
      correlationId:
        typeof data?.['correlationId'] === 'string'
          ? data['correlationId']
          : undefined,
      fieldErrors:
        data?.['fieldErrors'] != null &&
        typeof data['fieldErrors'] === 'object'
          ? (data['fieldErrors'] as Record<string, string[]>)
          : undefined,
      cause: error,
    }
  }

  return {
    kind: 'unknown',
    code: 'UNKNOWN',
    message: 'An unexpected error occurred.',
    cause: error,
  }
}

/**
 * Extracts a user-safe message from an ApiError, with a fallback default.
 */
export function getApiErrorMessage(
  error: ApiError,
  fallback: string = 'Something went wrong.',
): string {
  return error.message || fallback
}
