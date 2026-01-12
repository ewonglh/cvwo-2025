import axios from 'axios';
import errorMessages from '../data/errorMessages.json';

export async function FetchThreads() {
  try {
    const response = await axios.get('/getThreads');
    return response.data;
  } catch (error) {
    console.error(errorMessages.FetchThreads, error);
    throw error;
  }
}