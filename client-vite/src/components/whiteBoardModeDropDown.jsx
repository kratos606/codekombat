import { Box } from '@mui/material'
import React from 'react'

const WhiteBoardModeDropDown = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block',width: '100%' }}>
        <div style={{width:'100%',height:'50px',display:'flex',alignItems:'center',backgroundColor:'#15314b'}} className='whiteboard'>
          <div className={ !props.whiteboardMode ? 'mode active' : 'mode' } onClick={() => props.setWhiteboardMode(false)}>
            Off
          </div>
          <div className={ props.whiteboardMode ? 'mode active' : 'mode' } onClick={() => props.setWhiteboardMode(true)}>
            On
          </div>
        </div>
    </Box>
  )
}

export default WhiteBoardModeDropDown