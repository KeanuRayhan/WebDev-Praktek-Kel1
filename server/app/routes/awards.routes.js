
// module.exports = app => {
//     const awards = require("../controllers/awards.controller.js");

//     var router = require("express").Router();

//     // Retrieve all Awards
//     router.get("/", awards.findAll);

//     // Retrieve a single Award with award_id, including Movie and Country details
//     router.get("/:id", awards.findWithMovieAndCountry);

//     app.use('/api/awards', router);
// };

// /////////////////////////////////////////

module.exports = app => {
    const awards = require("../controllers/awards.controller.js");

    var router = require("express").Router();

    // Retrieve all Awards
    router.get("/", awards.findAll);

    // Retrieve a single Award with award_id, including Movie and Country details
    router.get("/:id", awards.findWithMovieAndCountry);

    // Create a new Award
    router.post("/", awards.create);

    // Route untuk menghapus award berdasarkan id
    router.delete("/:id", awards.delete);

    // Edit an existing Award by award_id
    router.put("/:id", awards.update); // Menambahkan route untuk edit award
    

    app.use('/api/awards', router);
};
