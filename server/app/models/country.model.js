module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define("Country", {
        country_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,  // Pastikan ini ada
            allowNull: false
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Country;
};