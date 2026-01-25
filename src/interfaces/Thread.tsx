export interface Thread {
  threadId : number;
  category : string;
  title: string;
  author: string;
  upvote: number;
  downvote: number;
  img : string | null;
  body: string;
  edited : boolean;
  deleted : boolean;
  timestamp: Date;
  userVote?: 'up' | 'down' | null;
};
