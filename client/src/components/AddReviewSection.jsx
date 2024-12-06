import React, { useState } from 'react';
import MovieDataService from '../services/movie.service';
import AuthService from '../services/auth.service';

const AddReviewSection = ({ movieId, onReviewAdded }) => {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userId = AuthService.getUserId();

    // Fungsi untuk menangani klik rating bintang
    const handleRatingClick = (star) => {
        setRating(star);
    };

    // Fungsi untuk submit review
    const handleSubmit = async () => {
        if (!comments || rating === 0) {
            alert("Please provide both rating and comments.");
            return;
        }

        if (!userId) {
            alert("Please login to submit a review.");
            return;
        }

        setIsSubmitting(true);

        const reviewData = {
            rating,
            comments,
            movie_id: movieId,
            user_id: userId,
        };

        console.log("Submitting review:", reviewData);
        
        try {
            const response = await MovieDataService.addReview(reviewData);
            console.log("Review submitted successfully");

            onReviewAdded(response.data);

            // Reset Form setelah submit
            setRating(0);
            setComments('');
        } catch (error) {
            console.error('Error adding review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="w-80 mt-8">
            <h2 className="text-xl font-bold text-white">Add Your Review</h2>
            <div className="space-y-4 mt-4">
                {/* Rating Bintang */}
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRatingClick(star)}
                            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-500'}`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                {/* Textarea untuk komentar */}
                <textarea 
                    placeholder="Your thoughts" 
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 h-32"
                ></textarea>

                {/* Tombol Submit */}
                <button 
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default AddReviewSection;
