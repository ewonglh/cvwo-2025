import { addCommentToThread } from "../data";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

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

    return <Dialog open={open} onClose={()=> setOpen(false)}>
        <DialogTitle>New comment</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="author"
                label="Author"
                type="text"
                variant="standard"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
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
            <Button onClick={()=> setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>; 
}