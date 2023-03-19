import React from 'react'
import { Box, Drawer, List, ListItem, ListItemIcon } from '@mui/material'
import { Link } from 'react-router-dom'
import { Gamepad, Logout, Mail, PeopleAltOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import BaseURL from '../config/app.config';

function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem('code')
        await axios.get(`${BaseURL}/api/auth/logout`)
        navigate('/user')
    }
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open
            sx={{
                width: 'fit-content',
                '& .MuiDrawer-paper': {
                    position: 'fixed',
                    backgroundColor: "transparent",
                    width: 'fit-content',
                    height: '100vh',
                    boxSizing: 'border-box',
                    zIndex: 10000,
                    backdropFilter: 'blur(10px)',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: '100%',
                }}
            >
                <List sx={{ width: '100%' }}>
                    <Link style={{ all: 'unset' }} to="/admin">
                        <ListItem className='list-item' button>
                            <ListItemIcon><PeopleAltOutlined sx={{ fontSize: '2rem', marginInline: 'auto' }} /></ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link style={{ all: 'unset' }} to="/admin/game">
                        <ListItem className='list-item' button>
                            <ListItemIcon><Gamepad sx={{ fontSize: '2rem', marginInline: 'auto' }} /></ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link style={{ all: 'unset' }} to="/admin/inbox">
                        <ListItem className='list-item' button>
                            <ListItemIcon><Mail sx={{ fontSize: '2rem', marginInline: 'auto' }} /></ListItemIcon>
                        </ListItem>
                    </Link>
                    <button className='btn btn-list' onClick={handleLogout}>
                        <ListItem className='list-item' button>
                            <ListItemIcon><Logout sx={{ fontSize: '2rem', marginInline: 'auto' }} /></ListItemIcon>
                        </ListItem>
                    </button>
                </List>
            </Box>
        </Drawer >
    )
}

export default Sidebar