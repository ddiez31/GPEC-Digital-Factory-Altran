const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Type_user = sequelize.define('Type_user', {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Type_user;
};