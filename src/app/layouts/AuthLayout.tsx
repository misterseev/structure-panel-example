// React and framework
import { Outlet } from '@tanstack/react-router'

// Layouts
import { Navbar } from '@/app/layouts/Navbar'
import { Sidebar } from '@/app/layouts/Sidebar'

export function AuthLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
