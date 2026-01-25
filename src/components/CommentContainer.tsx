import { Typography, Container, ButtonGroup, Box } from "@mui/material";
import { UpvoteButton, UpvoteCount, DownvoteButton } from "./UpvoteDownvote";
import type { Comment } from "../interfaces/Comment";
import { useState } from "react";
import { upvoteComment, downvoteComment, unvoteComment } from "../api/CommentActions";

export default function CommentContainer(comment: Comment) {
    const [upvotes, setUpvotes] = useState(comment.upvote);
    const [downvotes, setDownvotes] = useState(comment.downvote);
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(comment.userVote || null);

    const handleUpvote = async () => {
        try {
            if (userVote === 'up') {
                await unvoteComment(comment.commentId);
                setUpvotes(prev => prev - 1);
                setUserVote(null);
            } else {
                await upvoteComment(comment.commentId);
                setUpvotes(prev => prev + 1);
                if (userVote === 'down') {
                    setDownvotes(prev => prev - 1);
                }
                setUserVote('up');
            }
        } catch (error) {
            console.error("Failed to upvote comment:", error);
        }
    };

    const handleDownvote = async () => {
        try {
            if (userVote === 'down') {
                await unvoteComment(comment.commentId);
                setDownvotes(prev => prev - 1);
                setUserVote(null);
            } else {
                await downvoteComment(comment.commentId);
                setDownvotes(prev => prev + 1);
                if (userVote === 'up') {
                    setUpvotes(prev => prev - 1);
                }
                setUserVote('down');
            }
        } catch (error) {
            console.error("Failed to downvote comment:", error);
        }
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
                <UpvoteButton size="small" onClick={handleUpvote} active={userVote === 'up'}></UpvoteButton>
                <UpvoteCount disabled>{upvotes - downvotes}</UpvoteCount>
                <DownvoteButton size="small" onClick={handleDownvote} active={userVote === 'down'}></DownvoteButton>
            </ButtonGroup> 
        </Box>
    );
}