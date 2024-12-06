import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState(""); 
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [editableCountry, setEditableCountry] = useState(null);
  const [updatedCountryName, setUpdatedCountryName] = useState("");
  const [deleteCountryId, setDeleteCountryId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  const handleAddCountry = async () => {
    const countryExists = countries.some(country => country.country_name.toLowerCase() === newCountry.toLowerCase());
    if (countryExists) {
      showNotification("Country already exists!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/countries", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country_name: newCountry }),
      });

      if (response.ok) {
        const addedCountry = await response.json();
        setCountries((prevCountries) => [...prevCountries, addedCountry]);
        setNewCountry("");
        showNotification("Country added successfully!");
      } else {
        console.error("Failed to add country");
      }
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  const handleEditCountry = (country) => {
    setEditableCountry(country);
    setUpdatedCountryName(country.country_name);
  };

  const handleUpdateCountry = async (countryId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/countries/${countryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country_name: updatedCountryName }),
      });

      if (response.ok) {
        const updatedCountry = await response.json();
        setCountries(countries.map((country) => country.country_id === updatedCountry.country_id ? updatedCountry : country));
        setEditableCountry(null);
        setUpdatedCountryName("");
        showNotification("Country updated successfully!");
      } else {
        console.error("Failed to update country");
      }
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };

  const handleDeleteCountry = (country_id) => {
    setDeleteCountryId(country_id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCountry = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/countries/${deleteCountryId}`, { method: 'DELETE' });
      if (response.ok) {
        setCountries(countries.filter(country => country.country_id !== deleteCountryId));
        setDeleteCountryId(null);
        setIsDeleteDialogOpen(false);
        showNotification("Country deleted successfully!");
      } else {
        console.error("Failed to delete country");
      }
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  const handleDeleteDialogCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeleteCountryId(null);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setAppliedSearchQuery(""); 
    } else {
      setAppliedSearchQuery(searchQuery);
    }
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setAppliedSearchQuery("");
  };

  const filteredCountries = countries
    .filter((country) => country.country_name.toLowerCase().includes(appliedSearchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.country_name.localeCompare(b.country_name);
      if (sortOrder === "Z-A") return b.country_name.localeCompare(a.country_name);
      return 0;
    });

  const handleCountryInputChange = (e) => {
    const value = e.target.value;
    // Only allow alphabet characters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNewCountry(value);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex min-h-screen">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Countries</h1>

          {/* Input country */}
          <form onSubmit={(e) => { e.preventDefault(); handleAddCountry(); }} className="flex items-center space-x-4 mb-4">
            <label htmlFor="new-country" className="text-lg">Country:</label>
            <input
              type="text"
              id="new-country"
              placeholder="Add New Country"
              className="border rounded-lg p-2 bg-gray-700 text-white w-1/3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newCountry}
              onChange={handleCountryInputChange}
            />
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 transition">
              Submit
            </button>
          </form>

          {/* Search and Sort */}
          <div className="flex items-center justify-end space-x-2 mb-6">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
            <div className="flex">
              <input
                type="text"
                placeholder="Search Country"
                className="border border-gray-600 rounded-lg p-2 bg-gray-700 text-white w-48 focus:outline-none focus:ring-2 focus:ring-yellow-500" // Cleaned up border
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="rounded-lg px-4 py-2 bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition ml-2"
              >
                <FaSearch />
              </button>
              {appliedSearchQuery && (
                <button
                  onClick={handleResetSearch}
                  className="ml-2 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
          </div>

          {notification && (
            <div className="text-center text-white text-sm mb-4">
              {notification}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-left w-12 border-b border-gray-500">No</th>
                  <th className="py-3 px-4 text-left border-b border-gray-500">Country</th>
                  <th className="py-3 px-4 text-center border-b border-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCountries.map((country, index) => (
                  <tr key={country.country_id} className="border-t border-gray-600 hover:bg-gray-700 transition">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      {editableCountry?.country_id === country.country_id ? (
                        <input
                          type="text"
                          value={updatedCountryName}
                          onChange={(e) => setUpdatedCountryName(e.target.value)}
                          onBlur={() => handleUpdateCountry(country.country_id)}
                          className="border border-gray-600 rounded p-1 bg-gray-700 text-white"
                        />
                      ) : (
                        country.country_name
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {editableCountry?.country_id === country.country_id ? (
                        <button
                          onClick={() => handleUpdateCountry(country.country_id)}
                          className="bg-yellow-500 text-black font-bold py-1 px-3 rounded hover:bg-yellow-600 transition"
                        >
                          Save
                        </button>
                        
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditCountry(country)}
                            className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600 transition mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCountry(country.country_id)}
                            className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600 transition"
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

          {isDeleteDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4 text-center">Confirm Delete</h2>
                <p className="mb-4 text-center">Are you sure you want to delete {countries.find(country => country.country_id === deleteCountryId)?.country_name}?</p>
                <div className="flex justify-around">
                  <button onClick={confirmDeleteCountry} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Yes</button>
                  <button onClick={handleDeleteDialogCancel} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountriesPage;
