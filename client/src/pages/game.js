import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Drawer, Avatar } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Tooltip } from '../components';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Check, Close } from '@mui/icons-material';
import Split from 'react-split'
import Editor from '../components/editor'
import Timer from '../components/timer'
import FontDropDown from '../components/fontDropDown'
import KeymapDropDown from '../components/keymapDropDown'
import ThemeDropDown from '../components/themeDropDown'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import axios from 'axios'
import BaseURL from '../config/app.config'
import Congrat from '../components/congrat.png';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import './css/game.css'
import { useSelector } from 'react-redux';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name[0].toUpperCase(),
    };
}

function Game() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [game, setGame] = useState({})
    const [profile, setProfile] = useState(false);
    const { user } = useSelector(state => state.auth)
    const [congratulation, setCongratulation] = useState(false);
    const [code, setCode] = useState(localStorage.getItem('code') || '');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dracula');
    const [keymap, setKeymap] = useState(localStorage.getItem('keymap') || 'sublime');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 14);
    const [testResult, setTestResult] = useState([]);
    const certificate = async () => {
        const { data } = await axios.get(`${BaseURL}/api/user/certificate`)
        if (data.certificate) {
            window.location = `${BaseURL}/certificate/${data.certificate}`
        }
    }
    const submit = async () => {
        let res = await axios.post(`${BaseURL}/api/game/${id}/submit`, { code })
        setTestResult(res.data.map(el => JSON.parse(el)));
        res.data.map(el => JSON.parse(el)).every((el) => el.passed) ? setCongratulation(true) : setCongratulation(false);
    }
    useEffect(() => {
        const getCodeBase = async () => {
            await axios.get(`${BaseURL}/api/game/${id}`)
                .then(res => {
                    setGame(res.data);
                    localStorage.getItem('code') || setCode(res.data.codeBase);
                })
            await axios.get(`${BaseURL}/api/solution/${id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data !== null) {
                        setCode(res.data.solution);
                        localStorage.setItem('code', res.data.solution);
                    }
                })
        }
        getCodeBase();
    }, [id])
    return (
        <>
            <nav style={{ position: 'relative', top: 0, left: 0, width: '100vw', height: '80px', paddingInline: '1rem', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/user" style={{ all: 'unset' }}>
                        <button style={{ color: 'white', textTransform: 'none', fontFamily: '"Open Sans", Helvetica, Arial, sans-serif', fontSize: '18px', backgroundColor: '#626ee3', width: '160px', height: '40px', borderRadius: '0 0 5px 5px', padding: '1.2rem .5rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} variant="filled" onClick={() => localStorage.removeItem('code')} >
                            <span>CodingArt</span>
                        </button>
                    </Link>
                    <Link to="/user/game" style={{ all: 'unset' }} className='navbar-link'>
                        <Tooltip title="Questions List" style={{ color: '#001528', width: 'max-content', padding: '1rem' }}>
                            <Button variant="outlined" id='button' className='Button'>
                                <FormatListBulletedIcon sx={{ fontSize: '2rem' }} />
                            </Button>
                        </Tooltip>
                    </Link>
                    <Link to="/user" style={{ all: 'unset' }} className='navbar-link' onClick={() => localStorage.removeItem('code')}>
                        <Tooltip title="Next Question" style={{ color: '#001528', width: 'max-content', padding: '1rem' }}>
                            <Button variant="outlined" id='button' className='Button'>
                                <ArrowForwardIcon sx={{ fontSize: '2rem' }} />
                            </Button>
                        </Tooltip>
                    </Link>
                    <Timer />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip title="Settings" style={{ color: '#001528', width: 'max-content', padding: '1rem' }}>
                        <Button variant="outlined" id='button' className='Button' onClick={() => setOpen(true)}>
                            <SettingsOutlinedIcon sx={{ fontSize: '2rem' }} />
                        </Button>
                    </Tooltip>
                    <Box>
                        <button style={{ all: 'unset', cursor: 'pointer' }} onClick={() => setProfile(!profile)}><Avatar {...stringAvatar(user.username)} /></button>
                        {profile && <Box sx={{ width: '200px', position: 'absolute', backgroundColor: '#15314b', transform: 'translate(-160px,20px)', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ width: '100%', textAlign: 'center', padding: '1rem' }}><Typography variant='h6'>{user.points}</Typography></Box>
                            {localStorage.getItem('Done') === 'yes' && <Box sx={{ width: '100%', textAlign: 'center' }}><Button color='success' fullWidth onClick={() => certificate()}>Get <br />Certificate</Button></Box>}
                            <Link to="/user/profile" style={{ all: 'unset' }}><Button variant="text" color="success" fullWidth>Profile</Button></Link>
                            <Button variant="text" color="success" fullWidth onClick={async () => { await axios.get(`${BaseURL}/api/auth/logout`); navigate('/') }}>Logout</Button>
                        </Box>}
                    </Box>
                </div>
            </nav>
            <div className='split'>
                <Split direction='vertical' style={{ height: 'calc(100vh - 100px)', width: '100vw' }} minSize={0}>
                    <Split style={{ display: 'flex' }} minSize={0}>
                        <div className='glass' style={{ padding: '1rem' }}>
                            <h1>{game.name}</h1>
                            <p>{game.description}</p>
                        </div>
                        <Split direction='vertical' style={{ height: 'calc(100vh - 105px)' }} minSize={0}>
                            <div className='glass'><Editor fontSize={fontSize} theme={theme} keymap={keymap} code={code} setCode={setCode} title='Solution' button='Submit Code' show={'on'} store={true} onClick={() => submit()} onReset={() => setCode(game.codeBase)} /></div>
                            <div className='glass'>
                                <h1>Test Result</h1>
                                <div style={{
                                    width: '100%', height: '75%', backgroundColor: '#001528', boxShadow: '0 0 2px white', overflow: 'auto', padding: '1rem'
                                }}>
                                    <p>{testResult.map(el => el.passed ? <Box><Typography variant='p' sx={{
                                        color: '#66bb6a'
                                    }}><Check color='success' sx={{ transform: 'translateY(0.4rem)' }} /> Test passed</Typography></Box> : <Box><Typography variant='p' sx={{ color: '#f44336' }}><Close sx={{ color: '#f44336', transform: 'translateY(0.4rem)' }} /> Test failed : {el.message}</Typography></Box>)}</p>
                                </div>
                            </div>
                        </Split>
                    </Split>
                </Split>
            </div>
            <div style={{ display: 'none' }} className='flex'>
                <div className='glass' style={{ padding: '2rem' }}>
                    <h1>{game.name}</h1>
                    <p>{game.description}</p>
                </div>
                <div className='glass'><Editor fontSize={fontSize} theme={theme} keymap={keymap} code={code} setCode={setCode} onClick={() => submit()} /></div>
                <div className='glass'>
                    <h1>Test Result</h1>
                    <div style={{
                        width: '100%', height: '75%', backgroundColor: '#001528', boxShadow: '0 0 2px white', overflow: 'auto', padding: '1rem'
                    }}>
                        <p>{testResult.map(el => el.passed ? <Box><Check color='success' sx={{ transform: 'translateY(0.4rem)' }} /><Typography variant='p' sx={{
                            color: '#66bb6a'
                        }}>Test passed</Typography></Box> : <Box><Close sx={{ color: '#f44336', transform: 'translateY(0.4rem)' }} /><Typography variant='p' sx={{ color: '#f44336' }}>Test failed : {el.message}</Typography></Box>)}</p>
                    </div>
                </div>
            </div>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: {
                        width: '50%',
                        backgroundColor: '#001528',
                        color: 'white',
                        padding: '1rem',
                    }
                }}
            >
                <Typography variant='h5' sx={{ color: 'white' }}>
                    Workspace Settings
                </Typography>
                <table>
                    <tr className='navbar-settings'>
                        <td>
                            <Link to="/user/game" style={{ all: 'unset' }}>
                                <Button variant="outlined" id='button' className='Button' sx={{ width: '40vw' }} startIcon={<FormatListBulletedIcon sx={{ fontSize: '2rem' }} />}>
                                    Questions List
                                </Button>
                            </Link>
                        </td>
                    </tr>
                    <tr className='navbar-settings'>
                        <td>
                            <Link to="/user" style={{ all: 'unset' }} onClick={() => localStorage.removeItem('code')}>
                                <Button variant="outlined" id='button' className='Button' sx={{ width: '40vw' }} startIcon={<ArrowForwardIcon sx={{ fontSize: '2rem' }} />}>
                                    Next Question
                                </Button>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20vw' }}>
                            <Typography variant='h6' sx={{ color: 'white', fontWeight: 300 }}>
                                Font Size
                            </Typography>
                        </td>
                        <td>
                            <FontDropDown fontSize={fontSize} setFontSize={setFontSize} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20vw' }}>
                            <Typography variant='h6' sx={{ color: 'white', fontWeight: 300 }}>
                                Keymap
                            </Typography>
                        </td>
                        <td>
                            <KeymapDropDown keymap={keymap} setKeymap={setKeymap} />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '20vw' }}>
                            <Typography variant='h6' sx={{ color: 'white', fontWeight: 300 }}>
                                Font Size
                            </Typography>
                        </td>
                        <td>
                            <ThemeDropDown theme={theme} setTheme={setTheme} />
                        </td>
                    </tr>
                </table>
            </Drawer>
            {congratulation && (
                <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
                    <ClickAwayListener onClickAway={() => setCongratulation(false)}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '50%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#001528', borderRadius: '10px', boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.3)', padding: '10px' }}>
                            <Typography variant='h5' sx={{ color: 'white' }}>Congratulation</Typography>
                            <img src={Congrat} alt="congrat" style={{ width: '30%', height: 'auto' }} />
                            <div>
                                <Button variant="contained" color="primary" onClick={() => navigate('/user/game')}>Next</Button>
                            </div>
                            <button style={{ all: 'unset', cursor: 'pointer', position: 'absolute', right: '20px', top: '20px' }} onClick={() => setCongratulation(false)}><Close /></button>
                        </div>
                    </ClickAwayListener>
                </div>
            )
            }
        </>
    )
}

export default Game