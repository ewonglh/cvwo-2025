import apiClient from './apiClient';

export type ThreadAction = 'upvote' | 'downvote' | 'edit' | 'delete' | 'unvote';

interface ThreadActionPayload {
  threadId: number;
  action: ThreadAction;
  title?: string;
  body?: string;
}

export async function threadAction(payload: ThreadActionPayload) {
  try {
    const response = await apiClient.post('/threadActions', payload);
    return response.data;
  } catch (error) {
    console.error(`Error performing ${payload.action} on thread ${payload.threadId}:`, error);
    throw error;
  }
}
// Just copied from commentActions
export const upvoteThread = (threadId: number) => threadAction({ threadId, action: 'upvote' });
export const downvoteThread = (threadId: number) => threadAction({ threadId, action: 'downvote' });
export const unvoteThread = (threadId: number) => threadAction({ threadId, action: 'unvote' });
export const editThread = (threadId: number, title: string, body: string) => threadAction({ threadId, action: 'edit', title, body });
export const deleteThread = (threadId: number) => threadAction({ threadId, action: 'delete' });
