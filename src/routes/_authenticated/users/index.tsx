// React and framework
import { createFileRoute } from '@tanstack/react-router'

// Third-party libraries
import { z } from 'zod/v4'

import { UsersPage } from '@/features/users/pages/UsersPage'

const usersSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(10).max(100).catch(25),
  query: z.string().trim().max(100).catch(''),
})

export const Route = createFileRoute('/_authenticated/users/')({
  validateSearch: (search) => usersSearchSchema.parse(search),
  component: UsersPage,
})
