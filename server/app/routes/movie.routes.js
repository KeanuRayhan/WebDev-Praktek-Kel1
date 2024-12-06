module.exports = app => {
    const movies = require("../controllers/movie.controller.js");

    var router = require("express").Router();

    // Retrieve all unique Years
    router.get("/years", movies.findYears);  // Pastikan rute ini didefinisikan lebih dulu

    // Retrieve movies by year
    router.get("/years/:year", movies.findByYear);  

    // Retrieve all Movies
    router.get("/", movies.findAll);

    // Retrieve a single Movie with id
    router.get("/:id", movies.findOne);

    // Update Rating
    router.put("/:id/rating", movies.updateRating);

    // Calculate Rating
    router.put("/calculate-ratings", movies.recalculateAllRatings);

    // Create a new Movie
    router.post("/", movies.create);

    // Update a Movie with id
    router.put("/:id", movies.update);

    // Delete a Movie with id
    router.delete("/:id", movies.delete);

    app.use('/api/movies', router);
}