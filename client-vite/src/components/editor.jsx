import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';
import 'codemirror/mode/python/python';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/emacs';
import 'codemirror/keymap/vim';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/lib/codemirror.css';

function Editor(props) {
    React.useEffect(() => {
        document.querySelectorAll('.CodeMirror, .CodeMirror-gutters').forEach(el => {
            el.style.fontSize = `${props.fontSize}px`
        })
    }, [props.fontSize])
    React.useEffect(() => {
        const cmInstance = document.querySelector('.CodeMirror').CodeMirror;
        cmInstance.setOption('theme', props.theme);
    }, [props.theme]);
    React.useEffect(() => {
        const cmInstance = document.querySelector('.CodeMirror').CodeMirror;
        cmInstance.setOption('keyMap', props.keymap);
    }, [props.keymap]);
    React.useEffect(() => {
        const cmInstance = document.querySelector('.CodeMirror').CodeMirror;
        cmInstance.setOption('mode', props.whiteboardMode ? 'default' : 'python');
    }, [props.whiteboardMode]);
    return (
        <>
            <Box sx={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={'bar'}>
                <Box sx={{ height: '2rem', lineHeight: '2rem', width: 'max-content', background: 'rgb(255,255,255,0.2)', textAlign: 'center', borderRadius: '2rem', paddingInline: '1rem' }}>
                    {props.title}
                </Box>
                {props.show === 'off' || <div class="list-btn hui">
                {props.phone === 'off' || 
                    <Button variant="outlined" id='button' className='Button' onClick={() => props.setIsFullScreen(!props.isFullScreen)}>
                        {props.isFullScreen ? <FullscreenExit sx={{fontSize:'2rem'}} /> : <Fullscreen sx={{fontSize:'2rem'}} />}
                    </Button>
                    
                }
                <Button variant="outlined" id='button' className='Button' style={{ marginInline: '1rem' }} onClick={props.onReset}>
                        <RefreshIcon sx={{ fontSize: '2rem' }} />
                    </Button>
                    <Button variant='contained' onClick={props.onClick}>
                        {props.button}
                    </Button>
                </div>}
            </Box>
            <CodeMirror
                value={props.code}
                height={'calc(100% - 60px)'}
                options={{
                    keyMap: props.keymap,
                    mode: props.whiteboardMode ? 'default' : 'python',
                    theme: props.theme,
                    tabSize: 4,
                    lineNumbers: true,
                    lineWrEditoring: true,
                    foldGutter: true,
                    autoRefresh: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    extraKeys: {
                        "Ctrl-Q": function (cm) {
                            cm.foldCode(cm.getCursor());
                        },
                        "Ctrl-0":function (){
                            props.run()
                        }
                    }
                }}
                onChange={(editor, data, value) => {
                    props.store && localStorage.setItem('code', editor.getValue());
                    props.setCode(editor.getValue());
                }}
            />
        </>
    )
}

export default Editor