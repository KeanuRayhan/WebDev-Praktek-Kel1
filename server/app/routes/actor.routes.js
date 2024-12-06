module.exports = app => {
    const actors = require("../controllers/actor.controller.js");

    var router = require("express").Router();

    // Retrieve all Actors
    router.get("/", actors.findAll);

    // Create a new Actor
    router.post("/add", actors.create);

    // Update an Actor with actor_id
    router.put("/:actor_id", actors.update);

    // Delete an Actor with actor_id
    router.delete("/:actor_id", actors.delete);

    app.use('/api/actors', router);
}