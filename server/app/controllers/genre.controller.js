const db = require("../models");
const Genre = db.genre;
const Movie = db.movie;

exports.findAll = (req, res) => {
    Genre.findAll()
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving genre."
        });
    });
};

exports.findWithMovies = (req, res) => {
    const genre_id = req.params.id;

    Genre.findOne({
        where: { genre_id: genre_id },
        include: [
            {
                model: Movie,
                through: {
                    attributes: [],
                },
            },
        ]
    })
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
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

exports.createGenre = (req, res) => {
    // Validasi request
    if (!req.body.genre) {
        return res.status(400).send({
            message: "Genre tidak boleh kosong!"
        });
    }

    const newGenre = {
        genre: req.body.genre,
    };

    Genre.create(newGenre)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error("Error saat membuat genre:", err);
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat membuat genre."
            });
        });
};

exports.updateGenre = (req, res) => {
    const genre_id = req.params.id;

    // Validasi request
    if (!req.body.genre) {
        return res.status(400).send({
            message: "Genre tidak boleh kosong!"
        });
    }

    Genre.update({ genre: req.body.genre }, {
        where: { genre_id: genre_id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Genre berhasil diupdate."
            });
        } else {
            res.send({
                message: `Tidak bisa update genre dengan id=${genre_id}.`
            });
        }
    })
    .catch(err => {
        console.error("Error saat update genre:", err);
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat update genre"
        });
    });
};

exports.deleteGenre = (req, res) => {
    const genre_id = req.params.id;

    // Cari apakah genre dengan id tersebut ada
    Genre.findByPk(genre_id)
        .then(genre => {
            if (!genre) {
                return res.status(404).send({
                    message: `Genre dengan id=${genre_id} tidak ditemukan.`
                });
            }

            // Hapus genre dari tabel Movie_genre
            return genre.setMovies([])
                .then(() => {
                    // Setelah semua relasi dihapus, hapus genre-nya
                    return Genre.destroy({
                        where: { genre_id: genre_id }
                    });
                })
                .then(() => {
                    res.send({
                        message: "Genre berhasil dihapus."
                    });
                });
        })
        .catch(err => {
            console.error("Error saat menghapus genre:", err);
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat menghapus genre."
            });
        });
};