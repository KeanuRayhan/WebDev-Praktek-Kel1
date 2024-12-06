const request = require("supertest");
const app = require("../server"); // Pastikan ini adalah file aplikasi yang benar
const { Movie, Actor, Genre, Platform, Country, Review, Award } = require("../app/models");
const { Op } = require("sequelize");

// jest.mock("../app/models", () => ({
//   Movie: {
//     findByPk: jest.fn(),
//     destroy: jest.fn(),
//   },
//   Review: {
//       destroy: jest.fn(),
//   },
//   Award: {
//       update: jest.fn(),
//   },
//   sequelize: {
//     sync: jest.fn(),
//   },
// })); // Mock semua model

describe("API Endpoint GET /api/movies", () => {
  it("should return all movies without any query", async () => {
    const response = await request(app).get("/api/movies");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Memastikan response berupa array
  });

  it("should return filtered movies based on query", async () => {
    const query = "Moon"; // Misalnya mencari genre atau aktor bertema "Action"
    const response = await request(app).get(`/api/movies?query=${query}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Memastikan bahwa setiap movie yang dikembalikan memiliki title atau actor_name yang sesuai dengan query
    response.body.forEach(movie => {
      const titleMatches = movie.title.toLowerCase().includes(query.toLowerCase());
      const actorMatches = movie.Actors.some(actor =>
        actor.actor_name.toLowerCase().includes(query.toLowerCase())
      );

      expect(titleMatches || actorMatches).toBe(true); // Salah satu harus sesuai
    });
  });

  it("should handle errors", async () => {
    // Simulasikan kondisi error dengan memberikan query yang salah
    const response = await request(app).get("/api/movies?query=NonexistentMovie");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0); // Tidak ada hasil pencarian
  });
});

describe("API Endpoint DELETE /api/movies/:id", () => {
  let req, res;

  beforeEach(() => {
      req = {
          params: { id: 1 }
      };
      res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
      };
      jest.clearAllMocks(); // Bersihkan mock sebelum setiap pengujian
  });

  it('should delete the movie sucessfully', async () => {
    const mockMovie = {
      id: 1,
      setGenres: jest.fn().mockResolvedValue(),
      setActors: jest.fn().mockResolvedValue(),
      setPlatforms: jest.fn().mockResolvedValue(),
      destroy: jest.fn().mockResolvedValue()
    };

    Movie.findByPk.mockResolvedValue(mockMovie);
    Review.destroy.mockResolvedValue();
    Award.destroy.mockResolvedValue();

    const deleteMovie = require("../app/controllers/movie.controller").delete;
    await deleteMovie(req, res);

    expect(Movie.findByPk).toHaveBeenCalledWith(1);
    expect(mockMovie.setGenres).toHaveBeenCalledWith([]);
    expect(mockMovie.setActors).toHaveBeenCalledWith([]);
    expect(mockMovie.setPlatforms).toHaveBeenCalledWith([]);
    expect(Review.destroy).toHaveBeenCalledWith({ where: { movie_id: 1 } });
    expect(Award.update).toHaveBeenCalledWith(
      { movie_id: null },
      { where: { movie_id: 1 } }
    );
    expect(mockMovie.destroy).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      message: "Movie was deleted successfully!"
    });
  });
});
