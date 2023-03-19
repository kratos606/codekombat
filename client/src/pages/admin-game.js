import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete'
import VanillaTilt from 'vanilla-tilt';
import { Alert, Button, Snackbar } from '@mui/material';
import BaseURL from '../config/app.config';

function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);
    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <div ref={tilt} {...rest} />;
}

function AdminGame() {
    const options = {
        max: 15,
        speed: 200,
        glare: true,
        "max-glare": 1,
    };
    const [games, setGames] = useState([]);
    const [successStatus, setSuccessStatus] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        await axios.delete(`${BaseURL}/api/game/${id}`).then(res => {
            setSuccessStatus(true)
            setSuccessMessage(res.data.success ? 'Game deleted successfully' : 'Game delete failed');
        }).catch(() => {
            setSuccessStatus(true)
            setSuccessMessage('Game delete failed');
        });
        setGames(games.filter(game => game._id !== id));
    }
    useEffect(() => {
        const getGames = async () => {
            const res = await axios.get(`${BaseURL}/api/game`);
            setGames(res.data);
        }
        getGames();
    }, []);
    return (
        <>


            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
                {
                    games.map(game => {
                        return (
                            <Tilt className="box" options={options} onClick={() => navigate(`/admin/game/${game._id}`)}>
                                <div>
                                    <p>{game.name}</p>
                                </div>
                                <Button sx={{ all: 'unset', cursor: 'pointer', position: 'absolute', top: '1rem', right: '1rem', height: '3rem', width: '3rem', background: 'rgba(0,0,0,0.3)', textAlign: 'center', borderRadius: '50%', '&:hover': { backgroundColor: '#2196f3' } }} onClick={(event) => {
                                    handleDelete(game._id);
                                    event.stopPropagation()
                                }}><DeleteIcon sx={{ fontSize: '2rem' }} /></Button>
                            </Tilt>
                        )
                    })
                }
            </div>
            <button className='create-game' onClick={() => navigate('/admin/game/new')}>+</button>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={successStatus} autoHideDuration={6000} onClose={() => { setSuccessStatus(false) }}>
                <Alert severity={successMessage === 'Game delete failed' ? 'error' : 'success'} onClose={() => { setSuccessStatus(false) }} variant="filled" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AdminGame