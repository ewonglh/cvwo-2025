import { useState, useEffect } from 'react'
import { AppBar, Box, Container, Typography, IconButton, Toolbar, Tooltip, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PostAddIcon from '@mui/icons-material/PostAdd';

import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import NewPostDialog from './NewPostDialog';
import { getAccessToken, getUsername, logout } from '../api/AuthHandler';
import { useRouter } from '@tanstack/react-router';

const settings = ['Account', 'Logout'];

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: 'transparent',
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

const StyledIconButton = styled(IconButton)(({theme}) => {
    return {
          verticalAlign: 'bottom',
          flex: 1,
          display: 'inline-flex',
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: '1px solid',
          padding: '9px',
          margin: '4px',
          borderColor: (theme.vars || theme).palette.divider,
        };
});

export default function NavBar(){
    const router = useRouter();
    const [anchorElUser, setAnchorElUser]  = useState<null | HTMLElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in by checking for token
        const token = getAccessToken();
        const storedUsername = getUsername();
        setIsLoggedIn(!!token);
        if (storedUsername) setUsername(storedUsername);

        // Listen for login dialog requests
        const handleOpenLogin = () => setLoginDialogOpen(true);
        window.addEventListener('openLoginDialog', handleOpenLogin);
        return () => window.removeEventListener('openLoginDialog', handleOpenLogin);
    }, []);

    // Close all dialogs if one is opened
    const closeAllDialogs = () => {
        setLoginDialogOpen(false);
        setNewPostDialogOpen(false);
        setRegisterDialogOpen(false);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogin = () => {
        closeAllDialogs();
        setLoginDialogOpen(true);
        handleCloseUserMenu();
    };

    const handleNewPostClick = () => {
        if (!isLoggedIn) {
            setLoginDialogOpen(true);
        } else {
            setNewPostDialogOpen(true);
        }
    };

    const handleRegister = () => {
        closeAllDialogs();
        setRegisterDialogOpen(true);
        handleCloseUserMenu();
    }

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        const storedUsername = getUsername();
        if (storedUsername) setUsername(storedUsername);
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setUsername(null);
        handleCloseUserMenu();
    };

    const handleAccount = () => {
        // TODO: Navigate to account settings
        handleCloseUserMenu();
    };

    return  (<AppBar
                position="fixed"
                enableColorOnDark
                sx={{
                    backgroundColor: 'transparent',
                    color: (theme) => (theme.vars || theme).palette.text.primary,
                    backgroundImage: 'none',
                    boxShadow: 'none',
                    mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                }}
                >
                    <Container maxWidth="lg">
                        <StyledToolbar sx={{ backgroundColor: 'transparent', border: '1px solid', width:'100%', display:'flex', justifyContent:'center', alignContent:'center'}}>
                            <Typography variant="h5" sx={{flex:1}}> A Silly Forum </Typography>
                    <Box>
                        <Tooltip title="Theme">
                            <ColorModeIconDropdown sx={{ margin: '4px' }} />
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title="Notifications">
                            <StyledIconButton data-screenshot="toggle-mode">
                                <NotificationsIcon sx={{padding:'3px'}}/>
                            </StyledIconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title="New Post">
                            <StyledIconButton onClick={handleNewPostClick}>
                                <PostAddIcon sx={{ padding: '3px' }} />
                            </StyledIconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title={isLoggedIn && username ? username : "User"}>
                            <StyledIconButton onClick={handleOpenUserMenu} data-screenshot="toggle-mode">
                                <AccountCircle/>
                            </StyledIconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {!isLoggedIn ? [
                                <MenuItem onClick={handleLogin} key="login">
                                    <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                                </MenuItem>,
                                <MenuItem onClick={handleRegister} key="register">
                                    <Typography sx={{ textAlign: 'center' }}>Register</Typography>
                                </MenuItem>
                            ] : [
                                <MenuItem onClick={handleAccount} key="account">
                                    <Typography sx={{ textAlign: 'center' }}>Account</Typography>
                                </MenuItem>,
                                <MenuItem onClick={handleLogout} key="logout">
                                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                                </MenuItem>
                            ]}
                        </Menu>
                    </Box>
                    <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} onLoginSuccess={handleLoginSuccess} />
                    <RegisterDialog open={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)} />
                    <NewPostDialog 
                        open={newPostDialogOpen} 
                        onClose={() => setNewPostDialogOpen(false)} 
                        isLoggedIn={isLoggedIn}
                        onPostCreated={() => {
                            router.invalidate();
                            // Optionally navigate to home if not there
                            if (window.location.pathname !== '/home') {
                                router.navigate({ to: '/home' });
                            }
                        }}
                    />
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
