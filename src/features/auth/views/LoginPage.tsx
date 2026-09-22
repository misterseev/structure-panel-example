export function LoginPage() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <section className="border-border w-full max-w-md space-y-6 rounded-lg border p-8">
        <h1 className="text-foreground text-center text-2xl font-bold">
          Sign In
        </h1>
        <p className="text-muted-foreground text-center">
          Sign in to access the admin dashboard.
        </p>
        {/* Login form will be provided by features/auth */}
      </section>
    </main>
  )
}
