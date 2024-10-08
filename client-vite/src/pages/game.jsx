import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Drawer, Avatar,TextField } from '@mui/material'
import { Tabs, Tab } from '@mui/material';
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
import WhiteBoardModeDropDown from '../components/whiteBoardModeDropDown';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import axios from 'axios'
import BaseURL from '../config/app.config'
import Congrat from '../components/congrat.png';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './css/game.css'
import { useSelector } from 'react-redux';
import Highlight from 'react-highlight'
import 'highlight.js/styles/atom-one-dark.css'

const HighlightedDescription = ({ description }) => {
    const parseHTML = (html) => {
      const div = document.createElement('div');
      div.innerHTML = html;
  
      const elements = Array.from(div.childNodes).map((node, index) => {
        if (node.nodeName === 'PRE') {
          const code = node.textContent || node.innerText;
          return (
            <Highlight key={index} language="python">
              {code}
            </Highlight>
          );
        }
        return <div key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />;
      });
  
      return elements;
    };
  
    const content = parseHTML(description);
  
    return <div>{content}</div>;
};

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
    const [whiteboardMode, setWhiteboardMode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [testResult, setTestResult] = useState([]);
    const [isPhone, setIsPhone] = useState(window.innerWidth < 840);
    const [tabValue, setTabValue] = useState(0);
    const [time, setTime] = React.useState(0);
    const [countDown, setCountDown] = React.useState(45);
    const [timerOn, setTimerOn] = React.useState(false);
    const [countDownOn, setCountDownOn] = React.useState(false);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    React.useEffect(() => {
        let interval = null;
        let intervalCountDown = null;
        if (countDownOn) {
            intervalCountDown = setInterval(() => {
                setCountDown((prevCountDown) => ((prevCountDown * 60) - 1) / 60);
            }, 1000);
        }
        else if (!countDownOn) {
            clearInterval(intervalCountDown);
        }
        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }
        return () => {
            clearInterval(intervalCountDown)
            clearInterval(interval)
        }
    }, [timerOn, countDownOn]);

    useEffect(() => {
        const handleResize = () => {
            setIsPhone(window.innerWidth < 840);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const certificate = async () => {
        const { data } = await axios.get(`${BaseURL}/api/user/certificate`)
        if (data.certificate) {
            window.location = `${BaseURL}/certificate/${data.certificate}`
        }
    }
    
    const submit = async () => {
        try {
          let res = await axios.post(`${BaseURL}/api/game/${id}/submit`, { code });
          // No need to parse the objects as they are already in JSON format
          setTestResult(res.data);
      
          console.log(res.data);  // Log the data to verify its structure
      
          // Check if all test cases passed
          res.data.every((el) => el.passed) ? setCongratulation(true) : setCongratulation(false);
        } catch (error) {
          console.error("An error occurred:", error);
          // Handle the error appropriately
        }
    };

    useEffect(() => {
        const getCodeBase = async () => {
            await axios.get(`${BaseURL}/api/game/${id}`)
                .then(res => {
                    setGame(res.data);
                    setCode(res.data.codeBase);
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
                            <span>CodeKombat</span>
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
                    {isPhone ? null : <Timer />}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip title="Settings" style={{ color: '#001528', width: 'max-content', padding: '1rem' }}>
                        <Button variant="outlined" id='button' className='Button' onClick={() => setOpen(true)}>
                            <SettingsOutlinedIcon sx={{ fontSize: '2rem' }} />
                        </Button>
                    </Tooltip>
                    {isPhone ? null : <Box>
                        <button style={{ all: 'unset', cursor: 'pointer' }} onClick={() => setProfile(!profile)}><Avatar {...stringAvatar(user.username)} /></button>
                        {profile && <Box sx={{ width: '200px', position: 'absolute', backgroundColor: '#15314b', transform: 'translate(-160px,20px)', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ width: '100%', textAlign: 'center', padding: '1rem' }}><Typography variant='h6'>{user.points}</Typography></Box>
                            {localStorage.getItem('Done') === 'yes' && <Box sx={{ width: '100%', textAlign: 'center' }}><Button color='success' fullWidth onClick={() => certificate()}>Get <br />Certificate</Button></Box>}
                            <Link to="/user/profile" style={{ all: 'unset' }}><Button variant="text" color="success" fullWidth>Profile</Button></Link>
                            <Button variant="text" color="success" fullWidth onClick={async () => { await axios.get(`${BaseURL}/api/auth/logout`); navigate('/') }}>Logout</Button>
                        </Box>}
                    </Box>}
                </div>
            </nav>
            {isPhone ? (
                <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
                    <Box sx={{ flexGrow: 1, overflow: 'hidden', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                        {tabValue === 0 && (
                            <div className={'section'} style={{ flexGrow: 1, overflow: 'auto' }}>
                                <div className='glass' style={{ height: '100%',overflow:'auto' }}>
                                    <h1>{game.name}</h1>
                                    <HighlightedDescription description={game.description} />
                                </div>
                            </div>
                        )}
                        {tabValue === 1 && (
                            <div className={'section'} style={{ flexGrow: 1, overflow: 'auto' }}>
                                <div className={isFullScreen ? 'glass fullscreen' : 'glass'} style={{ height: '100%' }}>
                                    <Editor
                                        fontSize={fontSize}
                                        theme={theme}
                                        keymap={keymap}
                                        code={code}
                                        setCode={setCode}
                                        isFullScreen={isFullScreen}
                                        setIsFullScreen={setIsFullScreen}
                                        whiteboardMode={whiteboardMode}
                                        setWhiteboardMode={setWhiteboardMode}
                                        title="Solution"
                                        button="Submit"
                                        run={() => submit()}
                                        phone={'off'}
                                        store={true}
                                        onClick={() => submit()}
                                        onReset={() => setCode(game.codeBase)}
                                    />
                                </div>
                            </div>
                        )}
                        {tabValue === 2 && (
                            <div className={'section'} style={{ flexGrow: 1, overflow: 'auto' }}>
                                <div className='glass' style={{ height: '100%' }}>
                                    <h1>Test Result</h1>
                                    <div style={{
                                        width: '100%', height: 'calc(100% - 80px)', backgroundColor: '#001528', boxShadow: '0 0 2px white', overflow: 'auto', padding: '1rem'
                                    }}>
                                        <p>{testResult.map(el => el.passed ? <Box><Typography variant='p' sx={{
                                            color: '#66bb6a'
                                        }}><Check color='success' sx={{ transform: 'translateY(0.4rem)' }} /> Test passed</Typography></Box> : <Box><Typography variant='p' sx={{ color: '#f44336' }}><Close sx={{ color: '#f44336', transform: 'translateY(0.4rem)' }} /> Test failed : {el.message}</Typography></Box>)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Box>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        sx={{ position:'fixed',bottom:0,width:'100%' }}
                    >
                        <Tab label="Info" />
                        <Tab label="Solution" />
                        <Tab label="Result" />
                    </Tabs>
                </div>
            ) : (
                <Split
                    className="split main"
                    minSize={0}
                    sizes={[50, 50]}
                >
                    <div className={'section'} style={{ height: '100%', overflow: 'hidden' }}>
                        <div className='glass' style={{ padding: '1rem',overflow:'auto' }}>
                            <h1>{game.name}</h1>
                            <HighlightedDescription description={game.description} />
                        </div>
                    </div>
                    <Split className={'split column'} direction='vertical' minSize={0} sizes={[60, 40]}>
                        <div className={'section'}>
                            <div className={isFullScreen ? 'glass hui fullscreen' : 'glass hui'}>
                                <Editor
                                    fontSize={fontSize}
                                    theme={theme}
                                    keymap={keymap}
                                    code={code}
                                    setCode={setCode}
                                    isFullScreen={isFullScreen}
                                    setIsFullScreen={setIsFullScreen}
                                    whiteboardMode={whiteboardMode}
                                    setWhiteboardMode={setWhiteboardMode}
                                    title='Solution'
                                    button='Submit'
                                    run={() => submit()}
                                    show={'on'}
                                    store={true}
                                    onClick={() => submit()}
                                    onReset={() => setCode(game.codeBase)}
                                />
                            </div>
                        </div>
                        <div className={'section'} style={{ overflow: 'hidden' }}>
                            <div className='glass' style={{display:'flex',flexDirection:'column'}}>
                                <h1>Test Result</h1>
                                <div style={{
                                    width: '100%', flexGrow:1, backgroundColor: '#001528', boxShadow: '0 0 2px white', overflow: 'auto', padding: '1rem'
                                }}>
                                    <p>{testResult.map(el => el.passed ? <Box><Typography variant='p' sx={{
                                        color: '#66bb6a'
                                    }}><Check color='success' sx={{ transform: 'translateY(0.4rem)' }} /> Test passed</Typography></Box> : <Box><Typography variant='p' sx={{ color: '#f44336' }}><Close sx={{ color: '#f44336', transform: 'translateY(0.4rem)' }} /> Test failed : {el.message}</Typography></Box>)}</p>
                                </div>
                            </div>
                        </div>
                    </Split>
                </Split>
            )}
            <Drawer
                anchor={'right'}
                open={open}
                onClose={() => setOpen(false)}
                variant="plain"
                BackdropProps={{ invisible: true }}
                PaperProps={{
                    style: {
                        width: isPhone ? '100%' : '50%',
                        backgroundColor: '#02203c',
                        color: 'white',
                        padding: '1rem',
                    }
                }}
            >
                 <IconButton 
      onClick={() => setOpen(false)} 
      sx={{ position: 'absolute', top: 8, left: 8, color: 'white' }}
    >
      <CloseIcon />
    </IconButton>
        {!isPhone ? null : <><Link to="/user/game" style={{ all: 'unset' }}>
                    <Box sx={{ position: 'relative',width:'100%',margin:'3rem 0 1rem 0' }}>
                        <Button variant="outlined" id='button' className='Button' sx={{ width: '100%' }} onClick={() => setOpen(!open)}>
                            <FormatListBulletedIcon sx={{ fontSize: '2rem' }} />
                            <div style={{ marginLeft: '0.5rem' }}>
                                Questions List
                            </div>
                        </Button>
                    </Box></Link>
                    <Link to="/user" style={{ all: 'unset' }}>
                    <Box sx={{ position: 'relative',width:'100%' }}>
                        <Button variant="outlined" id='button' className='Button' sx={{ width: '100%' }} onClick={() => setOpen(!open)}>
                            <ArrowForwardIcon sx={{ fontSize: '2rem' }} />
                            <div style={{ marginLeft: '0.5rem' }}>
                                Next Question
                            </div>
                        </Button>
                    </Box></Link>
                    <Box sx={{ width: '100%', height: 'max-content', backgroundColor: '#15314b', color: 'white', padding: '20px', borderRadius: '4px', display: open ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 5px 5px rgba(0,0,0,.5)', zIndex: 1000, marginBlockStart: '0.5rem' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Timer</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}><span>{("0" + Math.floor((countDown * 60) / 3600)).slice(-2)}:</span>
                <span>{("0" + Math.floor((countDown * 60) / 60) % 60).slice(-2)}:</span>
                <span>{("0" + (Math.floor(countDown * 60) % 60)).slice(-2)}</span></Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }}>Minutes</Typography>
            <TextField
                variant='outlined'
                sx={{ width: '100%', marginTop: '10px' }}
                type='number'
                value={Math.floor(countDown)}
                onChange={(e) => setCountDown(e.target.value)}
                inputProps={{ style: { color: "black", borderRadius: '8px', backgroundColor: 'white' } }}
            />
            <Box sx={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                {countDownOn ? <Button variant="contained" onClick={() => setCountDownOn(false)} sx={{ marginTop: '10px', marginInlineStart: '5px', flex: 1, fontWeight: 'bold' }} color='secondary'>Stop</Button> : <Button variant="contained" onClick={() => setCountDownOn(true)} sx={{ marginTop: '10px', marginInlineStart: '5px', flex: 1, fontWeight: 'bold' }} color='secondary'>{countDown === 45 ? "Start" : "Resume"}</Button>}
                <Button variant="contained" sx={{ marginTop: '10px', marginInlineStart: '5px', flex: 1, fontWeight: 'bold' }} color='error' onClick={() => { setCountDown(45); setCountDownOn(false) }}>Reset</Button>
            </Box>
            <hr style={{
                width: '100%',
                marginTop: '2rem',
                marginBottom: '2rem',
                border: '5px solid #000',
                borderRadius: '5px'
            }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Timer</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </Typography>
            <Box sx={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                {timerOn ? <Button variant="contained" onClick={() => setTimerOn(false)} sx={{ marginTop: '10px', marginInlineStart: '5px', flex: 1, fontWeight: 'bold' }} color='secondary'>Stop</Button> : <Button variant="contained" onClick={() => setTimerOn(true)} sx={{ marginTop: '10px', marginInlineStart: '5px', flex: 1, fontWeight: 'bold' }} color='secondary'>{time === 0 ? "Start" : "Resume"}</Button>}
                <Button variant="contained" sx={{ marginTop: '10px', marginInlineStart: '5px', flex: 1, fontWeight: 'bold' }} color='error' onClick={() => { setTime(0); setTimerOn(false) }}>Reset</Button>
            </Box>
        </Box></>}
                <Typography className='DrawerTitle settingsTitle' variant='h3' sx={{ color: 'white' }}>
          Workspace Settings
      </Typography>
      <div className="settings-grid">
          <div style={{
              display:'flex',alignItems:'center'
          }}>
              <Typography className='DrawerMenuName' variant='h6' sx={{ color: 'white', fontWeight: 300 }}>
              Font Size
              </Typography>
          </div>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
              <FontDropDown fontSize={fontSize} setFontSize={setFontSize} /> 
          </div>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
              <Typography className='DrawerMenuName' variant='h6' sx={{ color: 'white', fontWeight: 300 }}>
              Editor Key Maps
              </Typography>
          </div>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
              <KeymapDropDown keymap={keymap} setKeymap={setKeymap} />
          </div>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
              <Typography className='DrawerMenuName' variant='h6' sx={{ color: 'white', fontWeight: 300 }}>  
              Editor Theme
              </Typography>
          </div>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
              <ThemeDropDown theme={theme} setTheme={setTheme} />
          </div>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
              <Typography className='DrawerMenuName' variant='h6' sx={{ color: 'white', fontWeight: 300 }}>  
              Whiteboard Mode
              </Typography>
          </div>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
              <WhiteBoardModeDropDown whiteboardMode={whiteboardMode} setWhiteboardMode={setWhiteboardMode} />
          </div>
      </div>
      <Typography className='DrawerTitle settingsTitle' variant='h3' sx={{ color: 'white' }}>
          Editor Key Bindings
      </Typography>
        <div className="settings-grid" style={{gap:0,gridAutoRows:'minmax(30px, min-content)',margin:'20px 0'}}>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
            <Typography className='DrawerMenuName' variant='h6' sx={{ color: 'white', fontWeight: 300 }}>  
                Ctrl + 0
            </Typography>
          </div>
          <div style={{
              display:'flex',alignItems:'center',justifyContent:'right'
          }}>
            <Typography className='DrawerMenuName' variant='h6' sx={{ color: 'white', fontWeight: 300 }}>  
                Submit Code
            </Typography>
          </div>
          <div style={{
              display:'flex',alignItems:'center'
          }}>
            <Typography className='DrawerMenuName' variant='h6' sx={{ color: 'white', fontWeight: 300 }}>  
                Ctrl + Z
            </Typography>
          </div>
          <div style={{
              display:'flex',alignItems:'center',justifyContent:'right'
          }}>
            <Typography className='DrawerMenuName' variant='h6' sx={{ color: 'white', fontWeight: 300 }}>  
                Undo Change
            </Typography>
          </div>
        </div>
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