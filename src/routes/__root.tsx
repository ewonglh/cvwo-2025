import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import AppTheme from '../theme/AppTheme';
import NavBar from "../components/NavBar";
import HomePageSkeleton from '../pages/skeletons/HomePageSkeleton';
import { useState, useEffect } from 'react';

// Note to self: Outlet is where child routes will be rendered

const NotFoundComponent = () => {
  return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4">404 - Page Not Found</Typography>
          <Typography variant="body1">The page you are looking for does not exist.</Typography>
          <Link to="/home">Go to Home</Link>
        </Box>
  );
};

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

export const Route = createRootRoute({ 
  component: RootLayout,
  notFoundComponent: NotFoundComponent,
});