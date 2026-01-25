import { Card, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UpvoteButton, DownvoteButton, UpvoteCount } from './UpvoteDownvote';
import CreateCommentDialog from './NewCommentDialog';
import type { Thread } from "../interfaces/Thread";
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { upvoteThread, downvoteThread, unvoteThread } from '../api/ThreadActions';

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 24,
  height: '100%',
  borderRadius: 12,
  transition: 'all 0.2s ease-in-out',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  borderColor: (theme.vars || theme).palette.divider,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: (theme.vars || theme).shadows[4],
    borderColor: (theme.vars || theme).palette.primary.main,
  },
}));

interface ThreadCardProps extends Thread {
  isPreview?: boolean;
}

export default function ThreadCard(props: ThreadCardProps) {
  const { isPreview = true, ...content } = props;
  const [upvotes, setUpvotes] = useState(content.upvote);
  const [downvotes, setDownvotes] = useState(content.downvote);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(content.userVote || null);

  async function handleUpvote(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (userVote === 'up') {
        await unvoteThread(content.threadId);
        setUpvotes(prev => prev - 1);
        setUserVote(null);
      } else {
        await upvoteThread(content.threadId);
        setUpvotes(prev => prev + 1);
        if (userVote === 'down') {
          setDownvotes(prev => prev - 1);
        }
        setUserVote('up');
      }
    } catch (error) {
      console.error("Failed to upvote thread:", error);
    }
  }

  async function handleDownvote(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (userVote === 'down') {
        await unvoteThread(content.threadId);
        setDownvotes(prev => prev - 1);
        setUserVote(null);
      } else {
        await downvoteThread(content.threadId);
        setDownvotes(prev => prev + 1);
        if (userVote === 'up') {
          setUpvotes(prev => prev - 1);
        }
        setUserVote('down');
      }
    } catch (error) {
      console.error("Failed to downvote thread:", error);
    }
  }

  const CardContent = (
    <StyledCard 
      variant="outlined" 
      sx={!isPreview ? { 
        '&:hover': { transform: 'none', boxShadow: 'none', borderColor: 'divider', cursor: 'default' } 
      } : {}}
    >
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {content.title}
        </Typography>
        
        <Typography variant="caption" color="text.secondary">
          Posted by <b>{content.author}</b> • {new Date(content.timestamp).toLocaleDateString()} 
          {content.edited ? " (edited)" : ""}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.primary"
          sx={isPreview ? { 
            display: "-webkit-box", 
            WebkitLineClamp: 3, 
            WebkitBoxOrient: "vertical", 
            overflow: "hidden", 
            textOverflow: "ellipsis",
            mt: 1
          } : { 
            whiteSpace: 'pre-wrap',
            mt: 2,
            lineHeight: 1.6
          }} 
        >
          {content.body}
        </Typography>
      </Stack>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
        <Stack direction="row" alignItems="center">
          <UpvoteButton onClick={handleUpvote} size="small" active={userVote === 'up'} />
          <UpvoteCount disabled>{upvotes - downvotes}</UpvoteCount>
          <DownvoteButton onClick={handleDownvote} size="small" active={userVote === 'down'} />
          <CreateCommentDialog threadId={content.threadId} />
        </Stack>
      </Box>
    </StyledCard>
  );

  if (!isPreview) {
    return CardContent;
  }

  return (
    <Link key={content.threadId} to='/thread/$threadid' params={{ threadid: content.threadId.toString() }} style={{ textDecoration: 'none', color: 'inherit' }}>
      {CardContent}
    </Link>
  );
}