import apiClient from './apiClient';

export type CommentAction = 'upvote' | 'downvote' | 'edit' | 'delete';

interface CommentActionPayload {
  commentId: number;
  action: CommentAction;
  body?: string;
}

export async function commentAction(payload: CommentActionPayload) {
  try {
    const response = await apiClient.post('/commentActions', payload);
    return response.data;
  } catch (error) {
    console.error(`Error performing ${payload.action} on comment ${payload.commentId}:`, error);
    throw error;
  }
}

export const upvoteComment = (commentId: number) => commentAction({ commentId, action: 'upvote' });
export const downvoteComment = (commentId: number) => commentAction({ commentId, action: 'downvote' });
export const editComment = (commentId: number, body: string) => commentAction({ commentId, action: 'edit', body });
export const deleteComment = (commentId: number) => commentAction({ commentId, action: 'delete' });
