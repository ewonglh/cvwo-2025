import { styled } from "@mui/material/styles";
import { IconButton, Button } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const StyledUpvoteButton = styled(IconButton)(({ theme }) => ({
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: (theme.vars || theme).shape.borderRadius,
  border: '1px solid',
  padding: '9px',
  margin: '4px',
  borderColor: (theme.vars || theme).palette.divider,
  '&:hover': {
    color: (theme.vars || theme).palette.success.main,
    borderColor: (theme.vars || theme).palette.success.main,
    backgroundColor: (theme.vars || theme).palette.success.light,
  },
}));

const StyledDownvoteButton = styled(IconButton)(({ theme }) => ({
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: (theme.vars || theme).shape.borderRadius,
  border: '1px solid',
  padding: '9px',
  margin: '4px',
  borderColor: (theme.vars || theme).palette.divider,
  '&:hover': {
    color: (theme.vars || theme).palette.error.main,
    borderColor: (theme.vars || theme).palette.error.main,
    backgroundColor: (theme.vars || theme).palette.error.light,
  },
}));

export const UpvoteButton = (props: any) => (
  <StyledUpvoteButton {...props}>
    <ThumbUpOffAltIcon />
  </StyledUpvoteButton>
);

export const DownvoteButton = (props: any) => (
  <StyledDownvoteButton {...props}>
    <ThumbDownOffAltIcon />
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