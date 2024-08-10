import React, { useEffect } from 'react'
import { Loading } from '../components'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginRequest, loginSuccess } from '../actions/auth'
import { Box } from '@mui/material'
import Sidebar from '../components/sidebar'
import BaseURL from '../config/app.config'
import axios from 'axios'

function AdminRoute() {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.auth);
    dispatch(loginRequest)
    useEffect(() => {
        const checkUser = async () => {
            const res = await axios.get(`${BaseURL}/api/auth/check`)
            dispatch(loginSuccess(res.data.currentUser))
        }
        checkUser()
    }, [dispatch])
    if (loading === true || loading === null) {
        return <Loading />;
    }
    if (user) {
        return user.isAdmin ? (
            <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
                <Box sx={{ width: 'fit-content' }}>
                    <Sidebar />
                </Box>
                <Box sx={{ width: 'calc(100% - 88px)', marginLeft: '88px' }}>
                    <Outlet />
                </Box>
            </Box>
        ) : <Navigate to='/user' replace />
    } else {
        return <Navigate to='/login' replace />
    }
}

export default AdminRoute