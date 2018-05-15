const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        name: {
            type: Sequelize.STRING,
            set(val) {
                this.setDataValue('name', val.toUpperCase());
            },
            allowNull: false
        }
    });

    Project.associate = (models) => {
        Project.hasMany(models.Group_skill_level, { foreignKey: 'group_skill_level_id' });
        // Project.belongsTo(models.Contribution, {foreignKey: 'contribution_id'});
    };
    return Project;
};