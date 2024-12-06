module.exports = (sequelize, DataTypes) => {
    const Platform = sequelize.define("Platform", {
        platform_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        platform: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Platform;
}