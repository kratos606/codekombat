import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios'
import BaseURL from '../config/app.config';

function Inbox() {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const getInbox = async () => {
            await axios.get(`${BaseURL}/api/mail`).then(res => {
                setMessages(res.data)
            })
        }
        getInbox()
    }, [])
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%', height: '90vh', gap: '2rem', marginBlock: '2rem', overflowY: 'auto', overflowX: 'hidden' }}>
                {messages.map((el) => {
                    return <div className="glass" style={{ position: 'relative', width: 'min(100%,300px)', height: '350px', zIndex: 10000, overflow: 'auto', wordWrap: 'break-word' }}>
                        <h1>{el.username}</h1>
                        <h6 style={{
                            fontSize: '1rem', fontFamily: 'Ubuntu, sans-serif', fontWeight: 'lighter'
                        }}>{el.email}</h6>
                        <p style={{ marginBlock: '1rem', textOverflow: 'ellipsis' }}>{el.message}</p>
                        <Button sx={{
                            position: 'absolute', top: '10px', right: '10px', color: 'white', '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            }
                        }} onClick={() => {
                            navigate('/admin/respond/username=' + el.username + '&email=' + el.email)
                        }}><ReplyIcon /></Button>
                    </div>
                })}
            </div>
        </>
    )
}

export default Inbox