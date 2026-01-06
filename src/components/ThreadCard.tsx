import { IconButton, Button, ButtonGroup, Box, Card, Container, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { styled } from '@mui/material/styles';
import { UpvoteButton, DownvoteButton, UpvoteCount } from './UpvoteDownvote';
import CreateCommentDialog from './CreateCommentDialog';
import type { Thread } from "../interfaces/Thread";
import { Link } from '@tanstack/react-router';

export const StyledCard = styled(Card)(({ theme }) => ({
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

  const isPreview = true; // If home page, limit body text to 3 lines
  
    function handleUpvote(){
        content.upvote += 1;
    }
    function handleDownvote(){
        content.downvote += 1;
    }
    function handleCommentClick(){
        return <CreateCommentDialog threadId={content.id} />
    }

    return  <Link key={content.id} to='/thread/$threadid' params = {{threadid : content.id.toString()}} style={{ textDecoration: 'none', color: 'inherit' }}>              
              <StyledCard variant="outlined">
                <Typography variant="h5">{content.title}</Typography>
                <Typography variant="subtitle2"> {content.author} | {content.timestamp.toLocaleString()} </Typography>
                <Typography variant="caption" sx={ isPreview ? {display:"-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow:"hidden", textOverflow:"ellipsis"} : {}} > 
                    {content.body} 
                </Typography>
                <Container sx={{padding:'0px', display:'flex', gap:'0px 20px'}}>
                    <ButtonGroup>
                      <UpvoteButton onClick={handleUpvote}><ThumbUpOffAltIcon/></UpvoteButton>
                      <UpvoteCount disabled>{content.upvote-content.downvote}</UpvoteCount>
                      <DownvoteButton onClick={handleDownvote}><ThumbDownOffAltIcon/></DownvoteButton>
                  </ButtonGroup>
                  <CreateCommentDialog threadId={content.id} />
                </Container>
            </StyledCard>
          </Link>;
}