export interface Thread {
  id : number;
  title: string;
  author: string;
  upvote: number;
  downvote: number;
  postType: string;
  body: string;
  timestamp: Date;
};