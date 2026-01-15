import { Typography, Container, ButtonGroup } from "@mui/material";
import { UpvoteButton, UpvoteCount, DownvoteButton } from "./UpvoteDownvote";
import type { Comment } from "../interfaces/Comment";
import { addDownvoteToComment, addUpvoteToComment } from "../data";

export default function CommentContainer(comment: Comment){
    return (
        <Container>
            <Typography variant="h6" sx={{margin: '5px 0px 3px'}}>{comment.author}</Typography>
            <Typography variant="body2" sx={{margin: '3px 0px 3px'}}>{comment.body}</Typography>
            <ButtonGroup size="small">
                    <UpvoteButton size="small" onClick={() => addUpvoteToComment(comment.threadId)}></UpvoteButton>
                    <UpvoteCount disabled>{comment.upvote-comment.downvote}</UpvoteCount>
                    <DownvoteButton size="small" onClick={() => addDownvoteToComment(comment.threadId)}></DownvoteButton>
            </ButtonGroup> 
        </Container>
    );
}