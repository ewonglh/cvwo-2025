import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, TextField, Alert } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { CreateComment } from "../api/CreateComment";
import { getAccessToken } from "../api/AuthHandler";

export default function CreateCommentDialog({threadId}: {threadId: number}) {
    const [open, setOpen] = useState(false);
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isLoggedIn = !!getAccessToken();

    async function handleSubmit(){
        if (!isLoggedIn) {
            setError("You must be logged in to comment.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await CreateComment(threadId, body);
            setBody("");
            setOpen(false);
        } catch (err) {
            setError("Failed to create comment. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function handleClose(){
        setOpen(false);
        setBody("");
        setError(null);
    }

    function handleOpen(){
        if (!isLoggedIn) {
            setError("You must be logged in to comment.");
            return;
        }
        setOpen(true);
    }

    return <>
    <IconButton onClick={handleOpen} disabled={!isLoggedIn}><CommentIcon/></IconButton>
        <Dialog 
            open={open} 
            onClose={handleClose} 
            sx={{ '& .MuiPaper-root': 
                { backgroundColor: 'theme.palette.background.default', 
                backgroundImage: 'none' } 
        }}>
        <DialogTitle>New comment</DialogTitle>
        <DialogContent>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                autoFocus
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
                disabled={loading}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} disabled={loading}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={loading}>Submit</Button>
        </DialogActions>
    </Dialog>
    </>
}