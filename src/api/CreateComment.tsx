import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

export async function CreateComment(threadId: number, body: string) {
  try {
    const response = await axios.post(`${API_URL}/createComment`, { threadId, body });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}