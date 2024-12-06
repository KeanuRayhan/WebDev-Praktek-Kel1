import React from 'react';

const Dramadetails = ({ poster, title, year, genres, availability, rating }) => {
    return (
        <div className="mt-8 flex space-x-8">
            <img
                src={`http://localhost:8080/${poster}`} 
                alt="Poster Drama"
                className="w-[200px] h-[300px] rounded bg-gray-700 object-cover"
            />
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">
                    {title}
                </h1>
                {/* <p>
                    <strong>Other titles:</strong> Title 2, Title 3, Title 4
                </p> */}
                <p>
                    <strong>Year:</strong> {year}
                </p>
                <p>
                    <strong>Genres:</strong> {genres.join(', ')}
                </p>
                <p>
                    <strong>Rating:</strong> {rating} / 10
                </p>
                <p>
                    <strong>Availability:</strong> {availability.join(', ')}
                </p>

                {/* Bookmark Button below availability */}
                <button
                    className="flex items-center text-white bg-gray-700 hover:bg-gray-800 p-2 rounded"
                    aria-label="Bookmark"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5v14l7-7 7 7V5H5z"
                        />
                    </svg>
                    <span className="ml-2">Bookmark</span>
                </button>
            </div>
        </div>
    );
};

export default Dramadetails;
