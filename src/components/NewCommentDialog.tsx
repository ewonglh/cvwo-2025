import { useState, useEffect } from "react";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    IconButton, 
    Button, 
    TextField, 
    Alert,
    Box, 
    Typography, 
    CircularProgress 
} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { NewComment } from "../api/NewComment";
import { getAccessToken } from "../api/AuthHandler";

export default function CreateCommentDialog({threadId, showButton = false, onCommentCreated}: {threadId: number, showButton?: boolean, onCommentCreated?: () => void}) {
    const [open, setOpen] = useState(false);
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

    useEffect(() => {
        setIsLoggedIn(!!getAccessToken());
    }, [open]);

    async function handleSubmit(){
        if (!getAccessToken()) {
            setError("You must be logged in to comment.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await NewComment(threadId, body);
            setBody("");
            setOpen(false);
            if (onCommentCreated) onCommentCreated();
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
        if (!getAccessToken()) {
            window.dispatchEvent(new Event('openLoginDialog'));
            return;
        }
        setOpen(true);
    }

    const buttonSx = (theme: any) => ({
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: '6px',
        transition: 'all 0.2s ease-in-out',
      });
    
      const containedButtonSx = (theme: any) => ({
        ...buttonSx(theme),
        backgroundColor: (theme.vars || theme).palette.text.primary,
        color: (theme.vars || theme).palette.background.paper,
        '&:hover': {
            backgroundColor: (theme.vars || theme).palette.mode === 'dark' 
                ? (theme.vars || theme).palette.grey[300] : (theme.vars || theme).palette.grey[800],
            boxShadow: (theme.vars || theme).shadows[2],
        },
        '&.Mui-disabled': {
            backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
            color: (theme.vars || theme).palette.action.disabled,
        }
      });
    
      const textFieldSx = (theme: any) => ({ 
        '& .MuiInput-underline:before': {
            borderBottomColor: (theme.vars || theme).palette.divider,
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: (theme.vars || theme).palette.text.primary,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: (theme.vars || theme).palette.text.primary,
        },
        '& .MuiInputBase-input': {
            fontSize: '0.95rem',
            color: (theme.vars || theme).palette.text.primary,
        },
        '& .MuiFormLabel-root': {
            color: (theme.vars || theme).palette.text.secondary,
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: (theme.vars || theme).palette.text.primary,
        }
      });

    return <>
    {showButton ? (
        <Button 
            variant="contained" 
            onClick={handleOpen} 
            startIcon={<CommentIcon />}
            sx={containedButtonSx}
        >
            Add Comment
        </Button>
    ) : (
        <IconButton 
            onClick={handleOpen} 
            sx={(theme) => ({ 
                color: 'primary.main',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: (theme.vars || theme).shape.borderRadius,
                border: '1px solid',
                padding: '9px',
                margin: '4px',
                borderColor: (theme.vars || theme).palette.divider,
                '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.action.hover,
                }
            })}
        >
            <CommentIcon/>
        </IconButton>
    )}
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: (theme) => ({
                        borderRadius: '12px',
                        bgcolor: (theme.vars || theme).palette.background.paper,
                        color: (theme.vars || theme).palette.text.primary,
                        boxShadow: (theme.vars || theme).shadows[10],
                        border: `1px solid ${(theme.vars || theme).palette.divider}`,
                        backgroundImage: 'none',
                    })
                }
            }}
        >
        <Box sx={{ p: 4 }}>
            <DialogTitle sx={{ textAlign: 'center', p: 0, mb: 1 }}>
                <Typography variant="h5" fontWeight={700} sx={(theme) => ({ letterSpacing: -0.5, color: (theme.vars || theme).palette.text.primary })}>
                    Add Comment
                </Typography>
                <Typography variant="body2" sx={(theme) => ({ color: (theme.vars || theme).palette.text.secondary, mt: 0.5 })}>
                    Share your thoughts about this thread
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ p: 0, mt: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {error && (
                        <Alert 
                            severity="error" 
                            variant="outlined"
                            onClose={() => setError(null)}
                            sx={{ borderRadius: '8px', fontSize: '0.875rem' }}
                        >
                            {error}
                        </Alert>
                    )}
                    <TextField
                        autoFocus
                        required
                        label="Share your thoughts..."
                        type="text"
                        variant="standard"
                        multiline
                        rows={6}
                        fullWidth
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        disabled={loading}
                        sx={textFieldSx}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end', gap: 2, p: 0, mt: 5 }}>
                <Button 
                    onClick={handleClose} 
                    disabled={loading}
                    sx={(theme) => ({ 
                        ...buttonSx(theme),
                        color: (theme.vars || theme).palette.text.secondary,
                        '&:hover': {
                            color: (theme.vars || theme).palette.text.primary,
                            backgroundColor: (theme.vars || theme).palette.action.hover,
                        }
                    })}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained"
                    disabled={loading || !body.trim()} 
                    sx={containedButtonSx}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: 'inherit' }} /> : "Post Comment"}
                </Button>
            </DialogActions>
        </Box>
    </Dialog>
    </>
}
