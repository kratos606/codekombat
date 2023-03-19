import React, { useState } from 'react'
import { Button, Avatar, Box, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import BaseURL from '../../config/app.config'
import './navbar.css'

function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name[0].toUpperCase(),
    };
}

function Navbar() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(false);
    const { user } = useSelector(state => state.auth)
    const certificate = async () => {
        const { data } = await axios.get(`${BaseURL}/api/user/certificate`)
        if (data.certificate) {
            window.location = `${BaseURL}/certificate/${data.certificate}`
        }
    }
    return (
        <div style={{ width: '100vw', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginInline: '1rem' }}>
            <Link style={{ all: 'unset', cursor: 'pointer' }} to={'/'}><h1>Coding<i>art</i></h1></Link>
            {
                user ? (
                    <Box sx={{ marginRight: '2rem' }}>
                        <button style={{ all: 'unset', cursor: 'pointer' }} onClick={() => setProfile(!profile)}><Avatar {...stringAvatar(user.username)} /></button>
                        {profile && <Box sx={{ width: '200px', position: 'absolute', backgroundColor: '#15314b', transform: 'translate(-160px,20px)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
                            <Box sx={{ width: '100%', textAlign: 'center', padding: '1rem' }}><Typography variant='h6'>{user.points}</Typography></Box>
                            {localStorage.getItem('Done') === 'yes' && <Box sx={{ width: '100%', textAlign: 'center' }}><Button color='success' fullWidth onClick={() => certificate()}>Get <br />Certificate</Button></Box>}
                            <Link to="/user/profile" style={{ all: 'unset' }}><Button variant="text" color="success" fullWidth>Profile</Button></Link>
                            <Button variant="text" color="success" fullWidth onClick={async () => { await axios.get(`${BaseURL}/api/auth/logout`); navigate('/') }}>Logout</Button>
                        </Box>}
                    </Box>
                ) : (
                    <><Button color='primary' className='navbar-menu' onClick={() => {
                        document.querySelector('.group-btn').classList.toggle('active')
                    }}><MenuIcon /></Button>
                        <div className='group-btn'>
                            <Link style={{ all: 'unset', cursor: 'pointer' }} onClick={() => {
                                document.querySelector('.group-btn').classList.toggle('active')
                            }} to={'/login'}><Button variant='contained' color='primary' className='navbar-btn'>
                                    Login
                                </Button></Link>
                            <Link style={{ all: 'unset', cursor: 'pointer' }} onClick={() => {
                                document.querySelector('.group-btn').classList.toggle('active')
                            }} to={'/register'}><Button variant='contained' color='primary' className='navbar-btn'>
                                    Register
                                </Button></Link>
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default Navbar