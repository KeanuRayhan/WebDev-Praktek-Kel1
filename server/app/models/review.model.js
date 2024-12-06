module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Reviews", {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comments: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Review.afterCreate(async (review, options) => {
        await updateMovieRating(review.movie_id);
    });

    Review.afterUpdate(async (review, options) => {
        await updateMovieRating(review.movie_id);
    });

    Review.afterDestroy(async (review, options) => {
        await updateMovieRating(review.movie_id);
    });

    async function updateMovieRating(movieId){
        const Movie = require(".").movie;
        const Review = require(".").review;

        const reviews = await Review.findAll({
            where: {
                movie_id: movieId
            },
            attributes: ['rating'],
        });

        const totalRating = reviews.reduce((sum, review) => sum + review.rating * 2, 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        // Membulatkan rata-rata
        const roundedRating = Math.round(averageRating * 10) / 10;

        const movie = await Movie.findByPk(movieId);
        if (movie) {
        movie.rating = roundedRating;
            await movie.save();
        }
    }

    return Review;
};