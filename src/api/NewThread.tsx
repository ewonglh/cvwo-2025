import apiClient from './apiClient';

export async function NewThread(title: string, body: string) {
  try {
    const response = await apiClient.post('/newThread', { title, body });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}