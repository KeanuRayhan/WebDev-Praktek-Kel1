import { useState, useEffect } from "react";
import DramaTable from "../components/DramaTable";
import FilterFormDrama from "../components/FilterFormDrama";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MovieDataService from "../services/movie.service";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const CMSMovie = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        retrieveMovies();
    }, []);

    const retrieveMovies = () => {
        MovieDataService.getAll()
        .then(response => {
            setMovies(response.data);
            setFilteredMovies(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const applyFilters = (status, term) => {
        let filtered = movies;

        if (status && status !== "Status") {
            filtered = filtered.filter(movie => movie.status === status);
        }

        if (term) {
            filtered = filtered.filter(movie =>
                movie.title.toLowerCase().includes(term.toLowerCase())
            );
        }

        setFilteredMovies(filtered);
        setCurrentPage(1);
    };

    const handleFilterChange = ({ status }) => {
        setSelectedStatus(status);
        applyFilters(status, searchTerm);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        applyFilters(selectedStatus, term);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedStatus('');
        setFilteredMovies(movies);
        setCurrentPage(1);
    };

    const handleDeleteMovie = (movieId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
        if (!confirmDelete) {
            return;
        }

        MovieDataService.deleteMovie(movieId)
            .then(response => {
                alert("Movie deleted succesfully", response.data);
                setMovies(movies.filter(movie => movie.movie_id !== movieId));
                setFilteredMovies(filteredMovies.filter(movie => movie.movie_id !== movieId));
            })
            .catch(err => {
                console.error("Error deleting movie", err);
            });
    };

    // Data untuk halaman saat ini
    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Mengubah halaman
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8 min-h-screen w-full">
                    <div className="flex space-x-2 justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4 text-white">Movie</h1>
                        <Link 
                            to="/input-movie" 
                            className="bg-green-500 text-black font-bold py-2 px-4 rounded hover:bg-green-600 transition flex items-center space-x-2"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Movie</span>
                        </Link>
                    </div>
                    <FilterFormDrama 
                        onFilterChange={handleFilterChange} 
                        onSearchChange={handleSearchChange}
                        onReset={handleReset}
                    />
                    {filteredMovies && (
                        <DramaTable 
                            movies={currentMovies} 
                            onDelete={handleDeleteMovie} 
                            startIndex={indexOfFirstMovie + 1}
                        />
                    )}
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredMovies.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default CMSMovie;