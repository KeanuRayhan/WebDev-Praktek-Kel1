import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const FilterFormDrama = ({ onFilterChange, onSearchChange, onReset }) => {
    const [statuses] = useState([
        { id: 'approved', name: 'Approved' }, 
        { id: 'unapproved', name: 'Unapproved' },
    ]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        onFilterChange({ status: event.target.value });
    };

    const handleSearch = () => {
        onSearchChange(searchTerm);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedStatus('');
        onFilterChange({ status: '' });
        onSearchChange('');
        onReset();
    };

    return (
        <form className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex space-x-2 justify-between items-center mb-4">
                <div className="flex-1 flex items-center space-x-4">
                    <label className="mr-4">Filtered By :</label>
                    <select 
                        className="border rounded-lg p-2 bg-gray-700"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="">Status</option>
                        {statuses.map((status) => (
                            <option key={status.id} value={status.id}>{status.name}</option>
                        ))}
                    </select>
                </div>
                {/* <div className="flex-1 flex items-center space-x-4">
                    <label className="mr-4">Shows :</label>
                    <select className="border rounded-lg p-2 bg-gray-700">
                        <option>10</option>
                    </select>
                </div> */}
                <div className="flex justify-end space-x-2">
                    <input
                        type="text"
                        placeholder="Search Movie"
                        className="border rounded-lg p-2 bg-gray-700 text-white w-1/1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        id="search-comment"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-600 transition"
                    >
                        <FaSearch />
                    </button> 
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition"
                    >
                        <FaTimes />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FilterFormDrama;