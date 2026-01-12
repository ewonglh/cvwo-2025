import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import ThreadCard from "../components/ThreadCard";
import { FetchThreads } from "../api/FetchThreads";
import { Thread } from '../interfaces/Thread';
import HomePageSkeleton from './skeletons/HomePageSkeleton';

export default function HomePage() {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchThreads(): Promise<void> {
            try {
                const data = await FetchThreads();
                setThreads(data);
            } catch (error) {
                console.error('Error fetching threads:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchThreads();
    }, []);

    if (loading) {
        return (
            <HomePageSkeleton />
        );
    }

    return (
        <Grid>
            <ul>
                {threads.map((thread) => (
                    <ThreadCard key={thread.threadId} {...thread} />
                ))}
            </ul>
        </Grid>
    );
}