export interface Comment {
  commentId : number;
  threadId : number;
  parentCommentId : number | null;
  author: string;
  upvote: number;
  downvote: number;
  body: string;
  edited : boolean;
  deleted : boolean;
  timestamp: Date;
};