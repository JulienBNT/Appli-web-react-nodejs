module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {

        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        phone: {
            type: DataTypes.BIGINT,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        role: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    return users;
};