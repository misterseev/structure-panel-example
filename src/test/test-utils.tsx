// Shared test render utilities.
// Export a custom render function wrapping components with providers.
//
// Example:
// import { render } from '@testing-library/react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//
// export function renderWithProviders(ui: React.ReactElement) {
//   const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
//   return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
// }
