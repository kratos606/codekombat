import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components'
import BaseURL from '../config/app.config'

function User() {
    const navigate = useNavigate()
    useEffect(() => {
        const getRandom = async () => {
            const { data } = await axios.get(`${BaseURL}/api/game/random`)
            if (data.length === 0 || data === null) {
                localStorage.setItem('Done', 'yes')
                navigate('/user/game')
            }
            else {
                navigate('/user/game/' + data[0]._id)
            }
        }
        getRandom()
    }, [navigate])
    return (
        <Loading />
    )
}

export default User