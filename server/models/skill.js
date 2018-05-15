const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('Skill', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Skill.associate = (models) => {
        // Skill.hasMany(models.Type_skill, { foreignKey: 'type_skill_id' });
        Skill.belongsTo(models.Type_skill, { foreignKey: 'type_skill_id' });
    };
    return Skill;
};