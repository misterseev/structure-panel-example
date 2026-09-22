export type ApiError = {
  kind: 'http' | 'network' | 'timeout' | 'cancelled' | 'unknown'
  code: string
  message: string
  status?: number | undefined
  correlationId?: string | undefined
  fieldErrors?: Record<string, string[]> | undefined
  cause?: unknown
}
