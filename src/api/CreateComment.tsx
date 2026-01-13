import axios from 'axios';

export async function CreateComment(threadId: number, body: string) {
  try {
    const response = await axios.post('/createComment', { threadId, body });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}