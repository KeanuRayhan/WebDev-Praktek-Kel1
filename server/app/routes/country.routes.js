module.exports = app => {
    const countries = require("../controllers/country.controller.js");

    var router = require("express").Router();

    // Retrieve all Country
    router.get("/", countries.findAll);

    router.get("/:id", countries.findOne); // Get single country by ID
    router.post("/", countries.create); // Add a new country
    router.put("/:id", countries.update); // Update a country
    router.delete("/:id", countries.delete); // Delete a country

    app.use('/api/countries', router);
}