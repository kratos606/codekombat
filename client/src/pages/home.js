import React, { useState } from 'react'
import { TextField, Box, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'
import './css/home.css'

function Home() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const submit = () => {
        navigate(`/register/email=${email}`)
    }
    return (
        <>
            <div className="home-container">
                <Box>
                    <h1 style={{ textAlign: 'center' }}>Welcome to CodingArt</h1>
                    <p style={{ textAlign: 'center' }}>
                        Unlimited coding interviews questions.
                    </p>
                </Box>
                <form style={{ display: 'flex', flexDirection: 'row', width: '100%' }} onSubmit={() => submit()}>
                    <TextField sx={{ flex: 1 }} variant="outlined" label="E-mail" required='required' color="success" type={'email'} onChange={(e) => setEmail(e.target.value)} />
                    <Button variant="contained" color="primary" type='submit'>
                        Join US
                    </Button>
                </form>
                <Button variant="contained" color="primary" onClick={() => { navigate('/contact') }} fullWidth>
                    Contact Us
                </Button>

            </div>
            <div className="search-cer" onClick={() => navigate('/check')}>
                <SearchIcon style={{ color: '#0e0e0e', fontSize: '2rem' }} />
            </div>
        </>
    )
}

export default Home