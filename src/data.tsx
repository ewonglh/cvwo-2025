import { Thread } from "./interfaces/Thread";
import { Comment } from "./interfaces/Comment";

export const threadData : Thread[] = [
  {
    id: 1,
    author: "Admin",
    upvote: 10,
    downvote: 2,
    postType: "text",
    title: "Welcome to the forum!",
    body: "This is the first thread in our new forum. Feel free to discuss anything here. Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ! 😊",
    timestamp: new Date()
  },
  {
    id: 2,
    author: "User123",
    upvote: 5,
    downvote: 1,
    postType: "text",       
    title: "How to learn React?",
    body: "I've been trying to learn React for a while now. Any tips or resources that could help?",
    timestamp: new Date()
  },
  {
    id: 3,
    author: "Dev123",
    upvote: 8,
    downvote: 0,
    postType: "text",
    title: "Best practices for state management",
    body: "What are some of the best practices for managing state in large React applications?",
    timestamp: new Date()
  },
  {
    id: 4,
    author: "User456",
    upvote: 3,
    downvote: 0,
    postType: "text",
    title: "CSS in JS vs Traditional CSS",
    body: "What are your thoughts on using CSS-in-JS libraries compared to traditional CSS or SASS?",
    timestamp: new Date()   
  }
];

export const commentData : Comment[] = [
        {id: 1, threadId: 1, author: "Commenter1", body: "This is a comment.", upvote: 2, downvote: 0, timestamp: new Date()},
        {id: 2, threadId: 1, author: "Commenter2", body: "This is another comment.", upvote: 1, downvote: 1, timestamp: new Date()},
        {id: 3, threadId: 2, author: "Learner", body: "I found the official React documentation very helpful!", upvote: 4, downvote: 0, timestamp: new Date()},
        {id: 4, threadId: 3, author: "StateMaster", body: "Using Redux or Context API can help manage state effectively.", upvote: 3, downvote: 0, timestamp: new Date()},
        {id: 5, threadId: 4, author: "CSSGuru", body: "CSS-in-JS offers better component encapsulation, but traditional CSS is more straightforward for global styles.", upvote: 2, downvote: 0, timestamp: new Date()}
    ]; 

export function getThreadById(id: number) : Thread | undefined {
    return threadData.find((thread) => thread.id === id);
}

export function getCommentsByThreadId(threadId: number) : Comment[] {
    return commentData.filter((comment) => comment.threadId === threadId);
}

export function addCommentToThread(threadId: number, author: string, body: string) : Comment {
    const newComment: Comment = {
        id: commentData.length + 1, 
        threadId,
        author,
        body,   
        upvote: 0,
        downvote: 0,
        timestamp: new Date()
    };
    commentData.push(newComment);
    return newComment;
}
export function addThread(title: string, author: string, body: string) : Thread {
    const newThread: Thread = {
        id: threadData.length + 1,
        author,
        upvote: 0,
        downvote: 0,
        postType: "text",
        title,
        body,
        timestamp: new Date()
    };
    threadData.push(newThread);
    return newThread;
}

export function addUpvoteToThread(threadId: number) : void {
    const thread = getThreadById(threadId);
    if (thread) {
        thread.upvote += 1;
    }
}

export function addDownvoteToThread(threadId: number) : void {
    const thread = getThreadById(threadId);
    if (thread) {
        thread.downvote += 1;
    }
}
export function addUpvoteToComment(commentId: number) : void {
    const comment = commentData.find((c) => c.id === commentId);
    if (comment) {
        comment.upvote += 1;
    }
}
export function addDownvoteToComment(commentId: number) : void {
    const comment = commentData.find((c) => c.id === commentId);
    if (comment) {
        comment.downvote += 1;
    }
}