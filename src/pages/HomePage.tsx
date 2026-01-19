import { Grid, Box } from "@mui/material";
import ThreadCard from "../components/ThreadCard";
import { Route } from "../routes/home";
import {Thread } from "../interfaces/Thread";

export default function HomePage() {
    const threads = Route.useLoaderData();

    return (
        <Box>
            <Grid container spacing={2}>
                {threads.map((thread : Thread) => (
                    <Grid size={12} key={thread.threadId}>
                        <ThreadCard {...thread} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}