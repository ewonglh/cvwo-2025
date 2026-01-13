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

export async function FetchThread(id : number) {
  try {
    const response = await axios.get(`/getThread/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching thread:', error);
    throw error;
  }
}