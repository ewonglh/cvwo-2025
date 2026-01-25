import { Typography, Container, Box, Divider, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ThreadCard from "../components/ThreadCard";
import CommentContainer from "../components/CommentContainer";
import CreateCommentDialog from "../components/NewCommentDialog";
import { Link } from "@tanstack/react-router";
import { Route } from "../routes/thread.$threadid";
import { Comment } from "../interfaces/Comment";

export default function ThreadView() { 
    const { thread, comments } = Route.useLoaderData();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}>
                    <ArrowBack fontSize="small" /> <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Back to Home</Typography>
                </Link>
            </Box>
            <ThreadCard {...thread} isPreview={false} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', px: 2 }}>
                <CreateCommentDialog threadId={thread.threadId} showButton={true} />
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" sx={{ px: 2 }}>
                    Comments ({comments.length})
                </Typography>
                <Container sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                    {comments.length === 0 
                        ? <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary', py: 4, textAlign: 'center' }}>No comments yet! Be the first to comment.</Typography>
                        : comments.map((comment : Comment) => <CommentContainer key={comment.commentId} {...comment} />)}
                </Container>
            </Box>
        </Box>
    );
}