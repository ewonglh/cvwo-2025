import { styled } from "@mui/material/styles";
import { IconButton, Button } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const StyledUpvoteButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: (theme.vars || theme).palette.success.main,
  },
}));

const StyledDownvoteButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: (theme.vars || theme).palette.error.main,
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
  '&:disabled': {
    color: (theme.vars || theme).palette.text.primary,
    minWidth: '2rem'
  }
}));