const { where } = require("sequelize");
const db = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { title } = require("process");
const Movie = db.movie;
const Genre = db.genre;
const Actor = db.actor;
const Op = db.Sequelize.Op;
const Review = db.review;
const User = db.user;
const Platform = db.platform;
const Country = db.country;
const Award = db.award;

// Konfigurasi penyimpanan file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/movies/'); // Pastikan folder ini sudah ada
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp untuk menghindari duplikasi
    }
});

// Inisialisasi multer dengan konfigurasi storage
const upload = multer({ storage: storage });

exports.findAll = (req, res) => {
    const query = req.query.query;

    var condition = query ? {
        [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { '$Actors.actor_name$': { [Op.iLike]: `%${query}%` } } // Pencarian berdasarkan nama aktor
        ]
    } : null;

    Movie.findAll({
        where: condition,
        include: [
            {
                model: Genre,
                through: {
                    attributes: [],
                },
            },
            {
                model: Actor,
                through: {
                    attributes: [],
                },
            },
            {
                model: Platform,
                through: {
                    attributes: [],
                },
            },
            {
                model: Country,
                as: "country",
                attributes: ["country_name"],
            },
        ]
    })
    .then(movies => {
        if (condition) {
            const movieIds = movies.map(movie => movie.movie_id);

            return Movie.findAll({
                where: { movie_id: movieIds },
                include: [
                    {
                        model: Genre,
                        through: {
                            attributes: [],
                        },
                    },
                    {
                        model: Actor,
                        through: {
                            attributes: [],
                        },
                    },
                    {
                        model: Platform,
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
        }
        return movies;
    })
    .then(data => {
        // console.log(JSON.stringify(data, null, 2));
        res.send(data);
    })
    .catch(err => {
        console.error("Error saat mengambil data:", err);
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Movie.findByPk(id, {
        include: [
            {
                model: Genre,
                through: {
                    attributes: [],
                },
            },
            {
                model: Actor,
                through: {
                    attributes: [],
                },
            },
            {
                model: Platform,
                through: {
                    attributes: [],
                },
            },
            {
                model: Review,
                as: "reviews",
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["username"],
                    }
                ]
            },
        ]
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Movie with id=${id}.`
            });
        }
    })
    .catch(err => {
        console.error("Error saat mengambil data:", err);
        res.status(500).send({
            message: "Error retrieving Movie with id=" + id
        });
    });
};

exports.updateRating = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findByPk(id, {
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: ["rating"],
                },
            ],
        });

        if (!movie) {
            return res.status(404).send({
                message: `Movie with id=${id} was not found.`
            });
        }

        // Hitung rata-rata rating
        const reviews = movie.reviews || [];
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : null;

        // Perbarui rating movie
        movie.rating = averageRating;
        await movie.save();

        res.send({
            message: "Rating was updated successfully.",
            data: {
                id: movie.movie_id,
                title: movie.title,
                rating: movie.rating,
            },
        });
    } catch (error) {
        console.error("Error updating rating:", error);
        res.status(500).send({
            message: error.message || "Some error occurred while updating rating."
        });
    }
};

exports.findYears = (req, res) => {
    Movie.findAll({
        attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('year')), 'year']],
        order: [['year', 'DESC']]
    })
    .then(data => {
        const years = data.map(item => item.year); // Mengambil nilai tahun dari hasil query
        res.send({ years }); // Mengirim data tahun ke frontend
    })
    .catch(err => {
        console.error("Error saat mengambil tahun:", err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving years."
        });
    });
};

exports.findByYear = (req, res) => {
    const year = req.params.year;  // Ambil parameter tahun dari URL

    Movie.findAll({
        where: { year: year },  // Filter berdasarkan tahun
        include: [
            {
                model: Genre,
                through: { attributes: [] },
            },
            {
                model: Actor,
                through: { attributes: [] },
            },
            {
                model: Platform,
                through: { attributes: [] },
            },
        ]
    })
    .then(data => {
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `No movies found for year ${year}.`
            });
        }
    })
    .catch(err => {
        console.error("Error saat mengambil data:", err);
        res.status(500).send({
            message: "Error retrieving movies for year " + year
        });
    });
};

exports.create = [
    upload.single('url_photo'),
    (req, res) => {
        const { title, year, synopsis, link_trailer, status } = req.body;

        // Ambil URL dari file yang diupload
        const url_photo = req.file ? req.file.path : null;

        // Mengonversi input menjadi array jika diperlukan
        const awardIds = req.body.awardIds ? req.body.awardIds.split(',').map(id => id.trim()) : [];
        const genres = req.body.genres ? req.body.genres.split(',').map(id => id.trim()) : [];
        const actors = req.body.actors ? req.body.actors.split(',').map(id => id.trim()) : [];
        const platforms = req.body.platforms ? req.body.platforms.split(',').map(id => id.trim()) : [];

        Movie.create({
            title,
            url_photo,
            year,
            synopsis,
            link_trailer,
            status: 'approved',
            country_id: req.body.country_id,
            rating: 0
        })
        .then(movie => {
            const promises = []; // Array untuk menyimpan promise

            if (awardIds && awardIds.length > 0) {
                // promises.push(movie.addAwards(awardIds));
                awardIds.forEach(awardId => {
                    promises.push(Award.update(
                        { movie_id: movie.movie_id },
                        { 
                            where: { 
                                award_id: awardId 
                            } 
                        }
                    ));
                });
            }

            if (genres) {
                promises.push(movie.setGenres(genres)); 
            }

            if (actors) {
                promises.push(movie.setActors(actors));
            }

            if (platforms) {
                promises.push(movie.setPlatforms(platforms)); // setPlatforms menggunakan instance movie
            }

            return Promise.all(promises);
        })
        .then(() => {
            res.status(201).send({
                message: "Movie was created successfully."
            });
        })
        .catch(err => {
            console.error("Error saat membuat movie: ", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Movie."
            });
        });
    }
];

exports.update = [
    upload.single('url_photo'),
    async (req, res) => {
        const id = req.params.id;

        try {
            // Cari movie berdasarkan id
            let movie = await Movie.findByPk(id, {
                include: [
                    {
                        model: Genre,
                        through: { 
                            attributes: [] 
                        },
                    },
                    {
                        model: Actor,
                        through: { 
                            attributes: [] 
                        },
                    },
                    {
                        model: Platform,
                        through: { 
                            attributes: [] 
                        },
                    },
                ]
            });
            if (!movie) {
                return res.status(404).send({
                    message: `Movie with id=${id} was not found.`
                });
            }

            // Cek apakah ada file gambar baru yang diunggah
            if (req.file) {
                // Jika ada file gambar baru, hapus file gambar lama
                if (movie.url_photo) {
                    const oldPath = path.join(__dirname, '../', movie.url_photo);
                    fs.unlink(oldPath, (err) => {
                        if (err) console.error("Error saat menghapus file lama: ", err);
                    });
                }
                // Set URL file yang baru diunggah
                movie.url_photo = req.file.path;
            }

            // Ambil URL file yang diunggah, jika ada
            // const url_photo = req.file ? req.file.path : movie.url_photo;

            // Perbarui properti movie
            const { title, year, synopsis, link_trailer, status, country_id } = req.body;
            movie.title = title || movie.title;
            // movie.url_photo = url_photo;
            movie.year = year || movie.year;
            movie.synopsis = synopsis || movie.synopsis;
            movie.link_trailer = link_trailer || movie.link_trailer;
            movie.status = status || movie.status;
            movie.country_id = country_id || movie.country_id;

            // Simpan perubahan movie
            await movie.save();

            // Perbarui hubungan movie dengan Genre, Actor, Platform, dan Award
            const genres = req.body.genres ? req.body.genres.split(',').map(id => id.trim()) : [];
            const actors = req.body.actors ? req.body.actors.split(',').map(id => id.trim()) : [];
            const platforms = req.body.platforms ? req.body.platforms.split(',').map(id => id.trim()) : [];
            const awardIds = req.body.awardIds ? req.body.awardIds.split(',').map(id => id.trim()) : [];

            if (genres.length > 0) await movie.setGenres(genres);
            if (actors.length > 0) await movie.setActors(actors);
            if (platforms.length > 0) await movie.setPlatforms(platforms);

            if (awardIds.length > 0) {
                await Award.update(
                    { movie_id: movie.movie_id },
                    { where: { award_id: awardIds } }
                );
            }

            res.send({ message: "Movie was updated successfully." });
        } catch (err) {
            console.error("Error saat memperbarui movie: ", err);
            res.status(500).send({
                message: err.message || "Some error occurred while updating the Movie."
            });
        }
    }
];

exports.delete = (req, res) => {
    const id = req.params.id;

    Movie.findByPk(id)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: `Movie with id=${id} was not found.`
                });
            }

            // Jika movie ditemukan, hapus semua hubungan terkait
            return Promise.all([
                movie.setGenres([]),
                movie.setActors([]),
                movie.setPlatforms([]),
                Review.destroy({
                    where: { movie_id: id }
                }),
                Award.update({
                    movie_id: null
                }, {
                    where: { movie_id: id }
                })
            ])
            .then(() => movie.destroy());
        })
        .then(() => {
            res.send({
                message: "Movie was deleted successfully!"
            });
        })
        .catch(err => {
            console.error("Error saat menghapus movie:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the Movie."
            });
        });
};

exports.recalculateAllRatings = async (req, res) => {
    try {
      // Ambil semua Movie yang ada
      const movies = await Movie.findAll({
        include: [
          {
            model: Review,
            as: "reviews",
            attributes: ["rating"], // Hanya ambil kolom rating dari review
          },
        ],
      });
  
      // Iterasi untuk setiap Movie dan hitung rata-rata rating
      for (const movie of movies) {
        const reviews = movie.reviews || [];
        const totalRating = reviews.reduce((sum, review) => sum + review.rating * 2, 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : null;
  
        // Membulatkan rata-rata
        const roundedRating = Math.round(averageRating * 10) / 10;

        // Perbarui kolom rating di database
        movie.rating = roundedRating;
        await movie.save();
      }
  
      res.send({
        message: "Ratings recalculated successfully for all movies.",
      });
    } catch (error) {
      console.error("Error recalculating ratings:", error);
      res.status(500).send({
        message: "An error occurred while recalculating ratings.",
      });
    }
  };