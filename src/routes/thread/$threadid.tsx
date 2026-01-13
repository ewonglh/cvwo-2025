import { createFileRoute } from '@tanstack/react-router';
import ThreadView from '../../pages/ThreadView';
import { FetchThread } from '../../api/FetchThreads';
import { FetchCommentsByThread } from '../../api/FetchComments';

export const Route = createFileRoute('/thread/$threadid')({
    loader: async ({ params }) => {
        const threadId = Number(params.threadid);
        const thread = await FetchThread(threadId);
        const comments = await FetchCommentsByThread(threadId);
        return { thread, comments };
    },
    component: ThreadView,
});
