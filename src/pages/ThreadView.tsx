import { useEffect, useState } from 'react';
import { Typography, Container } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { ArrowBack } from "@mui/icons-material";
import ThreadCard from "../components/ThreadCard";
import CommentContainer from "../components/CommentContainer";
import { Link } from "@tanstack/react-router";
import { FetchThreads } from "../api/FetchThreads";
import { FetchComments } from "../api/FetchComments";
import { Thread } from '../interfaces/Thread';
import { Comment } from '../interfaces/Comment';
import ThreadViewSkeleton from './skeletons/ThreadViewSkeleton'; 

export default function ThreadView() {
    const [thread, setThread] = useState<Thread | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const threads = await FetchThreads();
                const threadId = threads[0]?.threadId;
                setThread(threads[0]);

                if (threadId) {
                    const commentsData = await FetchComments();
                    setComments(commentsData.filter((comment: Comment) => comment.threadId === threadId));
                }
            } catch (error) {
                console.error('Error loading thread or comments:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <ThreadViewSkeleton />
        );
    }

    return (
        <>
            <Container>
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ArrowBack /> <Typography variant="h6">Back to Home</Typography>
                </Link>
                {thread && <ThreadCard {...thread} />}
            </Container>
            <Container sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
                {comments.length === 0
                    ? "No comments yet! Be the first to comment."
                    : comments.map((comment) => <CommentContainer key={comment.commentId} {...comment} />)}
            </Container>
        </>
    );
}