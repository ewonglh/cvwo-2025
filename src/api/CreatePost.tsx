import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

export async function CreatePost(title: string, body: string) {
  try {
    const response = await axios.post(`${API_URL}/createThread`, { title, body });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}