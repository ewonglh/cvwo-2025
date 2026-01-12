import { Card, Container, Skeleton, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  margin: 10,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
}));

export default function ThreadCardSkeleton() {
  return (
    <StyledCard variant="outlined">
      <Skeleton variant="text" width="80%" height={32} />
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="70%" height={16} />
      <Container sx={{ padding: '0px', display: 'flex', gap: '0px 20px' }}>
        <ButtonGroup>
          <Skeleton variant="rectangular" width={40} height={36} />
          <Skeleton variant="rectangular" width={40} height={36} />
          <Skeleton variant="rectangular" width={40} height={36} />
        </ButtonGroup>
        <Skeleton variant="rectangular" width={100} height={36} />
      </Container>
    </StyledCard>
  );
}