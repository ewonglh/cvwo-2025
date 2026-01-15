import { styled } from "@mui/material/styles";
import { IconButton, Button } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


export const UpvoteButton = styled(IconButton)(({theme}) => {
    return {
          children : <ThumbUpOffAltIcon/>,
          '&:hover': {
            children : <ThumbUpIcon/>,  
            color: (theme.vars || theme).palette.success.main,
          }
        };
});

export const DownvoteButton = styled(IconButton)(({theme}) => {
    return {
          children : <ThumbDownOffAltIcon/>,
          '&:hover': {
            children: <ThumbDownIcon/>,
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