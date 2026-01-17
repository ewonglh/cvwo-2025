import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../pages/HomePage'
import { FetchThreads } from '../api/FetchThreads'
import HomePageSkeleton from '../pages/skeletons/HomePageSkeleton'
import { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'

const HomeErrorComponent = ({ error, reset }: { error: Error, reset: () => void }) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!showError) {
    return <HomePageSkeleton />;
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" color="error" gutterBottom>
        Failed to load threads
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {error.message || 'An unexpected error occurred.'}
      </Typography>
      <Button variant="contained" onClick={() => reset()}>
        Try Again
      </Button>
    </Box>
  );
};

export const Route = createFileRoute('/home')({
  component: HomePage,
  loader: () => FetchThreads(),
  pendingComponent: HomePageSkeleton,
  errorComponent: HomeErrorComponent,
});

