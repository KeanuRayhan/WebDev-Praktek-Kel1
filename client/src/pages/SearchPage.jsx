import React, { useEffect, useState } from "react";
import ListDrama from "../components/ListDrama"
import Header from "../components/Header";
import SidebarHome from "../components/SidebarHome";
import MovieDataService from "../services/movie.service";
import { useLocation } from "react-router-dom";
import DropdownFilter from "../components/DropdownFilter";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Searchpage() {
  const [movies, setMovies] = useState([]);
  const query = useQuery();
  const searchQuery = query.get("query");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      findByQuery(searchQuery);
    }
  }, [searchQuery]);

  const findByQuery = (searchTerm) => {
    MovieDataService.findByQuery(searchTerm)
      .then((response) => {
        setMovies(response.data);
        setFilteredMovies(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFilterChange = ({ genre_id, platform_id, status, country_id }) => {
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
  
    // Update state untuk menampilkan hasil
    setFilteredMovies(filtered);
  };

  return (
    <div className="bg-slate-950 text-white">
      {/* Header */}
      <Header />

      {/* Sidebar & Main Content */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <SidebarHome />

        {/* Main Content */}
        <main className="flex-1 p-8 ml-[16.67%]">
          {/* Filters and Sorting */}
          <DropdownFilter onFilterChange={handleFilterChange} />
          <h2>
            Search Results for "{searchQuery}"
          </h2>
          {/* List Drama */}
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => (
              <ListDrama 
                key={index}
                title={movie.title}
                url={movie.url_photo}
                year={movie.year}
                genres={movie.Genres.map(genre => genre.genre)}
                actors={movie.Actors.map(actor => actor.actor_name)}
                id={movie.movie_id}
              />
            ))
          ) : (
            <p>No movies found</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Searchpage;
