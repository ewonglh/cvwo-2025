import apiClient from './apiClient';
import errorMessages from '../data/errorMessages.json';
import { Thread } from '../interfaces/Thread';
import { Comment } from '../interfaces/Comment';

const mapThread = (thread: any): Thread => ({
  ...thread,
  threadId: Number(thread.threadId || 0),
  author: thread.author || thread.username || 'Anonymous',
  upvote: Number(thread.upvote || 0),
  downvote: Number(thread.downvote || 0),
  timestamp: new Date(thread.timestamp),
  userVote: thread.userVote || null,
});

const mapComment = (comment: any): Comment => ({
  ...comment,
  commentId: Number(comment.commentId || 0),
  threadId: Number(comment.threadId || 0),
  author: comment.author || comment.username || 'Anonymous',
  upvote: Number(comment.upvote || 0),
  downvote: Number(comment.downvote || 0),
  timestamp: new Date(comment.timestamp),
  userVote: comment.userVote || null,
});

export async function FetchThreads(): Promise<Thread[]> {
  try {
    const response = await apiClient.get(`/getThreads`);
    const data = Array.isArray(response.data) ? response.data : [];
    return data.map(mapThread);
  } catch (error) {
    console.error(errorMessages.FetchThreads, error);
    throw error;
  }
}

export async function FetchThread(id: number): Promise<{ thread: Thread; comments: Comment[] }> {
  try {
    const response = await apiClient.get(`/getThreadById?threadId=${id}`);
    const threadData = Array.isArray(response.data) ? response.data[0] : response.data;
    if (!threadData) throw new Error("Thread not found");

    return {
      thread: mapThread(threadData),
      comments: (threadData.comments || []).map(mapComment),
    };
  } catch (error) {
    console.error('Error fetching thread:', error);
    throw error;
  }
}

export async function FetchCommentsByThread(threadId: number): Promise<Comment[]> {
  try {
    const { comments } = await FetchThread(threadId);
    return comments;
  } catch (error) {
    console.error('Error fetching comments for thread:', error);
    throw error;
  }
}
