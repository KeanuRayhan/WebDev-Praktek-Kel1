import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex items-center -speace-x-px">
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <button
                            onClick={() => paginate(number)}
                            className={`px-3 py-2 leading-tight text-gray-500 bg-gray-800 border border-gray-700 hover:bg=gray-700 hover:text-white 
                                ${currentPage === number ? "bg-gray-700 text-white" : ""}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;