import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];
    if (currentPage >= Math.ceil(totalUsers / usersPerPage) - 4 && currentPage - 4 > 0) {
        for (let i = Math.ceil(totalUsers / usersPerPage) - 4; i <= Math.ceil(totalUsers / usersPerPage); i++) {
            pageNumbers.push(i);
        }
    }
    else if (currentPage + 4 > Math.ceil(totalUsers / usersPerPage)) {
        let check = Math.ceil(totalUsers / usersPerPage) - currentPage === 0 ? Math.ceil(totalUsers / usersPerPage) - currentPage + 1 : Math.ceil(totalUsers / usersPerPage) - currentPage;
        for (let i = check; i <= Math.ceil(totalUsers / usersPerPage); i++) {
            pageNumbers.push(i);
        }
    }
    else {
        for (let i = currentPage; i <= currentPage + 4; i++) {
            pageNumbers.push(i);
        }
    }
    const previousPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    }
    const nextPage = () => {
        if (currentPage < Math.ceil(totalUsers / usersPerPage)) {
            paginate(currentPage + 1);
        }
    }
    return (
        <div className='pagination'>
            <button className='pagination-btn' onClick={() => paginate(1)}><KeyboardDoubleArrowLeftIcon /></button>
            <button className='pagination-btn' onClick={() => previousPage()}><KeyboardArrowLeftIcon /></button>
            {pageNumbers.map((number, index) => (
                <button key={index} className='pagination-btn' variant='contained' onClick={() => paginate(number)}>
                    {number}
                </button>
            ))}
            <button className='pagination-btn' onClick={() => nextPage()}><KeyboardArrowRightIcon /></button>
            <button className='pagination-btn' onClick={() => paginate(Math.ceil(totalUsers / usersPerPage))}><KeyboardDoubleArrowRightIcon /></button>
        </div>
    );
};

export default Pagination;