import { Typography, Container, ButtonGroup } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { ArrowBack } from "@mui/icons-material";
import type { Thread } from "../interfaces/Thread";
import type { Comment } from "../interfaces/Comment";
import { getThreadById, getCommentsByThreadId, addCommentToThread, addDownvoteToComment, addDownvoteToThread, addUpvoteToComment, addUpvoteToThread } from "../data"; // Placeholder threads data
import ThreadCard from "../components/ThreadCard";  
import CommentContainer from "../components/CommentContainer";
import { Link } from "@tanstack/react-router";
import { Route } from "../routes/thread/$threadid";



export default function ThreadView() { 
    const { thread, comments } = Route.useLoaderData();
    console.log(thread);
    return (
        <>
        <Container>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ArrowBack /> <Typography variant="h6">Back to Home</Typography>
                </Link>
            <ThreadCard {...thread as Thread} />
        </Container>
        <Container sx={{gap:3, display:'flex', flexDirection:'column'}}>
        {comments.length === 0 
        ? "No comments yet! Be the first to comment."
        : comments.map((comment) => <CommentContainer key={comment.commentId} {...comment} />)}
        </Container>
        </>
    );
}