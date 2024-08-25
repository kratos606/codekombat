import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Drawer, Snackbar, Alert } from '@mui/material'
import { Link } from 'react-router-dom';
import { Tooltip } from '../components';
import Split from 'react-split'
import Editor from '../components/editor'
import FontDropDown from '../components/fontDropDown'
import KeymapDropDown from '../components/keymapDropDown'
import ThemeDropDown from '../components/themeDropDown'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import axios from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for the editor
import BaseURL from '../config/app.config'
import './css/game.css'

const defaultTest = `import unittest
from temp.program import *

class TestProgram(unittest.TestCase):

    def test_case_1(self):
        # write your test cases

if __name__ == '__main__':
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(TestProgram)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)
`

function CreateGame() {
    const [open, setOpen] = useState(false)
    const [inputs, setInputs] = useState({})
    const [tester, setTester] = useState(defaultTest);
    const [testCases, setTestCases] = useState('');
    const [codeBase, setCodeBase] = useState('');
    const [successStatus, setSuccessStatus] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dracula');
    const [keymap, setKeymap] = useState(localStorage.getItem('keymap') || 'sublime');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 14);

    const submit = async () => {
        const game = {
            name: inputs.name,
            description: inputs.description,
            pts: inputs.pts,
            codeBase: codeBase,
            tester: tester,
            testCases: testCases.split('\n').map(x => x.split(' ')),
        }
        console.log(game)
        await axios.post(`${BaseURL}/api/game`, game).then(res => {
            setSuccessStatus(true)
            setSuccessMessage(res.data.success ? 'Game created successfully' : 'Game creation failed');
        }).catch(() => {
            setSuccessStatus(true)
            setSuccessMessage('Game creation failed');
        })
    }

    return (
        <>
            <nav style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '80px', paddingInline: '1rem', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/user" style={{ all: 'unset' }}>
                        <button style={{ color: 'white', textTransform: 'none', fontFamily: '"Open Sans", Helvetica, Arial, sans-serif', fontSize: '18px', backgroundColor: '#626ee3', width: '160px', height: '40px', borderRadius: '0 0 5px 5px', padding: '1.2rem .5rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} variant="filled" onClick={() => localStorage.removeItem('code')} >
                            <span>CodeKombat</span>
                        </button>
                    </Link>
                </div>
                <Tooltip title="Settings" style={{ color: '#001528', width: 'max-content', padding: '1rem' }}>
                    <Button variant="outlined" id='button' className='Button' onClick={() => setOpen(true)}>
                        <SettingsOutlinedIcon sx={{ fontSize: '2rem' }} />
                    </Button>
                </Tooltip>
            </nav>
            <Split
                className="split main"
                minSize={0}
                sizes={[50,50]}
            >
                <div className={'section'} style={{height:'100%',overflow:'hidden'}}>
                        <div className='glass' style={{ padding: '2rem', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                            <ReactQuill
                                theme="snow"
                                value={inputs.description || ''}
                                onChange={(content) => setInputs(prevInputs => ({
                                    ...prevInputs,
                                    description: content,
                                }))}
                                style={{ marginBlockStart: '1rem', minWidth: '220px', flex: 1, minHeight: '100px' }}
                            />
                        </div>
                        </div>
                        <Split className={'split column'} direction='vertical' minSize={0} sizes={[60,40]} style={{overflow:'hidden'}}>
                            <div className={'section'}>
                            <div className='glass'><Editor code={tester} setCode={setTester} title={'Test'} keymap={keymap} theme={theme} fontSize={fontSize} button={'Submit Test'} store={true} onClick={() => submit()} onReset={() => setTester(defaultTest)} /></div>
                            </div>
                            <div className={'section'}>
                            <div className='glass'>
                                <Editor code={codeBase} setCode={setCodeBase} title={'Code Base'} keymap={keymap} theme={theme} fontSize={fontSize} show={'off'} />
                            </div>
                            </div>
                    </Split>
                </Split>
            
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
                <Alert severity={successMessage === 'Game creation failed' ? 'error' : 'success'} onClose={() => { setSuccessStatus(false) }} sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default CreateGame;