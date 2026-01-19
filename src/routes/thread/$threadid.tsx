import { createFileRoute } from '@tanstack/react-router';
import ThreadView from '../../pages/ThreadView';
import { FetchThread } from '../../api/FetchThreads';
import ThreadViewSkeleton from '../../pages/skeletons/ThreadViewSkeleton';
import { Box, Typography, Button } from '@mui/material';

export const Route = createFileRoute('/thread/$threadid')({
    loader: async ({ params }) => {
        const threadId = Number(params.threadid);
        return await FetchThread(threadId);
    },
    component: ThreadView,
    pendingComponent: ThreadViewSkeleton,
    errorComponent: ({ error, reset }) => (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="error">Error loading thread</Typography>
            <Typography variant="body1">{error.message}</Typography>
            <Button onClick={() => reset()} sx={{ mt: 2 }}>Try Again</Button>
        </Box>
    ),
});
