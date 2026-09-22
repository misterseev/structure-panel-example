// Third-party libraries
import { createRouter } from '@tanstack/react-router'

// Generated route tree
import { routeTree } from '@/routeTree.gen'

// Providers
import { queryClient } from './providers/query-client'

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
