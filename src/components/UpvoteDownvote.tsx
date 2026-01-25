import { styled } from "@mui/material/styles";
import { IconButton, Button } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const StyledUpvoteButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: (theme.vars || theme).shape.borderRadius,
  border: '1px solid',
  padding: '9px',
  margin: '4px',
  borderColor: active ? (theme.vars || theme).palette.success.main : (theme.vars || theme).palette.divider,
  color: active ? (theme.vars || theme).palette.success.main : 'inherit',
  backgroundColor: active ? (theme.vars || theme).palette.success.light : 'transparent',
  '&:hover': {
    color: (theme.vars || theme).palette.success.main,
    borderColor: (theme.vars || theme).palette.success.main,
    backgroundColor: (theme.vars || theme).palette.success.light,
  },
}));

const StyledDownvoteButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: (theme.vars || theme).shape.borderRadius,
  border: '1px solid',
  padding: '9px',
  margin: '4px',
  borderColor: active ? (theme.vars || theme).palette.error.main : (theme.vars || theme).palette.divider,
  color: active ? (theme.vars || theme).palette.error.main : 'inherit',
  backgroundColor: active ? (theme.vars || theme).palette.error.light : 'transparent',
  '&:hover': {
    color: (theme.vars || theme).palette.error.main,
    borderColor: (theme.vars || theme).palette.error.main,
    backgroundColor: (theme.vars || theme).palette.error.light,
  },
}));

export const UpvoteButton = ({ active, ...props }: any) => (
  <StyledUpvoteButton active={active} {...props}>
    {active ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
  </StyledUpvoteButton>
);

export const DownvoteButton = ({ active, ...props }: any) => (
  <StyledDownvoteButton active={active} {...props}>
    {active ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
  </StyledDownvoteButton>
);

export const UpvoteCount = styled(Button)(({ theme }) => ({
  height: '2.25rem',
  minWidth: '2.25rem',
  borderRadius: (theme.vars || theme).shape.borderRadius,
  border: '1px solid',
  padding: '4px 8px',
  margin: '4px',
  borderColor: (theme.vars || theme).palette.divider,
  cursor: 'default',
  '&:disabled': {
    color: (theme.vars || theme).palette.text.primary,
    borderColor: (theme.vars || theme).palette.divider,
  }
}));