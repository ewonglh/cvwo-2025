import { Typography, Container, ButtonGroup, Box } from "@mui/material";
import { UpvoteButton, UpvoteCount, DownvoteButton } from "./UpvoteDownvote";
import type { Comment } from "../interfaces/Comment";

export default function CommentContainer(comment: Comment) {
    const handleUpvote = () => {
        // TODO: Implement actual upvote API call for comments
    };

    const handleDownvote = () => {
        // TODO: Implement actual downvote API call for comments
    };

    return (
        <Box sx={{ 
            p: 2, 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 2,
            backgroundColor: 'background.paper'
        }}>
            <Typography variant="subtitle2" color="primary" sx={{ mb: 0.5 }}>{comment.author}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{comment.body}</Typography>
            <ButtonGroup size="small">
                <UpvoteButton size="small" onClick={handleUpvote}></UpvoteButton>
                <UpvoteCount disabled>{comment.upvote - comment.downvote}</UpvoteCount>
                <DownvoteButton size="small" onClick={handleDownvote}></DownvoteButton>
            </ButtonGroup> 
        </Box>
    );
}