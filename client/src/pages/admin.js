import React, { useState, useEffect } from 'react'
import { Box, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/pagination';
import axios from 'axios'
import BaseURL from '../config/app.config';

function Admin() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(null);
    const [users, setUsers] = useState([]);
    const [filtredUsers, setFiltredUsers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(4);
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const res = await axios.get(`${BaseURL}/api/user`);
            setUsers(res.data);
            setFiltredUsers([...res.data]);
            setLoading(false);
        };

        fetchUsers();
    }, []);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filtredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className='glass' sx={{ width: 'min(90%,500px)', padding: '20px 35px' }}>
                    <h1>
                        Users
                    </h1>
                    <TextField
                        variant="outlined"
                        label="Search"
                        color='success'
                        style={{ width: '100%', marginBlock: '1rem' }}
                        InputLabelProps={{
                            style: {
                                fontWeight: 'bold',
                            }
                        }}
                        onChange={(e) => {
                            const search = e.target.value;
                            const filtred = users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()));
                            setFiltredUsers(filtred);
                        }}
                    />
                    {loading ? <h1>Loading...</h1> : (
                        <>
                            <Box className="users-container">
                                {currentUsers.map(user => (
                                    <Box className={user.isAdmin ? 'user-container admin' : 'user-container'} key={user._id} onClick={() => { setSelected(user) }}>
                                        <Box className="user-name">
                                            {user.username}
                                        </Box>
                                        <Box className="user-email">
                                            {user.email}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            <Pagination
                                currentPage={currentPage}
                                usersPerPage={usersPerPage}
                                totalUsers={filtredUsers.length}
                                paginate={paginate}
                            />
                        </>
                    )}
                </Box>
            </Box>
            {selected ? navigate(`/admin/user/${selected._id}`) : null}
        </>
    )
}

export default Admin