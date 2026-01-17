import { Grid } from "@mui/material";
import ThreadCard from "../components/ThreadCard";
import { Route } from "../routes/home";
import {Thread } from "../interfaces/Thread";

export default function HomePage() {
    const threads = Route.useLoaderData();

    return (
        <Grid>
            <ul>
                {threads.map((thread : Thread) => (
                    <ThreadCard key={thread.threadId} {...thread} />
                ))}
            </ul>
        </Grid>
    );
}