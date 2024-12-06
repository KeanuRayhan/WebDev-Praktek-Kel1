const db = require("../models");
const Platform = db.platform;
const Movie = db.movie;
const Genre = db.genre;

exports.findAll = (req, res) => {
    Platform.findAll()
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
}

exports.findWithMovies = (req, res) => {
    const platform_id = req.params.id;

    Platform.findOne({
        where: { platform_id: platform_id },
        include: [
            {
                model: Movie,
                through: {
                    attributes: [],
                },
                include: [
                    {
                        model: Genre,
                        through: {
                            attributes: [],
                        },
                    },
                ]
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
}