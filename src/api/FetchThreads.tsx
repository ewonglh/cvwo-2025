import axios from 'axios';
import errorMessages from '../data/errorMessages.json';
import { Thread } from '../interfaces/Thread';

const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

export async function FetchThreads(): Promise<Thread[]> {
  try {
    const response = await axios.get(`${API_URL}/getThreads`);
    return response.data.map((thread: any) => ({
      ...thread,
      timestamp: new Date(thread.timestamp),
    }));
  } catch (error) {
    console.error(errorMessages.FetchThreads, error);
    throw error;
  }
}

export async function FetchThread(id : number): Promise<Thread> {
  try {
    const response = await axios.get(`${API_URL}/getThread/${id}`);
    const thread = response.data;
    return {
      ...thread,
      timestamp: new Date(thread.timestamp),
    };
  } catch (error) {
    console.error('Error fetching thread:', error);
    throw error;
  }
}