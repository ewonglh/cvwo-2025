import { IconButton, Button, ButtonGroup, Box, Card, Container, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
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

const UpvoteButton = styled(IconButton)(({theme}) => {
    return {
          '&:hover': {
            color: (theme.vars || theme).palette.success.main,
          }
        };
});

const DownvoteButton = styled(IconButton)(({theme}) => {
    return {
          '&:hover': {
            color: (theme.vars || theme).palette.error.main,
          }
        };
});

const UpvoteCount = styled(Button)(({theme}) => {
    return {
        '&:disabled': {
            color: (theme.vars || theme).palette.text.primary,
            minWidth: '2rem'
        }
    };
}
);

export default function ThreadCard(content : Thread){
    function handleUpvote(){
        content.upvote += 1;
    }
    function handleDownvote(){
        content.downvote += 1;
    }
    function handleCommentClick(){
        console.log("Comment Clicked");
    }

    return <StyledCard variant="outlined">
                <Typography variant="h5">{content.title}</Typography>
                <Typography variant="subtitle2"> {content.author} | {content.timestamp.toLocaleString()} </Typography>
                <Typography variant="caption" sx={{display:"-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow:"hidden", textOverflow:"ellipsis"}}> 
                    {content.body} 
                </Typography>
                <ButtonGroup>
                    <UpvoteButton onClick={handleUpvote}><ThumbUpOffAltIcon/></UpvoteButton>
                    <UpvoteCount disabled>{content.upvote-content.downvote}</UpvoteCount>
                    <DownvoteButton onClick={handleDownvote}><ThumbDownOffAltIcon/></DownvoteButton>
                </ButtonGroup>
                <IconButton onClick={handleCommentClick}><CommentIcon/></IconButton>
            </StyledCard>
}