import React from 'react'
import { Box, Select, MenuItem } from '@mui/material';

function ThemeDropDown(props) {
    return (
        <Box sx={{ position: 'relative' }}>
            <Select
                className='Button'
                sx={{
                    width: '20vw',
                    backgroundColor: '#15314b!important',
                }}
                value={props.theme}
                variant="outlined"
                onChange={(e) => {
                    props.setTheme(e.target.value);
                    localStorage.setItem('theme', e.target.value);
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
                                '&:hover': {
                                    backgroundColor: '#626ee3',
                                    color: 'white',
                                }
                            }

                        },
                    },

                }}
            >
                <MenuItem value={"dracula"}>Dracula</MenuItem>
                <MenuItem value={"material"}>Material</MenuItem>
                <MenuItem value={"monokai"}>Monokai</MenuItem>
                <MenuItem value={"blackboard"}>Blackboard</MenuItem>
                <MenuItem value={"cobalt"}>Cobalt</MenuItem>
                <MenuItem value={"lucario"}>Lucario</MenuItem>
            </Select>
        </Box>
    )
}

export default ThemeDropDown