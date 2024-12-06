// const db = require("../models");
// const Award = db.award;
// const Movie = db.movie;
// const Country = db.country;

// exports.findAll = (req, res) => {
//     Award.findAll({
//         include: [
//             {
//                 model: Country,
//                 as: 'country',
//                 attributes: ['country_name']
//             }
//         ]
//     })
//     .then(data => {
//         console.log(JSON.stringify(data, null, 2));
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving awards."
//         });
//     });
// };


// // Mengambil semua data Award dengan relasi Country
// exports.findWithMovieAndCountry = (req, res) => {
//     const award_id = req.params.id;

//     Award.findOne({
//         where: { award_id: award_id },
//         include: [
//             {
//                 model: Movie,
//                 attributes: ['movie_id', 'title']
//             },
//             {
//                 model: Country,
//                 as: 'country', 
//                 attributes: ['country_name']
//             }
//         ]
//     })
//     .then(data => {
//         if (data) {
//             console.log(JSON.stringify(data, null, 2));
//             res.send(data);
//         } else {
//             res.status(404).send({
//                 message: `Cannot find Award with id=${award_id}.`
//             });
//         }
//     })
//     .catch(err => {
//         console.error("Error saat mengambil data:", err);
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving the award."
//         });
//     });
// };


///////////////////////////////////////////////////////////////////////////////////////

const db = require("../models");
const Award = db.award;
const Movie = db.movie;
const Country = db.country;

exports.findAll = (req, res) => {
    Award.findAll({
        include: [
            {
                model: Country,
                as: 'country',
                attributes: ['country_name']
            }
        ]
    })
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving awards."
        });
    });
};

// Retrieve a single Award with associated Movie and Country details
exports.findWithMovieAndCountry = (req, res) => {
    const award_id = req.params.id;

    Award.findOne({
        where: { award_id: award_id },
        include: [
            {
                model: Movie,
                attributes: ['movie_id', 'title']
            },
            {
                model: Country,
                as: 'country',
                attributes: ['country_name']
            }
        ]
    })
    .then(data => {
        if (data) {
            console.log(JSON.stringify(data, null, 2));
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Award with id=${award_id}.`
            });
        }
    })
    .catch(err => {
        console.error("Error saat mengambil data:", err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the award."
        });
    });
};


exports.create = (req, res) => {
    const { award_name, year, country_id, movie_id } = req.body;

    Award.create({
        award_name,
        year,
        country_id,
        movie_id: null
    })
    .then(data => {
        res.status(201).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Award."
        });
    });
};



exports.delete = (req, res) => {
    const award_id = req.params.id;

    Award.destroy({
        where: { award_id: award_id }
    })
    .then(num => {
        if (num === 1) {
            res.send({
                message: "Award berhasil dihapus."
            });
        } else {
            res.send({
                message: `Tidak dapat menemukan Award dengan id=${award_id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Terjadi kesalahan saat menghapus Award dengan id=" + award_id
        });
    });
};

exports.update = async (req, res) => {
    const awardId = req.params.id;

    // Cek apakah data yang dibutuhkan ada dalam request body
    const { country_id, year, award_name } = req.body;

    try {
        // Cari award berdasarkan ID
        const award = await Award.findByPk(awardId);
        if (!award) {
            return res.status(404).json({ message: 'Award not found.' });
        }

        // Update fields
        award.country_id = country_id;
        award.year = year;
        award.award_name = award_name;

        // Simpan perubahan
        await award.save();
        return res.status(200).json(award);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update award.', error: error.message });
    }
};