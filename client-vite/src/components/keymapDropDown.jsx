import React from 'react'
import { Box, Select, MenuItem } from '@mui/material';

function KeymapDropDown(props) {
    return (
        <Box sx={{ position: 'relative' }}>
            <Select
                id="keymap-select"
                className='Button'
                value={props.keymap}
                variant="outlined"
                sx={{ width: '20vw', marginTop: '10px' }}
                onChange={(e) => {
                    props.setKeymap(e.target.value);
                    localStorage.setItem('keymap', e.target.value);
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            bgcolor: '#15314b',
                            '& .MuiMenuItem-root': {
                                color: '#fff',
                                fontWeight: 'bold',
                                '&.Mui-selected': {
                                    backgroundColor: 'white',
                                    color: '#15314b',
                                    '&.Mui-focusVisible': {
                                        backgroundColor: 'white',
                                        color: '#15314b',
                                    },
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: 'white',
                                    color: '#15314b',
                                },
                                '&.Mui-focusVisible': {
                                    backgroundColor: 'white',
                                    color: '#15314b',
                                },
                                '&:hover': {
                                    backgroundColor: '#626ee3',
                                    color: 'white',
                                }
                            }

                        },
                    },

                }}
            >
                <MenuItem value={'sublime'}>Sublime</MenuItem>
                <MenuItem value={'vim'}>Vim</MenuItem>
                <MenuItem value={'emacs'}>Emacs</MenuItem>
            </Select>
        </Box>
    )
}

export default KeymapDropDown