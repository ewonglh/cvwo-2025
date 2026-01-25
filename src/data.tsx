import { Thread } from "./interfaces/Thread";
import { Comment } from "./interfaces/Comment";

export const threadData : Thread[] = [
  {
    threadId: 1,
    author: "Admin",
    upvote: 10,
    downvote: 2,
    category: "General",
    img: null,
    edited: false,
    deleted: false,
    title: "Welcome to the forum!",
    body: "This is the first thread in our new forum. Feel free to discuss anything here. Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ! 😊",
    timestamp: new Date()
  },
  {
    threadId: 2,
    author: "User123",
    upvote: 5,
    downvote: 1,    
    category: "Help",
    img: null,
    edited: false,
    deleted: false, 
    title: "How to learn React?",
    body: "I've been trying to learn React for a while now. Any tips or resources that could help?",
    timestamp: new Date()
  },
  {
    threadId: 3,
    author: "Dev123",
    upvote: 8,
    downvote: 0,
    category: "Development",
    img: null,
    edited: false,
    deleted: false,
    title: "Best practices for state management",
    body: "What are some of the best practices for managing state in large React applications?",
    timestamp: new Date()
  },
  {
    threadId: 4,
    author: "User456",
    upvote: 3,
    downvote: 0,
    category: "Design",
    img: null,
    edited: false,
    deleted: false,
    title: "CSS in JS vs Traditional CSS",
    body: "What are your thoughts on using CSS-in-JS libraries compared to traditional CSS or SASS?",
    timestamp: new Date()   
  }
];

export const commentData : Comment[] = [
        {commentId: 1, threadId: 1, parentCommentId: null, author: "Commenter1", body: "This is a comment.", upvote: 2, downvote: 0, edited: false, deleted: false, timestamp: new Date()},
        {commentId: 2, threadId: 1, parentCommentId: null, author: "Commenter2", body: "This is another comment.", upvote: 1, downvote: 1, edited: false, deleted: false, timestamp: new Date()},
        {commentId: 3, threadId: 2, parentCommentId: null, author: "Learner", body: "I found the official React documentation very helpful!", upvote: 4, downvote: 0, edited: false, deleted: false, timestamp: new Date()},
        {commentId: 4, threadId: 3, parentCommentId: null, author: "StateMaster", body: "Using Redux or Context API can help manage state effectively.", upvote: 3, downvote: 0, edited: false, deleted: false, timestamp: new Date()},
        {commentId: 5, threadId: 4, parentCommentId: null, author: "CSSGuru", body: "CSS-in-JS offers better component encapsulation, but traditional CSS is more straightforward for global styles.", upvote: 2, downvote: 0, edited: false, deleted: false, timestamp: new Date()}
    ]; 