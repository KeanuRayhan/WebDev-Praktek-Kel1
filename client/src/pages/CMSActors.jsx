// src/components/ActorsPage.jsx
import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movie.service';
import { FaSearch, FaTimes } from 'react-icons/fa';

const ActorsPage = () => {
    const [actors, setActors] = useState([]);
    const [initialActors, setInitialActors] = useState([]);
    const [editingActorId, setEditingActorId] = useState(null);
    const [editedActor, setEditedActor] = useState({});
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredActor, setFilteredActor] = useState([]);
    const [sortOrder, setSortOrder] = useState('None');
    const [newActor, setNewActor] = useState({
        actor_name: '',
        birth_date: '',
        url_photo: null,
        country_id: ''
    });

    useEffect(() => {
        fetchActors();
        fetchCountries();
    }, []);

    const fetchActors = async () => {
        MovieDataService.getAllActors()
            .then(response => {
                setActors(response.data);
                setInitialActors(response.data);
                setFilteredActor(response.data);
            })
            .catch(error => {
                console.error("Error fetching actors:", error);
            });
    };

    const fetchCountries = async () => {
        MovieDataService.getAllCountries()
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error("Error fetching countries:", error);
            });
    };

    const handleInput = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setNewActor((prevState) => ({
                ...prevState,
                url_photo: files[0],
            }));
        } else {
            setNewActor((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newActor.actor_name || !newActor.birth_date || !newActor.country_id || !newActor.url_photo) {
            alert("All fields must be filled out");
            return;
        }

        const confirmSubmission = window.confirm("Are you sure you want to create this actor?");
        if (!confirmSubmission) {
            return;
        }

        const formData = new FormData();
        formData.append("actor_name", newActor.actor_name);
        formData.append("birth_date", newActor.birth_date);
        formData.append("country_id", newActor.country_id);

        if (newActor.url_photo) {
            formData.append("url_photo", newActor.url_photo);
        }

        MovieDataService.createActor(formData)
            .then(() => {
                alert('Actor created successfully');
                fetchActors();
                setNewActor({
                    actor_name: '',
                    birth_date: '',
                    url_photo: null,
                    country_id: ''
                });
            })
            .catch(error => {
                console.error("Error creating actor:", error);
            });
    };

    const handleSearch = () => {
        const filtered = actors.filter(actor =>
            actor.actor_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredActor(filtered);
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        sortActors(order);
    };

    const sortActors = (order) => {
        if (order === 'None') {
            setFilteredActor(initialActors);
        } else {
            const sorted = [...filteredActor].sort((a, b) => {
                if (order === 'A-Z') {
                    return a.actor_name.localeCompare(b.actor_name);
                } else if (order === 'Z-A') {
                    return b.actor_name.localeCompare(a.actor_name);
                }
                return 0;
            });
            setFilteredActor(sorted);
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setSortOrder('None');
        setFilteredActor(initialActors);
    }

    const handleEditClick = (actor) => {
        setEditingActorId(actor.actor_id);
        setEditedActor({
            actor_name: actor.actor_name,
            birth_date: actor.birth_date,
            url_photo: actor.url_photo,
            country_id: actor.country_id,
        });
    };

    const handleDoubleClick = (actor) => {
        handleEditClick(actor);
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            if (files.length > 0) {
                setEditedActor((prevState) => ({
                    ...prevState,
                    url_photo: files[0],
                }));
            }
        } else {
            setEditedActor((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSaveClick = async (actor_id) => {
        const confirmUpdate = window.confirm("Are you sure you want to update this actor?");
        if (confirmUpdate) {
            const formData = new FormData();
            formData.append("actor_name", editedActor.actor_name);
            formData.append("birth_date", editedActor.birth_date);
            formData.append("country_id", editedActor.country_id);

            if (editedActor.url_photo && editedActor.url_photo instanceof File) {
                formData.append("url_photo", editedActor.url_photo);
            }

            MovieDataService.updateActor(actor_id, formData)
                .then(() => {
                    alert('Actor updated successfully');
                    fetchActors();
                    setEditingActorId(null);
                })
                .catch(error => {
                    console.error("Error updating actor:", error);
                });
        }
    };

    const handleCancelEdit = () => {
        setEditingActorId(null);
        setEditedActor({});
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    const handleDeleteClick = async (actor_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this actor?");
        if (confirmDelete) {
            try {
                await MovieDataService.deleteActor(actor_id);
                alert('Actor deleted successfully');
                fetchActors();   
            } catch (error) {
                console.error("Error deleting actor:", error);
                alert('Failed to delete actor');
            }
        }
    };

    return (
        <div className="flex-1 min-h-screen w-full">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-white">Actors</h1>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col mr-4">
                    <div className="col-span-1 flex items-center space-x-4">
                        <label htmlFor="actor-name" className="w-1/4">Actor Name</label>
                        <input
                            type="text"
                            name="actor_name"
                            placeholder="Actor Name"
                            value={newActor.actor_name}
                            onChange={handleInput}
                            className="border rounded-lg col-span-1 w-3/4 p-2 bg-gray-700 text-white w-1/2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
                        />
                    </div>
                    <div className="col-span-1 flex items-center space-x-4">
                        <label htmlFor="country_id" className="w-1/4">Country</label>
                        <select
                            name="country_id"
                            value={newActor.country_id}
                            onChange={handleInput}
                            className="border rounded-lg col-span-1 w-3/4 p-2 bg-gray-700 text-white w-1/2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country.country_id} value={country.country_id}>
                                    {country.country_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1 flex items-center space-x-4">
                        <label htmlFor="birth-date" className="w-1/4">Birth Date</label>
                        <input
                            type="date"
                            name="birth_date"
                            value={newActor.birth_date}
                            onChange={handleInput}
                            className="border rounded-lg col-span-1 w-3/4 p-2 bg-gray-700 text-gray-400 w-1/2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
                        />
                    </div>
                    <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 w-24">
                        Submit
                    </button>
                </div>
                <div className="col-span-1 flex items-center space-x-4">
                    <label htmlFor="url_photo">Upload Picture</label>
                    <input
                        type="file"
                        className="border rounded p-2"
                        onChange={handleInput}
                        name="url_photo"
                    />
                </div>

                <div className="col-span-2 mt-4 flex justify-between items-center space-x-2">
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
                            placeholder="Search actor..."
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

            <div className="w-full">
                {/* Table */}
                <table className="min-w-full bg-gray-800 shadow-md rounded">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="py-2 px-4 text-left">No</th>
                            <th className="py-2 px-4 text-left w-3/12">Actor Name</th>
                            <th className="py-2 px-4 text-left w-3/12">Country</th>
                            <th className="py-2 px-4 text-left w-3/12">Birth Date</th>
                            <th className="py-2 px-4 text-left w-2/12">Photos</th>
                            <th className="py-2 px-4 text-left w-1/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredActor.map((actor, index) => (
                            <tr key={actor.actor_id} className="border-t border-gray-600 hover:bg-gray-700 transition" onDoubleClick={() => handleDoubleClick(actor)}>
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">
                                    {editingActorId === actor.actor_id ? (
                                        <input
                                            type="text"
                                            name="actor_name"
                                            value={editedActor.actor_name}
                                            onChange={handleInputChange}
                                            className="border rounded-lg p-2 bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    ) : (
                                        <p>
                                            {actor.actor_name}
                                        </p>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    {editingActorId === actor.actor_id ? (
                                        <select
                                            name="country_id"
                                            value={editedActor.country_id}
                                            onChange={handleInputChange}
                                            className='border rounded-lg p-2 bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500'
                                        >
                                            {countries.map(country => (
                                                <option key={country.country_id} value={country.country_id}>
                                                    {country.country_name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p>
                                            {actor.country.country_name}
                                        </p>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    {editingActorId === actor.actor_id ? (
                                        <input
                                            type="date"
                                            name="birth_date"
                                            value={editedActor.birth_date}
                                            onChange={handleInputChange}
                                            className="border rounded-lg p-2 bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    ) : (
                                        <p>
                                            {formatDate(actor.birth_date)}
                                        </p>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    {editingActorId === actor.actor_id ? (
                                        <input
                                            type="file"
                                            name="url_photo"
                                            // value={editedActor.url_photo}
                                            onChange={handleInputChange}
                                            className="border rounded-lg p-2 bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    ) : (
                                        <img 
                                            src={`http://localhost:8080/uploads/actors/${actor.url_photo}`} 
                                            alt={actor.actor_name} 
                                            className="w-24 h-36 mx-auto rounded bg-gray-700 object-cover" 
                                        />
                                    )}
                                    {/* <div className="w-30 h-40"></div> */}
                                </td>
                                <td className="py-2 px-4">
                                    {editingActorId === actor.actor_id ? (
                                        <div className='flex items-center space-x-2'>
                                            <button
                                                onClick={() => handleSaveClick(actor.actor_id)}
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
                                        </div>
                                    ) : (
                                        <div className='flex items-center space-x-2'>
                                            <button
                                                onClick={() => handleEditClick(actor)} 
                                                className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(actor.actor_id)} 
                                                className="bg-red-500 text-white font-bold py-1 px-3 ml-2 rounded hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
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

export default ActorsPage;
