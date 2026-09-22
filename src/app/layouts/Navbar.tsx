// React and framework
import { useNavigate } from '@tanstack/react-router'

export function Navbar() {
  const navigate = useNavigate()

  function handleSignOut() {
    // TODO: Clear auth state/tokens before redirecting
    void navigate({ to: '/' })
  }

  return (
    <header className="flex h-14 items-center border-b border-border bg-background px-6">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">
          Admin Dashboard
        </h1>
        <nav aria-label="User actions" className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Main Page
          </button>
        </nav>
      </div>
    </header>
  )
}
