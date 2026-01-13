import axios from 'axios';

export async function CreatePost(title: string, body: string) {
  try {
    const response = await axios.post('/createThread', { title, body });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}