// React and framework
import { createFileRoute, redirect } from '@tanstack/react-router'

// Layouts
import { AuthLayout } from '@/app/layouts/AuthLayout'

export const Route = createFileRoute('/_authenticated')({
  // Authentication guard: redirect to login if not authenticated.
  // Replace this check with your actual auth state verification.
  beforeLoad: () => {
    const isAuthenticated = true // TODO: Replace with real auth check

    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthLayout,
})
