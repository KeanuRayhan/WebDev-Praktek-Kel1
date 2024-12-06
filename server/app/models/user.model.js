module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Users", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        google_id: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {  // Menambahkan kolom role
            type: DataTypes.ENUM('user', 'admin'),  // ENUM dengan nilai USER dan ADMIN
            allowNull: false
        },
        issuspended: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        google_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return User;
};