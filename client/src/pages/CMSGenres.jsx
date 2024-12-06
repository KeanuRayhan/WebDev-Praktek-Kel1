import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MovieDataService from '../services/movie.service';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';

const GenresPage = () => {
    const [genres, setGenres] = useState([]);
    const [initialGenres, setInitialGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGenres, setFilteredGenres] = useState([]);
    const [sortOrder, setSortOrder] = useState('None');
    const [newGenre, setNewGenre] = useState('');
    const [editableGenreId, setEditableGenreId] = useState(null);
    const [editedGenre, setEditedGenre] = useState('');

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = () => {
        MovieDataService.getAllGenres()
            .then(response => {
                setGenres(response.data);
                setInitialGenres(response.data);
                setFilteredGenres(response.data);
            })
            .catch(error => {
                console.log("Error fetching genres: ", error);
            });
    };

    const handleSearch = () => {
        const filtered = genres.filter(genre => 
            genre.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGenres(filtered);
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        sortGenres(order);
    };

    const sortGenres = (order) => {
        if (order === 'None') {
            setFilteredGenres(initialGenres);
        } else {
            const sorted = [...filteredGenres].sort((a, b) => {
                if (order === 'A-Z') {
                    return a.genre.localeCompare(b.genre);
                } else if (order === 'Z-A') {
                    return b.genre.localeCompare(a.genre);
                }
                return 0;
            });
            setFilteredGenres(sorted);
        }
    };

    // Fungsi untuk mereset filter
    const handleReset = () => {
        setSearchTerm('');
        setSortOrder('None');
        setFilteredGenres(initialGenres);
    };

    // Fungsi untuk menangani submit form input genre
    const handleSubmit = (e) => {
        e.preventDefault();

        if (newGenre.trim() === ''){
            alert('Genre name cannot be empty');
            return;
        }

        const confirmSubmission = window.confirm(`Are you sure you want to add the genre "${newGenre}"?`);
        if (!confirmSubmission) {
            return;
        }

        // Memanggil API untuk menambahkan genre baru
        MovieDataService.createGenre({ genre: newGenre })
            .then(response => {
                alert('Genre added successfully');
                setNewGenre('');
                fetchGenres();
            })
            .catch(error => {
                console.log('Error creating genre: ', error);
            });
    };

    // Fungsi untuk menangani klik pada row genre
    const handleRowClick = (genre) => {
        setEditableGenreId(genre.genre_id);
        setEditedGenre(genre.genre);
    };

    // Fungsi untuk menangani submit form update genre
    const handleEditSubmit = (genreId) => {
        const confirmEdit = window.confirm(`Are you sure you want to update the genre to "${editedGenre}"?`);
        if (!confirmEdit) {
            return;
        }

        MovieDataService.updateGenre(genreId, { genre: editedGenre })
            .then(response => {
                alert('Genre updated successfully');
                fetchGenres();
                setEditableGenreId(null);
                setEditedGenre('');
            })
            .catch(error => {
                console.log('Error updating genre: ', error);
            });
    };

    // Fungsi untuk menangani klik pada tombol 'Renane'
    const handleRenameClick = (genre) => {
        setEditableGenreId(genre.genre_id);
        setEditedGenre(genre.genre);
    };

    // Fungsi untuk menangani klik pada tombol 'Cancel'
    const handleCancelEdit = () => {
        setEditableGenreId(null);
        setEditedGenre('');
    };

    const handleDeleteGenre = (genreId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this genre?');
        if (!confirmDelete) {
            return;
        }

        MovieDataService.deleteGenre(genreId)
            .then(response => {
                alert('Genre deleted successfully');
                fetchGenres();
            })
            .catch(error => {
                console.log('Error deleting genre: ', error);
            });
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Header */}
            <Header />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-6">Genres</h1>

                    {/* Form Input */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
                        <div className="flex flex-wrap space-x-4 justify-start items-center gap-4">
                            <label htmlFor="genre" className="mr-4 text-lg">Genre:</label>
                            <input
                                type="text"
                                id="genre"
                                value={newGenre}
                                onChange={(e) => setNewGenre(e.target.value)}
                                placeholder="Enter genre"
                                className="border rounded-lg p-2 bg-gray-700 text-white w-1/2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button type="submit" className="bg-yellow-500 text-black font-bold py-2 px-6 rounded hover:bg-yellow-600 transition">
                                Submit
                            </button>
                        </div>

                        <div className="mt-4 flex justify-between items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                <label htmlFor="sortOrder" className="text-lg">Sort by:</label>
                                <select
                                    id="sortOrder"
                                    value={sortOrder}
                                    onChange={handleSortChange}
                                    className="border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="None">None</option>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                </select>
                            </div>
                            <div className="flex space-x-2 ml-auto">
                                <input
                                    type="text"
                                    placeholder="Search genres..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                            <thead className="bg-gray-700 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left w-12 border-b border-gray-500">No</th>
                                    <th className="py-3 px-4 text-left border-b border-gray-500">Genres</th> 
                                    <th className="py-3 px-4 text-center border-b border-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredGenres.map((genre, index) => (
                                    <tr key={genre.genre_id} className="border-t border-gray-600 hover:bg-gray-700 transition" onDoubleClick={() => handleRowClick(genre)}>
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">
                                            {editableGenreId === genre.genre_id ? (
                                                <input
                                                    type='text'
                                                    value={editedGenre}
                                                    onChange={(e) => setEditedGenre(e.target.value)}
                                                    className="border rounded-lg p-2 bg-gray-600 text-white w-1/2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                />
                                            ) : (
                                                genre.genre
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {editableGenreId === genre.genre_id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleEditSubmit(genre.genre_id)}
                                                        className="bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-600 transition"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="bg-gray-500 text-white font-bold py-1 px-3 ml-2 rounded hover:bg-gray-600 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleRenameClick(genre)} 
                                                        className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600 transition"
                                                    >
                                                        Rename
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteGenre(genre.genre_id)} 
                                                        className="bg-red-500 text-white font-bold py-1 px-3 ml-2 rounded hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenresPage;
