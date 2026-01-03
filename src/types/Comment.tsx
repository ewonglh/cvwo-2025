export type Comment = {
  id : number;
  threadId : number;
  author: string;
  upvote: number;
  downvote: number;
  body: string;
  timestamp: Date;
};