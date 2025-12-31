import { Button, Box, Card, Container, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { styled } from '@mui/material/styles';
import type { Thread } from "../types/Thread";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  margin: 10,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

export default function ThreadCard(content : Thread){
    function handleUpvote(){
        content.upvote += 1;
    }
    function handleDownvote(){
        content.downvote += 1;
    }
    return <StyledCard variant="outlined">
                <Typography variant="h5">{content.title}</Typography>
                <Typography variant="subtitle2"> {content.author} | {content.timestamp.toLocaleString()} </Typography>
                <Typography variant="caption" sx={{display:"-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow:"hidden", textOverflow:"ellipsis"}}> 
                    {content.body} 
                </Typography>
                <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}> 
                    <Button onClick={handleUpvote}><ThumbUpOffAltIcon/></Button>
                    <Box>{content.upvote-content.downvote}</Box>
                    <Button onClick={handleDownvote}><ThumbDownOffAltIcon/></Button>
                </Container>
            </StyledCard>
}