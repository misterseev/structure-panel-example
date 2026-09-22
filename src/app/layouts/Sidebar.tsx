// React and framework
import { Link, useRouterState } from '@tanstack/react-router'

// Config
import { navigationItems } from '@/app/config/navigation'

export function Sidebar() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <aside className="flex w-64 flex-col border-r border-sidebar-border bg-sidebar-background">
      <div className="flex h-14 items-center border-b border-sidebar-border px-6">
        <span className="text-lg font-bold text-sidebar-foreground">
          Logo
        </span>
      </div>

      <nav aria-label="Primary navigation" className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = currentPath === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
