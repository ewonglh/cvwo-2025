export interface Comment {
  id : number;
  threadId : number;
  parentCommentId : number | null;
  author: string;
  upvote: number;
  downvote: number;
  body: string;
  timestamp: Date;
};