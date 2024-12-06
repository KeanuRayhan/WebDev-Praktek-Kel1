import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Fungsi untuk menghandle pencarian
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()){
      navigate(`/search?query=${searchTerm}`);
    }
  };

  // Fungsi untuk logout
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-black text-yellow-500 p-4 flex items-center justify-between sticky top-0 z-50">
      <Link 
        to='/'
      >
        <h1 className="text-3xl font-bold">Dramaku</h1>
      </Link>
      <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 p-2 rounded border bg-white-800 text-black"
        />
        <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded">
          Search
        </button>
      </form>

      {/* Menampilkan tombol berdasarkan status login pengguna */}
      {currentUser ? (
        <div className="relative">
          <div onClick={toggleDropdown} className="cursor-pointer flex items-center space-x-2">
            <img 
              src={`https://avatar.iran.liara.run/username?username=${currentUser.username}`} // Avatar placeholder, ganti dengan link gambar avatar jika ada
              alt="avatar" 
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg text-white">{currentUser.username}</span>
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200"
              >
                Profile
              </Link>
              <Link 
                to="/settings" 
                className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200"
              >
                Settings
              </Link>
              {currentUser.role === 'admin' && (
                <Link to="/dramas" className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200">
                  CMS
                </Link>
              )}
              <button 
                onClick={logOut} 
                className="block w-full text-left px-4 py-2 text-lg text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded">
            LOGIN
          </button>
        </Link>
      )}
    </header>
  )
};

export default Header;
