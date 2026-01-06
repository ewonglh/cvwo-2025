import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Container, CssBaseline } from '@mui/material';
import AppTheme from '../theme/AppTheme';
import NavBar from "../components/NavBar";

// Note to self: Outlet is where child routes will be rendered

const RootLayout = () => (
  <>
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Container // Spacing for the NavBar
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
      <NavBar />
      <Outlet />
      </Container>
    </AppTheme>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout });