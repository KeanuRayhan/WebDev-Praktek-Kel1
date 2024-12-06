module.exports = app => {
    const reviews = require("../controllers/review.controller.js");
    const authMiddleware = require("../middleware/authJwt.js");

    var router = require("express").Router();

    // Review untuk mendapatkan semua review
    router.get("/", reviews.getAllReviews);

    // Review untuk mendapatkan semua review dari suatu movie
    router.get("/:movie_id", reviews.getReviewsByMovie);

    // Review untuk menambahkan review baru
    router.post("/add", authMiddleware.verifyToken, reviews.addReview);

    // Review untuk menghapus review
    router.delete("/:id", reviews.deleteReview);

    app.use("/api/reviews", router);
}