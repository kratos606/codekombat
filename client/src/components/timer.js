import React from 'react'
import { Button, Box, Typography, TextField, ClickAwayListener } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Tooltip from './tooltip/tooltip';

function Timer(props) {
    const [time, setTime] = React.useState(0);
    const [countDown, setCountDown] = React.useState(45);
    const [timerOn, setTimerOn] = React.useState(false);
    const [countDownOn, setCountDownOn] = React.useState(false);
    const [open, setOpen] = React.useState(false);
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
    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Tooltip title="Timer | Stopwatch" style={{ color: '#001528', width: 'max-content', padding: '1rem' }}>
                <Box>
                    <Box sx={{ position: 'relative' }}>
                        <Button variant="outlined" id='button' className='Button Timer' sx={{ width: '200px' }} onClick={() => setOpen(!open)}>
                            <AccessAlarmIcon sx={{ fontSize: '2rem!important' }} />
                            <div style={{ marginLeft: '0.5rem' }}>
                                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                                &nbsp;|&nbsp;
                                <span>{("0" + Math.floor((countDown * 60) / 3600)).slice(-2)}:</span>
                                <span>{("0" + Math.floor((countDown * 60) / 60) % 60).slice(-2)}:</span>
                                <span>{("0" + (Math.floor(countDown * 60) % 60)).slice(-2)}</span>
                            </div>
                        </Button>
                    </Box>
                    <Box sx={{ position: 'absolute', top: '40px', right: '0px', width: '250px', height: 'max-content', backgroundColor: '#15314b', color: 'white', padding: '20px', borderRadius: '4px', display: open ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 5px 5px rgba(0,0,0,.5)', zIndex: 1000, marginBlockStart: '0.5rem' }}>
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
                    </Box>
                </Box>
            </Tooltip>
        </ClickAwayListener >
    )
}

export default Timer
