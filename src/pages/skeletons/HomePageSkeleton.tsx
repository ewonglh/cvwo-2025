import { Grid } from '@mui/material';
import ThreadCardSkeleton from '../../components/skeletons/ThreadCardSkeleton';

export default function HomePageSkeleton() {
  return (
    <Grid>
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <ThreadCardSkeleton key={index} />
        ))}
      </ul>
    </Grid>
  );
}