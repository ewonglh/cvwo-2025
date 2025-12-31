// Navigation bar with search, topics, sort
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Container, Typography, IconButton, Toolbar, Tooltip, Menu, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { LogoDev } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

import AppTheme from '../theme/AppTheme';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';

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
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
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

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return  <Container maxWidth="lg">
                <StyledToolbar sx={{border: '1px solid', width:'100%', display:'flex', justifyContent:'center', alignContent:'center'}}>
                    <LogoDev sx={{flex: 1}} />
                    <Typography sx={{flex:1}}> <h3>Forum </h3> </Typography>
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </StyledToolbar>
            </Container>
    
}