module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genres", {
        genre_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        genre: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Genre;
};