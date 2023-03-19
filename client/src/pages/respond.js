import React, { useRef } from 'react';
import { Button, TextField } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useParams } from 'react-router-dom';

const Respond = () => {
    const form = useRef();
    const { username, email } = useParams();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_x33isrk', 'template_grawkw9', form.current, '-5_kr31srql3AF5q2')
    };

    return (
        <>

            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="glass" style={{ height: 'max-content', width: 'min(700px,90%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>Reply</h1>
                    <form ref={form} onSubmit={sendEmail}>
                        <TextField
                            className='input'
                            variant="outlined"
                            label="Username"
                            type={'text'}
                            color='success'
                            name='username'
                            value={username}
                            disabled
                            inputProps={{
                                readOnly: true
                            }}
                            InputLabelProps={{
                                style: {
                                    fontWeight: 'bold'
                                }
                            }}
                            sx={{
                                marginBlock: '1rem'
                            }}
                            fullWidth
                        />
                        <TextField
                            className='input'
                            variant="outlined"
                            label="E-mail"
                            type={'email'}
                            color='success'
                            name='email'
                            value={email}
                            disabled
                            inputProps={{
                                readOnly: true
                            }}
                            InputLabelProps={{
                                style: {
                                    fontWeight: 'bold'
                                }
                            }}
                            sx={{
                                marginBlock: '1rem'
                            }}
                            fullWidth
                        />
                        <TextField
                            multiline
                            className='input'
                            variant="outlined"
                            label="Message"
                            type={'text'}
                            color='success'
                            maxRows={5}
                            name='message'
                            InputLabelProps={{
                                style: {
                                    fontWeight: 'bold'
                                }
                            }}
                            sx={{
                                marginBlock: '1rem',
                                cursor: 'text'
                            }}
                            InputProps={{
                                style: {
                                    all: 'unset',
                                    height: '150px',
                                    padding: '1rem',
                                    borderRadius: '5px',
                                }
                            }}
                            fullWidth
                        />
                        <Button
                            variant='contained'
                            type='submit'
                            fullWidth
                        >
                            Reply
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Respond;