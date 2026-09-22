import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/_authenticated/users/$userId')

export function UserDetailPage() {
  const { userId } = routeApi.useParams()

  return (
    <section aria-labelledby="user-detail-heading">
      <h1
        id="user-detail-heading"
        className="text-foreground text-2xl font-bold"
      >
        User Detail
      </h1>
      <p className="text-muted-foreground mt-2">Viewing user: {userId}</p>
    </section>
  )
}
