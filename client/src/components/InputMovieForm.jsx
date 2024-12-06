import React, { useState, useEffect } from 'react';
import http from "../http-common";
import MovieDataService from '../services/movie.service';

const InputMovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    country_id: '',
    synopsis: '',
    platforms: [],
    genres: [],
    actors: [],
    link_trailer: '',
    awardIds: '',
    url_photo: null
  });

  const [options, setOptions] = useState({
    actors: [],
    genres: [],
    platforms: [],
    countries: [],
    awards: []
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [actorsRes, genresRes, platformRes, countriesRes, awardsRes] = await Promise.all([
          http.get('/actors'),
          http.get('/genres'),
          http.get('/platforms'),
          http.get('/countries'),
          http.get('/awards')
        ]);

        // Filter awards yang memiliki movie_id null
        const availableAwards = awardsRes.data.filter(award => award.movie_id === null);

        setOptions({
          actors: actorsRes.data,
          genres: genresRes.data,
          platforms: platformRes.data,
          countries: countriesRes.data,
          awards: availableAwards
        });
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, url_photo: e.target.files[0] });
  };

  const handleActorChange = (actorId) => {
    setFormData((prevData) => {
      const isSelected = prevData.actors.includes(actorId);
      const updatedActors = isSelected
        ? prevData.actors.filter(id => id !== actorId)
        : [...prevData.actors, actorId].slice(0, 9);
      return { ...prevData, actors: updatedActors };
    });
  };

  const handleSearchActorChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredActors = options.actors.filter(actor =>
    actor.actor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (itemId, field) => {
    setFormData((prevData) => {
      const selectedItems = prevData[field].includes(itemId)
        ? prevData[field].filter(i => i !== itemId)
        : [...prevData[field], itemId];
      return { ...prevData, [field]: selectedItems };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        movieData.append(key, formData[key].join(','));
      } else {
        movieData.append(key, formData[key]);
      }
    });

    // Tambahkan log untuk memeriksa isi `movieData`
    for (let pair of movieData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      MovieDataService.createMovie(movieData)
        .then((response) => {
          alert(response.data.message);
          setFormData({
            title: '',
            year: '',
            country_id: '',
            synopsis: '',
            platforms: [],
            genres: [],
            actors: [],
            link_trailer: '',
            awardIds: '',
            url_photo: null
          });
        })
        .catch(error => {
          console.error("Error creating movies:", error);
        })
    } catch (error) {
        console.error('Error uploading movie:', error.response ? error.response.data : error.message);
        alert('Error uploading movie');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 p-8 min-h-screen w-full">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">Input Movie</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2 justify-self-center">
          <label htmlFor="upload-picture" className="block mb-2 font-bold">Upload Poster</label>
          <input type="file" className="border rounded p-2 h-72 w-30 bg-gray-700" id="upload-picture" onChange={handleFileChange} />
        </div>

        <div className="space-y-4 col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block mb-2 font-bold">Title</label>
              <input 
                type="text" 
                id="title" 
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                placeholder="Movie Title" 
                value={formData.title} 
                onChange={handleChange} 
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block mb-2 font-bold">Year</label>
              <input 
                type="number" 
                id="year" 
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                placeholder="2024" 
                value={formData.year} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label htmlFor="country_id" className="block mb-2 font-bold">Country</label>
              <select 
                id="country_id" 
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                value={formData.country_id} 
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                {options?.countries?.map((country) => (
                  <option key={country.country_id} value={country.country_id}>{country.country_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="synopsis" className="block mb-2 font-bold">Synopsis</label>
            <textarea 
              id="synopsis" 
              rows="4" 
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
              placeholder="Synopsis" 
              value={formData.synopsis} 
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div>
          <label htmlFor="availability" className="block mb-2 font-bold">Availability</label>
          <div className="grid grid-cols-2 gap-2">
            {options?.platforms?.map(platform => (
              <label 
                key={platform.platform_id} 
                className="flex items-center cursor-pointer transition-transform transform hover:scale-105"
              >
                <input 
                  type="checkbox" 
                  className="form-checkbox bg-gray-700 text-yellow-500 h-5 w-5" 
                  onChange={() => handleCheckboxChange(platform.platform_id, 'platforms')} 
                  checked={formData.platforms.includes(platform.platform_id)}
                />
                <span className="ml-2">{platform.platform}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <label className="block col-span-4 font-bold">Genres</label>
          <div className="grid grid-cols-2 gap-2">
            {options?.genres?.map((genre) => (
              <label 
                key={genre.genre_id} 
                value={genre.genre_id} 
                className="flex items-center cursor-pointer transition-transform transform hover:scale-105"
              >
                <input 
                  type="checkbox" 
                  className="form-checkbox bg-gray-700 text-yellow-500 h-5 w-5" 
                  onChange={() => handleCheckboxChange(genre.genre_id, 'genres')}
                  checked={formData.genres.includes(genre.genre_id)}
                />
                <span className="ml-2">{genre.genre}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4 mt-8">
            {/* Search Actor Input */}
            <div>
              <label htmlFor="add_actor" className="block mb-2 font-bold">Add Actor (Up to 9)</label>
              <input 
                type="text" 
                id="add_actor" 
                className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                placeholder="Search Actor Name"
                value={searchTerm}
                onChange={handleSearchActorChange}
              />
            </div>

            {/* Display Filtered Actor List */}
            <div className="flex gap-4 mt-4 mb-4">
              {filteredActors.map(actor => (
                <div 
                  key={actor.actor_id} 
                  className={`text-center p-2 rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${formData.actors.includes(actor.actor_id) ? 'border-2 border-yellow-500' : ''}`}
                  onClick={() => handleActorChange(actor.actor_id)}
                >
                  <img 
                    src={`https://webdev-praktek-kel1-production.up.railway.app/uploads/actors/${actor.url_photo}`}
                    alt={actor.actor_name}
                    className="w-24 h-36 mx-auto rounded bg-gray-700 object-cover"
                    // onClick={() => handleActorChange(actor.actor_id)}
                  />
                  <p className="mt-2">{actor.actor_name}</p>
                </div>
              ))}
            </div>

            {/* Display Selected Actors */}
            {formData.actors.length > 0 && (
              <div>
                <h3 className="text-white mb-2">Selected Actors:</h3>
                <div className="flex gap-4">
                  {formData.actors.map(actorId => {
                    const actor = options.actors.find(a => a.actor_id === actorId);
                    return actor ? (
                      <div key={actor.actor_id} className="text-center">
                        <img 
                          src={`https://webdev-praktek-kel1-production.up.railway.app/uploads/actors/${actor.url_photo}`}
                          alt={actor.actor_name}
                          className="w-16 h-24 mx-auto rounded bg-gray-700 object-cover"
                        />
                        <p className="text-xs mt-2 text-white">{actor.actor_name}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
        </div>

        <div>
          <label htmlFor="link_trailer" className="block mb-2 font-bold">Link Trailer</label>
          <input 
            type="text" 
            id="link_trailer" 
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            placeholder="Link Trailer" 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label htmlFor="awardIds" className="block mb-2 font-bold">Award</label>
          <select 
            id="awardIds" 
            name="awardIds" 
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            value={formData.awardIds} 
            onChange={handleChange}
          >
            <option value="">Select Award</option>
            {options.awards.map(award => (
              <option key={award.award_id} value={award.award_id}>{award.award_name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button 
          className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InputMovieForm;