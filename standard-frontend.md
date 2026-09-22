# AiF - Front-End React Libarry Standard Documentation

| Metadata | Value |
| --- | --- |
| Status | Normative |
| Version | 1.3.0 |
| Last updated | 2026-09-22 |
| Primary target | Production admin dashboards and internal operations applications |
| Package manager | pnpm |

## 1. Purpose

This document defines the engineering standard for building secure, accessible, maintainable, and scalable React admin dashboards. It establishes mandatory architecture boundaries, implementation conventions, quality gates, and operational practices.

The standard optimizes for:

- predictable feature delivery;
- explicit ownership and dependency direction;
- type safety from external data to rendered UI;
- consistent data fetching, forms, routing, and state management;
- accessible and secure administrative workflows;
- fast onboarding and safe refactoring;
- automated enforcement through local tooling and CI.

This is a living standard. Teams MAY extend it for product-specific needs, but exceptions MUST be documented and approved as described in [Governance and Exceptions](#24-governance-and-exceptions).

## 2. Normative Language

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are normative:

- **MUST / MUST NOT**: an absolute requirement or prohibition.
- **SHOULD / SHOULD NOT**: the default expectation. A deviation requires a documented reason.
- **MAY**: optional and selected according to product needs.

Examples are illustrative. When an example conflicts with a normative rule, the normative rule takes precedence.

## 3. Scope

This standard applies to single-page admin applications built with:

- Vite;
- React;
- TypeScript;
- TanStack Router;
- TanStack Query;
- Axios;
- Tailwind CSS;
- shadcn/ui and Radix UI primitives;
- Zod;
- React Hook Form;
- Zustand;
- ESLint;
- Prettier or Biome;
- pnpm.

The supporting test stack SHOULD consist of Vitest, React Testing Library, Mock Service Worker (MSW), and Playwright.

This standard does not define back-end architecture, infrastructure topology, or visual brand identity. It does define the front-end contract with those systems.

## 4. Engineering Principles

1. **Features over technical layers.** Product behavior MUST be grouped by business feature, not placed in global `components`, `hooks`, or `services` buckets by default.
2. **Boundaries over convenience.** A feature MUST expose a small public API and MUST NOT depend on another feature's internals.
3. **One owner for every state value.** Server, URL, form, local UI, and global client state MUST not be duplicated across state systems.
4. **Parse at boundaries.** Data from APIs, URLs, browser storage, and environment variables MUST be treated as unknown until validated where risk warrants it.
5. **The server authorizes.** Client-side permission checks improve UX but MUST NOT be treated as a security boundary.
6. **Accessible by default.** Keyboard access, focus management, semantics, and readable status feedback MUST be part of the initial implementation.
7. **Boring consistency wins.** Teams SHOULD prefer established project patterns over locally clever abstractions.
8. **Automate policy.** Any objectively checkable rule SHOULD be enforced by TypeScript, linting, tests, or CI.
9. **Optimize after measurement.** Performance work MUST be guided by profiling, real-user data, or an agreed budget.
10. **Keep changes reversible.** Features SHOULD be small, independently testable, and safe to remove or replace.

## 5. Approved Technology Stack

| Concern | Standard | Policy |
| --- | --- | --- |
| Build and development | Vite | MUST |
| View layer | React | MUST |
| Language | TypeScript | MUST |
| Routing and URL state | TanStack Router | MUST |
| Server state | TanStack Query | MUST |
| HTTP client | Axios | MUST |
| Styling | Tailwind CSS | MUST |
| UI foundation | shadcn/ui + Radix UI | MUST |
| Runtime schemas | Zod | MUST |
| Forms | React Hook Form + Zod resolver | MUST |
| Shared client state | Zustand | Approved when justified |
| Static analysis | ESLint | MUST |
| Formatting | Prettier or Biome | MUST choose exactly one |
| Package management | pnpm | MUST |
| Unit/component tests | Vitest + React Testing Library | SHOULD |
| Network mocking | MSW | SHOULD |
| End-to-end tests | Playwright | SHOULD; MUST for critical flows |

### 5.1 Version Policy

- A project MUST declare its runtime and package-manager versions, including the `packageManager` field in `package.json` and a Node version file or equivalent tool configuration.
- Production projects MUST use supported stable releases. Preview, canary, release-candidate, or nightly packages MUST NOT be introduced without an approved technical decision record.
- The `pnpm-lock.yaml` file MUST be committed.
- CI MUST install dependencies with `pnpm install --frozen-lockfile`.
- Dependencies SHOULD be updated in small, reviewed groups using automated update tooling.
- Major upgrades MUST include migration notes and verification of build, tests, accessibility, and core user flows.
- Multiple packages solving the same concern SHOULD NOT coexist without a documented migration plan.

### 5.2 Package Rules

- pnpm MUST be the only package manager used in the repository.
- Other lockfiles, such as `package-lock.json` or `yarn.lock`, MUST NOT be committed.
- Runtime dependencies and development dependencies MUST be classified correctly.
- New dependencies MUST be reviewed for maintenance health, license compatibility, bundle impact, security posture, and whether the platform already provides the capability.
- Deep imports into undocumented package internals MUST NOT be used.
- Application code MUST NOT depend on a package only because it is available transitively.

## 6. Reference Project Structure

The project MUST use feature-based organization. The following structure is the default:

```text
.
├── public/
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   └── navigation.ts
│   │   ├── layouts/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   └── RootLayout.tsx
│   │   ├── providers/
│   │   │   ├── app-providers.tsx
│   │   │   └── query-provider.tsx
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── main.tsx
│   │   └── router.tsx
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── _authenticated.tsx
│   │   ├── _authenticated/
│   │   │   ├── dashboard.tsx
│   │   │   └── users/
│   │   │       ├── index.tsx
│   │   │       └── $userId.tsx
│   │   └── login.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   ├── views/
│   │   │   ├── auth.test.tsx
│   │   │   └── index.ts
│   │   ├── dashboard/
│   │   └── users/
│   │       ├── api/
│   │       │   ├── user.keys.ts
│   │       │   ├── user.queries.ts
│   │       │   ├── user.service.ts
│   │       │   └── user.contracts.ts
│   │       ├── components/
│   │       │   ├── user-form.tsx
│   │       │   └── user-table.tsx
│   │       ├── hooks/
│   │       │   ├── use-create-user.ts
│   │       │   └── use-update-user.ts
│   │       ├── schemas/
│   │       │   └── user.schema.ts
│   │       ├── types/
│   │       ├── utils/
│   │       ├── pages/
│   │       │   ├── UserDetailsPage.tsx
│   │       │   └── UserListPage.tsx
│   │       └── index.ts
│   ├── ui/
│   │   ├── primitives/
│   │   └── patterns/
│   ├── shared/
│   │   ├── api/
│   │   │   ├── clients/
│   │   │   │   ├── core-api.ts
│   │   │   │   └── reporting-api.ts
│   │   │   ├── create-api-client.ts
│   │   │   ├── api-error.ts
│   │   │   ├── auth-refresh.ts
│   │   │   └── types.ts
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── confirmation-dialog-global.tsx
│   │   │   │   └── action-dialog-global.tsx
│   │   │   └── ui/
│   │   │   |   ├── button.tsx
│   │   │   |   └── input.tsx
│   │   ├── config/
│   │   │   └── env.ts
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── types/
│   │   └── utils/
│   ├── test/
│   │   ├── factories/
│   │   ├── handlers/
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   ├── routeTree.gen.ts
│   └── vite-env.d.ts
├── tests/
│   └── e2e/
├── components.json
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

Generated files MAY differ by tool version. Generated files MUST NOT be manually edited.

### 6.1 Directory Responsibilities

| Directory | Responsibility |
| --- | --- |
| `app/` | Application composition, providers, global configuration, top-level layouts, and bootstrap code |
| `routes/` | TanStack Router route definitions, guards, URL schemas, loaders, and feature-view composition |
| `features/` | Business capabilities organized as self-contained modules |
| `ui/primitives/` | Owned shadcn/ui and Radix-based design-system primitives |
| `ui/patterns/` | Reusable product UI patterns with no feature-specific business rules |
| `shared/` | Domain-neutral infrastructure and utilities used by multiple features, including Axios client creation and cross-cutting HTTP policy |
| `test/` | Cross-feature test setup, factories, render helpers, and MSW handlers |
| `tests/e2e/` | Cross-route user journeys executed in a browser |

### 6.2 Dependency Direction

Dependencies MUST flow in this direction:

```text
app and routes
      ↓
features
      ↓
ui and shared
```

The following rules apply:

- `shared/` and `ui/` MUST NOT import from `features/`, `routes/`, or `app/`.
- A feature MUST NOT import another feature's internal files.
- Cross-feature use MUST go through the target feature's public `index.ts` API or an application-level composition module.
- Feature public APIs MUST be intentionally small. Internal folders MUST NOT expose broad wildcard barrels.
- Route files SHOULD be thin. They SHOULD validate URL input, enforce access preconditions, preload required queries, and render a feature view.
- Business behavior MUST NOT be implemented in `routes/` merely because a page starts there.
- Truly feature-specific code MUST remain inside its feature, even when only one file initially exists.
- Code MUST NOT be moved to `shared/` until it has a stable, domain-neutral contract and at least two genuine consumers, unless it is foundational infrastructure.
- Circular dependencies MUST be rejected by linting or an architecture test.

### 6.3 Feature Module Contract

Each feature SHOULD expose only what consumers need:

```ts
// src/features/users/index.ts
export { UserListView } from './views/user-list-view'
export { UserDetailsView } from './views/user-details-view'
export { useCreateUser } from './hooks/use-create-user'
export { userKeys, userListQueryOptions } from './api/user.queries'
export type { User, UserId } from './types/user'
```

A feature MAY omit unused folders. Empty placeholder folders MUST NOT be committed.

## 7. Naming and File Conventions

- Source filenames MUST use `kebab-case`, except tool-generated files that follow a required convention.
- React components and exported component types MUST use `PascalCase`.
- Functions, variables, hooks, and object properties MUST use `camelCase`.
- Custom hooks MUST start with `use` and MUST follow the Rules of Hooks.
- Boolean values SHOULD use prefixes such as `is`, `has`, `can`, `should`, or `did`.
- Constants that are truly immutable and module-wide MAY use `SCREAMING_SNAKE_CASE`.
- Event handlers SHOULD use `handleAction` inside a component and `onAction` for component props.
- Tests SHOULD use `*.test.ts` or `*.test.tsx`; Playwright tests SHOULD use `*.spec.ts`.
- A component file SHOULD export one primary component. Closely related private helpers MAY remain in the same file.
- Generic names such as `helper.ts`, `utils.ts`, `data.ts`, and `common.ts` SHOULD be avoided when a more precise name is possible.
- Imports MUST use the configured application alias, such as `@/`, for cross-directory imports. Relative imports SHOULD be limited to the same local module.
- Import paths MUST NOT encode another feature's private folder structure.

### 7.1 Import Organization

Imports MUST be divided into recognizable groups with a short section comment. Groups MUST appear in the following order when present:

1. React and framework APIs;
2. third-party libraries;
3. shared UI components;
4. shared infrastructure and utilities;
5. feature components and page/view components;
6. hooks;
7. constants and configuration;
8. schemas;
9. types, using `import type`;
10. styles and static assets.

Rules:

- Every non-empty import group MUST start with a concise `//` section comment.
- Empty group headings MUST NOT be added.
- Exactly one blank line MUST separate import groups.
- Imports inside each group MUST be sorted consistently by the configured formatter or import-order tool.
- A formatter MUST NOT be configured to remove the blank lines or move imports across the documented group comments.
- Side-effect imports, including global styles and initialization modules, MUST be last unless a tool requires an earlier position.
- A component MUST NOT import a route merely to navigate to it. It MUST use TanStack Router's typed navigation API.
- Page or view components SHOULD be imported by route files or application composition modules. Lower-level shared components MUST NOT import pages.
- Type-only imports MUST be kept in the `// Types` group even when they originate from a package already used in another group.
- If a file has only one import group, a section comment MAY be omitted. Component, route, hook, and API files with two or more groups MUST use the comments.

Example:

```tsx
// React and framework
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'

// Third-party libraries
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Shared UI components
import { Button } from '@/ui/primitives/button'
import { PageHeader } from '@/ui/patterns/page-header'

// Shared infrastructure and utilities
import { cn } from '@/shared/lib/cn'

// Feature components and views
import { UserRoleFields } from '../components/user-role-fields'

// Hooks
import { useUpdateUser } from '../hooks/use-update-user'

// Constants and configuration
import { USER_STATUS_LABELS } from '../constants/user-status'

// Schemas
import { userFormSchema } from '../schemas/user-form.schema'

// Types
import type { User, UserFormValues } from '../types/user'

// Styles and assets
import './user-details.css'
```

The comment text MAY be shortened to `// Components`, `// Hooks`, `// Constants`, or `// Styles` when the category remains unambiguous. A project MUST use the same labels consistently.

## 8. TypeScript Standard

### 8.1 Compiler Policy

- TypeScript `strict` mode MUST be enabled.
- `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` SHOULD be enabled for new projects.
- Production code MUST NOT use `// @ts-ignore`. A narrowly explained `// @ts-expect-error` MAY be used for a known, tested incompatibility.
- The non-null assertion operator (`!`) SHOULD NOT be used when control-flow narrowing or schema validation can prove the value.
- `any` MUST NOT be used in application code without an inline explanation and an issue to remove it. Use `unknown` at untrusted boundaries.
- Public functions and feature exports SHOULD have explicit input and output types when inference does not clearly communicate the contract.
- Type-only imports MUST use `import type` when required by the configured compiler/linter policy.
- Enums SHOULD be avoided. Prefer literal unions or `as const` objects unless enum runtime behavior is specifically required.

### 8.2 Domain and Transport Types

- API transport shapes and application domain models MUST be treated as separate concepts when their semantics differ.
- Zod schemas SHOULD be the source of truth for externally supplied data types, using `z.infer` where appropriate.
- Blind type assertions on API responses, route search values, storage content, or environment variables MUST NOT be used.
- Identifiers that are easy to mix up MAY use branded types.
- Dates received as strings MUST remain explicit ISO strings or be converted at a well-defined boundary. The codebase MUST NOT mix representations unpredictably.
- Currency MUST NOT be represented with floating-point arithmetic when exact calculations are required.

## 9. React Component Standard

- Components MUST be function components.
- Rendering MUST be pure. Network calls, subscriptions, storage writes, and analytics MUST NOT run during render.
- Components SHOULD have one clear responsibility. Size alone is not a reason to split; mixed responsibilities are.
- Data fetching SHOULD occur through feature query hooks or route loaders, not arbitrary effects.
- `useEffect` MUST be reserved for synchronization with an external system. It MUST NOT be the default mechanism for derived state or event handling.
- Derived values SHOULD be computed during render. Expensive computation MAY be memoized after measurement.
- Props MUST be minimal and semantic. Avoid passing large service objects or entire query results when a component needs only a few values.
- State SHOULD be colocated with the lowest common owner that needs it.
- Components MUST NOT mutate props, query data, or Zustand state directly.
- List keys MUST be stable identifiers. Array indexes MUST NOT be used when order can change.
- Native HTML elements MUST be preferred over custom role emulation.
- Reusable components SHOULD support `className` when style composition is part of their intended API.
- Error, loading, and empty states MUST be designed alongside the success state.

### 9.1 Component File Anatomy and Comments

A non-trivial component file SHOULD use this order:

1. grouped imports;
2. module constants and schemas;
3. local types;
4. the exported component;
5. private event handlers or helpers when they do not need component closure state;
6. small private subcomponents.

Comments are part of the maintainability contract, but they MUST communicate information the code cannot express clearly by itself.

- Comments MUST explain **why**, business constraints, security decisions, side effects, ordering requirements, workarounds, or non-obvious algorithms.
- Comments MUST NOT merely translate the next statement into English.
- Complex functions SHOULD use short phase comments to separate validation, transformation, side effects, and recovery.
- Every workaround comment MUST link to an issue, upstream reference, or removal condition when one exists.
- Security-sensitive logic and unusual permission decisions MUST include the reason and the authoritative source of the rule.
- Exported reusable utilities MAY use TSDoc when their contract, edge cases, or side effects are not obvious from types.
- Comments MUST be updated or removed in the same change as the code they describe.
- If a function requires many comments to be understandable, it SHOULD be decomposed into named functions before adding more commentary.
- Obvious comments such as `// Set loading to true`, `// Loop through users`, or `// Return result` MUST NOT be written.

Preferred component example:

```tsx
// React and framework
import { useMemo } from 'react'

// Shared UI components
import { Button } from '@/ui/primitives/button'
import { PageHeader } from '@/ui/patterns/page-header'

// Feature components
import { UserTable } from '../components/user-table'

// Hooks
import { useDisableUsers } from '../hooks/use-disable-users'
import { useUsers } from '../hooks/use-users'

// Constants
import { MAX_BULK_USER_ACTION_SIZE } from '../constants/user-limits'

// Types
import type { UserId } from '../types/user'

type UserListViewProps = {
  selectedIds: UserId[]
  onSelectionChange: (ids: UserId[]) => void
}

export function UserListView({
  selectedIds,
  onSelectionChange,
}: UserListViewProps) {
  const usersQuery = useUsers()
  const disableUsers = useDisableUsers()

  const canDisableSelection = useMemo(
    () =>
      selectedIds.length > 0 &&
      selectedIds.length <= MAX_BULK_USER_ACTION_SIZE,
    [selectedIds.length],
  )

  async function handleDisableSelectedUsers() {
    if (!canDisableSelection) return

    // The API applies this operation atomically; sending one request prevents
    // the partial updates that multiple per-user requests could create.
    await disableUsers.mutateAsync({ userIds: selectedIds })

    // Clear the selection only after server confirmation so a failed request
    // leaves the operator's intended scope available for retry.
    onSelectionChange([])
  }

  return (
    <section aria-labelledby="users-heading">
      <PageHeader
        id="users-heading"
        title="Users"
        actions={
          <Button
            disabled={!canDisableSelection || disableUsers.isPending}
            onClick={handleDisableSelectedUsers}
          >
            Disable selected users
          </Button>
        }
      />

      <UserTable
        users={usersQuery.data ?? []}
        selectedIds={selectedIds}
        onSelectionChange={onSelectionChange}
      />
    </section>
  )
}
```

Avoid:

```ts
function getActiveUsers(users: User[]) {
  // Filter the users.
  const activeUsers = users.filter((user) => user.isActive)

  // Return the active users.
  return activeUsers
}
```

The names already explain this behavior; the comments add maintenance cost without adding knowledge.

### 9.2 Hooks

- A custom hook MUST encapsulate reusable stateful behavior, not merely rename a function.
- Hooks MUST return a stable, documented shape.
- Hooks MUST NOT hide unexpected global side effects.
- Hook dependencies MUST be complete; exhaustive-dependency lint rules MUST remain enabled.
- A hook tied to one feature MUST stay in that feature.
- Query and mutation hooks SHOULD expose domain-oriented operations rather than leak low-level request details to views.
- Components and pages MUST consume TanStack Query through feature-owned custom hooks rather than call `useQuery`, `useMutation`, or API services directly, except in approved generic infrastructure.
- A query hook MUST call a query-options factory or feature API service; a mutation hook MUST call a feature API service.
- Reusable cache invalidation, optimistic updates, rollback, and domain-wide feedback SHOULD live in the feature hook.
- Navigation, closing a particular dialog, resetting a page-owned form, and other consumer-specific effects MUST remain in the consuming component through per-call callbacks.
- Custom hooks MUST expose the original TanStack Query result unless a narrower wrapper contract is intentionally required. Renaming `mutate` and `isPending` at the call site MAY improve clarity.

## 10. Routing and URL State

TanStack Router MUST be the owner of navigation and shareable URL state.

- File-based routing SHOULD be used unless the project has a documented reason for code-based routing.
- Route search parameters MUST be validated and normalized.
- Filters, pagination, sorting, tabs, and other shareable page state SHOULD be stored in the URL.
- Route params and search params MUST NOT be trusted solely because TypeScript generated a type; validation MUST occur at the external boundary.
- Authentication preconditions SHOULD be enforced in an authenticated parent route.
- Authorization-sensitive pages MUST handle denied access explicitly.
- Route loaders SHOULD use `queryClient.ensureQueryData` or equivalent query integration to preload critical data.
- Routes SHOULD be lazy-loaded at meaningful page or feature boundaries.
- Not-found and unexpected route errors MUST have dedicated UI.
- Redirect destinations MUST be validated to prevent open redirects.
- Navigation MUST preserve only relevant search parameters; stale filter state MUST NOT leak between unrelated screens.

Example:

```tsx
const usersSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(10).max(100).catch(25),
  query: z.string().trim().max(100).catch(''),
  status: z.enum(['active', 'disabled']).optional(),
})

export const Route = createFileRoute('/_authenticated/users/')({
  validateSearch: (search) => usersSearchSchema.parse(search),
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(userListQueryOptions(deps)),
  component: UserListView,
})
```

Route APIs can evolve between TanStack Router releases. Projects MUST follow the installed major version's official API while preserving the architectural rules above.

## 11. Server State and API Access

### 11.1 TanStack Query

- TanStack Query MUST own remote asynchronous server state.
- Query data MUST NOT be copied into Zustand or component state merely to make it globally available.
- Every feature MUST define a consistent query-key factory.
- Query keys MUST contain every input that changes the response.
- Query option factories SHOULD be reusable by route loaders, hooks, prefetching, and tests.
- `staleTime`, retry behavior, and refetch policy MUST reflect the volatility and risk of the resource rather than use one global value blindly.
- Queries MUST be disabled only for an explicit reason; dependent-query conditions SHOULD be clear.
- Mutations MUST invalidate, update, or remove all affected cached data intentionally.
- Optimistic updates MAY be used when rollback behavior is deterministic and tested.
- Destructive mutations SHOULD prefer confirmed server results over optimistic UI.
- Query cancellation SHOULD be supported by passing the provided `AbortSignal` to the API client.
- Pagination SHOULD use placeholder or retained data where it prevents unnecessary layout churn.
- Errors MUST be normalized before presentation.

Example:

```ts
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserListFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: UserId) => [...userKeys.details(), id] as const,
}

export function userListQueryOptions(filters: UserListFilters) {
  return queryOptions({
    queryKey: userKeys.list(filters),
    queryFn: ({ signal }) => usersApi.list(filters, { signal }),
    staleTime: 30_000,
  })
}
```

### 11.2 Axios Client Standard

Axios MUST be the standard HTTP transport for application APIs. TanStack Query remains responsible for server-state lifecycle; Axios is responsible only for HTTP transport.

- Application and feature code MUST NOT use the global `axios` export directly for requests.
- Requests MUST use an Axios instance created through `shared/api/create-api-client.ts` or an approved generated client using that instance.
- Every independent API service MUST have a named Axios instance with its own `baseURL`, timeout, credential policy, and interceptors.
- A single catch-all client MUST NOT mix internal, reporting, partner, and third-party APIs with different trust or authentication policies.
- Axios defaults MUST be configured once at client creation. Feature modules MUST NOT repeatedly define base URLs, authentication headers, or global error behavior.
- A finite timeout MUST be configured. The value SHOULD reflect the service-level expectation and MAY be overridden for a documented long-running endpoint.
- `Accept: application/json` SHOULD be the default for JSON APIs.
- `Content-Type` MUST NOT be set globally when it would break `FormData`, file uploads, or content negotiation. The browser SHOULD set multipart boundaries.
- Cookie-authenticated first-party clients MUST use `withCredentials: true` when cross-origin cookie policy requires it.
- Query cancellation MUST pass TanStack Query's `AbortSignal` to Axios through the `signal` option. Deprecated Axios `CancelToken` MUST NOT be introduced.
- Response payloads MUST remain unknown until validated or translated by a feature API boundary when runtime integrity matters.
- Axios-specific types and errors MUST NOT leak into view components.

Install Axios as a runtime dependency:

```sh
pnpm add axios
```

### 11.3 Client Factory and Service Instances

The shared client factory MUST own cross-cutting transport behavior. It SHOULD configure only policies common to clients created through it.

```ts
// Third-party libraries
import axios from 'axios'

// Shared infrastructure and utilities
import { normalizeApiError } from './api-error'

// Types
import type { AxiosInstance, CreateAxiosDefaults } from 'axios'

type CreateApiClientOptions = {
  baseURL: string
  timeoutMs?: number
  withCredentials?: boolean
  defaults?: Omit<CreateAxiosDefaults, 'baseURL' | 'timeout' | 'withCredentials'>
}

export function createApiClient({
  baseURL,
  timeoutMs = 15_000,
  withCredentials = true,
  defaults,
}: CreateApiClientOptions): AxiosInstance {
  const client = axios.create({
    ...defaults,
    baseURL,
    timeout: timeoutMs,
    withCredentials,
    headers: {
      Accept: 'application/json',
      ...defaults?.headers,
    },
  })

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  )

  return client
}
```

Each service client MUST be created in a dedicated module:

```ts
// Shared API infrastructure
import { createApiClient } from '../create-api-client'

// Configuration
import { env } from '@/shared/config/env'

export const coreApi = createApiClient({
  baseURL: env.VITE_CORE_API_URL,
  timeoutMs: 15_000,
  withCredentials: true,
})
```

```ts
// Shared API infrastructure
import { createApiClient } from '../create-api-client'

// Configuration
import { env } from '@/shared/config/env'

export const reportingApi = createApiClient({
  baseURL: env.VITE_REPORTING_API_URL,
  timeoutMs: 30_000,
  withCredentials: true,
})
```

Service-instance rules:

- Instance names MUST describe the service, such as `coreApi`, `reportingApi`, or `billingApi`; names such as `api2` MUST NOT be used.
- A service base URL MUST come from validated configuration.
- URLs passed to service instances SHOULD be relative paths beginning with `/`.
- An absolute per-request URL MUST NOT be accepted from untrusted user input.
- Third-party APIs requiring a secret, private key, or server-side signature MUST be called through a controlled back-end proxy, never directly from the browser.
- Service-specific interceptors SHOULD be registered in the service client module, not in feature components.
- Interceptors registered dynamically MUST be ejected during teardown to prevent duplication. Application-lifetime interceptors SHOULD be registered once during module initialization.

### 11.4 Request and Response Interceptors

Interceptors MAY implement cross-cutting behavior such as:

- attaching an in-memory access token when a cookie session is not available;
- attaching a CSRF token according to the back-end contract;
- propagating request, trace, tenant, or locale headers;
- normalizing Axios errors;
- coordinating an authorized session refresh;
- collecting redacted timing and failure telemetry.

Interceptors MUST obey these constraints:

- Request interceptors MUST NOT read authentication tokens from `localStorage` unless an approved threat model explicitly permits it.
- Authorization, cookie, CSRF, tenant, and correlation headers MUST be attached only to trusted service origins.
- The browser client MUST NOT attempt to set forbidden headers or solve CORS in Axios; CORS is a server and deployment policy.
- Response interceptors MUST reject normalized failures so TanStack Query can manage error state correctly.
- A `401` refresh flow MUST use a single shared in-flight refresh promise so concurrent failures do not create a refresh storm.
- An original request MUST be replayed at most once after refresh and MUST carry an internal retry marker to prevent loops.
- The refresh endpoint itself MUST bypass refresh interception.
- A failed refresh MUST clear authenticated client state, clear or partition protected query data, and transition to the signed-out flow.
- `403` MUST be handled as insufficient permission, not as an expired session by default.
- Automatic retries MUST NOT be applied blindly to non-idempotent requests. Retried mutations SHOULD use a server-supported idempotency key when duplicate execution is possible.
- Logging interceptors MUST redact credentials, cookies, tokens, personal data, and sensitive request or response bodies.

### 11.5 Error Normalization

All transport failures MUST be converted to an application-owned error contract before reaching features or UI:

```ts
export type ApiError = {
  kind: 'http' | 'network' | 'timeout' | 'cancelled' | 'unknown'
  code: string
  message: string
  status?: number
  correlationId?: string
  fieldErrors?: Record<string, string[]>
  cause?: unknown
}
```

- Error normalization MUST use `axios.isAxiosError` rather than unsafe assertions.
- Cancellation MUST be distinguishable from failure and SHOULD NOT trigger an error toast.
- Server error bodies MUST be validated before their fields are used.
- The normalized message MUST be safe for users or treated as a localization key. Raw server messages MUST NOT be displayed by default.
- UI code MUST branch on stable `kind`, `code`, or `status` values, never human-readable strings.
- Correlation identifiers SHOULD be retained and displayed where they help support investigations.
- The original cause MAY be retained for approved monitoring, but MUST NOT be rendered or serialized with sensitive data.

### 11.6 Feature API Modules

Feature API modules MUST translate HTTP and transport details into domain-oriented operations. Components, routes, and hooks MUST NOT call Axios directly.

```ts
// Shared API clients
import { coreApi } from '@/shared/api/clients/core-api'

// Schemas
import { userListResponseSchema } from '../schemas/user-response.schema'

// Types
import type { UserListFilters, UserListResult } from '../types/user'

export const usersApi = {
  async list(
    filters: UserListFilters,
    options: { signal?: AbortSignal } = {},
  ): Promise<UserListResult> {
    const response = await coreApi.get('/users', {
      params: filters,
      signal: options.signal,
    })

    // Validate at the feature boundary so malformed server data cannot enter
    // the query cache as a trusted UserListResult.
    return userListResponseSchema.parse(response.data)
  },
}
```

- Feature methods MUST use domain names such as `usersApi.disableMany`, not transport names such as `postUsersAction`.
- API request and response schemas SHOULD be colocated with the feature contract.
- Query-string serialization MUST be consistent for arrays, dates, and empty values and MUST match the back-end contract.
- File downloads MUST validate content type, filename, and error responses before presenting a successful download.
- Uploads SHOULD expose progress only when it provides meaningful user feedback.
- Generated API clients MAY be used, but they MUST receive the approved Axios instance or provide equivalent cancellation, security, and error behavior.
- API version changes MUST be isolated behind feature API modules so view components do not depend on transport version details.

### 11.7 Service, Custom Hook, and View Separation

Every feature API operation used by React UI MUST follow this dependency chain:

```text
Page or feature component
        ↓ imports
Feature custom query/mutation hook
        ↓ calls
Feature API service
        ↓ calls
Named, configured Axios instance
        ↓ sends
Back-end API
```

Responsibilities MUST remain separate:

| Layer | Owns | MUST NOT own |
| --- | --- | --- |
| Axios instance | Base URL, timeout, credentials, trusted headers, interceptors, transport-error normalization | Feature cache keys, toasts, navigation, form behavior |
| Feature API service | Endpoint path, HTTP method, request mapping, response parsing, domain return type | React hooks, query cache, component state, navigation, toasts |
| Custom query/mutation hook | TanStack Query lifecycle, query keys, invalidation, optimistic updates, reusable domain feedback | JSX, page layout, route-specific navigation, raw Axios error casting |
| Page/component | Form-to-command mapping, rendering, local UI state, page-specific callbacks and navigation | Direct Axios calls, endpoint paths, cache internals, transport-error parsing |

- A page or component MUST NOT import an API service directly when the operation is managed by TanStack Query.
- A page or component MUST NOT call `useQuery` or `useMutation` with an inline Axios request.
- The custom hook MUST be the only React-facing entry point for its query or mutation operation.
- A service MUST remain usable outside React, including route loaders, tests, background workflows, and other framework-independent code.
- The service MUST throw normalized failures and MUST NOT catch an error only to throw the unchanged value again.
- Feature hooks MUST depend on feature services, never the reverse.
- The standard applies to both read hooks such as `useCategories` and mutation hooks such as `useCreateCategories`.

### 11.8 Feature API Service Example

The service owns the HTTP operation and runtime response validation. It does not know about React, TanStack Query, toast messages, or navigation.

```ts
// Shared API clients
import { coreApi } from '@/shared/api/clients/core-api'

// Schemas
import { createCategoriesResponseSchema } from '../schemas/category-response.schema'

// Types
import type {
  CreateCategoriesInput,
  CreateCategoriesResponse,
} from '../types/category'

export async function createCategories(
  input: CreateCategoriesInput,
): Promise<CreateCategoriesResponse> {
  // Keep the misspelled legacy API field at the transport boundary while the
  // rest of the application uses the correct domain term `categories`.
  const request = {
    country: input.country,
    categorys: input.categories,
  }

  const response = await coreApi.post(
    '/food-delivery-service/v1/api/category',
    request,
  )

  // Parse the external payload before it enters the query cache or UI as
  // trusted category data.
  return createCategoriesResponseSchema.parse(response.data)
}
```

The associated types SHOULD use correct domain language:

```ts
export type CategoryFormValues = {
  name: string
  description?: string
}

export type CreateCategoriesInput = {
  country: string
  categories: CategoryFormValues[]
}

export type CreateCategoriesResponse = {
  code: string
  message?: string
}
```

- Request property names MUST match the approved API contract. If a legacy API requires a misspelled field such as `categorys`, the service MUST map from the correct domain name `categories` at the transport boundary.
- Services MUST declare explicit input and result types.
- A service SHOULD return domain data rather than the full `AxiosResponse` unless response headers or status are part of the feature contract.
- `try/catch` MUST be used only to recover, translate, enrich, or add required cleanup. A catch block that only performs `throw error` MUST be removed.

### 11.9 Custom Mutation Hook Example

The custom hook owns the mutation lifecycle shared by every consumer: calling the service, updating related cache state, and presenting consistent domain-level feedback.

```ts
// Third-party libraries
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// Shared utilities
import { getApiErrorMessage } from '@/shared/api/api-error'

// Feature API services
import { createCategories } from '../api/category.service'

// Feature query keys
import { categoryKeys } from '../api/category.keys'

// Types
import type { ApiError } from '@/shared/api/types'
import type {
  CreateCategoriesInput,
  CreateCategoriesResponse,
} from '../types/category'

export function useCreateCategories() {
  const queryClient = useQueryClient()

  return useMutation<
    CreateCategoriesResponse,
    ApiError,
    CreateCategoriesInput
  >({
    mutationFn: createCategories,
    onSuccess: async (data) => {
      // Invalidate every category-list variant because a successful create can
      // affect pagination, counts, filters, and sorting across multiple pages.
      await queryClient.invalidateQueries({
        queryKey: categoryKeys.lists(),
      })

      toast.success(data.message ?? 'Created successfully')
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, 'Failed to create categories'),
      )
    },
  })
}
```

Custom-hook rules:

- Hook names MUST follow `useVerbNoun` for mutations, such as `useCreateCategories`, `useUpdateUser`, or `useDeleteRole`.
- Hook filenames MUST use kebab-case, such as `use-create-categories.ts`.
- `mutationFn` SHOULD reference the service directly when its input matches the mutation variables. A wrapper function SHOULD be used only when it transforms or augments input.
- Query keys MUST come from the feature query-key factory; raw arrays such as `['categories']` MUST NOT be repeated across hooks.
- `invalidateQueries` SHOULD be used after a mutation when related cached data is no longer known to be correct. `refetchQueries` MAY be used when an immediate refetch of a specifically defined set is required even if it is not invalidated.
- An asynchronous cache operation SHOULD be returned or awaited from `onSuccess` when mutation completion must include cache synchronization.
- The hook MUST consume the normalized `ApiError` contract. It MUST NOT cast `unknown` to `AxiosError` or parse Axios response bodies itself.
- A reusable hook MAY own a standard toast when every consumer requires the same message.
- A hook and its caller MUST NOT both show feedback for the same outcome. When consumers need different messages or inline errors, the hook SHOULD expose the mutation state and let the consumer own presentation.
- Production hooks MUST NOT use `console.error` for routine mutation failures. Approved monitoring belongs in centralized error or observability infrastructure.
- Hook-level callbacks MUST handle cross-consumer effects. Per-call callbacks passed to `mutate` MUST handle consumer-specific effects.

### 11.10 Page and Component Consumption Example

The page imports only the custom hook. It owns form mapping and navigation specific to this page.

```tsx
// React and framework
import { useNavigate } from '@tanstack/react-router'

// Shared UI components
import { Card, CardContent } from '@/ui/primitives/card'
import { Breadcrumb } from '@/ui/patterns/breadcrumb'

// Feature components
import { FoodCategoryForm } from '../components/food-category-form'

// Hooks
import { useCreateCategories } from '../hooks/use-create-categories'

// Constants
import { foodCategoryBreadcrumbItems } from '../constants/breadcrumbs'

// Types
import type { CategoryFormValues } from '../types/category'

type CreateFoodCategoriesViewProps = {
  countryId: string
}

export function CreateFoodCategoriesView({
  countryId,
}: CreateFoodCategoriesViewProps) {
  const navigate = useNavigate()
  const {
    mutate: createFoodCategories,
    isPending: isCreatingFoodCategories,
  } = useCreateCategories()

  function handleCreateFoodCategories(values: CategoryFormValues[]) {
    createFoodCategories(
      {
        country: countryId,
        categories: values,
      },
      {
        onSuccess: () => {
          // Navigation belongs to this consumer; another consumer may create
          // categories inside a dialog and remain on the current route.
          void navigate({ to: '/food-category-management' })
        },
      },
    )
  }

  return (
    <>
      <Breadcrumb items={foodCategoryBreadcrumbItems} />

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <FoodCategoryForm
            isPending={isCreatingFoodCategories}
            onSubmit={handleCreateFoodCategories}
          />
        </CardContent>
      </Card>
    </>
  )
}
```

- Required mutation context such as `countryId` MUST be validated before reaching the page. It MUST NOT silently fall back to an empty string.
- Pages MAY rename `mutate`, `mutateAsync`, and state flags while destructuring when the domain-specific name improves readability.
- Page-specific `onSuccess`, `onError`, or `onSettled` callbacks MAY be supplied as the second argument to `mutate`.
- Components MUST disable or guard duplicate submissions while `isPending` is true.
- Forms SHOULD receive a semantic `isPending` or `disabled` prop and MUST NOT need knowledge of TanStack Query or Axios.

### 11.11 API Layer Testing

- The client factory MUST have focused tests for timeout, credential policy, headers, cancellation, and error normalization.
- Authentication-refresh tests MUST cover concurrent `401` responses, single replay, failed refresh, and refresh-loop prevention.
- Feature API tests MUST use MSW or an equivalent network boundary and MUST verify schema rejection for malformed responses.
- Custom-hook tests MUST verify service invocation, query-key invalidation, reusable feedback, and normalized error handling.
- Component tests MUST mock at the network boundary or inject the hook contract; they MUST NOT inspect Axios implementation details.
- Page tests SHOULD verify that valid form values reach the mutation and that navigation occurs only after success.
- Tests MUST NOT call real external services.
- Each configured service client MUST have at least one integration test proving it uses the expected base URL and service policy.

## 12. State Ownership

Before adding state, use this decision table:

| State kind | Required owner | Examples |
| --- | --- | --- |
| Server state | TanStack Query | users, permissions, reports, reference data |
| Shareable/navigation state | TanStack Router | page, search, filters, sort, selected tab |
| Form state | React Hook Form | values, touched fields, client validation |
| Local ephemeral UI state | React `useState` / `useReducer` | dialog open state, local selection, disclosure |
| Cross-route client state | Zustand | unsaved workflow draft, global command-palette state |
| Durable user preference | Server profile preferred; versioned storage when local | density, theme, dismissed hints |

- A value MUST have one authoritative owner.
- Derived state MUST be computed from its source rather than synchronized into a second store.
- Context MAY be used for stable dependency injection or tightly scoped compound components. It SHOULD NOT become an unstructured global store.
- Zustand MUST NOT be introduced when local state, URL state, or TanStack Query already solves the problem.

### 12.1 Zustand Rules

- Stores MUST be scoped by feature unless the state is truly application-wide.
- Components MUST subscribe through narrow selectors rather than consume the complete store.
- State and actions SHOULD be clearly separated in the store type.
- Store actions MUST express business intent, such as `selectRows`, not expose arbitrary setters by default.
- Persisted state MUST be minimal, versioned, migrated, and validated before use.
- Authentication secrets, access tokens, privileged payloads, and sensitive personal data MUST NOT be persisted in Zustand browser storage.
- Store reset behavior MUST be defined for logout, tenant changes, and test isolation.

## 13. Forms and Validation

- React Hook Form MUST manage non-trivial form state.
- Zod MUST define the client-side form schema and MUST be integrated through the supported resolver.
- The form value type SHOULD be inferred from the schema.
- Client validation improves usability but MUST NOT replace server validation.
- Server field errors MUST be mapped to fields when possible; form-level errors MUST be displayed in a clear summary or alert region.
- Labels, descriptions, required state, and errors MUST be programmatically associated with controls.
- Validation SHOULD normally occur on submit and then provide timely feedback on changed invalid fields. Aggressive validation on every keystroke SHOULD be avoided.
- Submit buttons MUST prevent unintended duplicate submissions while a mutation is pending.
- Unsaved-change protection SHOULD be provided for costly or high-risk forms.
- A form MUST define reset behavior after success, cancellation, record changes, and dialog reopening.
- API transport conversion SHOULD happen in a feature API or mapper, not inside presentational fields.
- Multi-step forms MUST define where draft state lives, how it is validated per step, and how it is recovered.

Example:

```tsx
const userFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email(),
  roleId: z.string().min(1, 'Role is required'),
})

type UserFormValues = z.infer<typeof userFormSchema>

const form = useForm<UserFormValues>({
  resolver: zodResolver(userFormSchema),
  defaultValues: { name: '', email: '', roleId: '' },
})
```

## 14. UI System, Tailwind CSS, and Accessibility

### 14.1 Component Layers

The UI system has three layers:

1. `ui/primitives/`: locally owned shadcn/ui and Radix-based primitives.
2. `ui/patterns/`: reusable application patterns such as `PageHeader`, `DataTable`, and `ConfirmActionDialog`.
3. `features/*/components/`: domain-specific components and compositions.

Rules:

- shadcn/ui source MUST be treated as owned code, reviewed, tested, and upgraded intentionally.
- Primitive changes MUST be made centrally, not patched differently in individual features.
- Radix UI accessibility behavior, keyboard behavior, focus management, and ARIA relationships MUST be preserved.
- Wrappers SHOULD add a stable product contract, not merely rename an existing primitive.
- Feature-specific rules MUST NOT be added to global primitives.
- A new shared abstraction SHOULD have multiple known consumers or encode a deliberate design-system rule.

### 14.2 Tailwind CSS

- Design tokens MUST be represented with theme variables or the project's approved Tailwind theme mechanism.
- Components MUST use semantic tokens such as background, foreground, muted, destructive, border, and focus-ring roles rather than scattered raw brand values.
- Dark mode, if supported, MUST use the same semantic token contract.
- Class composition MUST use the project `cn` utility or an equivalent conflict-aware helper.
- Runtime-generated class fragments such as `` `text-${color}-500` `` MUST NOT be used because static detection cannot reliably discover them. Use complete class mappings.
- Arbitrary values SHOULD be rare and justified by a design requirement.
- Repeated complex class combinations SHOULD be extracted into a component or variant definition, not a global CSS class by reflex.
- Inline styles MAY be used for genuinely dynamic values that cannot be represented safely through static classes or CSS variables.
- Responsive behavior MUST be deliberate. Admin dashboards SHOULD remain usable on supported smaller screens even when optimized for desktop.

### 14.3 Accessibility

The application MUST target WCAG 2.2 Level AA for user-facing workflows.

- Every interactive function MUST be operable by keyboard.
- Focus MUST be visible and MUST move predictably when dialogs, sheets, menus, and route transitions change context.
- Color MUST NOT be the only means of communicating state.
- Text and meaningful UI elements MUST meet required contrast.
- Icon-only controls MUST have accessible names and visible tooltips when their meaning is not obvious.
- Forms MUST expose accessible labels, descriptions, errors, and required state.
- Dynamic success, error, and loading announcements MUST use appropriate live regions without becoming noisy.
- Data tables MUST use correct header and caption semantics. Interactive tables MUST preserve a logical focus order.
- Reduced-motion preferences MUST be respected.
- Zoom, reflow, and text resizing MUST not hide essential actions or information.
- Automated accessibility checks SHOULD run in component and end-to-end tests, but they MUST NOT replace manual keyboard and screen-reader review of critical flows.

## 15. Admin Dashboard Interaction Standard

### 15.1 Application Shell

- The authenticated shell MUST provide consistent primary navigation, page identity, user/account controls, and a content landmark.
- Navigation visibility SHOULD reflect permissions, but hidden navigation MUST NOT be the only authorization control.
- The current location MUST be visually and programmatically identifiable.
- Breadcrumbs SHOULD be used for deep hierarchies, not as a substitute for clear page titles.
- Global actions and feature actions MUST be visually distinguishable.

### 15.2 Lists and Data Tables

- Large datasets MUST use server-side pagination, filtering, and sorting unless measured constraints support client-side operations.
- Page, page size, filter, and sort state SHOULD be represented in validated URL search parameters.
- Tables MUST define loading, empty, no-results, error, and populated states.
- Empty datasets and filtered no-results states MUST use different guidance.
- Row actions MUST have stable accessible labels that identify the affected record.
- Bulk selection MUST communicate the number and scope of selected records, especially when selection spans pages.
- Bulk actions MUST require confirmation when impact is destructive, broad, or difficult to reverse.
- Column visibility and density MAY be persisted as non-sensitive user preferences.
- Horizontal overflow MUST be intentional and discoverable; essential identity and actions SHOULD remain available.
- Export operations SHOULD communicate scope, format, progress, and completion.

TanStack Table MAY be used for complex headless table behavior. Its state ownership MUST still follow this standard.

### 15.3 Destructive and High-Risk Actions

- Destructive actions MUST use explicit verbs such as “Delete user,” not ambiguous labels such as “OK.”
- Irreversible or broad actions MUST present the object, scope, and consequence before confirmation.
- Confirmation dialogs MUST NOT be used for harmless, easily reversible actions.
- Typed confirmation MAY be required for exceptionally high-impact actions.
- If undo is reliable, reversible actions SHOULD prefer an undo window over unnecessary confirmation.
- Success messages MUST describe what changed. Failure messages MUST provide a safe next step and a correlation identifier when available.

### 15.4 Dates, Numbers, and Localization

- Dates, times, numbers, and currency MUST be formatted through shared locale-aware utilities.
- Stored or transported timestamps SHOULD use ISO 8601 and MUST identify timezone semantics.
- The UI MUST disclose the timezone when ambiguity could affect operations.
- User-visible strings SHOULD be externalizable when localization is planned or required.
- String concatenation MUST NOT be used to construct translatable sentences.
- Layouts MUST tolerate longer translated text without hiding actions or data.

## 16. Authentication, Authorization, and Security

- Authentication state MUST have one defined owner and lifecycle.
- Session cookies SHOULD be `HttpOnly`, `Secure`, and use an appropriate `SameSite` policy when the back end supports cookie-based sessions.
- Access tokens MUST NOT be stored in `localStorage` or persisted Zustand state unless an approved threat model explicitly accepts the risk.
- CSRF protection MUST be implemented for cookie-authenticated state-changing requests according to back-end policy.
- Authorization MUST be enforced by the server for every protected operation.
- Client RBAC or ABAC checks MAY hide or disable UI, but MUST treat server denial as authoritative.
- Permission checks SHOULD use capability-oriented names such as `canUpdateUser`, not scatter role-name comparisons throughout components.
- Tenant or organization changes MUST clear or partition relevant query caches and client state.
- `dangerouslySetInnerHTML` MUST NOT be used with untrusted input. Required rich content MUST be sanitized with an approved, maintained sanitizer.
- Secrets MUST NOT be included in the front-end bundle. All `VITE_*` variables are public to the client and MUST be treated accordingly.
- Content Security Policy and security headers SHOULD be configured by the serving platform.
- External links opened in a new tab MUST prevent opener access where applicable.
- Sensitive values and personal data MUST be redacted from logs, analytics, session replay, and error reports.
- Dependency and secret scanning SHOULD run in CI.
- Security-relevant events SHOULD include a server-generated correlation or audit identifier when available.

## 17. Environment and Configuration

- Environment variables MUST be read through one configuration module, not directly throughout the application.
- Environment configuration MUST be validated at application startup.
- Missing or invalid required configuration MUST fail clearly before the application performs business operations.
- Front-end environment variables MUST NOT contain secrets.
- Every API service MUST have an explicitly named URL variable such as `VITE_CORE_API_URL` or `VITE_REPORTING_API_URL`; a generic variable MUST NOT be silently reused for unrelated services.
- API URLs MUST be absolute `https:` URLs in production unless the application deliberately uses same-origin relative URLs through a gateway.
- Development-only `http:` API URLs MAY be allowed by the environment schema for local development.
- Trailing-slash behavior MUST be normalized so client `baseURL` and endpoint paths cannot create environment-dependent URLs.
- An API URL MUST NOT include credentials, access tokens, tenant identifiers, or other secrets.
- Environment-specific behavior SHOULD be controlled by deployment configuration or typed feature flags, not scattered hostname checks.
- Feature flags MUST define an owner, default, rollout behavior, failure behavior, and removal condition.
- Production builds MUST disable development-only tools unless explicitly approved.

Example:

```ts
const envSchema = z.object({
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']),
  VITE_CORE_API_URL: z.string().url(),
  VITE_REPORTING_API_URL: z.string().url(),
})

export const env = envSchema.parse(import.meta.env)
```

## 18. Error Handling and User Feedback

- The application MUST have a root error boundary and route-level boundaries where independent recovery is possible.
- Expected domain failures MUST be represented explicitly; they MUST NOT be treated as unknown application crashes.
- Error messages MUST be actionable, safe to expose, and appropriate to the user's permissions.
- Raw stack traces, database details, tokens, and server internals MUST NOT be rendered to users.
- Field errors belong near fields; page-loading errors belong in the page region; global failures belong at the application boundary.
- Toasts SHOULD be reserved for transient action feedback. They MUST NOT be the sole location for errors users need to inspect or correct.
- Loading indicators SHOULD be delayed or stabilized when necessary to avoid flicker.
- Skeletons SHOULD resemble the final layout and MUST NOT imply content that may never exist.
- Long-running operations SHOULD show progress or a persistent pending state.
- Retry actions MUST be safe for the underlying operation.
- Every async screen MUST define loading, success, empty, permission-denied, and error behavior as applicable.

## 19. Performance Standard

- Production performance MUST be measured using representative data and supported devices.
- Route-level code splitting MUST be the default for substantial pages and features.
- Large editors, charting packages, export tools, and infrequently used dialogs SHOULD be loaded on demand.
- Bundle size budgets SHOULD be defined and enforced in CI for initial and route-level JavaScript.
- Dependencies MUST NOT be added without considering their shipped size and execution cost.
- Query caching MUST reduce redundant requests without presenting unacceptably stale operational data.
- Large lists SHOULD use pagination. Virtualization MAY be used when rendering volume, not API volume, is the measured bottleneck.
- Images and icons MUST use appropriate dimensions and formats. Decorative images SHOULD not block critical rendering.
- `useMemo`, `useCallback`, and `memo` MUST NOT be added mechanically; use them when profiling or referential contracts justify them.
- Expensive filtering or aggregation SHOULD occur on the server for large datasets.
- Performance regressions in critical flows MUST block release when they exceed the agreed budget.

## 20. Testing Standard

Tests MUST provide confidence in user-visible behavior and critical business rules, not mirror implementation details.

### 20.1 Test Layers

| Layer | Tool | Scope |
| --- | --- | --- |
| Unit | Vitest | Pure functions, schemas, mappers, permission rules, stores |
| Component/integration | React Testing Library + Vitest + MSW | Forms, views, async states, user interaction |
| End-to-end | Playwright | Authentication, authorization, critical CRUD, high-risk workflows |

### 20.2 Required Practices

- New or changed business logic MUST be covered by an appropriate automated test.
- Critical authentication, permission, financial, destructive, and data-integrity paths MUST have end-to-end or integration coverage.
- Tests MUST assert observable behavior through roles, labels, visible text, navigation, and requests.
- Tests SHOULD query elements by accessible role and name.
- Tests MUST NOT depend on arbitrary sleeps. They MUST wait for observable conditions.
- API interaction tests SHOULD use MSW at the network boundary rather than mock TanStack Query internals.
- Tests SHOULD exercise feature API modules through MSW rather than mock Axios methods or interceptors in component tests.
- Axios factory and interceptor unit tests MAY mock the adapter when the transport policy itself is the subject under test.
- Tests MUST verify distinct configuration and authentication behavior when the application connects to multiple APIs.
- Test data factories SHOULD produce valid defaults and allow focused overrides.
- Tests MUST be deterministic and independent of execution order.
- Flaky tests MUST be fixed or quarantined with an owner, issue, and expiration date; they MUST NOT be silently retried indefinitely.
- Coverage thresholds MUST be configured and may increase over time. A project SHOULD begin with at least 80% statement and branch coverage for testable application logic.
- Coverage percentage MUST NOT substitute for meaningful scenario coverage.
- Permission matrices, schema boundary cases, mutation failures, and recovery paths MUST be tested explicitly.
- Visual regression testing MAY be used for stable, high-value UI patterns.

### 20.3 Test Placement

- Unit and component tests SHOULD be colocated with the source they protect.
- Shared test utilities MUST live in `src/test/`.
- Cross-route browser journeys MUST live in `tests/e2e/`.
- Production code MUST NOT import from test directories.

## 21. Linting, Formatting, and Static Quality

### 21.1 ESLint

ESLint MUST enforce, at minimum:

- TypeScript correctness-oriented rules;
- React Hooks rules;
- TanStack Query rules where applicable;
- import hygiene and prevention of cycles or restricted cross-feature imports;
- no floating promises where type-aware linting supports it;
- no unused variables and imports;
- accessibility rules for JSX where supported;
- prohibition of debug statements and unsafe TypeScript escapes in production code.

Import-order enforcement SHOULD preserve the section-comment groups defined in [Import Organization](#71-import-organization). If an automated sorter cannot preserve those boundaries, it MUST be configured to sort only within groups or be replaced.

Lint rules MUST NOT be disabled repository-wide to solve a local issue. Local suppression requires a concise reason.

### 21.2 Formatter Choice

Each repository MUST select exactly one formatting strategy:

- **Option A:** ESLint for linting and Prettier for formatting; or
- **Option B:** ESLint for semantic/framework linting and Biome for formatting and import organization.

The project MUST NOT run Prettier and Biome over the same files. If Biome linting is also enabled, overlapping rules with ESLint MUST be intentionally disabled in one tool.

- Formatting MUST be deterministic and checked in CI.
- Formatting arguments MUST NOT consume code-review discussion.
- Editor configuration SHOULD format on save and surface lint errors.
- Import sorting MUST be handled by one tool only.

### 21.3 Required Scripts

The project SHOULD provide a stable script contract:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --max-warnings=0",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Commands MAY differ for Biome or project references, but the script names SHOULD remain predictable.

## 22. Git, Review, and CI Quality Gates

### 22.1 Change Discipline

- Each change SHOULD have one coherent purpose.
- Generated code and dependency-lock changes MUST be reviewed with their source change.
- Large mechanical changes SHOULD be separated from behavior changes.
- Commits SHOULD follow a consistent convention such as Conventional Commits.
- Pull requests MUST explain intent, risk, verification, and visible UI changes.
- User-facing UI changes SHOULD include screenshots or recordings for relevant states and viewport sizes.

### 22.2 Review Checklist

Reviewers MUST consider:

- architecture boundary compliance;
- correct state ownership;
- schema validation at untrusted boundaries;
- permission and tenant behavior;
- success, loading, empty, error, and denied states;
- keyboard and screen-reader usability;
- query invalidation and cache correctness;
- form and destructive-action behavior;
- test quality and regression risk;
- sensitive-data exposure;
- bundle or runtime impact.

### 22.3 CI Pipeline

Every merge request MUST pass equivalent checks:

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test:run
pnpm build
pnpm test:e2e
```

- Fast static checks and unit tests SHOULD run before slower browser tests.
- End-to-end tests MAY be split by risk or executed against a deployed preview, but critical flows MUST block release.
- CI MUST use the declared Node and pnpm versions.
- Warnings SHOULD be treated as failures for linting and TypeScript.
- Protected branches MUST NOT accept changes when required checks fail.
- Production deployment SHOULD preserve source maps in a private error-monitoring system without exposing source unnecessarily.

## 23. Observability and Operations

- Unexpected client errors SHOULD be reported to an approved monitoring system with release, environment, route, and correlation context.
- Telemetry MUST avoid secrets and minimize personal data.
- Error monitoring MUST group actionable failures and support release comparison.
- Important workflows SHOULD record product or operational events using stable names and typed properties.
- Analytics MUST NOT be triggered during render.
- Network and error logging MUST redact authorization headers, cookies, tokens, and sensitive payload fields.
- Front-end releases SHOULD be traceable to a commit and build identifier.
- A production incident fix MUST include a regression test where practical.

## 24. Governance and Exceptions

- This document MUST have a named owning team or maintainer in the adopting organization.
- Changes to MUST-level rules require review from the standard's owner and affected platform or security owners.
- An exception MUST document:
  - the rule being waived;
  - the scope and owner;
  - the technical and business reason;
  - risks and compensating controls;
  - an expiration or review date.
- Architectural decisions that change dependency direction, state ownership, security posture, or core tooling MUST be recorded in an Architecture Decision Record (ADR).
- Temporary migrations MAY violate a target rule only when the migration state, enforcement boundary, and removal plan are explicit.
- The standard SHOULD be reviewed at least twice per year and after major ecosystem upgrades.

## 25. Definition of Done

A feature is done only when all applicable statements are true:

- [ ] The feature follows the approved directory and dependency boundaries.
- [ ] Public types and behavior are explicit and minimal.
- [ ] External input is validated at the correct boundary.
- [ ] Server, URL, form, local, and global state have clear owners.
- [ ] Query keys, caching, invalidation, and cancellation are correct.
- [ ] Feature requests use the correct named Axios service client and normalize transport failures.
- [ ] React consumers reach API services through feature custom query or mutation hooks.
- [ ] Import groups and non-obvious logic follow the required comment conventions.
- [ ] The success, loading, empty, error, and permission-denied states are implemented.
- [ ] Keyboard navigation, focus management, labels, and announcements are verified.
- [ ] Destructive and high-risk actions communicate scope and consequence.
- [ ] Tests cover the changed business behavior and important failure paths.
- [ ] No secrets or sensitive data are exposed in storage, logs, URLs, or telemetry.
- [ ] Type checking, linting, formatting, tests, and production build pass.
- [ ] User-facing changes are documented for reviewers.
- [ ] Temporary flags, exceptions, or follow-up work have owners and removal conditions.

## 26. Architecture Decision Quick Reference

When implementing a requirement, use this sequence:

1. **Is the value remote data?** Use TanStack Query.
2. **Does a feature call an HTTP API?** Put the operation in a feature service that uses its named Axios client.
3. **Does React UI consume that operation?** Expose it through a feature custom query or mutation hook.
4. **Should a refresh, bookmark, or shared link preserve it?** Use validated TanStack Router state.
5. **Does it exist only while editing a form?** Use React Hook Form.
6. **Does only one component subtree need it?** Use local React state or scoped context.
7. **Is it client-only and genuinely shared across distant routes?** Consider a narrowly selected Zustand store.
8. **Is the code business-specific?** Keep it in the owning feature.
9. **Is it domain-neutral with a stable multi-feature contract?** Consider `shared/` or `ui/`.
10. **Is input controlled outside the module?** Validate it, normally with Zod.
11. **Does the user have permission in the UI?** Improve the experience, then rely on the server for enforcement.
12. **Can the behavior fail?** Design the failure and recovery path before declaring it complete.

## 27. Anti-Patterns

The following are prohibited or strongly discouraged:

- a global `components/` directory containing feature-specific UI;
- fetching data in `useEffect` when TanStack Query should own it;
- copying query responses into Zustand;
- storing table filters only in component state when they should be shareable;
- role-name checks scattered throughout JSX;
- route files containing substantial business logic;
- feature-to-feature deep imports;
- unvalidated casts of API responses or URL state;
- broad `any`, `@ts-ignore`, or non-null assertions used to silence design problems;
- dynamic Tailwind class construction that static scanning cannot detect;
- clickable `div` elements replacing semantic buttons or links;
- a toast as the only presentation of a recoverable form or page error;
- arbitrary test sleeps and implementation-detail assertions;
- tokens or sensitive data in local storage, URLs, logs, or analytics;
- direct feature or component calls through the global Axios export;
- components or pages importing feature API services instead of feature query or mutation hooks;
- inline Axios requests inside `useQuery`, `useMutation`, or event handlers;
- feature hooks that cast `unknown` to `AxiosError` and parse transport response bodies;
- service `catch` blocks that only throw the same error again;
- duplicated raw query-key arrays instead of a feature query-key factory;
- one Axios instance shared across services with different origins, credentials, or trust boundaries;
- refresh-token interceptors that can replay a request repeatedly or trigger concurrent refresh storms;
- setting multipart `Content-Type` globally and overriding the browser-generated boundary;
- comments that merely restate the next line of code or remain after the behavior changes;
- unlabelled import groups in component, route, hook, or API files that contain multiple import categories;
- both Prettier and Biome formatting the same source files;
- abstractions created before a stable repeated pattern exists;
- client-side authorization presented as a security control.

## 28. Reference Configuration Baseline

The following settings represent the expected direction, not a copy-paste substitute for current official setup instructions:

```jsonc
// tsconfig application options
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "useUnknownInCatchVariables": true,
    "verbatimModuleSyntax": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Projects MUST adapt configuration to the installed tool versions and MUST keep build-tool, editor, test, and TypeScript aliases consistent.

## 29. Official References

Use official documentation as the source of truth for version-specific APIs and migrations:

- [Vite documentation](https://vite.dev/guide/)
- [React documentation](https://react.dev/)
- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [TanStack Router documentation](https://tanstack.com/router/latest/docs/overview)
- [TanStack Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Axios documentation](https://axios-http.com/docs/intro)
- [Tailwind CSS documentation](https://tailwindcss.com/docs/)
- [shadcn/ui documentation](https://ui.shadcn.com/docs)
- [Radix Primitives documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Zod documentation](https://zod.dev/)
- [React Hook Form documentation](https://react-hook-form.com/get-started)
- [Zustand documentation](https://zustand.docs.pmnd.rs/)
- [ESLint documentation](https://eslint.org/docs/latest/)
- [Prettier documentation](https://prettier.io/docs/)
- [Biome documentation](https://biomejs.dev/guides/getting-started/)
- [pnpm documentation](https://pnpm.io/)
- [Vitest documentation](https://vitest.dev/guide/)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles/)
- [MSW documentation](https://mswjs.io/docs/)
- [Playwright documentation](https://playwright.dev/docs/intro)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## 30. Expected Outcomes

1. **Predictable Architecture** — Clear boundaries make the system easier to understand and change.
2. **Faster, Safer Delivery** — Shared patterns reduce repeated decisions, rework, and onboarding time.
3. **Reliable Quality** — Type safety, validation, testing, and CI catch defects before production.
4. **Secure and Accessible Operations** — Layered security and inclusive UX protect users, data, and critical workflows.
5. **Sustainable Evolution** — Modular features and explicit governance let the product scale without uncontrolled complexity.

---