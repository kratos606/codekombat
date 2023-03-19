import React, { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import axios from 'axios'
import BaseURL from '../config/app.config'

function Check() {
    const [certificate, setCertificate] = useState('')
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.get(`${BaseURL}/api/user/certificate/${certificate}`).then(res => {
            if (res.data.certificate) {
                window.location = `${BaseURL}/certificate/${res.data.certificate}`
            }
            setError(res.data.error)
        })
    }
    return (
        <form className="form" style={{ width: 'min(90vw, 512px)', height: '50vh' }} onSubmit={handleSubmit}>
            <Typography variant='h4' style={{ margin: '10px' }}>
                Check Certificate
            </Typography>
            {error && <Typography variant='body1' style={{ color: 'red', margin: '10px' }}></Typography>}
            <TextField label="Certificate" variant="outlined" color='success' value={certificate} onChange={(e) => setCertificate(e.target.value)} fullWidth />
            <Button variant="contained" color="primary" type='submit' fullWidth>
                Check
            </Button>
        </form>
    )
}

export default Check