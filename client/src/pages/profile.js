import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, TextField, Button, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navbar } from '../components'
import BaseURL from '../config/app.config'

function Profile() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [profile, setProfile] = useState({})
    const handleClose = () => {
        setOpen(false);
    };
    const update = async () => {
        await axios.put(`${BaseURL}/api/user/${user._id}`, { username: profile.username, email: profile.email, password: profile.password })
    }
    useEffect(() => {
        axios.get(`${BaseURL}/api/user/${user._id}`)
            .then(res => {
                setProfile(res.data)
            }
            )
    }, [user])
    return (
        <>
            <Navbar />
            <Box className='glass' sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(90vw,500px)' }}>
                <Box>
                    <h1 style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        Profile
                    </h1>
                    <TextField
                        variant="outlined"
                        label="Username"
                        size='medium'
                        color='success'
                        style={{ width: '100%', marginBlock: '1rem' }}
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold',
                            }
                        }}
                        value={profile.username || ''}
                        onChange={
                            (e) => {
                                setProfile({ ...profile, profilename: e.target.value })
                            }
                        }
                    />
                    <TextField
                        variant="outlined"
                        label="Email"
                        size='medium'
                        color='success'
                        style={{ width: '100%', marginBlock: '1rem' }}
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold',
                            }
                        }}
                        value={profile.email || ''}
                        onChange={
                            (e) => {
                                setProfile({ ...profile, email: e.target.value })
                            }
                        }
                    />
                    <TextField
                        variant="outlined"
                        label="Password"
                        size='medium'
                        color='success'
                        style={{ width: '100%', marginBlock: '1rem' }}
                        type='password'
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold',
                            }
                        }}
                        value={profile.password || ''}
                        onChange={
                            (e) => {
                                setProfile({ ...profile, password: e.target.value })
                            }
                        }
                    />
                    <Box sx={{ display: 'flex', gap: '1rem', marginBlockStart: '1rem' }}>
                        <Button variant="contained" sx={{ flex: 1 }} onClick={() => {
                            update()
                        }}>
                            Update
                        </Button>
                        <Button variant="contained" sx={{ flex: 1 }} onClick={() => {
                            setOpen(true)
                        }}>
                            Delete
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure you want to delete this user ?"}
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={async () => {
                                    await axios.delete(`${BaseURL}/api/user/${user._id}`)
                                        .then(res => {
                                            navigate('/')
                                        }
                                        )
                                }} autoFocus>
                                    Agree
                                </Button>
                                <Button onClick={handleClose}>Disagree</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile