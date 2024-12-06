import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarHome = () => {
    const location = useLocation();

    return (
        <aside className="w-1/6 bg-gray-950 p-4 space-y-8 fixed top-16 left-0 h-[calc(100vh-64px)]">
            <nav className="space-y-4">
                <Link 
                    to="/" 
                    className={`block text-lg transition-colors duration-300 ${
                        location.pathname === "/" ? "text-yellow-400 font-bold" : "text-white"
                    } hover:text-yellow-400`}
                >
                    Home
                </Link>
                <a href="#" className="block text-lg">Most Popular</a>
                <a href="#" className="block text-lg">Categories</a>
                <a href="#" className="block text-lg">Trending</a>
            </nav>
        </aside>
    );
};

export default SidebarHome;