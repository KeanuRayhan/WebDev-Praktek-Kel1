const db = require("../models");
const Review = db.review;
const User = db.user;
const Movie = db.movie;
const Country = db.country;

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["username"],
                },
                {
                    model: Movie,
                    as: "movie",
                    attributes: ["title", "year"],
                    include: [
                        {
                            model: Country,
                            as: "country",
                            attributes: ["country_name"],
                        },
                    ]
                },
            ]
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan semua review untuk sebuah movie
exports.getReviewsByMovie = async (req, res) => {
    try {
        const { movie_id } = req.params;

        const reviews = await Review.findAll({
            where: { movie_id },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["username"],
                }
            ]
        });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menambahkan review baru
exports.addReview = async (req, res) => {
    try {
        const { comments, rating, movie_id } = req.body;
        const user_id = req.userId;

        console.log(req.body);

        const review = await Review.create({
            comments,
            rating,
            movie_id,
            user_id
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        await review.destroy();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};