import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
    return (
        <>
            <form className='form' style={{ height: '300px' }}>
                <h1>404</h1>
                <h2>Page not found</h2>
                <Link to='/'>
                    Go to home page
                </Link>
            </form>
        </>
    )
}

export default Page404