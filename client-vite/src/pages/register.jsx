import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginSuccess } from '../actions/auth'
import BaseURL from '../config/app.config'
import axios from 'axios'

function Register() {
    const { email } = useParams()
    const [inputs, setInputs] = useState({})
    const { error } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        setInputs(prev => ({ ...prev, email: email }))
    }, [email])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            let res = await axios.post(`${BaseURL}/api/auth/register`,
                {
                    username: inputs.username,
                    email: inputs.email,
                    password: inputs.password
                });
            if (res.data.error) {
                return dispatch(loginFailure(res.data.error))
            }
            dispatch(loginSuccess(res.data))
            navigate('/user')
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <Typography variant="h3">Register</Typography>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            <div style={{ display: 'flex', justifyContent: 'space-arround', gap: '1rem' }}>
                <a style={{ textDecoration: 'none', border: '2px solid white', padding: '.5rem 1rem', borderRadius: '.3rem' }} href='http://localhost/api/auth/google-login'>Google</a>
                <a style={{ textDecoration: 'none', border: '2px solid white', padding: '.5rem 1rem', borderRadius: '.3rem' }} href='http://localhost/api/auth/facebook-login'>Facebook</a>
                <a style={{ textDecoration: 'none', border: '2px solid white', padding: '.5rem 1rem', borderRadius: '.3rem' }} href='http://localhost/api/auth/github-login'>Github</a>
            </div>
            <TextField
                className='input'
                variant="outlined"
                label="Username"
                type='text'
                value={inputs.username || ''}
                color='success'
                style={{ width: '100%' }}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                fullWidth
            />
            <TextField
                className='input'
                variant="outlined"
                label="E-mail"
                type='email'
                disabled={email ? true : false}
                value={inputs.email || ''}
                color='success'
                style={{ width: '100%' }}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                fullWidth
            />
            <TextField
                className='input'
                variant="outlined"
                label="Password"
                value={inputs.password || ''}
                color='success'
                style={{ width: '100%' }}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                type='password'
                fullWidth
            />
            <Button className='btn btn-primary' variant="contained" type="submit" color="primary" sx={{ paddingBlock: '.5rem' }} fullWidth>
                Register
            </Button>
            <Typography variant="h6">Already have an account? <Link to={'/login'}>Login</Link></Typography>
        </form >
    )
}

export default Register