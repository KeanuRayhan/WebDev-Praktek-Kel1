import http from "../http-common";
import AuthService from "./auth.service";

class MovieDataService {
    getAll() {
        return http.get("/movies");
    };

    findByQuery(query) {
        return http.get(`/movies?query=${query}`);
    };

    get(id) {
        return http.get(`/movies/${id}`);
    };

    createMovie(movieData) {
        return http.post("/movies", movieData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    };

    updateMovie(movieId, movieData) {
        return http.put(`/movies/${movieId}`, movieData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    };

    deleteMovie(movieId) {
        return http.delete(`/movies/${movieId}`);
    };

    /* COUNTRY SERVICE */
    // Mendapatkan semua country
    getAllCountries() {
        return http.get("/countries");
    };

    /* REVIEW SERVICE */
    // Menambah review
    addReview(data) {
        const token = AuthService.getToken();
        
        return http.post("/reviews/add", data, {
            headers: {
                "x-access-token": token,
            },
        });
    };

    // Mendapatkan semua review dari seluruh movie
    getAllReviews() {
        return http.get("/reviews");
    };

    // Menghapus review
    deleteReview(reviewId) {
        return http.delete(`/reviews/${reviewId}`);
    };

    /* USER SERVICE */
    // Mendapatkan semua user
    getAllUsers() {
        const token = AuthService.getToken();

        return http.get("/users", {
            headers: {
                "x-access-token": token,
            },
        });
    };

    suspendUser(userId) {
        return http.put(`/users/suspend/${userId}`);
    };

    /* GENRES SERVICE */
    getAllGenres() {
        return http.get("genres");
    };

    // Menambah genre
    createGenre(data) {
        const token = AuthService.getToken();

        return http.post("/genres/add", data, {
            headers: {
                "x-access-token": token,
            },
        });
    };

    // Melakukan update genre
    updateGenre(genreId, genreData) {
        return http.put(`/genres/${genreId}`, genreData);
    };

    // Menghapus genre
    deleteGenre(genreId) {
        return http.delete(`/genres/${genreId}`);
    };

    /* ACTOR SERVICE */
    // Mendapatkan semua actor
    getAllActors() {
        return http.get("/actors");
    };

    // Menambah actor
    createActor(data) {
        return http.post("/actors/add", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    // Melakukan update actor
    updateActor(actorId, actorData) {
        return http.put(`/actors/${actorId}`, actorData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    // Menghapus actor
    deleteActor(actorId) {
        return http.delete(`/actors/${actorId}`);
    };
}

export default new MovieDataService();