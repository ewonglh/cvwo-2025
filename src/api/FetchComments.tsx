import axios from 'axios';
import errorMessages from '../data/errorMessages.json';

export async function FetchComments() {
  try {
    const response = await axios.get('/getComments');
    return response.data;
  } catch (error) {
    console.error(errorMessages.FetchComments, error);
    throw error;
  }
}

export async function FetchCommentsByThread(threadId: number) {
  try {
    const response = await axios.get(`/getComments?threadId=${threadId}`);
    return response.data;
  } catch (error) {
    console.error(errorMessages.FetchComments, error);
    throw error;
  }
}