import React, { useEffect, useState } from 'react';
import MovieDataService from '../services/movie.service';

const CommentsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [ratingFilter, setRatingFilter] = useState('None');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        MovieDataService.getAllReviews()
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.log("Error fetching reviews: ", error);
            });
    }, []);

    const renderStars = (rating) => {
        return (
            <span>
                {"★".repeat(rating) + "☆".repeat(5 - rating)}
            </span>
        );
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure want to delete the selected reviews?");

        if (confirmed) {
            const deletePromises = selectedReviews.map(id => MovieDataService.deleteReview(id));

            Promise.all(deletePromises)
                .then(() => {
                    setReviews(reviews.filter(review => !selectedReviews.includes(review.review_id)));
                    setSelectedReviews([]);
                })
                .catch(error => {
                    console.log("Error deleting reviews: ", error);
                });
        }
    };

    const handleSelectReview = (id) => {
        setSelectedReviews(prevSelected => 
            prevSelected.includes(id)
                ? prevSelected.filter(reviewId => reviewId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedReviews.length === reviews.length) {
            setSelectedReviews([]);
        } else {
            setSelectedReviews(reviews.map(review => review.review_id));
        }
    };

    // Fungsi untuk menangani filter rating
    const handleRatingFilterChange = (event) => {
        setRatingFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Fungsi untuk memfilter ulasan berdasarkan rating dan pencarian
    const filteredReviews = reviews
    .filter(review => ratingFilter === 'None' || review.rating.toString() === ratingFilter)
    .filter(review => 
        review.comments.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 p-8 min-h-screen w-full">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-white">Comments</h1>
            </div>
            {/* Form */}
            <form action="" className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex space-x-4 justify-start items-center mb-4 gap-4">
                    <div className="flex-1 flex items-center space-x-4">
                        <label htmlFor="" className="mr-4">Filtered By Rating :</label>
                        <select 
                            className="border rounded-lg p-2 bg-gray-700"
                            value={ratingFilter}
                            onChange={handleRatingFilterChange}
                        >
                            <option>None</option>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <option key={rating} value={rating}>
                                    {rating} Star{rating > 1 ? 's' : ''}
                                </option>    
                            ))}
                        </select>
                    </div>
                    {/* <div className="flex-1 flex items-center space-x-4">
                        <label htmlFor="" className="mr-4">Shows :</label>
                        <select className="border rounded-lg p-2 bg-gray-700">
                            <option>10</option>
                        </select>
                    </div> */}
                    <div className="flex-1 justify-self-end space-x-4">
                        <input
                            type="text"
                            placeholder="Search Comment"
                            className="border rounded-lg p-2 w-3/4 mr-4 text-black"
                            id="search-comment"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </form>
            
            <div className="w-full">
                {/* Table */}
                <table className="min-w-full bg-gray-800 shadow-md rounded">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="py-2 px-4 text-left"></th>
                            <th className="py-2 px-4 text-left">Username</th>
                            <th className="py-2 px-4 text-left">Rate</th>
                            <th className="py-2 px-4 text-left">Drama</th>
                            <th className="py-2 px-4 text-left">Comments</th>
                            {/* <th className="py-2 px-4 text-left">Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReviews.map((review) => (
                            <tr key={review.review_id} className="border-t">
                                <td className="p-4">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedReviews.includes(review.review_id)}
                                        onChange={() => handleSelectReview(review.review_id)}
                                    />
                                </td>
                                <td className="p-4">
                                    {review.user.username}
                                </td>
                                <td className="p-4">
                                    {renderStars(review.rating)}
                                </td>
                                <td className="p-4">
                                    [{review.movie.year}] {review.movie.title}
                                </td>
                                <td className="p-4">
                                    <p>{review.comments}</p>
                                </td>
                                {/* <td className="p-4">
                                    <p>{review.status || "Null"}</p>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex mt-4 gap-2">
                <button 
                    className="px-4 py-2 rounded-md border"
                    onClick={handleSelectAll}
                >
                    {selectedReviews.length === reviews.length ? "Unselect All" : "Select All"}
                </button>
                {/* <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md">Approve</button> */}
                <button 
                    className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={handleDelete}
                    disabled={selectedReviews.length === 0}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CommentsPage;
