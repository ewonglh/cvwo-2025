import { Typography, Container } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { ArrowBack } from "@mui/icons-material";
import ThreadCard from "../components/ThreadCard";
import CommentContainer from "../components/CommentContainer";
import { Link } from "@tanstack/react-router";
import { Route } from "../routes/thread/$threadid";
import { Comment } from "../interfaces/Comment";

export default function ThreadView() { 
    const { thread, comments } = Route.useLoaderData();
    return (
        <>
        <Container>
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ArrowBack /> <Typography variant="h6">Back to Home</Typography>
                </Link>
            <ThreadCard {...thread} />
        </Container>
        <Container sx={{gap:3, display:'flex', flexDirection:'column'}}>
        {comments.length === 0 
        ? "No comments yet! Be the first to comment."
        : comments.map((comment : Comment) => <CommentContainer key={comment.commentId} {...comment} />)}
        </Container>
        </>
    );
}