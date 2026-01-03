// The homepage
import { Grid } from "@mui/material";
import ThreadCard from "../components/ThreadCard";
import { threadData } from "../data";

export default function HomePage(){
    return (
            <Grid>
                <ul>
                    {threadData.map((thread)=> (<ThreadCard {...thread} />))}
                </ul>
            </Grid>
  );
}