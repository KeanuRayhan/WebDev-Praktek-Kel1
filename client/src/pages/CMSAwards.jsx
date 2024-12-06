import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';

const CmsAwards = () => {
  const [awards, setAwards] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAwards, setFilteredAwards] = useState([]);
  const [editAwardId, setEditAwardId] = useState(null);
  const [editAward, setEditAward] = useState({ country_id: "", year: "", award_name: "" });
  const [searchActive, setSearchActive] = useState(false); // State untuk mengelola status pencarian
  const [sortOrder, setSortOrder] = useState("A-Z"); // State untuk menyimpan urutan sort

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("https://webdev-praktek-kel1-production.up.railway.app/api/awards");
        if (!response.ok) {
          throw new Error("Failed to fetch awards data.");
        }
        const data = await response.json();
        setAwards(data);
        setFilteredAwards(data);
        console.log(data); // Debugging: Lihat data yang diterima
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch("https://webdev-praktek-kel1-production.up.railway.app/api/countries");
        if (!response.ok) {
          throw new Error("Failed to fetch countries data.");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAwards();
    fetchCountries();
  }, []);

  const handleSearch = () => {
    const results = awards.filter((award) =>
      award.award_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (award.country && award.country.country_name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredAwards(results);
    setSearchActive(true); // Set status pencarian aktif
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setFilteredAwards(awards); // Kembalikan ke semua penghargaan
    setSearchActive(false); // Set status pencarian tidak aktif
  };

    // Fungsi untuk menangani pengurutan
    const handleSortChange = (e) => {
      const order = e.target.value;
      setSortOrder(order);
      const sortedAwards = [...filteredAwards].sort((a, b) => {
        if (order === "A-Z") {
          return a.award_name.localeCompare(b.award_name);
        } else {
          return b.award_name.localeCompare(a.award_name);
        }
      });
      setFilteredAwards(sortedAwards);
    };

  const handleSubmitNewAward = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://webdev-praktek-kel1-production.up.railway.app/api/awards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editAward)
      });

      if (!response.ok) {
        throw new Error("Failed to create award.");
      }
      const createdAward = await response.json();

      // Fetch the country details for the created award
      const countryResponse = await fetch(`https://webdev-praktek-kel1-production.up.railway.app/api/countries/${createdAward.country_id}`);
      if (!countryResponse.ok) {
        throw new Error("Failed to fetch country details.");
      }
      const countryData = await countryResponse.json();

      // Include the country data in the created award object
      const awardWithCountry = { ...createdAward, country: countryData };

      setAwards([...awards, awardWithCountry]);
      setFilteredAwards([...filteredAwards, awardWithCountry]);
      alert("Award created successfully!");
      setEditAward({ country_id: "", year: "", award_name: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditAward = async (id) => {
    try {
      const response = await fetch(`https://webdev-praktek-kel1-production.up.railway.app/api/awards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editAward)
      });

      if (!response.ok) {
        throw new Error("Failed to update award.");
      }

      const data = await response.json();
      setAwards(awards.map(award => (award.award_id === id ? { ...data, country: award.country } : award)));
      setFilteredAwards(filteredAwards.map(award => (award.award_id === id ? { ...data, country: award.country } : award)));
      alert("Award updated successfully!");
      setEditAwardId(null);
      setEditAward({ country_id: "", year: "", award_name: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this award?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://webdev-praktek-kel1-production.up.railway.app/api/awards/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete award.");
      }

      setAwards(awards.filter(award => award.award_id !== id));
      setFilteredAwards(filteredAwards.filter(award => award.award_id !== id));
      alert("Award deleted successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Awards</h1>

          <form onSubmit={handleSubmitNewAward} className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <div className="flex flex-col w-full md:w-1/4">
                <label htmlFor="country" className="text-lg mb-1">Country:</label>
                <select
                  id="country"
                  value={editAward.country_id}
                  onChange={(e) => setEditAward({ ...editAward, country_id: e.target.value })}
                  className="border rounded-lg p-2 bg-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map(country => (
                    <option key={country.country_id} value={country.country_id}>{country.country_name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full md:w-1/6">
                <label htmlFor="year" className="text-lg mb-1">Year:</label>
                <input
                  type="text"
                  id="year"
                  value={editAward.year}
                  onChange={(e) => setEditAward({ ...editAward, year: e.target.value })}
                  onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} // Hanya angka
                  placeholder="Enter year"
                  className="border rounded-lg p-2 bg-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <label htmlFor="award" className="text-lg mb-1">Award:</label>
                <input
                  type="text"
                  id="award"
                  value={editAward.award_name}
                  onChange={(e) => setEditAward({ ...editAward, award_name: e.target.value })}
                  placeholder="Enter award"
                  className="border rounded-lg p-2 bg-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-start mt-4">
              <button type="submit" className="bg-yellow-500 text-black font-bold py-2 px-6 rounded hover:bg-yellow-600 transition">
                Submit
              </button>
            </div>
          </form>

          <div className="flex mb-6 justify-end">
            {/* Dropdown filter untuk urutan A-Z dan Z-A */}
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border rounded-lg p-2 bg-gray-700 text-white w-1/8 mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>

              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-lg p-2 bg-gray-700 text-white w-1/5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSearch}
                className="bg-yellow-500 text-black font-bold py-2 px-4 rounded ml-2 hover:bg-yellow-600 transition"
              >
                <FaSearch />
              </button>
              {searchActive && (
                <button
                  onClick={handleResetSearch}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded ml-2 hover:bg-red-600 transition"
                >
                  <FaTimes />
                </button>
            )}
            
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <p>Loading awards...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left w-12 border-b border-gray-500">No</th>
                    <th className="py-3 px-4 text-left border-b border-gray-500">Country</th>
                    <th className="py-3 px-4 text-left border-b border-gray-500">Year</th>
                    <th className="py-3 px-4 text-left border-b border-gray-500">Award</th>
                    <th className="py-3 px-4 text-left border-b border-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAwards.map((award, index) => (
                    <tr key={award.award_id}>
                      <td className="py-3 px-4 border-b border-gray-500">{index + 1}</td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {editAwardId === award.award_id ? (
                          <select
                            value={editAward.country_id}
                            onChange={(e) => setEditAward({ ...editAward, country_id: e.target.value })}
                            className="border rounded-lg p-1 bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                          >
                            {countries.map(country => (
                              <option key={country.country_id} value={country.country_id}>{country.country_name}</option>
                            ))}
                          </select>
                        ) : (
                          award.country ? award.country.country_name : "No country assigned"
                        )}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {editAwardId === award.award_id ? (
                          <input
                            type="text"
                            value={editAward.year}
                            onChange={(e) => setEditAward({ ...editAward, year: e.target.value })}
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} // Hanya angka
                            className="border rounded-lg p-1 bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                          />
                        ) : (
                          award.year
                        )}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {editAwardId === award.award_id ? (
                          <input
                            type="text"
                            value={editAward.award_name}
                            onChange={(e) => setEditAward({ ...editAward, award_name: e.target.value })}
                            className="border rounded-lg p-1 bg-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                          />
                        ) : (
                          award.award_name
                        )}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {editAwardId === award.award_id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditAward(award.award_id)}
                              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditAwardId(null)}
                              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditAwardId(award.award_id); setEditAward({ country_id: award.country_id, year: award.year, award_name: award.award_name }) }}
                              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-yellow-600 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(award.award_id)}
                              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsAwards;
 