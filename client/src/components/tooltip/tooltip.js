import React from 'react'
import './tooltip.css'

function Tooltip(props) {
    return (
        <div className='tooltip'>
            <span className='tooltiptext' style={props.style}>
                {props.title}
            </span>
            {props.children}
        </div>
    )
}

export default Tooltip