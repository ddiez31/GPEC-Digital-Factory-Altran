const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Type_skill = sequelize.define('Type_skill', {
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Type_skill;
};