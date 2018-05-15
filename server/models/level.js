const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define('Level', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Level;
};