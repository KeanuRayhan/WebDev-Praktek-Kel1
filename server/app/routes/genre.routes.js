module.exports = app => {
    const genres = require("../controllers/genre.controller.js");

    var router = require("express").Router();

    // Retrieve all Genres
    router.get("/", genres.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", genres.findWithMovies);

    // Create a new Genre
    router.post("/add", genres.createGenre);

    // Update a Genre with id
    router.put("/:id", genres.updateGenre);

    // Delete a Genre with id
    router.delete("/:id", genres.deleteGenre);

    app.use('/api/genres', router);
}