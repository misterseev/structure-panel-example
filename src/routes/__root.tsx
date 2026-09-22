// React and framework
import { createRootRouteWithContext } from '@tanstack/react-router'

// Layouts
import { RootLayout } from '@/app/layouts/RootLayout'

// Types
import type { QueryClient } from '@tanstack/react-query'

type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
