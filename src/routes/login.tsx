// React and framework
import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from '@/features/auth/views/LoginPage'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})
