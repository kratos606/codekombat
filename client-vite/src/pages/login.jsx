import React from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginSuccess } from '../actions/auth'
import BaseURL from '../config/app.config'
import axios from 'axios'
import './css/auth.css'

function Login() {
    const [inputs, setInputs] = React.useState({})
    const { error } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            let res = await axios.post(`${BaseURL}/api/auth/login`,
                {
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
        <form className='form' onSubmit={handleSubmit}>
            <Typography variant="h3">Login</Typography>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            <div style={{ display: 'flex', justifyContent: 'space-arround', gap: '1rem' }}>
                <a style={{ textDecoration: 'none', border: '2px solid white', padding: '.5rem 1rem', borderRadius: '.3rem' }} href='http://localhost/api/auth/google-login'>Google</a>
                <a style={{ textDecoration: 'none', border: '2px solid white', padding: '.5rem 1rem', borderRadius: '.3rem' }} href='http://localhost/api/auth/facebook-login'>Facebook</a>
                <a style={{ textDecoration: 'none', border: '2px solid white', padding: '.5rem 1rem', borderRadius: '.3rem' }} href='http://localhost/api/auth/github-login'>Github</a>
            </div>
            <TextField
                className='input'
                variant="outlined"
                label="E-mail"
                type={'email'}
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
                type={'password'}
                fullWidth
            />
            <Button className='btn btn-primary' variant="contained" type="submit" color="primary" sx={{ paddingBlock: '.5rem' }} fullWidth>
                Login
            </Button>
            <Typography variant="h6">Don't have an account? <Link to={'/register'}>Register</Link></Typography>
        </form>
    )
}

export default Login