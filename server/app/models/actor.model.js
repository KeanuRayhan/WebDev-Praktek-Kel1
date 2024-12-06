module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define("Actor", {
        actor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        actor_name: {
            type: DataTypes.STRING,
        },
        birth_date: {
            type: DataTypes.STRING,
        },
        url_photo: {
            type: DataTypes.STRING,
        },
        country_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Actor;
};