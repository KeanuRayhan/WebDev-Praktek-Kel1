import React, { useEffect, useState } from 'react';
import MovieDataService from '../services/movie.service';
import { FaSearch, FaTimes } from 'react-icons/fa';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchUsername, setSearchUsername] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortOrder, setSortOrder] = useState('A-Z');

    // Mengambil semua pengguna saat komponen dimuat
    useEffect(() => {
        MovieDataService.getAllUsers()
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.log("Error fetching users: ", error);
            });
    }, []);

    const handleSearch = async () => {
        const filtered = users.filter(user => 
            user.username.toLowerCase().includes(searchUsername.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        sortUsers(order);
    };

    const sortUsers = (order) => {
        const sorted = [...filteredUsers].sort((a, b) => {
            if (order === 'A-Z') {
                return a.username.localeCompare(b.user);
            } else if (order === 'Z-A') {
                return b.username.localeCompare(a.user);
            }
            return 0;
        });
        setFilteredUsers(sorted);
    };

    // Fungsi untuk mereset filter
    const handleReset = () => {
        setSearchUsername('');
        setSortOrder('A-Z');
        setFilteredUsers(users);
    };

    // Fungsi untuk menangguhkan pengguna
    const suspendUser = (userId) => {
        const confirmSubmission = window.confirm("Are you sure you want suspend this user ?");
        if (!confirmSubmission) {
            return;
        }

        MovieDataService.suspendUser(userId)
            .then(() => {
                alert("User was suspended");
                // Memperbarui status pengguna
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.user_id === userId ? { ...user, issuspended: true } : user
                    )
                );
                setFilteredUsers(prevUsers => 
                    prevUsers.map(user =>
                        user.user_id === userId ? { ...user, issuspended: true } : user
                    )
                );
            })
            .catch(error => {
                console.log("Error suspending user: ", error);
            });
    };

    // Fungsi untuk mengembalikan pengguna yang ditangguhkan
    const unsuspendUser = (userId) => {
        const confirmSubmission = window.confirm("Are you sure you want unsuspend this user ?");
        if (!confirmSubmission) {
            return;
        }

        MovieDataService.suspendUser(userId)
            .then(() => {
                alert("User was unsuspended");
                // Memperbarui status pengguna
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.user_id === userId ? { ...user, issuspended: false } : user
                    )
                );
                setFilteredUsers(prevUsers => 
                    prevUsers.map(user =>
                        user.user_id === userId ? { ...user, issuspended: false } : user
                    )
                );
            })
            .catch(error => {
                console.log("Error unsuspending user: ", error);
            });
    };

    return (
        <div className="flex-1 p-8 min-h-screen w-full">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-white">Users</h1>
            </div>
            {/* Form */}
            <form action="" className="grid grid-cols-1 gap-4 mb-6">
                {/* <div className="flex flex-row mr-4 gap-4">
                    <div className="flex-1 flex items-center space-x-4">
                        <label htmlFor="username" className="mr-4">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="p-2 border rounded w-3/4 mb-4 text-black"
                            id="username"
                        />
                    </div>
                    <div className="flex-1 flex items-center space-x-4">
                        <label htmlFor="email" className="mr-4">Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="p-2 border rounded w-3/4 mb-4 text-black"
                            id="email"
                        />
                        <button className="px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 w-24">
                            Submit
                        </button>
                    </div>
                </div> */}

                <div className="mt-4 flex justify-between items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="sortOrder" className="text-lg">Sort by:</label>
                        <select
                            id="sortOrder"
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>
                    <div className="flex space-x-2 ml-auto">
                        <input
                            type="text"
                            placeholder="Search username"
                            value={searchUsername}
                            onChange={(e) => setSearchUsername(e.target.value)}
                            className="border rounded-lg p-2 bg-gray-700 text-white w-1/1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

            <div className="w-full">
                {/* Table */}
                <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="py-2 px-4 text-left border-b border-gray-500">No</th>
                            <th className="py-2 px-4 text-left w-4/12 border-b border-gray-500">Username</th>
                            <th className="py-2 px-4 text-left w-4/12 border-b border-gray-500">Email</th>
                            <th className="py-2 px-4 text-left w-3/12 border-b border-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index} className="border-t border-gray-600 hover:bg-gray-700 transition">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{user.username}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">
                                    {/* <a href="#" className="text-blue-500 hover:underline mr-4">Send First Email</a>
                                    <a href="#" className="text-blue-500 hover:underline mr-4">Edit</a>
                                    <a href="#" className="text-red-500 hover:underline">Delete</a> */}
                                    {user.issuspended ? (
                                        <button
                                            onClick={() => unsuspendUser(user.user_id)} 
                                            className="bg-blue-500 text-white font-bold py-1 px-3 ml-2 rounded hover:bg-blue-600 transition"
                                            disabled={!user.issuspended}
                                        >
                                            Unsuspend
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => suspendUser(user.user_id)} 
                                            className="bg-red-500 text-white font-bold py-1 px-3 ml-2 rounded hover:bg-red-600 transition"
                                            disabled={user.issuspended}
                                        >
                                            Suspend
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;
