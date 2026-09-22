// React and framework
import { createFileRoute } from '@tanstack/react-router'

import { UserDetailPage } from '@/features/users/pages/UserDetailPage'

export const Route = createFileRoute('/_authenticated/users/$userId')({
  component: UserDetailPage,
})
