import axios from 'axios';
import errorMessages from '../data/errorMessages.json';

const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

export async function FetchComments() {
  try {
    const response = await axios.get(`${API_URL}/getComments`);
    return response.data;
  } catch (error) {
    console.error(errorMessages.FetchComments, error);
    throw error;
  }
}

export async function FetchCommentsByThread(threadId: number) {
  try {
    const response = await axios.get(`${API_URL}/getComments?threadId=${threadId}`);
    return response.data;
  } catch (error) {
    console.error(errorMessages.FetchComments, error);
    throw error;
  }
}