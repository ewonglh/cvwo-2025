import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Alert,
    CircularProgress,
    Box,
    Typography,
    Divider
} from "@mui/material";
import { loginAndSetTokens } from "../api/AuthHandler";
import { useTheme } from '@mui/material/styles';

interface LoginDialogProps {
    open?: boolean;
    onClose?: () => void;
    onLoginSuccess?: () => void;
}

export default function LoginDialog({ open: externalOpen = false, onClose, onLoginSuccess }: LoginDialogProps) {
    const theme = useTheme();
    const [internalOpen, setInternalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

    async function handleSubmit() {
        setError(null);
        setLoading(true);
        if (!username.trim() || !password.trim()) {
            setError("Username and password cannot be empty.");
            setLoading(false);
            return;
        }
        try {
            await loginAndSetTokens(username, password);
            setUsername("");
            setPassword("");
            setError(null);
            if (externalOpen === undefined) setInternalOpen(false);
            if (onLoginSuccess) onLoginSuccess();
            if (onClose) onClose();
        } catch (error) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function handleClose() {
        if (externalOpen === undefined) setInternalOpen(false);
        if (onClose) onClose();
        setError(null);
        setUsername("");
        setPassword("");
    }

    function handleOpen() {
        if (externalOpen === undefined) setInternalOpen(true);
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
        <>
            {externalOpen === undefined && (
                <Button
                    onClick={handleOpen}
                    variant="text"
                    sx={{ textTransform: 'none', fontSize: '1rem' }}
                >
                    Login
                </Button>
            )}
            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth="xs"
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
                            Sign In
                        </Typography>
                        <Typography variant="body2" sx={(theme) => ({ color: (theme.vars || theme).palette.text.secondary, mt: 0.5 })}>
                            Welcome back to the forum
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
                                id="username"
                                label="Username"
                                type="text"
                                variant="standard"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                                sx={textFieldSx}
                            />
                            <TextField
                                required
                                id="password"
                                label="Password"
                                type="password"
                                variant="standard"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                sx={textFieldSx}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 0, mt: 5 }}>
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
                            disabled={loading}
                            sx={containedButtonSx}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    sx={{ color: 'inherit' }}
                                />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}