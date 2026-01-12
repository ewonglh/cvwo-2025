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
} from "@mui/material";
import { registerUser } from "../api/Register";

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
    const [internalOpen, setInternalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Use external open prop if provided, otherwise use internal state
    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

    async function handleSubmit() {
        // Clear previous errors
        setError(null);
        setLoading(true);

        // Validate inputs
        if (!username.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        // Call registration API
        const result = await registerUser(username, password);

        setLoading(false);

        if (result.error) {
            setError(result.error.message);
        } else if (result.data?.accessToken) {
            // Store token and userId
            localStorage.setItem("accessToken", result.data.accessToken);
            if (result.data && "userId" in result.data) {
                localStorage.setItem("userId", result.data.userId as string);
            }

            // Reset form and close
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setError(null);
            if (externalOpen === undefined) {
                setInternalOpen(false);
            }
            // Call success callback if provided
            if (onRegisterSuccess) {
                onRegisterSuccess();
            }
            // Close external dialog if onClose provided
            if (onClose) {
                onClose();
            }
        } else {
            setError("Registration failed. Please try again.");
        }
    }

    function handleClose() {
        if (externalOpen === undefined) {
            setInternalOpen(false);
        }
        if (onClose) {
            onClose();
        }
        setError(null);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    }

    function handleOpen() {
        if (externalOpen === undefined) {
            setInternalOpen(true);
        }
    }

    return (
        <>
            {externalOpen === undefined && (
                <Button onClick={handleOpen} variant="contained" sx={{ ml: 2 }}>
                    Register
                </Button>
            )}
            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "theme.palette.background.default",
                        backgroundImage: "none",
                    },
                }}
            >
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        {error && (
                            <Alert severity="error" onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                        sx={{ position: "relative" }}
                    >
                        {loading ? (
                            <>
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        position: "absolute",
                                        left: "50%",
                                        marginLeft: "-12px",
                                    }}
                                />
                                <span style={{ visibility: "hidden" }}>Register</span>
                            </>
                        ) : (
                            "Register"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
