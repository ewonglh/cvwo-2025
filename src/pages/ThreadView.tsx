import { Typography, Container, ButtonGroup } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import { ArrowBack } from "@mui/icons-material";
import type { Thread } from "../interfaces/Thread";
import type { Comment } from "../interfaces/Comment";
import { UpvoteButton, DownvoteButton, UpvoteCount } from "../components/UpvoteDownvote";
import { getThreadById, getCommentsByThreadId, addCommentToThread, addDownvoteToComment, addDownvoteToThread, addUpvoteToComment, addUpvoteToThread } from "../data"; // Placeholder threads data
import ThreadCard from "../components/ThreadCard";  
import { Link } from "@tanstack/react-router";
import { Route } from "../routes/thread/$threadid";

function RenderComment(comment: Comment){
    return (
        <Container>
            <Typography variant="h6" sx={{margin: '5px 0px 3px'}}>{comment.author}</Typography>
            <Typography variant="body2" sx={{margin: '3px 0px 3px'}}>{comment.body}</Typography>
            <ButtonGroup size="small">
                    <UpvoteButton size="small" onClick={() => addUpvoteToComment(comment.id)}><ThumbUpOffAltIcon/></UpvoteButton>
                    <UpvoteCount disabled>{comment.upvote-comment.downvote}</UpvoteCount>
                    <DownvoteButton size="small" onClick={() => addDownvoteToComment(comment.id)}><ThumbDownOffAltIcon/></DownvoteButton>
            </ButtonGroup> 
        </Container>
    );
}


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
        : comments.map((comment) => RenderComment(comment))}
        </Container>
        </>
    );
}