module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("Movies", {
      movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING
      },
      url_photo: {
        type: DataTypes.STRING
      },
      year: {
        type: DataTypes.STRING
      },
      synopsis: {
        type: DataTypes.STRING
      },
      link_trailer: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM('approved', 'unapproved'),
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    }, {
      freezeTableName: true,
      timestamps: false
    });
  
    return Movie;
  };