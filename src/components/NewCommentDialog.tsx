import { addCommentToThread } from "../data";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, TextField } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';

export default function CreateCommentDialog({threadId}: {threadId: number}) {
    const [open, setOpen] = useState(false);
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    function handleSubmit(){
        addCommentToThread(threadId, author, body);
        setAuthor("");
        setBody("");
        setOpen(false);
    }

    function handleClose(){
        setOpen(false);
    }

    function handleOpen(){
        setOpen(true);
    }

    return <>
    <IconButton onClick={handleOpen}><CommentIcon/></IconButton>
        <Dialog 
            open={open} 
            onClose={handleClose} 
            sx={{ '& .MuiPaper-root': 
                { backgroundColor: 'theme.palette.background.default', 
                backgroundImage: 'none' } 
        }}>
        <DialogTitle>New comment</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="author"
                label="Author"
                type="text"
                variant="standard"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
                required
                margin="dense"
                id="body"
                label="Comment"
                type="text"
                variant="standard"
                multiline
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>
    </>
}