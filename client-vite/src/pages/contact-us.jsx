import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginSuccess } from '../actions/auth'
import SendIcon from '@mui/icons-material/Send';
import BaseURL from '../config/app.config'
import axios from 'axios'

function ContactUs() {
    const [inputs, setInputs] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        const checkUser = async () => {
            const res = await axios.get(`${BaseURL}/api/auth/check`)
            dispatch(loginSuccess(res.data.currentUser))
        }
        checkUser()
    }, [dispatch])
    const send = async () => {
        await axios.post(`${BaseURL}/api/mail`, {
            username: inputs.username,
            email: inputs.email,
            subject: inputs.subject,
            message: inputs.message
        })
    }
    if (user) {
        return navigate('/user')
    }
    return (
        <>
            <div className="home-container" style={{ height: 'max-content' }}>
                <h1>Contact Us</h1>
                <TextField
                    className='input'
                    variant="outlined"
                    label="Username"
                    type={'text'}
                    color='success'
                    InputLabelProps={{
                        style: {
                            fontWeight: 'bold'
                        }
                    }}
                    sx={{
                        marginBlock: '1rem'
                    }}
                    value={inputs.username || ''}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    fullWidth
                />
                <TextField
                    className='input'
                    variant="outlined"
                    label="E-mail"
                    type={'email'}
                    color='success'
                    InputLabelProps={{
                        style: {
                            fontWeight: 'bold'
                        }
                    }}
                    sx={{
                        marginBlock: '1rem'
                    }}
                    value={inputs.email || ''}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    fullWidth
                />
                <TextField
                    className='input'
                    variant="outlined"
                    label="Subject"
                    type={'text'}
                    color='success'
                    InputLabelProps={{
                        style: {
                            fontWeight: 'bold'
                        }
                    }}
                    sx={{
                        marginBlock: '1rem'
                    }}
                    value={inputs.subject || ''}
                    onChange={(e) => setInputs({ ...inputs, subject: e.target.value })}
                    fullWidth
                />
                <TextField
                    multiline
                    className='input'
                    variant="outlined"
                    label="Message"
                    type={'message'}
                    color='success'
                    maxRows={5}
                    InputLabelProps={{
                        style: {
                            fontWeight: 'bold'
                        }
                    }}
                    sx={{
                        marginBlock: '1rem'
                    }}
                    InputProps={{
                        style: {
                            all: 'unset',
                            height: '100px',
                            padding: '1rem',
                            borderRadius: '5px',
                            overflow: 'auto'
                        }
                    }}
                    value={inputs.message || ''}
                    onChange={(e) => setInputs({ ...inputs, message: e.target.value })}
                    fullWidth
                />
                <Button
                    variant='contained'
                    endIcon={<SendIcon sx={{ transform: 'translateY(-3px)' }} />}
                    onClick={() => send()}
                >
                    Send
                </Button>
            </div>
        </>
    )
}

export default ContactUs