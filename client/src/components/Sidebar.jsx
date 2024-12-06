import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    
    return (
        <aside className="w-1/6 bg-gray-950 p-4 space-y-8">
            <nav className="space-y-4">
                <Link 
                    to="/" 
                    className={`block text-lg transition-colors duration-300 ${
                        location.pathname === "/" ? "text-yellow-400 font-bold" : "text-white"
                    } hover:text-yellow-400`}
                >
                    Home
                </Link>
            </nav>

            <div className='border-t border-gray-600'></div>
            
            <div>
                <h3 className="text-white text-xl font-bold mb-4">CMS</h3>
                <nav className='space-y-4'>
                    <Link 
                        to="/dramas" 
                        className={`block text-lg transition-colors duration-300 ${
                            location.pathname === "/dramas" ? "text-yellow-400 font-bold" : "text-white"
                        } hover:text-yellow-400`}
                    >
                        Movies
                    </Link>
                    <Link 
                        to="/countries" 
                        className={`block text-lg transition-colors duration-300 ${
                            location.pathname === "/countries" ? "text-yellow-400 font-bold" : "text-white"
                        } hover:text-yellow-400`}
                    >
                        Countries
                    </Link>
                    <Link 
                        to="/awards" 
                        className={`block text-lg transition-colors duration-300 ${
                            location.pathname === "/awards" ? "text-yellow-400 font-bold" : "text-white"
                        } hover:text-yellow-400`}
                    >
                        Awards
                    </Link>
                    <Link 
                        to="/genres" 
                        className={`block text-lg transition-colors duration-300 ${
                            location.pathname === "/genres" ? "text-yellow-400 font-bold" : "text-white"
                        } hover:text-yellow-400`}
                    >
                        Genres
                    </Link>
                    <Link 
                        to="/actors" 
                        className={`block text-lg transition-colors duration-300 ${
                            location.pathname === "/actors" ? "text-yellow-400 font-bold" : "text-white"
                        } hover:text-yellow-400`}
                    >
                        Actors
                    </Link>
                    <Link 
                        to="/comments" 
                        className={`block text-lg transition-colors duration-300 ${
                            location.pathname === "/comments" ? "text-yellow-400 font-bold" : "text-white"
                        } hover:text-yellow-400`}
                    >
                        Comments
                    </Link>
                    <Link 
                        to="/users" 
                        className={`block text-lg transition-colors duration-300 ${
                            location.pathname === "/users" ? "text-yellow-400 font-bold" : "text-white"
                        } hover:text-yellow-400`}
                    >
                        Users
                    </Link>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;