import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import Cookie from 'js-cookie';
import { getCsrfToken } from './api/apiClient';

// Reminders for myself: 
// StrictMode identifies potential problems in an application (eg. outdated dependencies)
// StyledEngineProvider injectFirst makes sure MUI styles are loaded first (so they can be overridden)

// Create a new router instance
const router = createRouter({ routeTree })

// Fetch CSRF token on startup
getCsrfToken().catch(err => console.error("Failed to fetch CSRF token", err));

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}