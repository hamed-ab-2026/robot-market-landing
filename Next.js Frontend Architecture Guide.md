# Next.js Frontend Architecture Guide

## Objective

This document defines the architecture rules for this Next.js project.

Before implementing new features, refactoring existing code, or creating new modules, read and follow this architecture.

The goal is to create a scalable, production-ready frontend suitable for a professional development team.

---

# Technology Stack

The project must use:

- Next.js (App Router)
- React
- TypeScript
- Redux Toolkit
- Axios
- Tailwind CSS
- Ant Design

Do not introduce alternative frameworks or libraries unless explicitly requested.

---

# Architecture Pattern

Use:

## Feature-Based Architecture

Organize code around business features, not technical file types.

Avoid:

```
src/

components/
pages/
services/
utils/
```

as the main structure.

Use:

```
src/

├── app/
│   ├── (routes)/
│   ├── api/
│   ├── providers/
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── globals.css
│
├── features/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── companies/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── common/
│   └── layouts/
│
├── services/
│   ├── api/
│   ├── storage/
│   └── websocket/
│
├── store/
│
├── hooks/
│
├── lib/
│
├── types/
│
├── utils/
│
└── config/
```

---

# Next.js App Router Rules

Use Next.js App Router.

Routes must be created using:

```
app/
```

Example:

```
app/dashboard/page.tsx
```

creates:

```
/dashboard
```

Do not use React Router.

Do not manually create routing logic.

---

# Server Components vs Client Components

## Default Rule

All components should be Server Components by default.

Example:

```tsx
export default function UsersPage() {
    return <div>Users</div>;
}
```

---

## Client Components

Use Client Components only when required.

Examples:

- useState
- useEffect
- Redux hooks
- Browser APIs
- Event handlers

Then add:

```tsx
'use client';
```

at the top.

Example:

```tsx
'use client';

export default function LoginForm() {}
```

Do not add `"use client"` unnecessarily.

---

# Feature Structure

Each business feature must be isolated.

Example:

```
features/auth/

├── api/
│   └── auth.api.ts
│
├── components/
│   └── LoginForm.tsx
│
├── hooks/
│   └── useLogin.ts
│
├── store/
│   └── auth.slice.ts
│
├── schemas/
│   └── auth.schema.ts
│
├── types.ts
│
└── index.ts
```

Example business features:

```
features/

auth
users
companies
machines
inventory
sales
payments
reports
settings
```

---

# Component Architecture

## Shared Components

Reusable components belong here:

```
components/ui/
```

Examples:

```
Button
Modal
Input
Table
Dropdown
Form
```

These components must not contain business logic.

---

Business components belong inside features:

Example:

```
features/products/components/ProductCard.tsx
```

Not:

```
components/ProductCard.tsx
```

---

# API Architecture

All API communication must go through Axios.

Never call Axios directly inside components.

Wrong:

```tsx
function Users() {
    axios.get('/users');
}
```

Correct:

```
Component

↓

Hook

↓

Feature API

↓

Axios Service

↓

Backend API
```

---

Axios configuration:

```
services/api/

axios.ts
interceptors.ts
endpoints.ts
```

Example:

```ts
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

---

# Redux Toolkit Rules

Redux Toolkit is used only for global client state.

Examples:

- Authentication state
- User preferences
- Application settings
- Global UI state

Structure:

```
store/

├── index.ts
├── provider.tsx
└── slices/
```

Feature state:

```
features/auth/store/

auth.slice.ts
auth.selector.ts
```

---

Do not store everything in Redux.

Use:

```
useState
```

for local component state.

Use Redux only for shared application state.

---

# Redux Provider in Next.js

Redux Provider must be a Client Component.

Example:

```
store/provider.tsx
```

```tsx
'use client';

import {Provider} from 'react-redux';

export function ReduxProvider({children}) {
    return <Provider store={store}>{children}</Provider>;
}
```

Register it in:

```
app/layout.tsx
```

---

# TypeScript Rules

The project must be strongly typed.

Avoid:

```ts
any;
```

Prefer:

```ts
interface;
type;
generics;
unknown;
```

Each feature owns its types:

Example:

```
features/users/types.ts
```

---

# Tailwind CSS Rules

Use Tailwind for:

- Layout
- Spacing
- Responsive design
- Custom styling

Example:

```tsx
<div className="flex items-center gap-4">
```

Avoid unnecessary CSS files.

Global CSS should only contain:

- Variables
- Theme
- Global styles

---

# Ant Design Rules

Use Ant Design for complex UI components:

Examples:

- Tables
- Forms
- Modal
- DatePicker
- Dropdown
- Pagination
- Notification

Use Tailwind for:

- Layout
- Positioning
- Spacing
- Responsive behavior

Do not rewrite Ant Design components unless required.

---

# Data Fetching Rules

Follow this structure:

```
Page

↓

Feature Component

↓

Custom Hook

↓

API Layer

↓

Axios

↓

Backend
```

Never put business API logic inside UI components.

---

# Dependency Rules

Features should remain independent.

Wrong:

```
features/products

imports

features/auth
```

Correct:

```
features/products

↓

services
components
utils
```

Shared logic belongs in:

```
components/
services/
utils/
lib/
```

---

# Refactoring Rules

When refactoring an existing project:

1. Analyze the current structure first.
2. Do not rewrite everything immediately.
3. Move code gradually into feature folders.
4. Preserve existing functionality.
5. Improve:
    - Type safety
    - Separation of concerns
    - API abstraction
    - Component reuse
    - State management

---

# Code Quality Rules

Every file should have one responsibility.

Avoid:

```
User.tsx

- UI
- API
- Validation
- State
```

Prefer:

```
UserCard.tsx

user.api.ts

useUser.ts

user.schema.ts
```

---

# Final Architecture Goal

The final project must be:

- Scalable
- Maintainable
- Team-friendly
- Type-safe
- Easy to test
- Ready for future features

Always prefer clean architecture over fast implementation.

Before creating code, understand where the code belongs in this architecture.
