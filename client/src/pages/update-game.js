import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Drawer, TextField, Snackbar, Alert } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import { Tooltip } from '../components';
import Split from 'react-split'
import Editor from '../components/editor'
import FontDropDown from '../components/fontDropDown'
import KeymapDropDown from '../components/keymapDropDown'
import ThemeDropDown from '../components/themeDropDown'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import axios from 'axios'
import BaseURL from '../config/app.config'
import './css/game.css'

const defaultTest = `import sys,os
import threading
import json
from temp.program import *

def test():
    # write you test here
    # return array ex : [condition, passed_message if condition failed_message else failed_message]
    pass

def run():
    try:
        if test()[0]:
            print(json.dumps({'passed':True}))
        else:
            print(json.dumps({'passed':False,'message':test()[1]}))
    except Exception as e:
        print(json.dumps({'passed':False,'message':str(e)}))
    t2.cancel()

def runtime():
    if t.is_alive():
        print(json.dumps({'passed':False,'message':"This solution takes too long"}))
        os._exit(0)

if __name__ == '__main__':
    t = threading.Thread(target=run)
    t2 = threading.Timer(5, runtime) 
    t.daemon = True
    t.start()
    t2.start()`

function UpdateGame() {
    const { id } = useParams();
    const [open, setOpen] = useState(false)
    const [inputs, setInputs] = useState({})
    const [tester, setTester] = useState(localStorage.getItem('code') || defaultTest);
    const [testCases, setTestCases] = useState('');
    const [codeBase, setCodeBase] = useState('');
    const [successStatus, setSuccessStatus] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dracula');
    const [keymap, setKeymap] = useState(localStorage.getItem('keymap') || 'sublime');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 14);
    useEffect(() => {
        axios.get(`${BaseURL}/api/game/${id}`)
            .then(res => {
                setInputs(res.data)
                setCodeBase(res.data.codeBase)
                setTester(res.data.tester)
                setTestCases(res.data.testCases.map(el =>
                    el.join(' ')
                ).join('\n'))
            })
    }, [id])
    const submit = async () => {
        const game = {
            name: inputs.name,
            description: inputs.description,
            pts: inputs.pts,
            codeBase: codeBase,
            tester: tester,
            testCases: testCases.split('\n').map(x => x.split(' ')),
        }
        await axios.put(`${BaseURL}/api/game/${id}`, game).then(res => {
            setSuccessStatus(true)
            setSuccessMessage(res.data.success ? 'Game updated successfully' : 'Game update failed');
        }).catch(() => {
            setSuccessStatus(true)
            setSuccessMessage('Game update failed');
        });
    }
    return (
        <>
            <nav style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '80px', paddingInline: '1rem', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/user" style={{ all: 'unset' }}>
                        <button style={{ color: 'white', textTransform: 'none', fontFamily: '"Open Sans", Helvetica, Arial, sans-serif', fontSize: '18px', backgroundColor: '#626ee3', width: '160px', height: '40px', borderRadius: '0 0 5px 5px', padding: '1.2rem .5rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} variant="filled" onClick={() => localStorage.removeItem('code')} >
                            <span>CodingArt</span>
                        </button>
                    </Link>
                </div>
                <Tooltip title="Settings" style={{ color: '#001528', width: 'max-content', padding: '1rem' }}>
                    <Button variant="outlined" id='button' className='Button' onClick={() => setOpen(true)}>
                        <SettingsOutlinedIcon sx={{ fontSize: '2rem' }} />
                    </Button>
                </Tooltip>
            </nav>
            <div className='split'>
                <Split direction='vertical' style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
                    <Split style={{ display: 'flex' }}>
                        <Split direction='vertical' style={{ height: 'calc(100vh - 105px)' }}>
                            <div className='glass' style={{ padding: '1rem' }}>
                                <Typography variant='h4'>
                                    Create Game
                                </Typography>
                                <TextField
                                    className='input'
                                    variant="outlined"
                                    label="Name"
                                    type={'text'}
                                    value={inputs.name || ''}
                                    color='success'
                                    InputLabelProps={{
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    sx={{
                                        marginBlockStart: '1rem',
                                        minWidth: '220px',
                                    }}
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    className='input'
                                    variant="outlined"
                                    label="Points"
                                    type={'number'}
                                    value={inputs.pts || ''}
                                    color='success'
                                    InputLabelProps={{
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    sx={{
                                        marginBlockStart: '1rem',
                                        minWidth: '220px',
                                    }}
                                    onChange={(e) => setInputs({ ...inputs, pts: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    multiline
                                    className='input'
                                    variant="outlined"
                                    label="Description"
                                    type={'text'}
                                    color='success'
                                    maxRows={5}
                                    InputLabelProps={{
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    }}
                                    sx={{
                                        marginBlockStart: '1rem',
                                        minWidth: '220px'
                                    }}
                                    InputProps={{
                                        style: {
                                            all: 'unset',
                                            height: '100px',
                                            padding: '1rem',
                                            borderRadius: '5px'
                                        }
                                    }}
                                    value={inputs.description || ''}
                                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                    fullWidth
                                />
                            </div>
                            <div className='glass' style={{ padding: '1.5rem' }}>
                                <Box sx={{ marginLeft: '.5rem', height: '2rem', lineHeight: '2rem', width: '100px', background: 'rgb(255,255,255,0.2)', textAlign: 'center', borderRadius: '2rem', marginBlockEnd: '1rem' }}>
                                    Test Cases
                                </Box><textarea style={{
                                    height: 'calc(93% - 2rem)', width: 'max(100%,120px)', padding: '1rem', background: '#001528', color: 'white', boxShadow: '0 0 2px white', resize: 'none', border: 'none', outline: 'none'
                                }} value={testCases} onChange={(e) => setTestCases(e.target.value)} />
                            </div>
                        </Split>
                        <Split direction='vertical' style={{ height: 'calc(100vh - 105px)' }}>
                            <div className='glass'><Editor code={tester} setCode={setTester} title={'Test'} keymap={keymap} theme={theme} fontSize={fontSize} button={'Submit Test'} store={true} onClick={() => submit()} onReset={() => setTester(defaultTest)} /></div>
                            <div className='glass'>
                                <Editor code={codeBase} setCode={setCodeBase} title={'Code Base'} keymap={keymap} theme={theme} fontSize={fontSize} show={'off'} />
                            </div>
                        </Split>
                    </Split>
                </Split>
            </div>
            <div style={{ display: 'none' }} className='flex'>
                <div className='glass' style={{ padding: '2rem', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignContent: 'space-around' }}>
                    <Typography variant='h4'>
                        Create Game
                    </Typography>
                    <TextField
                        className='input'
                        variant="outlined"
                        label="Name"
                        type={'text'}
                        value={inputs.name || ''}
                        color='success'
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold'
                            }
                        }}
                        sx={{
                            marginBlockStart: '1rem',
                            minWidth: '220px',
                        }}
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        className='input'
                        variant="outlined"
                        label="Points"
                        type={'number'}
                        value={inputs.pts || ''}
                        color='success'
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold'
                            }
                        }}
                        sx={{
                            marginBlockStart: '1rem',
                            minWidth: '220px',
                        }}
                        onChange={(e) => setInputs({ ...inputs, pts: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        multiline
                        className='input'
                        variant="outlined"
                        label="Description"
                        type={'text'}
                        color='success'
                        maxRows={5}
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold'
                            }
                        }}
                        sx={{
                            marginBlockStart: '1rem',
                            minWidth: '220px'
                        }}
                        InputProps={{
                            style: {
                                all: 'unset',
                                height: '100px',
                                padding: '1rem',
                                borderRadius: '5px'
                            }
                        }}
                        value={inputs.description || ''}
                        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                        fullWidth
                    />
                </div>
                <div className='glass' style={{ width: '100%' }}>
                    <Box sx={{ marginLeft: '.5rem', height: '2rem', lineHeight: '2rem', width: '100px', background: 'rgb(255,255,255,0.2)', textAlign: 'center', borderRadius: '2rem', marginBlockEnd: '1rem' }}>
                        Test Cases
                    </Box><textarea style={{
                        height: 'calc(93% - 2rem)', width: 'max(100%,120px)', padding: '1rem', background: '#001528', color: 'white', boxShadow: '0 0 2px white', resize: 'none', border: 'none', outline: 'none'
                    }} value={testCases} onChange={(e) => setTestCases(e.target.value)} />
                </div>
                <div className='glass' style={{ width: '100%' }}>
                    <Editor code={tester} setCode={setTester} title={'Test'} keymap={keymap} theme={theme} fontSize={fontSize} button={'Submit Test'} store={true} onClick={() => submit()} onReset={() => setTester(defaultTest)} />
                </div>
                <div className='glass' style={{ width: '100%' }}>
                    <Editor code={codeBase} setCode={setCodeBase} title={'Code Base'} keymap={keymap} theme={theme} fontSize={fontSize} show={'off'} />
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
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={successStatus} autoHideDuration={6000} onClose={() => { setSuccessStatus(false) }}>
                <Alert severity={successMessage === 'Game update failed' ? 'error' : 'success'} onClose={() => { setSuccessStatus(false) }} variant="filled" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default UpdateGame;
