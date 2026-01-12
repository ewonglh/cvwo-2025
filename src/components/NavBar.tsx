// Navigation bar with search, topics, sort
import { useState, useEffect } from 'react'
import { AppBar, Box, Container, Typography, IconButton, Toolbar, Tooltip, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

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
    const [anchorElUser, setAnchorElUser]  = useState<null | HTMLElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in by checking for token
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, []);

    // Close all dialogs if one is opened
    const closeAllDialogs = () => {
        setLoginDialogOpen(false);
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

    const handleRegister = () => {
        closeAllDialogs();
        setRegisterDialogOpen(true);
        handleCloseUserMenu();
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
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
                        <Tooltip title="User">
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
                            {!isLoggedIn ? (
                                <>
                                <MenuItem onClick={handleLogin}>
                                    <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleRegister}>
                                    <Typography sx={{ textAlign: 'center' }}>Register</Typography>
                                </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={handleAccount}>
                                        <Typography sx={{ textAlign: 'center' }}>Account</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                    <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} onLoginSuccess={() => setIsLoggedIn(true)} />
                    <RegisterDialog open={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)} />
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
