import Header from '../components/Header';
import SidebarHome from '../components/SidebarHome';
import Carousel from '../components/Carousel';
import DropdownFilter from '../components/DropdownFilter';
import DramaCard from '../components/MovieCard';
import MovieCard from '../components/MovieCard';
import MovieDataService from "../services/movie.service";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const navigate = useNavigate();

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

  const refreshList = () => {
    retrieveMovies();
    setCurrentMovie(null);
    setCurrentIndex(-1);
  };

  const setActiveMovie = (movie, index) => {
    setCurrentMovie(movie);
    setCurrentIndex(index);
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const handleFilterChange = ({ genre_id, platform_id, status, country_id, year }) => {
    let filtered = movies; // Mulai dengan semua film
  
    // Filter berdasarkan platform
    if (platform_id) {
      filtered = filtered.filter(movie => 
          movie.Platforms && movie.Platforms.some(platform => platform.platform_id === parseInt(platform_id))
      );
    }
  
    // Filter berdasarkan genre
    if (genre_id) {
      filtered = filtered.filter(movie =>
        movie.Genres.some(genre => genre.genre_id === parseInt(genre_id))
      );
    }

    // Filter berdasarkan status
    if (status) {
      filtered = filtered.filter(movie => movie.status === status);
    }

    // Filter berdasarkan country
    if (country_id) {
      filtered = filtered.filter(movie => movie.country_id === parseInt(country_id));
    }
  
    // Filter berdasarkan tahun
    if (year) {
      filtered = filtered.filter(movie => movie.year === year);
    }

    // Update state untuk menampilkan hasil
    setFilteredMovies(filtered);
  };  

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="flex">
        <SidebarHome />
        <main className="flex-1 p-8 ml-[16.67%]">
          <Carousel />
          <h1 className="text-2xl font-bold mb-4 text-white">List Film</h1>
          <DropdownFilter onFilterChange={handleFilterChange} />
          <div className="grid grid-cols-5 gap-4">
            {filteredMovies && filteredMovies.map((movie, index) => (
              <MovieCard 
                key={index}
                title={movie.title}
                url={movie.url_photo}
                year={movie.year}
                genres={movie.Genres.map(genre => genre.genre)}
                id={movie.movie_id}
                rating={movie.rating}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
