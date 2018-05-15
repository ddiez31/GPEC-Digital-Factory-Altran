const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Group_skill_level = sequelize.define('Group_skill_level', {

    });

    Group_skill_level.associate = (models) => {
        Group_skill_level.belongsTo(models.Skill, { foreignKey: 'skill_id' });
        Group_skill_level.belongsTo(models.Level, { foreignKey: 'level_id' });
    };
    return Group_skill_level;
};