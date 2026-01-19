import apiClient from './apiClient';

export async function NewComment(threadId: number, body: string) {
  try {
    const response = await apiClient.post('/newComment', { threadId, body });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}