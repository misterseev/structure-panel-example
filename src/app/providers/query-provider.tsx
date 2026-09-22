// Third-party libraries
import { QueryClientProvider } from '@tanstack/react-query'

// Types
import type { ReactNode } from 'react'

// Internal modules
import { queryClient } from './query-client'

type QueryProviderProps = {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
