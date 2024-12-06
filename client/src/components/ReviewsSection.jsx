import React, { useState } from 'react';
import AuthService from '../services/auth.service';

const ReviewsSection = ({ reviews }) => {
    const currentUser = AuthService.getCurrentUser();
    let username = '';

    if (currentUser) {
        username = currentUser.username
    };

    // Fungsi menampilkan bintang berdasarkan rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "text-yellow-500" : "text-gray-500"}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="w-3/4 mt-8">
            <h2 className="text-xl font-bold text-white">What People Think About This Drama</h2>
            <div className="space-y-4 mt-4">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-700 pb-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-400">
                                    {review.user && review.user.username ? review.user.username : username}
                                </h3>
                                <div className="flex">
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                            <p className="mt-2 text-gray-400">{review.comments}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No reviews available for this drama yet. Be the first to review!</p>
                )}  
            </div>
        </div>
    );
};

export default ReviewsSection;
