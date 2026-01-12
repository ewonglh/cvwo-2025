import { Container, Skeleton } from "@mui/material";
import ThreadCardSkeleton from '../../components/skeletons/ThreadCardSkeleton';

export default function ThreadViewSkeleton() {
  return (
    <Container>
      <ThreadCardSkeleton />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} variant="rectangular" height={80} sx={{ mb: 1 }} />
      ))}
    </Container>
  );
}