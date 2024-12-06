import React, { useEffect, useState } from 'react';

const DropdownFilter = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  const [statuses] = useState([
    { id: 'approved', name: 'Approved' }, 
    { id: 'unapproved', name: 'Unapproved' },
  ]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://webdev-praktek-kel1-production.up.railway.app/api/genres');
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres: ', error);
      }
    };

    const fetchPlatforms = async () => {
      try {
        const response = await fetch('https://webdev-praktek-kel1-production.up.railway.app/api/platforms');
        const data = await response.json();
        setPlatforms(data);
      } catch (error) {
        console.error('Error fetching platforms: ', error);
      }
    }

    const fetchCountries = async () => {
      try {
        const response = await fetch('https://webdev-praktek-kel1-production.up.railway.app/api/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries: ', error);
      }
    }

    const fetchYears = async () => {
      try {
        const response = await fetch('https://webdev-praktek-kel1-production.up.railway.app/api/movies/years');
        const data = await response.json();
        if (Array.isArray(data.years)) {
          setYears(data.years);  // Set hasil tahun ke state React
        } else {
          console.error('Data years is not an array', data.years);
        }
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    }

    fetchGenres();
    fetchPlatforms();
    fetchCountries();
    fetchYears();
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    onFilterChange({ genre_id: event.target.value, platform_id: selectedPlatform, status: selectedStatus, country_id: selectedCountry, year: selectedYear });
  }

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
    onFilterChange({ genre_id: selectedGenre, platform_id: event.target.value, status: selectedStatus, country_id: selectedCountry, year: selectedYear });
  }

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    onFilterChange({ genre_id: selectedGenre, platform_id: selectedPlatform, status: event.target.value, country_id: selectedCountry, year: selectedYear });
  }

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    onFilterChange({ genre_id: selectedGenre, platform_id: selectedPlatform, status: selectedStatus, country_id: event.target.value, year: selectedYear });
  }

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    onFilterChange({
        genre_id: selectedGenre,
        platform_id: selectedPlatform,
        status: selectedStatus,
        year: event.target.value,
        // award: event.target.value,
        country_id: selectedCountry
    });
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-4">
        {/* Year */}
        <select 
            className="border rounded-lg p-2 bg-gray-700"
            value={selectedYear}
            onChange={handleYearChange}
        >
            <option value="">Year</option>
            {years.map((year) => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>

        {/* Genre */}
        <select 
          className="border rounded-lg p-2 bg-gray-700"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">Select Genre</option> {/* Pilihan default */}
          {genres.map((genre) => (
            <option key={genre.genre_id} value={genre.genre_id}>{genre.genre}</option> // Menampilkan nama genre
          ))}
        </select>

        {/* Status */}
        <select
          className='border rounded-lg p-2 bg-gray-700'
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">Status</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>

        {/* Availability */}
        <select 
          className="border rounded-lg p-2 bg-gray-700"
          value={selectedPlatform}
          onChange={handlePlatformChange}
        >
          <option value="">Availability</option> {/* Pilihan default */}
          {platforms.map((platform) => (
            <option key={platform.platform_id} value={platform.platform_id}>{platform.platform}</option> // Menampilkan nama platform
          ))}
        </select>

        {/* Country */}
        <select 
          className="border rounded-lg p-2 bg-gray-700"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Country</option> {/* Pilihan default */}
          {countries.map((country) => (
            <option key={country.country_id} value={country.country_id}>{country.country_name}</option> // Menampilkan nama country
          ))}
        </select>

        {/* Award */}
        

        {/* {['Year', 'Genre', 'Status', 'Availability', 'Award'].map((filter, idx) => (
          <select key={idx} className="border rounded-lg p-2 bg-gray-700">
            <option>{filter}</option>
          </select>
        ))} */}
      </div>
      {/* <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600">
        Submit
      </button>
      <select className="border rounded-lg p-2 bg-gray-700">
        <option>Alphabetics</option>
      </select> */}
    </div>
  );
};

export default DropdownFilter;
