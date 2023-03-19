import React from 'react'
import { Box, Select, MenuItem } from '@mui/material';


function FontDropDown(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Select
                className='Button'
                id="font-select"
                value={props.fontSize}
                variant="outlined"
                onChange={(e) => {
                    props.setFontSize(e.target.value);
                    localStorage.setItem('fontSize', e.target.value);
                }}
                sx={{ width: '20vw', marginTop: '10px' }}
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
                <MenuItem value={12}>12px</MenuItem>
                <MenuItem value={13}>13px</MenuItem>
                <MenuItem value={14}>14px</MenuItem>
                <MenuItem value={15}>15px</MenuItem>
                <MenuItem value={16}>16px</MenuItem>
                <MenuItem value={17}>17px</MenuItem>
                <MenuItem value={18}>18px</MenuItem>
            </Select>
        </Box>
    )
}

export default FontDropDown