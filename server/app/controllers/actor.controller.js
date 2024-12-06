const db = require("../models");
const multer = require("multer");
const Actor = db.actor;
const Country = db.country;

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/actors/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

/* Actor Controller */

exports.findAll = (req, res) => {
    Actor.findAll({
        include: [
            {
                model: Country,
                as: "country",
                attributes: ["country_name"],
            },
        ]
    })
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving actor."
        });
    });
};

exports.create = [
    upload.single('url_photo'),
    (req, res) => {
        console.log('File:', req.file);

        // Validasi request
        if (!req.body.actor_name || !req.body.birth_date) {
            return res.status(400).send({
                message: "Fields do not empty!"
            });
        }

        // Ambil path file foto jika diunggah
        const url_photo = req.file ? req.file.filename : null;

        // Membuat actor
        Actor.create({
            actor_name: req.body.actor_name,
            birth_date: req.body.birth_date,
            url_photo: url_photo,
            country_id: req.body.country_id
        })
        .then(data => {
            res.send({
                message: "Actor was created successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the actor."
            });
        });
    }
];

exports.update = [
    upload.single('url_photo'),
    (req, res) => {
        const actor_id = req.params.actor_id;

        if (!req.body) {
            return res.status(404).send({
                message: "Data to update can not be empty!"
            });
        }

        // Cek apakah actor_id ada
        Actor.findByPk(actor_id)
            .then(actor => {
                if (!actor) {
                    return res.status(404).send({
                        message: `Actor with id=${actor_id} was not found!`
                    });
                }

                // Ambil path file foto jika diunggah
                const url_photo = req.file ? req.file.filename : actor.url_photo;

                actor.update({
                    actor_name: req.body.actor_name,
                    birth_date: req.body.birth_date,
                    url_photo: url_photo,
                    country_id: req.body.country_id
                })
                .then(updatedActor => {
                    res.send({
                        message: "Actor was updated successfully!",
                        data: updatedActor
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: `Error updating Actor with id=${actor_id}.`
                    });
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving Actor with id=${actor_id}.`
                });
            });
    }
];

exports.delete = (req, res) => {
    const actor_id = req.params.actor_id;

    Actor.findByPk(actor_id)
        .then(actor => {
            if (!actor) {
                return res.status(404).send({
                    message: `Actor with id=${actor_id} was not found!`
                });
            }

            // Hapus semua relasi many-to-many di Movie_actor
            actor.setMovies([]);

            // Hapus aktor
            Actor.destroy({
                where: { actor_id: actor_id }
            })
            .then(() => {
                res.send({
                    message: "Actor was deleted successfully!"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete Actor with id=${actor_id}.`
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Actor with id=${actor_id}.`
            });
        });
};