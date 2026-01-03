import { styled } from "@mui/material/styles";
import { IconButton, Button } from "@mui/material";


export const UpvoteButton = styled(IconButton)(({theme}) => {
    return {
          '&:hover': {
            color: (theme.vars || theme).palette.success.main,
          }
        };
});

export const DownvoteButton = styled(IconButton)(({theme}) => {
    return {
          '&:hover': {
            color: (theme.vars || theme).palette.error.main,
          }
        };
});

export const UpvoteCount = styled(Button)(({theme}) => {
    return {
        '&:disabled': {
            color: (theme.vars || theme).palette.text.primary,
            minWidth: '2rem'
        }
    };
}
);