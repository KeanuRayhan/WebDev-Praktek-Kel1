module.exports = app => {
    const platforms = require("../controllers/platform.controller.js");

    var router = require("express").Router();

    // Retrieve all Platform
    router.get("/", platforms.findAll);

    // Retrieve a single Platform with id
    router.get("/:id", platforms.findWithMovies);

    app.use('/api/platforms', router);
}