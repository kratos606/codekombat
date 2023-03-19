import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginRequest, loginSuccess } from '../actions/auth'
import BaseURL from '../config/app.config'
import axios from 'axios'
import { Navbar, Loading } from '../components'

function HomeRoute() {
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
        return user.isAdmin ? <Navigate to='/admin' replace /> : (<Navigate to='/user' replace />)
    } else {
        return <>
            <Navbar />
            <Outlet />
        </>
    }
}

export default HomeRoute