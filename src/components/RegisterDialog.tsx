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
import { registerUser } from "../api/Register";
import { useTheme } from '@mui/material/styles';
import { setTokens } from "../api/AuthHandler";

interface RegisterDialogProps {
    open?: boolean;
    onClose?: () => void;
    onRegisterSuccess?: () => void;
}

export default function RegisterDialog({
    open: externalOpen = false,
    onClose,
    onRegisterSuccess,
}: RegisterDialogProps) {
    const theme = useTheme();
    const [internalOpen, setInternalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

    async function handleSubmit() {
        setError(null);
        setLoading(true);
        if (!username.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }
        const result = await registerUser(username, password);
        setLoading(false);
        if (result.error) {
            setError(result.error.message);
        } else if (result.data) {
            setTokens('', username);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setError(null);
            if (externalOpen === undefined) setInternalOpen(false);
            if (onRegisterSuccess) onRegisterSuccess();
            if (onClose) onClose();
        } else {
            setError("Registration failed. Please try again.");
        }
    }

    function handleClose() {
        if (externalOpen === undefined) setInternalOpen(false);
        if (onClose) onClose();
        setError(null);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
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
                <Button onClick={handleOpen} variant="text" sx={{ ml: 2, textTransform: 'none', fontSize: '1rem' }}>
                    Register
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
                            Create Account
                        </Typography>
                        <Typography variant="body2" sx={(theme) => ({ color: (theme.vars || theme).palette.text.secondary, mt: 0.5 })}>
                            Join the community today
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
                            <TextField
                                required
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                variant="standard"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                                "Register"
                            )}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}
