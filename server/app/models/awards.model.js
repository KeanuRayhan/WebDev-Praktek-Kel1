// module.exports = (sequelize, DataTypes) => {
//     const Award = sequelize.define("Award", {
//         award_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         award_name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         year: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         country_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         movie_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//     }, {
//         freezeTableName: true,
//         timestamps: false
//     });

//     return Award;
// };


////////////////////////////////////////////////

// module.exports = (sequelize, DataTypes) => {
//     const Award = sequelize.define("Award", {
//         award_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         award_name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         year: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         country_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         movie_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         }
//     }, {
//         freezeTableName: true,
//         timestamps: false
//     });

//     return Award;
// };


// Award model
module.exports = (sequelize, DataTypes) => {
    const Award = sequelize.define('Award', {
      award_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment di sini
        allowNull: false,
      },
      award_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Country', // Nama tabel referensi
          key: 'country_id'
        }
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Biarkan null jika tidak ada movie_id
        references: {
          model: 'Movies', // Nama tabel referensi
          key: 'movie_id'
        }
      }
    }, {
      tableName: 'Award',
      timestamps: false, // Menonaktifkan timestamps  
      freezeTableName: true
    });
  
    return Award;
  };
  