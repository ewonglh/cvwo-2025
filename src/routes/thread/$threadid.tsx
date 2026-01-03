import { createFileRoute } from '@tanstack/react-router';
import ThreadView from '../../pages/ThreadView';
import { getCommentsByThreadId, getThreadById } from '../../data';

export const Route = createFileRoute('/thread/$threadid')({
    loader: async ({ params }) => {
        return { thread : getThreadById(Number(params.threadid)), comments : getCommentsByThreadId(Number(params.threadid)) };
    },
    component: ThreadView,
});
