import { useState } from "react";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    TextField, 
    Alert, 
    Box, 
    Typography, 
    CircularProgress 
} from "@mui/material";
import { CreatePost } from "../api/CreatePost";
import { getAccessToken } from "../api/AuthHandler";

interface NewPostDialogProps {
  open: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

export default function NewPostDialog({ open, onClose, onPostCreated }: NewPostDialogProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = !!getAccessToken();

  async function handleSubmit() {
    if (!isLoggedIn) {
      setError("You must be logged in to create a post.");
      return;
    }

    if (!title.trim() || !body.trim()) {
        setError("Please fill in all fields.");
        return;
    }

    setError(null);
    setLoading(true);

    try {
      await CreatePost(title, body);
      setTitle("");
      setBody("");
      onClose();
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setTitle("");
    setBody("");
    setError(null);
    onClose();
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

  return (
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
                Create New Post
            </Typography>
            <Typography variant="body2" sx={(theme) => ({ color: (theme.vars || theme).palette.text.secondary, mt: 0.5 })}>
                Share your thoughts with the community
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
                {!isLoggedIn && (
                    <Alert severity="warning" variant="outlined" sx={{ borderRadius: '8px' }}>
                        Please log in to create a post.
                    </Alert>
                )}
                <TextField
                    autoFocus
                    required
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={!isLoggedIn || loading}
                    sx={textFieldSx}
                />
                <TextField
                    required
                    label="Body"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={6}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={!isLoggedIn || loading}
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
                disabled={!isLoggedIn || loading}
                sx={containedButtonSx}
            >
                {loading ? <CircularProgress size={24} sx={{ color: 'inherit' }} /> : "Create Post"}
            </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
