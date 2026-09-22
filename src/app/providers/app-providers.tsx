// Third-party libraries
import { Toaster } from 'sonner'

// Providers
import { QueryProvider } from './query-provider'

// Types
import type { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      {children}
      <Toaster richColors position="top-right" />
    </QueryProvider>
  )
}
