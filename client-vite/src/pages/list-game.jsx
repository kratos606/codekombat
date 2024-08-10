import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';
import { Navbar } from '../components';
import BaseURL from '../config/app.config';

function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <div ref={tilt} {...rest} />;
}

function ListGame() {
    const options = {
        max: 15,
        speed: 200,
        glare: true,
        "max-glare": 1,
    };
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getGames = async () => {
            const res = await axios.get(`${BaseURL}/api/game`);
            setGames(res.data);
        }
        getGames();
    }, []);
    return (
        <>
            <Navbar />
            <div style={{ width: '100%', height: 'calc(100vh - 80px)', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', overflowX: 'hidden', overflowY: 'auto' }}>
                {
                    games.map(game => {
                        return (
                            <Tilt className="box" options={options} onClick={() => {
                                localStorage.removeItem('code')
                                navigate(`/user/game/${game._id}`)
                            }}>
                                <div>
                                    <p>{game.name}</p>
                                </div>
                            </Tilt>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ListGame