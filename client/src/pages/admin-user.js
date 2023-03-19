import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, TextField, Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { useParams } from 'react-router-dom'
import BaseURL from '../config/app.config'

function AdminUser() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState({})
    const handleClose = () => {
        setOpen(false);
    };
    const update = async () => {
        const res = await axios.put(`${BaseURL}/api/user/admin/${id}`, { username: user.username, email: user.email, isAdmin: user.isAdmin, password: user.password })
        console.log(res)
    }
    useEffect(() => {
        axios.get(`${BaseURL}/api/user/${id}`)
            .then(res => {
                setUser(res.data)
            }
            )
    }, [id])
    return (
        <>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="glass" sx={{ width: 'min(700px,90%)' }}>
                    <h1 style={{ marginBottom: '3rem' }}>
                        User
                    </h1>
                    <TextField
                        variant="outlined"
                        label="ID"
                        size='big'
                        color='success'
                        style={{ width: '100%', marginBlock: '1rem' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold',
                            }
                        }}
                        value={user._id || ''}
                        disabled
                    />
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
                        value={user.username || ''}
                        onChange={
                            (e) => {
                                setUser({ ...user, username: e.target.value })
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
                        value={user.email || ''}
                        onChange={
                            (e) => {
                                setUser({ ...user, email: e.target.value })
                            }
                        }
                    />
                    <Typography
                        variant="h6"
                        style={{ marginBlock: '1rem', fontWeight: '400' }}
                        className="title"
                    >
                        Is an admin ?
                    </Typography>
                    <Box className="admin">
                        <label style={{ display: 'block', marginBlock: '1rem', marginInlineStart: '1rem' }}>
                            <input type="radio" name="admin" style={{ display: 'none', appearance: 'none' }} checked={user.isAdmin === true ? true : false} onChange={() => { setUser({ ...user, isAdmin: true }) }} />
                            <span className="check"></span>
                            Yes
                        </label>
                        <label style={{ display: 'block', marginBlock: '1rem', marginInlineStart: '1rem' }}>
                            <input type="radio" name="admin" style={{ display: 'none', appearance: 'none' }} checked={user.isAdmin === false ? true : false} onChange={() => { setUser({ ...user, isAdmin: false }) }} />
                            <span className="uncheck"></span>
                            No
                        </label>
                    </Box>
                    <TextField
                        variant="outlined"
                        label="Password"
                        size='medium'
                        color='success'
                        style={{ width: '100%', marginBlock: '1rem' }}
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold',
                            }
                        }}
                        value={user.password || ''}
                        onChange={
                            (e) => {
                                setUser({ ...user, password: e.target.value })
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
                                    await axios.delete(`${BaseURL}/api/user/${id}`)
                                        .then(res => {
                                            navigate('/admin')
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

export default AdminUser