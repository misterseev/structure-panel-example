// React and framework
import { createFileRoute } from '@tanstack/react-router'

import { DashboardPage } from '@/features/dashboard/views/DashboardPage'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})
